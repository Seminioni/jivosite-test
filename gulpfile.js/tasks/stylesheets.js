const gulp = require("gulp");
const gulpif = require("gulp-if");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const handleErrors = require("../lib/handleErrors");
const path = require("path");
const postcss = require("gulp-postcss");
const emitty = require("emitty").setup(
  path.join(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src),
  "scss"
);

const sassTask = function() {
  const paths = {
    src: path.resolve(
      PATH_CONFIG.src,
      PATH_CONFIG.stylesheets.src,
      "**/*.{" + TASK_CONFIG.stylesheets.extensions + "}"
    ),
    dest: path.resolve(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
  };

  if (
    TASK_CONFIG.stylesheets.sass &&
    TASK_CONFIG.stylesheets.sass.includePaths
  ) {
    TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(
      function(includePath) {
        return path.resolve(process.env.PWD, includePath);
      }
    );
  }

  return new Promise((resolve, reject) => {
    emitty.scan(global.emittyChangedFile).then(() => {
      gulp
        .src(paths.src)
        .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
        .pipe(gulpif(!global.production, sourcemaps.init()))
        .pipe(sass(TASK_CONFIG.stylesheets.sass))
        .on("error", handleErrors)
        .pipe(postcss())
        .pipe(gulpif(!global.production, sourcemaps.write()))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream())
        .on("finish", resolve)
        .on("error", reject);
    });
  });
};

const { alternateTask = () => sassTask } = TASK_CONFIG.stylesheets;
const stylesheetsTask = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);

if (!TASK_CONFIG.stylesheets) {
  module.exports = done => done();
} else {
  module.exports = stylesheetsTask;
}
