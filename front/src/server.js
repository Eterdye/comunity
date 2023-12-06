let sv = require("node:http");

let server = sv.createServer((req, res) => {
  console.log("respuesta");

  res.end("final");
});

server.listen(3500, () => {});
