import { useEffect, useState } from "react";
import { constant } from "./constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../Redux/store";

function isEmpty(data) {
    return data === undefined || data === ""
}

async function HTTPPost(endPoint, dataObj) {
    let url = constant.BACKEND_URL_LOCAL;
    url = url + endPoint
    let storeData = store.getState()

    const obj = {
        method: "post",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
            'authorization': `Bearer ${storeData.token}`
        },
        data: dataObj,
    };

    let data = await axios.post(url, obj);
    return data;
}

function dateFormatter(str) {
    let date = new Date(str);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let finalDate = `${day}/${month}/${year}`
    return finalDate
}

export { isEmpty, HTTPPost, dateFormatter };