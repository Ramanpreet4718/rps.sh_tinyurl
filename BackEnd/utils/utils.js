const config = require("../config/config");
const jwt = require("jsonwebtoken");

let utils = {
    IS_EMPTY:isEmpty,
    GENERATE_AUTH_TOKEN:generateAuthToken,
    VERIFY_TOKEN:verifyToken,
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


module.exports = utils