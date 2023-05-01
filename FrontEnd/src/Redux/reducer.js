import {
  URL_GENERATION_REQUEST,
  URL_GENERATION_SUCCESS,
  URL_GENERATION_FAILED,
  TINYURL_REQUEST,
  TINYURL_SUCCESS,
  TINYURL_FAILED,
} from "./actionType";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: true,
  tinyUrl: "",
  redirectUrl: "",
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

    default:
      return state;
  }
}
