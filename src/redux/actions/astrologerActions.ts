// redux/actions/astrologerActions.ts
import * as actionTypes from "../actions-types";

// TypeScript interfaces for payloads
export interface AstrologerPayload {
  [key: string]: any;
}

export interface AstrologerByIdPayload {
  astrologerId: string;
  [key: string]: any;
}

export interface FollowPayload {
  customerId: string;
  astrologerId: string;
  action: 'follow' | 'unfollow';
}

export interface SlotPayload {
  astrologerId: string;
  date?: string;
  [key: string]: any;
}

export interface BookConsultationPayload {
  data: {
    consultationPrice: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    consultationType: 'chat' | 'videocall' | 'call';
    [key: string]: any;
  };
  onComplete?: () => void;
  onError?: (error: string) => void;
}

// Live Astrologer Actions
export const getLiveAstrologer = (payload?: AstrologerPayload) => ({ 
  type: actionTypes.GET_LIVE_ASTROLOGER, 
  payload 
} as const);

export const setLiveAstrologer = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_LIVE_ASTROLOGER, 
  payload 
} as const);

// General Astrologer Actions
export const getAstrologer = (payload?: AstrologerPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER, 
  payload 
} as const);

export const setAstrologer = (payload: AstrologerPayload) => ({ // Fixed typo from setAstrolosr
  type: actionTypes.SET_ASTROLOGER, 
  payload 
} as const);

export const getAstrologerById = (payload: AstrologerByIdPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_BY_ID, 
  payload 
} as const);

export const setAstrologerById = (payload: AstrologerPayload | null) => ({ 
  type: actionTypes.SET_ASTROLOGER_BY_ID, 
  payload 
} as const);

// Review Actions
export const getAstrologerReviewById = (payload: AstrologerByIdPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_REVIEW_BY_ID, 
  payload 
} as const);

export const setAstrologerReviewById = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, 
  payload 
} as const);

// Skill Actions
export const getAstrologerSkill = (payload?: AstrologerPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_SKILL, 
  payload 
} as const);

export const setAstrologerSkill = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_SKILL, 
  payload 
} as const);

// Main Expertise Actions
export const getAstrologerMainExpertise = (payload?: AstrologerPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_MAIN_EXPERTISE, 
  payload 
} as const);

export const setAstrologerMainExpertise = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_MAIN_EXPERTISE, 
  payload 
} as const);

// Follow/Unfollow Actions
export const followUnfollowAstrologer = (payload: FollowPayload) => ({ 
  type: actionTypes.FOLLOW_UNFOLLOW_ASTROLOGER, 
  payload 
} as const);

export const getAstrologerFollowedStatusByCustomer = (payload: AstrologerPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, 
  payload 
} as const);

export const setAstrologerFollowedStatusByCustomer = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER, 
  payload 
} as const);

// Consultation Slot Actions
export const getAstrologerSlotDate = (payload: SlotPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_SLOT_DATE, 
  payload 
} as const);

export const setAstrologerSlotDate = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_SLOT_DATE, 
  payload 
} as const);

export const getAstrologerSlotTimeByDate = (payload: SlotPayload) => ({ 
  type: actionTypes.GET_ASTROLOGER_SLOT_TIME_BY_DATE, 
  payload 
} as const);

export const setAstrologerSlotTimeByDate = (payload: AstrologerPayload) => ({ 
  type: actionTypes.SET_ASTROLOGER_SLOT_TIME_BY_DATE, 
  payload 
} as const);

export const bookConsultation = (payload: BookConsultationPayload) => ({ 
  type: actionTypes.BOOK_CONSULTATION, 
  payload 
} as const);


// Action type unions for type safety
export type AstrologerActionTypes = 
  | ReturnType<typeof getLiveAstrologer>
  | ReturnType<typeof setLiveAstrologer>
  | ReturnType<typeof getAstrologer>
  | ReturnType<typeof setAstrologer>
  | ReturnType<typeof getAstrologerById>
  | ReturnType<typeof setAstrologerById>
  | ReturnType<typeof getAstrologerReviewById>
  | ReturnType<typeof setAstrologerReviewById>
  | ReturnType<typeof getAstrologerSkill>
  | ReturnType<typeof setAstrologerSkill>
  | ReturnType<typeof getAstrologerMainExpertise>
  | ReturnType<typeof setAstrologerMainExpertise>
  | ReturnType<typeof followUnfollowAstrologer>
  | ReturnType<typeof getAstrologerFollowedStatusByCustomer>
  | ReturnType<typeof setAstrologerFollowedStatusByCustomer>
  | ReturnType<typeof getAstrologerSlotDate>
  | ReturnType<typeof setAstrologerSlotDate>
  | ReturnType<typeof getAstrologerSlotTimeByDate>
  | ReturnType<typeof setAstrologerSlotTimeByDate>
  | ReturnType<typeof bookConsultation>;
