// redux/actions/authActions.ts
import * as actionTypes from "../actions-types";

// TypeScript interfaces for payloads
export interface CustomerPayload {
  [key: string]: any;
}

export interface AstrologerPayload {
  [key: string]: any;
}

export interface LoginModalPayload {
  isOpen: boolean;
}

// Customer Actions
export const setCustomerLoginModalOpen = (payload: boolean) => ({
  type: actionTypes.IS_CUSTOMER_LOGIN_MODAL_OPEN,
  payload,
} as const);

export const customerLogin = (payload: CustomerPayload) => ({
  type: actionTypes.CUSTOMER_LOGIN,
  payload,
} as const);

export const customerLoginOtp = (payload: CustomerPayload) => ({
  type: actionTypes.CUSTOMER_LOGIN_OTP,
  payload,
} as const);

export const customerUpdateProfile = (payload: CustomerPayload) => ({
  type: actionTypes.CUSTOMER_UPDATE_PROFILE,
  payload,
} as const);

export const customerChangePicture = (payload: CustomerPayload) => ({
  type: actionTypes.CUSTOMER_CHANGE_PICTURE,
  payload,
} as const);

export const customerLoginInputField = (payload: CustomerPayload) => ({
  type: actionTypes.CUSTOMER_LOGIN_INPUT_FIELD,
  payload,
} as const);

// Astrologer Actions
export const setAstrologerLoginModalOpen = (payload: boolean) => ({
  type: actionTypes.IS_ASTROLOGER_LOGIN_MODAL_OPEN,
  payload,
} as const);

export const astrologerLogin = (payload: AstrologerPayload) => ({
  type: actionTypes.ASTROLOGER_LOGIN,
  payload,
} as const);

export const userLogout = (payload?: any) => ({
  type: actionTypes.USER_LOGOUT,
  payload,
} as const);

// Action type unions for type safety
export type AuthActionTypes = 
  | ReturnType<typeof setCustomerLoginModalOpen>
  | ReturnType<typeof customerLogin>
  | ReturnType<typeof customerLoginOtp>
  | ReturnType<typeof customerUpdateProfile>
  | ReturnType<typeof customerChangePicture>
  | ReturnType<typeof customerLoginInputField>
  | ReturnType<typeof setAstrologerLoginModalOpen>
  | ReturnType<typeof astrologerLogin>
  | ReturnType<typeof userLogout>;
