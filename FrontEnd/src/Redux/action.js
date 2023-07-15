import { constant } from "../utils/constants";
import { HTTPPost } from "../utils/utils";
import { toast } from "react-toastify";
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
import axios from "axios";
import { store } from "./store";

function url_generation_request() {
  return {
    type: URL_GENERATION_REQUEST,
  };
}

function url_generation_success(payload) {
  return {
    type: URL_GENERATION_SUCCESS,
    payload: payload,
  };
}

function url_generation_failed() {
  return {
    type: URL_GENERATION_FAILED,
  };
}

function tinyurl_request() {
  return {
    type: TINYURL_REQUEST,
  };
}

function tinyurl_success() {
  return {
    type: TINYURL_SUCCESS,
  };
}

function tinyurl_failed() {
  return {
    type: TINYURL_FAILED,
  };
}

function new_request() {
  return {
    type: NEW_REQUEST,
  };
}

function toggle_drawer(open, page = "") {
  return {
    type: TOGGLE_DRAWER,
    open: open,
    page: page,
  };
}

function signup_request() {
  return {
    type: SIGNUP_REQUEST,
  };
}

function signup_success(payload) {
  return {
    type: SIGNUP_SUCCESS,
    payload
  };
}

function signup_failed(payload) {
  return {
    type: SIGNUP_FAILED,
    payload
  };
}

function signin_request() {
  return {
    type: SIGNIN_REQUEST,
  };
}

function signin_success(payload) {
  return {
    type: SIGNIN_SUCCESS,
    payload
  };
}

function signin_failed(payload) {
  return {
    type: SIGNIN_FAILED,
    payload
  };
}

function signout_success() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

function url_list_success(payload) {
  return {
    type: URL_LIST_SUCCESS,
    payload
  };
}

function url_list_failed(payload) {
  return {
    type: URL_LIST_FAILED,
    payload
  };
}

function handleURLGeneration(urlData) {
  return async (dispatch, getState) => {
    try {
      dispatch(url_generation_request());
      let fetchData = await HTTPPost(constant.NEW_REQUEST, urlData);
      console.log(fetchData);
      dispatch(url_generation_success(fetchData.data));
    } catch (error) {
      console.log(error);
      await dispatch(url_generation_failed());
    }
  };
}

function handleTinyURLRedirect(urlData) {
  return async (dispatch, getState) => {
    try {
      dispatch(tinyurl_request());
      const url = constant.BACKEND_URL_LOCAL + urlData;

      let fetchData = await axios.get(url);

      dispatch(tinyurl_success());
    } catch (error) {
      await dispatch(tinyurl_failed());
    }
  };
}

function toggleDrawer(open, page) {
  return (dispatch) => {
    dispatch(toggle_drawer(open, page));
  };
}

function handleSignUp(userData) {
  return async (dispatch) => {
    try {
      dispatch(signup_request());
      let fetchData = await HTTPPost(constant.SIGNUP, userData);
      if (fetchData.data.statusCode == 200) {
        dispatch(signup_success(fetchData.data));
      }

      toast.success(fetchData.data.message);
    } catch (error) {
      console.log(error.response.data);
      await dispatch(signup_failed(error.response.data));
      toast.error(error.response.data.message);
    }
  };
}

function handleSignIn(userData) {
  return async (dispatch) => {
    try {
      dispatch(signin_request());
      console.log(userData);

      let fetchData = await HTTPPost(constant.SIGNIN, userData);

      if (fetchData.data.statusCode == 200) {
        dispatch(signin_success(fetchData.data));
        await getUrlList(fetchData.data.data.id);
      }

      toast.success(fetchData.data.message);
    } catch (error) {
      console.log(error);
      await dispatch(signin_failed(error.response.data));
      toast.error(error.response.data.message);
    }
  };
}

async function getUrlList(userId) {
  try {
    console.log(userId);
    let fetchData = await HTTPPost(constant.USER_LIST, { userId });
    console.log(fetchData);

    if (fetchData.data.statusCode == 200) {
      store.dispatch(url_list_success(fetchData.data.list));
    }
  } catch (error) {
    console.log(error);
    store.dispatch(url_list_failed(error.response.data));
  }
}

export {
  url_generation_request,
  url_generation_success,
  url_generation_failed,
  tinyurl_request,
  tinyurl_success,
  tinyurl_failed,
  new_request,
  handleURLGeneration,
  handleTinyURLRedirect,
  toggleDrawer,
  toggle_drawer,
  handleSignUp,
  signup_request,
  signup_success,
  signup_failed,
  signin_request,
  signin_success,
  signin_failed,
  handleSignIn,
  signout_success,
  url_list_success,
  url_list_failed,
  getUrlList
};
