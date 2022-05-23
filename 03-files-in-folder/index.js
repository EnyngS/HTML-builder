let fs = require("fs");
const path = require("path");
fs.readdir(
  "03-files-in-folder/secret-folder",
  { withFileTypes: true },

  (err, files) => {
    for (let i = 0; i < files.length; i++) {
      if (!files[i].isDirectory()) {
        read(files[i]);
      } else {
        fs.readdir(
          `03-files-in-folder/secret-folder/${files[i].name}`,
          { withFileTypes: true },

          (err, file) => {
            for (let k = 0; k < file.length; k++) {
              read(file[k], files[i].name);
            }
          }
        );
      }
    }
  }
);
function read(file, folder) {
  let name;
  if (folder) {
    name = file.name;
  } else {
    name = file.name.split(".")[0];
  }
  let r = path.extname(
    `03-files-in-folder/secret-folder/${folder ? folder : ""}/${file.name}`
  );
  fs.stat(
    `03-files-in-folder/secret-folder/${folder ? folder : ""}/${file.name}`,
    (err, stats) => {
      console.log(
        name +
          " - " +
          r.slice(1) +
          " - " +
          (stats.size ? stats.size / 1024 : 0) +
          "kB"
      );
    }
  );
}
