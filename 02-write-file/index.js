let fs = require("fs");

function input(n) {
  fs.writeFile("02-write-file/file.txt", n, function (error) {
    if (error) throw error;
  });
}
function append(n) {
  fs.appendFile("02-write-file/file.txt", n, function (err) {
    if (err) throw err;
  });
}
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.question(`Введите данные \n`, (data) => {
  if (data == "exit") {
    readline.close();
  }
  input(data);
});
readline.on("line", (data) => {
  if (data == "exit") {
    readline.close();
  }
  append(data);
});

readline.on("close", () => {
  console.log("Удачи!");
});
