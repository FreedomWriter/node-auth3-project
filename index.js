require("dotenv").config();

const server = require("server");

const port = process.env.PORT || "development";

server.listen(port, () =>
  console.log(`\n *** Server listening on http://localhost:${port} *** \n`)
);
