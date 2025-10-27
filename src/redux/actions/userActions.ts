// redux/actions/userActions.ts
import * as actionTypes from "../actions-types";

// TypeScript interfaces for payloads
export interface UserPayload {
  [key: string]: any;
}

export interface CustomerByIdPayload {
  customerId: string;
  [key: string]: any;
}

export interface AstrologerByIdPayload {
  astrologerId: string;
  [key: string]: any;
}

export interface SlotPayload {
  astrologerId: string;
  date?: string;
  [key: string]: any;
}

export interface AddressPayload {
  addressId?: string;
  [key: string]: any;
}

// Customer Actions
export const getUserCustomerById = (payload: CustomerByIdPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_BY_ID, 
  payload 
} as const);

export const setUserCustomerById = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_BY_ID, 
  payload 
} as const);

export const rechargeUserCustomerWallet = (payload: UserPayload) => ({ 
  type: actionTypes.RECHARGE_USER_CUSTOMER_WALLET, 
  payload 
} as const);

export const getUserCustomerCompletedQueueList = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_COMPLETED_QUEUE_LIST, 
  payload 
} as const);

export const setUserCustomerCompletedQueueList = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_COMPLETED_QUEUE_LIST, 
  payload 
} as const);

export const updateUserCustomerCompletedQueueListReadStatus = (payload: UserPayload) => ({ 
  type: actionTypes.UPDATE_USER_CUSTOMER_COMPLETED_QUEUE_LIST_READ_STATUS, 
  payload 
} as const);

export const getUserCustomerWalletHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_WALLET_HISTORY, 
  payload 
} as const);

export const setUserCustomerWalletHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_WALLET_HISTORY, 
  payload 
} as const);

export const getUserCustomerTransactionHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_TRANSACTION_HISTORY, 
  payload 
} as const);

export const setUserCustomerTransactionHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_TRANSACTION_HISTORY, 
  payload 
} as const);

export const getUserCustomerOrderHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_ORDER_HISTORY, 
  payload 
} as const);

export const setUserCustomerOrderHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_ORDER_HISTORY, 
  payload 
} as const);

export const getUserCustomerPujaBookHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_PUJA_BOOK_HISTORY, 
  payload 
} as const);

export const setUserCustomerPujaBookHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_PUJA_BOOK_HISTORY, 
  payload 
} as const);

// Address Actions
export const getUserCustomerAddress = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_ADDRESS, 
  payload 
} as const);

export const setUserCustomerAddress = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_ADDRESS, 
  payload 
} as const);

export const createUserCustomerAddress = (payload: AddressPayload) => ({ 
  type: actionTypes.CREATE_USER_CUSTOMER_ADDRESS, 
  payload 
} as const);

export const updateUserCustomerAddress = (payload: AddressPayload) => ({ 
  type: actionTypes.UPDATE_USER_CUSTOMER_ADDRESS, 
  payload 
} as const);

export const deleteUserCustomerAddress = (payload: AddressPayload) => ({ 
  type: actionTypes.DELETE_USER_CUSTOMER_ADDRESS, 
  payload 
} as const);

// Consultation History
export const getUserCustomerConsultationHistory = (payload: CustomerByIdPayload) => ({ 
  type: actionTypes.GET_USER_CUSTOMER_CONSULTATION_HISTORY, 
  payload 
} as const);

export const setUserCustomerConsultationHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_CUSTOMER_CONSULTATION_HISTORY, 
  payload 
} as const);

// Astrologer Actions
export const getUserAstrologerById = (payload: AstrologerByIdPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_BY_ID, 
  payload 
} as const);

export const setUserAstrologerById = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_BY_ID, 
  payload 
} as const);

export const changeUserAstrologerChatStatus = (payload: UserPayload) => ({ 
  type: actionTypes.CHANGE_USER_ASTROLOGER_CHAT_STATUS, 
  payload 
} as const);

export const changeUserAstrologerCallStatus = (payload: UserPayload) => ({ 
  type: actionTypes.CHANGE_USER_ASTROLOGER_CALL_STATUS, 
  payload 
} as const);

export const changeUserAstrologerVideoCallStatus = (payload: UserPayload) => ({ 
  type: actionTypes.CHANGE_USER_ASTROLOGER_VIDEO_CALL_STATUS, 
  payload 
} as const);

