import {
  URL_GENERATION_REQUEST,
  URL_GENERATION_SUCCESS,
  URL_GENERATION_FAILED,
  TINYURL_REQUEST,
  TINYURL_SUCCESS,
  TINYURL_FAILED,
  NEW_REQUEST,
  TOGGLE_DRAWER,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from "./actionType";

const initialState = {
  isAuth:false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message:"",
  tinyUrl: "",
  redirectUrl: "",
  openDrawer:false,
  drawerType:"",
  name:"",
  user_id:"",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case URL_GENERATION_REQUEST:
      return { ...state, isLoading: true };
    case URL_GENERATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        tinyUrl: action.payload.tinyUrl,
        redirectUrl: action.payload.redirectUrl,
      };
    case URL_GENERATION_FAILED:
      return { ...state, isLoading: false, isError: true };

    case TINYURL_REQUEST:
      return { ...state, isLoading: true };

    case TINYURL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case TINYURL_FAILED:
      return { ...state, isLoading: false, isError: true };

    case NEW_REQUEST:
      return {
        ...state,
        ...initialState,
      };
    
    case TOGGLE_DRAWER:
      return {
        ...state,
        openDrawer:action.open,
        drawerType:action.page
      };
      
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true };

    case   SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading:false,
        message:action.payload.message,
        drawerType:"signIn",
      };

    case   SIGNUP_FAILED:
      return { ...state, isLoading: false, isError: true, message:action.payload.message };

    default:
      return state;
  }
}
