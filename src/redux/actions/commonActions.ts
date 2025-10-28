
// Common action creators for modals, loading states, and sidebar

import * as actionTypes from '../action-types';

export const openTextModal = (payload: any) => ({
  type: actionTypes.OPEN_TEXT_MODAL,
  payload,
});

export const closeTextModal = () => ({
  type: actionTypes.CLOSE_TEXT_MODAL,
});

export const setIsLoading = (payload: boolean) => ({
  type: actionTypes.SET_IS_LOADING,
  payload,
});

export const setIsSidebarOpen = (payload: boolean) => ({
  type: actionTypes.SET_IS_SIDEBAR_OPEN,
  payload,
});