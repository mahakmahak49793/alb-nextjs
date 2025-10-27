// utils/api-function.ts
import axios, { AxiosResponse } from "axios";
import { getApiUrls } from "./api-urls";
import { encode as btoa } from 'base-64';
import { toaster } from "./services/toast-service";
import { access_token, kundli_key, kundli_token } from "./constants";

// Type definitions
interface ApiResponse<T = any> {
  data: T;
  status: boolean;
  message?: string;
  [key: string]: any;
}

interface RazorpayOrderResponse {
  status: boolean;
  key_id: string;
  data: {
    id: string;
    amount: number;
    currency: string;
  };
}

interface RazorpayPaymentOptions {
  key: string;
  name: string;
  currency: string;
  amount: number;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  description: string;
  image: string;
  handler?: (response: any) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  status: boolean;
  message: string;
  result: any;
}

interface PaymentParams {
  amount?: number;
  name?: string;
  email?: string;
  contact?: string;
}

// Polyfill for btoa in Node.js environment
if (typeof global !== 'undefined' && typeof global.btoa === 'undefined') {
  global.btoa = btoa;
}

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem(access_token) : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API function implementations
export const getAPI = async <T = any>(url: string): Promise<AxiosResponse<T>> => {
  const { api_urls } = getApiUrls();
  const headers = getAuthHeaders();
  
  const response = await axios.get<T>(`${api_urls}${url}`, { headers });
  return response;
};

export const postAPI = async <T = any>(url: string, payload?: any): Promise<AxiosResponse<T>> => {
  const { api_urls } = getApiUrls();
  const headers = getAuthHeaders();
  
  const response = await axios.post<T>(`${api_urls}${url}`, payload, { headers });
  return response;
};

export const patchAPI = async <T = any>(url: string, payload?: any): Promise<AxiosResponse<T>> => {
  const { api_urls } = getApiUrls();
  const headers = getAuthHeaders();
  
  const response = await axios.patch<T>(`${api_urls}${url}`, payload, { headers });
  return response;
};

export const putAPI = async <T = any>(url: string, payload?: any): Promise<AxiosResponse<T>> => {
  const { api_urls } = getApiUrls();
  const headers = getAuthHeaders();
  
  const response = await axios.put<T>(`${api_urls}${url}`, payload, { headers });
  return response;
};

export const deleteAPI = async <T = any>(url: string): Promise<AxiosResponse<T>> => {
  const { api_urls } = getApiUrls();
  const headers = getAuthHeaders();
  
  const response = await axios.delete<T>(`${api_urls}${url}`, { headers });
  return response;
};

export const AstrologyAPIRequest = async <T = any>(url: string, payload?: any): Promise<T> => {
  const { kundli_urls } = getApiUrls();
  const credentials = `${kundli_key}:${kundli_token}`;
  const token = btoa(credentials);
  
  const response = await axios.post<T>(`${kundli_urls}${url}`, payload, {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    }
  });
  
  return response.data;
};

export const razorpayPayment = async ({
  amount = 0,
  name = '',
  email = '',
  contact = ''
}: PaymentParams): Promise<RazorpayResponse> => {
  try {
    const { data }: AxiosResponse<RazorpayOrderResponse> = await postAPI('api/customers/create_razorpay_order', { amount });
    console.log("Order Response :::", data);

    if (!data?.status) {
      toaster?.error({ text: 'Payment Failed.' });
      return { status: false, message: 'Payment Failed.', result: null };
    }

    const options: RazorpayPaymentOptions = {
      key: data.key_id,
      name,
      currency: 'INR',
      amount: data.data.amount,
      order_id: data.data.id,
      prefill: { name, email, contact },
      theme: { color: '#E15602' },
      description: `Your Amount : ${data.data.amount}`,
      image: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
    };

    console.log("Razor Pay Option ::: ", options);

    return new Promise((resolve, reject) => {
      options.handler = function (response: any) {
        console.log('Handler Response ::: ', response);
        resolve({ status: true, message: 'Payment was successful.', result: response });
      };

      options.modal = {
        ondismiss: function () {
          console.log("Payment Dismissed !!! ");
          resolve({ status: false, message: 'Payment was dismissed by the user.', result: null });
        }
      };

      // Check if Razorpay is available (client-side only)
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.on('payment.failed', function (response: any) {
          console.log("Payment Failed !!! ", response?.error);
          reject({ status: false, message: response?.error?.description, result: response?.error });
        });
        razorpay.open();
      } else {
        reject({ status: false, message: 'Razorpay SDK not loaded', result: null });
      }
    });
  } catch (error: any) {
    console.error('Razorpay Payment Error:', error);
    return { status: false, message: error.message || 'Payment failed', result: null };
  }
};

// Next.js specific API wrapper for server-side usage
export const serverAPI = {
  get: async <T = any>(url: string, token?: string): Promise<AxiosResponse<T>> => {
    const { api_urls } = getApiUrls();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return axios.get<T>(`${api_urls}${url}`, { headers });
  },
  
  post: async <T = any>(url: string, payload?: any, token?: string): Promise<AxiosResponse<T>> => {
    const { api_urls } = getApiUrls();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return axios.post<T>(`${api_urls}${url}`, payload, { headers });
  }
};
