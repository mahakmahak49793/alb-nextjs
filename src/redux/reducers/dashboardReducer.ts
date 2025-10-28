import * as actionTypes from "@/redux/action-types";

interface DashboardState {
  dashboardData: any;
  rechargeReportData: any;
  serviceUsedReportData: any;
  earningReportData: any;
}

interface DashboardAction {
  type: string;
  payload?: any;
}

const initialState: DashboardState = {
  dashboardData: {},
  rechargeReportData: null,
  serviceUsedReportData: null,
  earningReportData: null,
};

const dashboardReducer = (state = initialState, actions: DashboardAction): DashboardState => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_DASHBOARD:
      return { ...state, dashboardData: payload };

    case actionTypes.SET_RECHARGE_REPORT:
      return { ...state, rechargeReportData: payload };

    case actionTypes.SET_SERVICE_USED_REPORT:
      return { ...state, serviceUsedReportData: payload };

    case actionTypes.SET_EARNING_REPORT:
      return { ...state, earningReportData: payload };

    default:
      return state;
  }
};

export default dashboardReducer;