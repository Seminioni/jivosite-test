const browserSync = require("browser-sync");
const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const path = require("path");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const errorHandler = require("../lib/handleErrors");

const svgSpriteTask = function() {
  const settings = {
    src: path.resolve(
      process.env.PWD,
      PATH_CONFIG.src,
      PATH_CONFIG.icons.svg.src,
      "*.svg"
    ),
    dest: path.resolve(
      process.env.PWD,
      PATH_CONFIG.dest,
      PATH_CONFIG.icons.svg.dest
    )
  };

  return gulp
    .src(settings.src)
    .pipe(plumber(errorHandler))
    .pipe(svgstore(TASK_CONFIG.svgSprite.svgstore))
    .pipe(rename("svgSprite.svg"))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
};

const { alternateTask = () => svgSpriteTask } = TASK_CONFIG.svgSprite;
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG);

if (!TASK_CONFIG.svgSprite) {
  module.exports = done => done();
} else {
  module.exports = task;
}
