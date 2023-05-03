import {
  URL_GENERATION_REQUEST,
  URL_GENERATION_SUCCESS,
  URL_GENERATION_FAILED,
  TINYURL_REQUEST,
  TINYURL_SUCCESS,
  TINYURL_FAILED,
  NEW_REQUEST,
} from "./actionType";
import axios from "axios";

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

function handleURLGeneration(urlData) {
  console.log(urlData);
  return async (dispatch, getState) => {
    try {
      dispatch(url_generation_request());
      const url = "https://rps-sh-tinyurl-backend.vercel.app/newrequest";
      const obj = {
        method: "post",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        data: urlData,
      };

      let fetchData = await axios.post(url, obj);
      console.log(fetchData.data);
      dispatch(url_generation_success(fetchData.data));
    } catch (error) {
      await dispatch(url_generation_failed());
    }
  };
}

function handleTinyURLRedirect(urlData) {
  return async (dispatch, getState) => {
    try {
      dispatch(tinyurl_request());
      const url = `https://rps-sh-tinyurl-backend.vercel.app/${urlData}`;

      let fetchData = await axios.get(url);

      dispatch(tinyurl_success());
      window.location.replace(fetchData.data);
    } catch (error) {
      await dispatch(tinyurl_failed());
    }
  };
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
};
