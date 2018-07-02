const gulp = require("gulp");
const path = require("path");
const watch = require("gulp-watch");

const watchTask = function() {
  global.watch = true;

  const watchableTasks = [
    "fonts",
    "images",
    "svgSprite",
    "html",
    "stylesheets",
    "static",
    "pngSprite"
  ];

  function getTaskPathFor(taskName) {
    switch (taskName) {
      case "svgSprite":
        return PATH_CONFIG.icons.svg;
      case "pngSprite":
        return PATH_CONFIG.icons.png;
      case "html":
        return PATH_CONFIG.html;
      case "static":
        return PATH_CONFIG.static;
      default:
        return PATH_CONFIG[taskName];
    }
  }

  // TODO: переписать байндинг вотчера для файлов: вынести логику из forEach и оставить только gulp.watch
  watchableTasks.forEach(function(taskName) {
    let srcPath,
      globPatter = undefined;
    const taskConfig = TASK_CONFIG[taskName];
    const taskPath = getTaskPathFor(taskName);

    try {
      srcPath = path.join(PATH_CONFIG.src, taskPath.src);

      globPattern =
        "**/*" +
        (taskConfig.extensions
          ? taskConfig.extensions.length > 1
            ? `.{${taskConfig.extensions.join(",")}}`
            : `.${taskConfig.extensions}`
          : "");
    } catch (e) {
      throw Error(e.message);
    }

    gulp
      .watch(path.join(srcPath, globPattern), gulp.series(taskName))
      .on("all", (events, filepath) => {
        global.emittyChangedFile = filepath;
      });
  });
};

module.exports = watchTask;
