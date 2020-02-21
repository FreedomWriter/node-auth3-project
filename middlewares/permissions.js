const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = department => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secrets.jwt, (err, payload) => {
        if (err) {
          res.status(403).json({ message: "You are not authorized" });
        } else {
          if (department !== payload.userDepartment) {
            res.status(403).json({
              message: "You are not do not have permission for this endpoint."
            });
          } else {
            req.userDepartment = payload.userDepartment;
            next();
          }
        }
      });
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
  };
};
