module.exports = {
  html: true,
  images: true,
  fonts: true,
  static: false,
  svgSprite: true,
  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    }
  },
  svgSprite: {
    svgstore: {}
  },
  stylesheets: {
    sass: {
      includePaths: [
        './node_modules/sass-burger'
      ]
    }
  },

  browserSync: {
    open: false,
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: "public"
    }
  },

  production: {
    rev: false
  }
};
