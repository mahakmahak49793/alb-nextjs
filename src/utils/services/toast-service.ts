// utils/services/toast-service.ts
import { toast, ToastOptions, ToastPosition } from "react-toastify";
import React from "react";

// Message component props interface
interface MsgProps {
  text: string;
}

// Toast props interface
interface CustomToastProps {
  text: string;
}

interface CustomToastOptions extends Omit<ToastOptions, 'toastId'> {
  position?: ToastPosition;
  toastId?: string;
}

// Message component
export const Msg: React.FC<MsgProps> = ({ text }) => {
  return React.createElement('p', { className: "text-grey" }, text);
};

const defaultToastId = "global-toast";

// ✅ FIXED: Add default options with high z-index
const defaultOptions: CustomToastOptions = {
  position: "top-center",
  style: {
    zIndex: 99999, // Higher than Sheet's z-index
  },
  className: "!z-[99999]", // Tailwind override
};

// Main toaster function
export const toaster = (
  myProps: CustomToastProps, 
  toastProps?: CustomToastOptions
) => {
  return toast(
    React.createElement(Msg, myProps), 
    { 
      ...defaultOptions,
      ...toastProps, 
      toastId: defaultToastId 
    }
  );
};

// Success toast
toaster.success = (
  myProps: CustomToastProps, 
  toastProps: CustomToastOptions = {}
) => {
  return toast.success(
    React.createElement(Msg, myProps), 
    { 
      ...defaultOptions,
      toastId: defaultToastId, 
      className: "border border-green-500 !z-[99999]", 
      ...toastProps 
    }
  );
};

// Error toast
toaster.error = (
  myProps: CustomToastProps, 
  toastProps: CustomToastOptions = {}
) => {
  return toast.error(
    React.createElement(Msg, myProps), 
    { 
      ...defaultOptions,
      toastId: defaultToastId, 
      className: "border border-red-500 !z-[99999]", 
      ...toastProps 
    }
  );
};

// Warning toast
toaster.warning = (
  myProps: CustomToastProps, 
  toastProps: CustomToastOptions = {}
) => {
  return toast.warning(
    React.createElement(Msg, myProps), 
    { 
      ...defaultOptions,
      toastId: defaultToastId, 
      className: "border border-yellow-500 !z-[99999]", 
      ...toastProps 
    }
  );
};

// Info toast
toaster.info = (
  myProps: CustomToastProps, 
  toastProps: CustomToastOptions = {}
) => {
  return toast.info(
    React.createElement(Msg, myProps), 
    { 
      ...defaultOptions,
      toastId: defaultToastId, 
      className: "border border-sky-500 !z-[99999]", 
      ...toastProps 
    }
  );
};
