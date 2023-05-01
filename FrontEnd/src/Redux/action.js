import {
  URL_GENERATION_REQUEST,
  URL_GENERATION_SUCCESS,
  URL_GENERATION_FAILED,
  TINYURL_REQUEST,
  TINYURL_SUCCESS,
  TINYURL_FAILED,
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

function tinyurl_success(payload) {
  return {
    type: TINYURL_SUCCESS,
    payload: payload,
  };
}

function tinyurl_failed() {
  return {
    type: TINYURL_FAILED,
  };
}

function handleURLGeneration(urlData) {
  return async (dispatch, getState) => {
    try {
      dispatch(url_generation_request());
      const url = "http://localhost:3000/newrequest";
      const obj = {
        method: "POST",
        body: JSON.stringify(urlData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };

      let fetchData = axios.post(url, obj);
      console.log(fetchData);
      dispatch(url_generation_success(fetchData));
    } catch (error) {
      await dispatch(url_generation_failed());
    }
  };
}

function handleTinyURLGeneration(urlData) {
  return async (dispatch, getState) => {
    try {
      dispatch(tinyurl_request());
      const url = `http://localhost:3000/${urlData}`;

      let fetchData = axios.post(url);
      console.log(fetchData);
      dispatch(tinyurl_success(fetchData));
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
  handleURLGeneration,
  handleTinyURLGeneration,
};
