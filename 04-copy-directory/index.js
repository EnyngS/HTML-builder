const fs = require("fs");
const fsPromises = fs.promises;
function copy(f) {
  fs.copyFile(
    `04-copy-directory/files/${f}`,
    `04-copy-directory/files-copy/${f}`,
    (err) => {
      if (err) throw err;
      console.log(`${f} Успешно скопированн`);
    }
  );
}

fsPromises
  .mkdir("04-copy-directory/files-copy", { recursive: true })
  .then(function () {
    fs.readdir(
      "04-copy-directory/files",
      { withFileTypes: true },

      (err, files) => {
        for (let i = 0; i < files.length; i++) {
          copy(files[i].name);
        }
      }
    );
  })
  .catch(function () {
    console.log("Ошибка копирования");
  });
