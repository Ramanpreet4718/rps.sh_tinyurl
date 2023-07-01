const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../db/user.model");

let utils = {
    IS_EMPTY:isEmpty,
    GENERATE_AUTH_TOKEN:generateAuthToken,
    VERIFY_TOKEN:verifyToken,
    IS_SIGNED_IN:isSignedIn,
    GET_USER_BY_ID: getUserbyID,
};

function isEmpty(data){
    return data === undefined || data === ""; 
}

function generateAuthToken(user) {
        let payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        };
    return jwt.sign(payload, config.JWT_SECRET);
}

function verifyToken(token) {
    const payload = jwt.verify(token, config.JWT_SECRET);

    return payload;
}

async function isSignedIn(data){
    try {
        let token = data.split(" ").pop();
        let details = this.VERIFY_TOKEN(token);
        let user = await this.GET_USER_BY_ID(details.id);
        if(user){
            return 200;
        }
        return 406
    } catch (error) {
        return 406;
    }
}

async function getUserbyID(id){
    try {
        let user =  await User.findById(id);
        return user;
    } catch (error) {
        return "";
    }
}

module.exports = utils