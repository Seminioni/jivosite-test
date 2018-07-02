const gulp = require("gulp");

const getEnabledTasks = require("../lib/getEnabledTasks");
const removeFalsyTasks = require("../lib/removeFalsyTasks");

const htmlTask = require("./html");
const cleanTask = require("./clean");
const fontsTask = require("./fonts");
const watchTask = require("./watch");
const staticTask = require("./static");
const imagesTask = require("./images");
const svgSpriteTask = require("./svgSprite");
const pngSpriteTask = require("./pngSprite");
const browserSyncTask = require("./browserSync");
const stylesheetsTask = require("./stylesheets");

const getProductionTasks = require("./production");

const sizeReportTask = require("./sizeReport");
const replaceFilesTask = require("./replaceFiles");
const webpackProductionTask = require("./webpackProduction");

const getDevelopmentTasks = function() {
  const tasks = getEnabledTasks("watch");
  const static = TASK_CONFIG.static ? "static" : false;
  const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.development;

  return removeFalsyTasks([
    "clean",
    prebuild,
    tasks.assetTasks,
    tasks.codeTasks,
    static,
    postbuild,
    "watch"
  ]);
};

gulp.task("clean", cleanTask);
gulp.task("fonts", fontsTask);
gulp.task("static", staticTask);
gulp.task("images", imagesTask);
gulp.task("svgSprite", svgSpriteTask);
gulp.task("pngSprite", pngSpriteTask);

gulp.task("html", htmlTask);
gulp.task("stylesheets", stylesheetsTask);

gulp.task("browserSync", browserSyncTask);
gulp.task("watch", gulp.parallel(watchTask, "browserSync"));

gulp.task("default", gulp.series(getDevelopmentTasks()));

if (process.env.NODE_ENV === "production") {
  gulp.task("sizeReport", sizeReportTask);
  gulp.task("replaceFiles", replaceFilesTask);
  gulp.task("webpack:production", webpackProductionTask);

  gulp.task("build", gulp.series(getProductionTasks()));
}
