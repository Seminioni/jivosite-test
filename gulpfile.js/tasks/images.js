const browserSync = require("browser-sync");
const changed = require("gulp-changed");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const path = require("path");
const imagemin = require("gulp-imagemin");

const imagesTask = function() {
  const paths = {
    src: path.resolve(
      process.env.PWD,
      PATH_CONFIG.src,
      PATH_CONFIG.images.src,
      "{content,general}/*.{" + TASK_CONFIG.images.extensions + "}"
    ),
    dest: path.resolve(
      process.env.PWD,
      PATH_CONFIG.dest,
      PATH_CONFIG.images.dest
    )
  };

  return gulp
    .src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(
      gulpif(
        global.production,
        imagemin([
          imagemin.gifsicle({
            interlaced: true,
            optimizationLevel: 3
          }),
          require("imagemin-jpeg-recompress")({
            progressive: true,
            max: 80,
            min: 70
          }),
          require("imagemin-pngquant")({ quality: "75-85" }),
          imagemin.svgo({
            plugins: [{ removeViewBox: false }]
          })
        ])
      )
    )
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

if (!TASK_CONFIG.images) {
  module.exports = done => done;
} else {
  module.exports = imagesTask;
}
