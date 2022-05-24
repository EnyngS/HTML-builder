const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;
function copy(f, path) {
  fs.copyFile(
    `06-build-page/${f}`,
    `06-build-page/project-dist/${path}`,
    (err) => {
      if (err) throw err;
      console.log(`${f} Успешно скопированн`);
    }
  );
}

fsPromises
  .mkdir("06-build-page/project-dist", { recursive: true })
  .then(function () {
    fsPromises
      .mkdir(`06-build-page/project-dist/assets`, {
        recursive: true,
      })
      .then(function () {
        fs.readdir(
          "06-build-page/assets",
          { withFileTypes: true },

          (err, files) => {
            for (let j = 0; j < files.length; j++) {
              if (files[j].isDirectory()) {
                fsPromises
                  .mkdir(`06-build-page/project-dist/assets/${files[j].name}`, {
                    recursive: true,
                  })
                  .then(function () {
                    fs.readdir(
                      `06-build-page/assets/${files[j].name}`,
                      { withFileTypes: true },

                      (err, file) => {
                        for (let i = 0; i < file.length; i++) {
                          copy(
                            `assets/${files[j].name}/${file[i].name}`,
                            `assets/${files[j].name}/${file[i].name}`
                          );
                        }
                      }
                    );
                  });
              }
            }
          }
        );
      });
  })
  .catch(function () {
    console.log("Ошибка копирования");
  });

function append(f) {
  fs.appendFile(`06-build-page/project-dist/style.css`, f, (e) => "");
}
fs.writeFile(`06-build-page/project-dist/style.css`, "", function (err) {
  fs.readdir(
    `06-build-page/styles`,
    { withFileTypes: true },

    (err, files) => {
      for (let i = 0; i < files.length; i++) {
        if (path.extname(`06-build-page/styles/${files[i].name}`) == ".css") {
          fs.readFile(
            `06-build-page/styles/${files[i].name}`,
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
fsPromises
  .copyFile(
    `06-build-page/template.html`,
    `06-build-page/project-dist/index.html`
  )
  .then(() => {
    let stream = new fs.ReadStream(`06-build-page/project-dist/index.html`);

    stream.on("readable", function () {
      var data = stream.read();

      fs.readdir(
        `06-build-page/components`,
        { withFileTypes: true },

        (err, files) => {
          for (let i = 0; i < files.length; i++) {
            if (
              path.extname(`06-build-page/components/${files[i].name}`) ==
              ".html"
            ) {
              fs.readFile(
                `06-build-page/components/${files[i].name}`,
                "utf8",
                function (error, fileContent) {
                  let d = `{{${files[i].name.split(".")[0]}}}`;

                  let a = new RegExp(d, "i");

                  data = data ? data.toString().replace(a, fileContent) : "";

                  fs.writeFile(
                    "06-build-page/project-dist/index.html",
                    data.toString(),
                    function (error) {
                      if (error) throw error;
                    }
                  );
                }
              );
            }
          }
        }
      );
    });
    console.log("index.html собран");
  });
