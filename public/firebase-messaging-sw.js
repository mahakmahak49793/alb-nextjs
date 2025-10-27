// background push notifications handle karne ke liye
self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log("Push message received:", data);

  const title = data.notification?.title || "New Notification";
  const options = {
    body: data.notification?.body,
    icon: "/icons/icon-192x192.png", // apna app icon
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
