import * as actionTypes from "../actions-types";

const initialState = {
    liveAstrologerData: [],
    astrologerData: [],
    astrologerDataById: [],
    astrologerReviewDataById: [],
    astrologerSkillData: [],
    astrologerMainExpertiseData: [],
    astrologerFollowedStatusByCustomer: null,

    //* Consultation
    astrologerSlotDateData: [],
    astrologerSlotTimeByDateData: {},
    userAstrologerDataById: null
};

const astrologerReducer = (state = initialState, actions:any) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_LIVE_ASTROLOGER:
            return { ...state, liveAstrologerData: payload };

        case actionTypes.SET_ASTROLOGER:
            return { ...state, astrologerData: payload };

        case actionTypes.SET_ASTROLOGER_BY_ID:
            return { ...state, astrologerDataById: payload };

        case actionTypes.SET_ASTROLOGER_REVIEW_BY_ID:
            return { ...state, astrologerReviewDataById: payload };

        case actionTypes.SET_ASTROLOGER_SKILL:
            return { ...state, astrologerSkillData: payload };

        case actionTypes.SET_ASTROLOGER_MAIN_EXPERTISE:
            return { ...state, astrologerMainExpertiseData: payload };

        case actionTypes.SET_ASTROLOGER_FOLLOWED_STATUS_BY_CUSTOMER:
            return { ...state, astrologerFollowedStatusByCustomer: payload };

        case actionTypes.SET_USER_ASTROLOGER_BY_ID:
            return { ...state, userAstrologerDataById: payload };

        //* Consultation
        case actionTypes.SET_ASTROLOGER_SLOT_DATE:
            return { ...state, astrologerSlotDateData: payload };

        case actionTypes.SET_ASTROLOGER_SLOT_TIME_BY_DATE:
            return { ...state, astrologerSlotTimeByDateData: payload };

        default:
            return state;
    }
};

export default astrologerReducer;