const browserSync = require("browser-sync");
const data = require("gulp-data");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const handleErrors = require("../lib/handleErrors");
const projectPath = require("../lib/projectPath");
const htmlmin = require("gulp-htmlmin");
const path = require("path");
const pug = require("gulp-pug");
const emitty = require("emitty").setup(
  path.join(PATH_CONFIG.src, PATH_CONFIG.html.src),
  "pug"
);

const htmlTask = () => {
  const exclude =
    "!" +
    path.resolve(
      PATH_CONFIG.src,
      PATH_CONFIG.html.src,
      "**/{" + TASK_CONFIG.html.excludeFolders.join(",") + "}/**"
    );

  const paths = {
    src: [
      path.resolve(
        PATH_CONFIG.src,
        PATH_CONFIG.html.src,
        `pages/*.${TASK_CONFIG.html.extensions}`
      ),
      exclude
    ],
    dest: path.resolve(PATH_CONFIG.dest, PATH_CONFIG.html.dest)
  };

  return new Promise((resolve, reject) => {
    emitty.scan(global.emittyChangedFile).then(() => {
      gulp
        .src(paths.src)
        .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
        .pipe(pug(TASK_CONFIG.html.pugOptions))
        .on("error", handleErrors)
        .pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream())
        .on("finish", resolve)
        .on("error", reject);
    });
  });
};

const { alternateTask = () => htmlTask } = TASK_CONFIG.html;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);

if (!TASK_CONFIG.html) {
  module.exports = done => done();
} else {
  module.exports = htmlTask;
}
