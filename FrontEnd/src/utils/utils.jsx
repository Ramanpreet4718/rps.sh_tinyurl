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
        },
        data: dataObj,
    };

    let data = await axios.post(url, obj);
    return data;
}

export { isEmpty, HTTPPost };