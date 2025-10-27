// components/auth/LoginModal.tsx
'use client';

import { useState } from 'react';
import { X, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toaster } from '../../utils/services/toast-service';
import * as UserActions from '../../redux/actions/userActions';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<'phone' | 'otp' | 'signup'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    customerName: '',
    gender: 'Male',
    dateOfBirth: '',
    timeOfBirth: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber.trim()) {
      toaster.error({ text: 'Please enter your phone number' });
      return;
    }
    
    if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      toaster.error({ text: 'Phone number must be 10 digits' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/customer-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toaster.success({ text: 'OTP sent successfully!' });
        setStep('otp');
      } else {
        toaster.error({ text: result.message || 'Failed to send OTP' });
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      toaster.error({ text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.otp.trim()) {
      toaster.error({ text: 'Please enter the OTP' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/verify-customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          otp: formData.otp,
          fcmToken: 'web_token_' + Date.now(), // Mock FCM token for web
          device_id: 'web_device_' + Date.now()
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        if (result.type === 'signup') {
          // New user - need to complete signup
          toaster.info({ text: 'Please complete your profile' });
          setStep('signup');
        } else {
          // Existing user - login successful
          const userData = {
            _id: result.customer._id,
            customerName: result.customer.customerName,
            phoneNumber: result.customer.phoneNumber,
            email: result.customer.email,
            gender: result.customer.gender,
            dateOfBirth: result.customer.dateOfBirth,
            timeOfBirth: result.customer.timeOfBirth
          };
          
          dispatch(UserActions.setUserCustomerById(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          
          toaster.success({ text: 'Login successful!' });
          onClose();
          if (onLoginSuccess) onLoginSuccess();
        }
      } else {
        toaster.error({ text: result.message || 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      toaster.error({ text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Complete Signup
  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      toaster.error({ text: 'Please enter your name' });
      return;
    }
    
    if (!formData.dateOfBirth) {
      toaster.error({ text: 'Please select your date of birth' });
      return;
    }
    
    if (!formData.timeOfBirth) {
      toaster.error({ text: 'Please select your time of birth' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create FormData for the multipart request
      const signupFormData = new FormData();
      signupFormData.append('customerName', formData.customerName);
      signupFormData.append('phoneNumber', formData.phoneNumber);
      signupFormData.append('gender', formData.gender);
      signupFormData.append('dateOfBirth', formData.dateOfBirth);
      signupFormData.append('timeOfBirth', formData.timeOfBirth);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/customer-signup`, {
        method: 'POST',
        body: signupFormData
      });
      
      const result = await response.json();
      
      if (result.success) {
        const userData = {
          _id: result.data._id,
          customerName: result.data.customerName,
          phoneNumber: result.data.phoneNumber,
          email: result.data.email,
          gender: result.data.gender,
          dateOfBirth: result.data.dateOfBirth,
          timeOfBirth: result.data.timeOfBirth
        };
        
        dispatch(UserActions.setUserCustomerById(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        
        toaster.success({ text: 'Account created successfully!' });
        onClose();
        if (onLoginSuccess) onLoginSuccess();
      } else {
        toaster.error({ text: result.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toaster.error({ text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {step === 'phone' ? 'Login / Signup' : 
             step === 'otp' ? 'Verify OTP' : 
             'Complete Profile'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your 10 digit mobile number"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP *
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  OTP sent to +91 {formData.phoneNumber}
                </p>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
                  placeholder="Enter 4 digit OTP"
                  maxLength={4}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Back to Phone Number
              </button>
            </form>
          )}

          {step === 'signup' && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Birth *
                </label>
                <input
                  type="time"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Complete Signup'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
