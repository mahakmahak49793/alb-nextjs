// Path: src/redux/reducers/commonReducer.ts
import * as actionTypes from "@/redux/action-types";

// Define the state interface
interface CommonState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  textModalData: any | null; // Replace 'any' with a specific type if known
  textModalIsOpen: boolean;
}

// Define action interface for type safety
interface CommonAction {
  type: string;
  payload?: any; // Replace 'any' with specific types if known
}

// Initial state with type annotation
const initialState: CommonState = {
  isLoading: false,
  isSidebarOpen: true,
  textModalData: null,
  textModalIsOpen: false,
};

// Reducer with TypeScript
const commonReducer = (state = initialState, action: CommonAction): CommonState => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: payload };

    case actionTypes.SET_IS_SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: payload };

    case actionTypes.OPEN_TEXT_MODAL:
      return { ...state, textModalIsOpen: true, textModalData: payload };

    case actionTypes.CLOSE_TEXT_MODAL:
      return { ...state, textModalIsOpen: false, textModalData: null };

    default:
      return state;
  }
};

export default commonReducer;