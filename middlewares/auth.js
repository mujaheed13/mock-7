const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req?.headers?.authorization;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }
    req.body.user_id = decoded.id;
    next();  
  });
  
};

module.exports = { authentication };
