if (!TASK_CONFIG.pngSprite) return;

const browserSync = require("browser-sync");
const gulp = require("gulp");
const spritesmith = require("gulp.spritesmith");
const path = require("path");
const plumber = require("gulp-plumber");
const errorHandler = require("../lib/handleErrors");

const pngSpriteTask = function() {
  const paths = {
    src: path.resolve(
      process.env.PWD,
      PATH_CONFIG.src,
      PATH_CONFIG.icons.png.src
    ),
    dest: path.resolve(
      process.env.PWD,
      PATH_CONFIG.dest,
      PATH_CONFIG.icons.png.dest
    )
  };

  const spriteData = gulp
    .src(path.resolve(paths.src, "*.png"))
    .pipe(plumber(errorHandler))
    .pipe(
      spritesmith({
        retinaSrcFilter: path.resolve(paths.src, "*@2x.png"),
        imgName: "sprite.png",
        retinaImgName: "sprite@2x.png",
        cssName: "_sprite.scss"
      })
    );

  return new Promise((resolve, reject) => {
    spriteData.img.pipe(gulp.dest(paths.dest));
    spriteData.css.pipe(
      gulp.dest(
        path.resolve(
          process.env.PWD,
          PATH_CONFIG.src,
          PATH_CONFIG.stylesheets.src,
          "utils/sprite"
        )
      )
      .on('finish', resolve)
    );
  });
};

module.exports = pngSpriteTask;
