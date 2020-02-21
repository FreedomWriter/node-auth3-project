const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");
const db = require("./users-model");
const permissions = require("../middlewares/permissions");

function genToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      userDepartment: user.department
    },
    secrets.jwt,
    {
      expiresIn: "5h"
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

router.post("/login", async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await db.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = await genToken(user);
      res.status(201).json({
        message: `Welcome ${user.username}`,
        token: token,
        department: user.department
      });
    } else {
      res.status(401).json({ message: "You shall not pass!" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", permissions("finance"), async (req, res, next) => {
  try {
    const users = await db.find().where("department", req.userDepartment);
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
