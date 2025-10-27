import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyDpFoGJ0glT_V8Qy2ybG4uhbX6KI0Plv20",
  authDomain: "astrobook-f654b.firebaseapp.com",
  databaseURL: "https://astrobook-f654b-default-rtdb.firebaseio.com",
  projectId: "astrobook-f654b",
  storageBucket: "astrobook-f654b.firebasestorage.app",
  messagingSenderId: "87240796994",
  appId: "1:87240796994:web:f67a36c9d8d5ec142836db",
};

const app = initializeApp(firebaseConfig);

export const initFirebaseMessaging = async () => {
  const supported = await isSupported();
  if (supported && typeof window !== "undefined") {
    const messaging = getMessaging(app);
    return messaging;
  }
  return null;
};

// ✅ FIXED: Better token request with retry mechanism
export const requestFcmToken = async (retryCount = 0): Promise<string> => {
  const MAX_RETRIES = 3;
  
  try {
    const messaging = await initFirebaseMessaging();
    if (!messaging) {
      console.warn("⚠️ Messaging not supported");
      return "";
    }

    // Check permission first
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("⚠️ Notification permission denied");
      return "";
    }

    // ✅ Check if service worker is already registered
    let registration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
    
    if (!registration) {
      console.log("📝 Registering service worker...");
      registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      // ✅ CRITICAL: Wait for service worker to be ready
      await navigator.serviceWorker.ready;
      console.log("✅ Service Worker is ready");
      
      // Extra wait for service worker to fully initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      console.log("✅ Service Worker already registered");
    }

    // ✅ Get token with proper registration
    const token = await getToken(messaging, {
      vapidKey: "BBzBhTiXJKaO3_Mgx09eqnsknn4U5YN8m9jtkG3l-9oslw1ATYQnWp21Zq7WT0aJswARr9WZo6plh9PJHVMTANM",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("✅ FCM Token generated:", token);
      localStorage.setItem("fcm_token", token);
      return token;
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error(`❌ Error getting FCM token (attempt ${retryCount + 1}):`, error);
    
    // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`🔄 Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return requestFcmToken(retryCount + 1);
    }
    
    // Return empty string instead of null for consistency
    return "";
  }
};

// ✅ Get stored token synchronously (for immediate use)
export const getStoredFcmToken = (): string => {
  if (typeof window === 'undefined') return "";
  return localStorage.getItem("fcm_token") || "";
};

export const onMessageListener = async (callback: (payload: any) => void) => {
  const messaging = await initFirebaseMessaging();
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message received:", payload);
    callback(payload);
  });
};