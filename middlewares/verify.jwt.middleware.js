const config = require("../config/jwt.config.js");
const jwt = require("jsonwebtoken");

let jwtActions = {};

jwtActions.veryfyToken = (req, res, next) => {
  const token = req.body.token || req.headers["x-access-token"];

  if (!token) {
    res.status(403).json({
      message: "No token provided!"
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.keys.secret);
    req.user = decoded;
  }catch (error) {
    res.status(401).json({
      message: "Unauthorized!"
    });
    return;
  }

  next();
};

jwtActions.createToken = (id, email) => {
  return jwt.sign(
    { 
      userId: id, email 
    },
      config.keys.secret,
    {
      expiresIn: config.keys.expiresIn,
    }
  );
};

module.exports = jwtActions;