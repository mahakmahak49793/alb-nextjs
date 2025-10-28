import * as actionTypes from "@/redux/action-types";

export const getDashboard = (payload?: any) => ({
  type: actionTypes.GET_DASHBOARD, 
  payload
});

export const setDashboard = (payload: any) => ({
  type: actionTypes.SET_DASHBOARD, 
  payload
});

export const getRechargeReport = (payload?: any) => ({
  type: actionTypes.GET_RECHARGE_REPORT, 
  payload
});

export const setRechargeReport = (payload: any) => ({
  type: actionTypes.SET_RECHARGE_REPORT, 
  payload
});

export const getServiceUsedReport = (payload?: any) => ({
  type: actionTypes.GET_SERVICE_USED_REPORT, 
  payload
});

export const setServiceUsedReport = (payload: any) => ({
  type: actionTypes.SET_SERVICE_USED_REPORT, 
  payload
});

export const getEarningReport = (payload?: any) => ({
  type: actionTypes.GET_EARNING_REPORT, 
  payload
});

export const setEarningReport = (payload: any) => ({
  type: actionTypes.SET_EARNING_REPORT, 
  payload
});