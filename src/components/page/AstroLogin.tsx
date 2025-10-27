'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { onMessageListener, requestFcmToken } from '@/lib/firebase';

// Types
interface AstrologerLoginSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

interface AstrologerCredentials {
  email: string;
  password: string;
}

// SVG Components
const CrossSvg: React.FC<{ strokeWidth?: string }> = ({ strokeWidth = '2' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Success/Error Popup Component
const PopupModal: React.FC<{
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-auto shadow-xl">
        <div className="text-center">
          {/* Icon at the top */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            type === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <div className={`text-4xl ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {type === 'success' ? '✓' : '✕'}
            </div>
          </div>
          
          {/* Title */}
          <h3 className={`text-xl font-semibold mb-2 ${
            type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </h3>
          
          {/* Message below */}
          <p className="text-gray-600 mb-6">{message}</p>
          
          {/* Button */}
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium ${
              type === 'success' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            } transition-colors`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_HTTPS;

const apiService = {
  astrologerLogin: async (email: string, password: string, webFcmToken: string) => {
    const response = await fetch(`${API_BASE_URL}/astrologer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: email.trim().toLowerCase(), 
        password: password.trim(), 
        webFcmToken 
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    
    return response.json();
  }
};

const AstrologerLoginSheet: React.FC<AstrologerLoginSheetProps> = ({ 
  isOpen, 
  onClose,
  onLoginSuccess 
}) => {
  const [astroFieldDetail, setAstroFieldDetail] = useState<AstrologerCredentials>({
    email: '',
    password: ''
  });
  
  // FCM Token Management
  const [fcmToken, setFcmToken] = useState('');
  const [isFcmReady, setIsFcmReady] = useState(false);
  const [fcmError, setFcmError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: ''
  });

  const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAstroFieldDetail({ ...astroFieldDetail, [name]: value });
  };

  // FCM initialization
  useEffect(() => {
    const initializeFCM = async () => {
      if (typeof window === 'undefined') return;

      try {
        console.log('🔄 Starting FCM initialization...');
        
        // Check existing token
        const existingToken = localStorage.getItem('fcm_token') || '';
        if (existingToken) {
          console.log('📦 Found existing FCM token');
          setFcmToken(existingToken);
          setIsFcmReady(true);
        }

        // Request new token
        console.log('🔑 Requesting new FCM token...');
        const newToken = await requestFcmToken();
        
        if (newToken) {
          console.log('✅ FCM Token generated successfully');
          setFcmToken(newToken);
          setIsFcmReady(true);
          setFcmError(null);
        } else if (!existingToken) {
          console.warn('⚠️ No FCM token available, but continuing...');
          setIsFcmReady(true);
          setFcmError('FCM token not available');
        }

        // Setup foreground message listener
        onMessageListener((payload) => {
          console.log('📨 Foreground message received:', payload);
        });

      } catch (error) {
        console.error('❌ FCM initialization error:', error);
        setFcmError(error instanceof Error ? error.message : 'FCM initialization failed');
        setIsFcmReady(true);
      }
    };

    initializeFCM();
  }, []);

  const showPopup = (type: 'success' | 'error', message: string) => {
    setPopup({
      isOpen: true,
      type,
      message
    });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, type: 'success', message: '' });
  };

  const handleCloseSheet = () => {
    setAstroFieldDetail({ email: '', password: '' });
    onClose();
  };

  const handleLogin = async () => {
    const { email, password } = astroFieldDetail;

    // Validation
    if (!email || !password) {
      showPopup('error', 'Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      showPopup('error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Get fresh FCM token with fallback logic
      let tokenToSend = fcmToken;
      
      if (!tokenToSend && typeof window !== 'undefined') {
        console.log('⚠️ No token in state, checking localStorage...');
        tokenToSend = localStorage.getItem('fcm_token') || '';
      }
      
      if (!tokenToSend) {
        console.log('⚠️ No token found, attempting fresh generation...');
        const freshToken = await requestFcmToken();
        if (freshToken) {
          tokenToSend = freshToken;
          setFcmToken(freshToken);
          console.log('✅ Fresh token generated');
        }
      }
      
      console.log('📤 Sending login with FCM token:', tokenToSend ? '✅ Present' : '❌ Missing');

      const response = await apiService.astrologerLogin(email, password, tokenToSend);
      
      if (response?.success && typeof window !== 'undefined') {
        // Save auth token
        if (response?.token) {
          localStorage.setItem('auth_token', response.token);
        }
        
        // Save astrologer data
        const astrologerData = response?.astrologer;
        if (astrologerData) {
          console.log('✅ Astrologer Data received:', astrologerData);
          
          localStorage.setItem('astrologer_id', astrologerData._id || '');
          localStorage.setItem('astrologer_email', astrologerData.email || '');
          localStorage.setItem('astrologer_name', astrologerData.name || '');
          localStorage.setItem('astrologer_data', JSON.stringify(astrologerData));
        }

        showPopup('success', 'Login successful!');
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        
        setTimeout(() => {
          handleCloseSheet();
          window.location.href = '/astrologer-dashboard/my-account';
        }, 1500);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      showPopup('error', 'Invalid email or password. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <PopupModal
        isOpen={popup.isOpen}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />
      
      <Sheet open={isOpen} onOpenChange={handleCloseSheet}>
        <SheetContent 
          side="bottom" 
          className="h-auto max-h-[95vh] rounded-t-[20px] p-0 overflow-y-auto border-none bg-transparent backdrop-blur-none"
        >
          <div className='md:h-20 bg-transparent'></div>
          <section className="relative m-auto bg-white lg:w-[60%] md:w-[100%] sm:w-[100%] rounded-t-lg">
            <div 
              onClick={handleCloseSheet} 
              className='cursor-pointer absolute text-[#EF4444] right-5 top-5 z-10'
            >
              <CrossSvg strokeWidth='3' />
            </div>
            
            <main className="rounded-t-lg max-w-4xl w-full mx-auto flex bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(auth-bg.png)` }}>
              <div className='basis-full md:basis-[55%] flex flex-col p-8 max-md:px-0 pt-16 pb-32'>
                <div className='flex flex-col items-center gap-5 px-10 text-center'>
                  <div className='text-black text-[30px] font-[500] text-center'>Continue with email</div>
                  
                  <div className='flex flex-col gap-4 w-full'>
                    <input 
                      name='email' 
                      value={astroFieldDetail.email} 
                      onChange={handleInputField}
                      onKeyDown={handleKeyDown}
                      type='email' 
                      placeholder='Email' 
                      className='w-full text-sm px-4 py-3 border border-gray-300 focus:border-[#EF4444] rounded-md focus:outline-none transition-colors'
                      disabled={isLoading}
                    />

                    <input 
                      name='password' 
                      value={astroFieldDetail.password} 
                      onChange={handleInputField}
                      onKeyDown={handleKeyDown}
                      type='password' 
                      placeholder='Password' 
                      className='w-full text-sm px-4 py-3 border border-gray-300 focus:border-[#EF4444] rounded-md focus:outline-none transition-colors'
                      disabled={isLoading}
                    />

                    <button 
                      onClick={handleLogin}
                      disabled={isLoading}
                      className="w-full h-[45px] shadow-lg bg-[#EF4444] hover:bg-[#EF444499] focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-[10px] transition duration-300 transform hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
                      type="submit"
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className='text-[14px] font-[500]'>
                      Don't have an account?{' '}
                      <Link 
                        href={'/astrologer-signup'} 
                        onClick={handleCloseSheet} 
                        className='underline text-[#0858F7]'
                      >
                        Signup
                      </Link>
                    </div>
                    
                    <div className='text-[14px] font-[500] text-[#0858F7]'>
                      By Signing, you agree to our{' '}
                      <Link href={'/terms-of-use'} onClick={handleCloseSheet} className='underline'>
                        Terms of Use
                      </Link>{' '}
                      and{' '}
                      <Link href={'/privacy-policy'} onClick={handleCloseSheet} className='underline'>
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='basis-[45%] hidden md:flex justify-center'>
                <div className='absolute -top-20'>
                  <img
                    alt="Astrologer Login"
                    loading="lazy"
                    className="object-contain w-[80%] h-[80%]"
                    src={`astrologer-login-auth.png`}
                  />
                </div>
              </div>
            </main>
          </section>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AstrologerLoginSheet;