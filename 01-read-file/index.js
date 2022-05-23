let fs = require("fs");

const path = require("path");

let p = path.join(__dirname, "text.txt");

let stream = new fs.ReadStream(p);

stream.on("readable", function () {
  let data = stream.read();
  console.log(data ? data.toString() : "");
});
