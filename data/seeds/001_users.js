const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      id: 1,
      username: "username",
      password: bcrypt.hashSync("password", 10),
      department: "finance"
    },
    {
      id: 2,
      username: "username1",
      password: bcrypt.hashSync("password", 10),
      department: "finance"
    },
    {
      id: 3,
      username: "username2",
      password: bcrypt.hashSync("password", 10),
      department: "finance"
    },
    {
      id: 4,
      username: "username3",
      password: bcrypt.hashSync("password", 10),
      department: "healthcare"
    },
    {
      id: 5,
      username: "username4",
      password: bcrypt.hashSync("password", 10),
      department: "healthcare"
    },
    {
      id: 6,
      username: "username5",
      password: bcrypt.hashSync("password", 10),
      department: "healthcare"
    }
  ]);
};
