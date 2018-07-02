const os = require("os");
const path = require("path");
const projectPath = require("../lib/projectPath");

const pkg = require(projectPath(process.env.PWD, "package.json"));

module.exports = {
  javascripts: {
    extensions: ["js", "jsx"],
    hot: {
      reload: true,
      noInfo: false,
      quiet: true,
      react: false
    },
    devtool: "eval-cheap-module-source-map",
    babelLoader: {
      // "test" is derived from TASK_CONFIG.javascripts.extensions
      // "options" is derived from TASK_CONFIG.javascripts.babel
      loader: "babel-loader",
      exclude: /node_modules/
    },
    babel: {

    },
    development: {},
    production: {
      devtool: false,
      uglifyJsPlugin: {},
      definePlugin: {
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }
    }
  },

  stylesheets: {
    sass: {
      includePaths: ["./node_modules"]
    },
    extensions: ["sass", "scss", "css"]
  },

  html: {
    dataFile: "data/global.json",
    pugOptions: {
      pretty: true
    },
    excludeFolders: ["layouts", "shared", "macros", "data"],
    extensions: ["pug"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  svgSprite: {
    svgstore: {}
  },

  pngSprite: {},

  production: {
    rev: true
  },

  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      // gulp.task('myTask', function() { })
    },
    development: {
      prebuild: null,
      postbuild: null
    },
    production: {
      prebuild: null,
      postbuild: null
    }
  }
};
