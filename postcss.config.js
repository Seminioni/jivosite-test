let plugins = [
  require("postcss-flexbugs-fixes")({}),
  require("postcss-normalize")({
    allowDuplicates: true
  }),
  require("postcss-cssnext")({}),
  require("postcss-font-magician")({
    custom: {
      BrandonText: {
        variants: {
          normal: {
            400: {
              url: {
                woff2: "../fonts/BrandonText/BrandonText-Medium.woff2",
                woff: "../fonts/BrandonText/BrandonText-Medium.woff",
                ttf: "../fonts/BrandonText/BrandonText-Medium.ttf"
              }
            },
            600: {
              url: {
                woff2: "../fonts/BrandonText/BrandonText-Bold.woff2",
                woff: "../fonts/BrandonText/BrandonText-Bold.woff",
                ttf: "../fonts/BrandonText/BrandonText-Bold.ttf"
              }
            }
          },

        }
      },
      Circe: {
        variants: {
          normal: {
            300: {
              url: {
                woff2: "../fonts/Circe/Circe-Light.woff2",
                woff: "../fonts/Circe/Circe-Light.woff",
                ttf: "../fonts/Circe/Circe-Light.ttf",
              }
            },
            700: {
              url: {
                woff2: "../fonts/Circe/Circe-Bold.woff2",
                woff: "../fonts/Circe/Circe-Bold.woff",
                ttf: "../fonts/Circe/Circe-Bold.ttf",
              }
            }
          },

        }
      },
      SourceCodePro: {
        variants: {
          normal: {
            400: {
              url: {
                woff2: "../fonts/SourceCodePro/SourceCodePro-Regular.woff2",
                woff: "../fonts/SourceCodePro/SourceCodePro-Regular.woff",
                ttf: "../fonts/SourceCodePro/SourceCodePro-Regular.ttf"
              }
            }
          },

        }
      }
    },
    formats: "woff2 woff"
  })
];

if (global.production) {
  plugins.push(require("css-mqpacker")());
}

module.exports = {
  plugins: plugins
};
