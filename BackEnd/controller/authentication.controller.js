const User = require("../db/user.model")
const bycrpt = require("bcryptjs");
const utils = require("../utils/utils");

async function handleSignUp(req, res) {
  try {
    let { email, password, name } = req.body.data;
    let alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      res.status(409).send({ statusCode: 409, message: "User Already Exist" })
    }

    let user = await User.create({
      name,
      email,
      password: bycrpt.hashSync(password),
    });

    user = user.toJSON();
    delete user.password;
    res.send({ statusCode: 200, message: "Register Successful", user });

  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, message: "Something went wrong" });
  }
}

async function handleSignIn(req, res) {

  let { email, password } = req.body.data;
  let { authorization } = req.body.headers;

  if (utils.IS_EMPTY(authorization) === false) {

    let isLoggedIn = await utils.IS_SIGNED_IN(authorization);

    if (isLoggedIn === 200) {
      return res.status(406).send({
        statusCode: 406,
        message: "User Already Logged In",
      });
    }
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (bycrpt.compareSync(password, user.password)) {
        let data = { name: user.name, email: user.email, id: user._id, }
        return res.send({
          statusCode: 200,
          message: "LogIn Successful",
          data,
          token: utils.GENERATE_AUTH_TOKEN(user),
        });
      } else {
        return res.status(401).send({
          statusCode: 401,
          message: "Invalid login credentials",
        });
      }
    } else {
      return res.status(404).send({ statusCode: 404, message: "User not found" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ statusCode: 500, error: "Something went wrong" });
  }
}

// async function dummy(req,res){
//   let response = await utils.IS_SIGNED_IN(req.headers.authorization)
//   res.send(response);
// }

module.exports = { handleSignUp, handleSignIn };
