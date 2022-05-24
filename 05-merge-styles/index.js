let fs = require("fs");
const path = require("path");
function append(f) {
  fs.appendFile(`05-merge-styles/project-dist/bundle.css`, f, (e) => "");
}
fs.writeFile(`05-merge-styles/project-dist/bundle.css`, "", function (err) {
  fs.readdir(
    `05-merge-styles/styles`,
    { withFileTypes: true },

    (err, files) => {
      for (let i = 0; i < files.length; i++) {
        if (path.extname(`05-merge-styles/styles/${files[i].name}`) == ".css") {
          fs.readFile(
            `05-merge-styles/styles/${files[i].name}`,
            "utf8",
            function (error, fileContent) {
              append(fileContent);
            }
          );
        }
      }
    }
  );
  console.log("Стили собраны");
});
