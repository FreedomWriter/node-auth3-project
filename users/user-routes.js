const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");
const db = require("./users-model");

function genToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      userDepartment: user.department
    },
    secrets.jwt,
    {
      expiresIn: "5m"
    }
  );
}

router.post("/register", async (req, res, next) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const newUser = await db.add(user);
    const token = await genToken(newUser);
    res.status(201).json({
      message: `Welcome ${user.username}`,
      token: token,
      department: user.department
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
