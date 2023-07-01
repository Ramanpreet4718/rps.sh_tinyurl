import { useEffect, useState } from "react";
import { constant } from "./constants";
import axios from "axios";

function isEmpty(data) {
    return data === undefined || data === ""
}

async function HTTPPost(endPoint, dataObj) {
    let url = constant.BACKEND_URL_LOCAL;
    url = url + endPoint

    const obj = {
        method: "post",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
            'authorization': `Bearer ${localStorage.getStorageKey(constant.LOGIN_TOKEN)}`
        },
        data: dataObj,
    };

    let data = await axios.post(url, obj);
    return data;
}

let localStorage = {
    storage: window.localStorage,
    setStorageKey: setStorageKey,
    getStorageKey: getStorageKey
}

function setStorageKey(keyName, keyValue) {
    return this.storage.setItem(keyName, keyValue);
}

function getStorageKey(keyName) {
    return this.storage.getItem(keyName) || "";
}

export { isEmpty, HTTPPost, localStorage };