export const userAstrologerWithdrawalRequest = (payload: UserPayload) => ({ 
  type: actionTypes.USER_ASTROLOGER_WITHDRAWAL_REQUEST, 
  payload 
} as const);

// Queue Management
export const getUserAstrologerPendingQueueList = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_PENDING_QUEUE_LIST, 
  payload 
} as const);

export const setUserAstrologerPendingQueueList = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_PENDING_QUEUE_LIST, 
  payload 
} as const);

export const getUserAstrologerCompletedQueueList = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_COMPLETED_QUEUE_LIST, 
  payload 
} as const);

export const setUserAstrologerCompletedQueueList = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_COMPLETED_QUEUE_LIST, 
  payload 
} as const);

export const updateUserAstrologerPendingQueueListStatus = (payload: UserPayload) => ({ 
  type: actionTypes.UPDATE_USER_ASTROLOGER_PENDING_QUEUE_LIST_STATUS, 
  payload 
} as const);

// Transaction History
export const getUserAstrologerWalletHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_WALLET_HISTORY, 
  payload 
} as const);

export const setUserAstrologerWalletHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY, 
  payload 
} as const);

export const getUserAstrologerTransactionHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, 
  payload 
} as const);

export const setUserAstrologerTransactionHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY, 
  payload 
} as const);

// Puja History
export const getUserAstrologerRegisteredPujaHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, 
  payload 
} as const);

export const setUserAstrologerRegisteredPujaHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, 
  payload 
} as const);

export const getUserAstrologerAssignedPujaHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_ASSIGNED_PUJA_HISTORY, 
  payload 
} as const);

export const setUserAstrologerAssignedPujaHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_ASSIGNED_PUJA_HISTORY, 
  payload 
} as const);

export const getUserAstrologerBookedPujaHistory = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, 
  payload 
} as const);

export const setUserAstrologerBookedPujaHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, 
  payload 
} as const);

export const completeBookedPujaHistory = (payload: UserPayload) => ({ 
  type: actionTypes.COMPLETE_BOOKED_PUJA_HISTORY, 
  payload 
} as const);

export const getUserAstrologerConsultationHistory = (payload: AstrologerByIdPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_CONSULTATION_HISTORY, 
  payload 
} as const);

export const setUserAstrologerConsultationHistory = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_CONSULTATION_HISTORY, 
  payload 
} as const);

// Consultation Slot Actions
export const getSlotDuration = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_SLOT_DURATION, 
  payload 
} as const);

export const setSlotDuration = (payload: UserPayload) => ({ 
  type: actionTypes.SET_SLOT_DURATION, 
  payload 
} as const);

export const createUserAstrologerSlots = (payload: SlotPayload) => ({ 
  type: actionTypes.CREATE_USER_ASTROLOGER_SLOTS, 
  payload 
} as const);

export const getUserAstrologerSlotDate = (payload: SlotPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_SLOT_DATE, 
  payload 
} as const);

export const setUserAstrologerSlotDate = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_SLOT_DATE, 
  payload 
} as const);

export const getUserAstrologerSlotTimeByDate = (payload: SlotPayload) => ({ 
  type: actionTypes.GET_USER_ASTROLOGER_SLOT_TIME_BY_DATE, 
  payload 
} as const);

export const setUserAstrologerSlotTimeByDate = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_ASTROLOGER_SLOT_TIME_BY_DATE, 
  payload 
} as const);

export const toggleUserAstrologerSlotStatus = (payload: UserPayload) => ({ 
  type: actionTypes.TOGGLE_USER_ASTROLOGER_SLOT_STATUS, 
  payload 
} as const);

// Predefined Messages
export const getUserQueuePredefinedMessage = (payload?: UserPayload) => ({ 
  type: actionTypes.GET_USER_QUEUE_PREDEFINED_MESSAGE, 
  payload 
} as const);

export const setUserQueuePredefinedMessage = (payload: UserPayload) => ({ 
  type: actionTypes.SET_USER_QUEUE_PREDEFINED_MESSAGE, 
  payload 
} as const);

// Action type unions for type safety
export type UserActionTypes = 
  | ReturnType<typeof getUserCustomerById>
  | ReturnType<typeof setUserCustomerById>
  | ReturnType<typeof getSlotDuration>
  | ReturnType<typeof setSlotDuration>
  // Add other action types as needed
  ;
