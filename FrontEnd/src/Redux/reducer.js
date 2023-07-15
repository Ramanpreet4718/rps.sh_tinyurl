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
  SIGNUP_FAILED,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNOUT_SUCCESS,
  URL_LIST_SUCCESS,
  URL_LIST_FAILED
} from "./actionType";

const initialState = {
  token: "",
  isAuth: false,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  tinyUrl: "",
  redirectUrl: "",
  openDrawer: false,
  drawerType: "",
  username: "",
  userURLList: []
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
        openDrawer: action.open,
        drawerType: action.page
      };

    case SIGNUP_REQUEST:
      return { ...state, isLoading: true };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        drawerType: "signIn",
      };

    case SIGNUP_FAILED:
      return { ...state, isLoading: false, isError: true, message: action.payload.message };

    case SIGNIN_REQUEST:
      return { ...state, isLoading: true };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        isLoading: false,
        message: action.payload.message,
        drawerType: "",
        openDrawer: false,
        username: action.payload.data.name
      };

    case SIGNIN_FAILED:
      return { ...state, isLoading: false, isError: true, message: action.payload.message };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        token: "",
        isAuth: false,
        isLoading: false,
        message: "Successfully Signed out",
        drawerType: "",
        openDrawer: false,
        username: "",
        userURLList: []
      };

    case URL_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userURLList: action.payload,
      };

    case URL_LIST_FAILED:
      return { ...state, isLoading: false, isError: true, message: action.payload.message };

    default:
      return state;
  }
}
