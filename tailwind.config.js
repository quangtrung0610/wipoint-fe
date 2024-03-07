//config từ tds-ui
const TDS_UI_CONFIG =
  require("./node_modules/tds-ui/tailwindcss/tailwind.config.js").TDS_UI_TAILWINDCSS_CONFIG;
//màu mặc định từ tds-ui
const TDS_UI_COLOR =
  require("./node_modules/tds-ui/tailwindcss/tailwind.config.js").TDS_UI_TAILWINDCSS_COLORS;
//màu theo thiết kế
const APP_COLOR = {
  //cách override màu primary-1
  primary: {
    ...TDS_UI_COLOR.primary,
    1: "#027AFF",
    2: "#025CBF",
    3: "#E6F2FF",
    4: "#C1DFFF",
    5: "#91C3F9",
  },
  d: {
    ...TDS_UI_COLOR.d,
    primary: {
      1: "#1A6DE3",
      2: "#0051CD",
      3: "#1D3353",
      4: "#0B1C30",
    },
  },
};
//override màu theo thiết kế
const COLOR = { ...TDS_UI_COLOR, ...APP_COLOR };
module.exports = {
  content: [...TDS_UI_CONFIG.content],
  // safelist: SAFELISTING,
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        ...TDS_UI_CONFIG.theme.extend.zIndex,
      },
      colors: {
        ...COLOR,
      },
      ringColor: {
        ...COLOR,
      },
      borderColor: {
        ...COLOR,
      },
      boxShadow: {
        ...TDS_UI_CONFIG.theme.extend.boxShadow,
      },
      minWidth: {
        ...TDS_UI_CONFIG.theme.extend.minWidth,
      },
      minHeight: {
        ...TDS_UI_CONFIG.theme.extend.minHeight,
      },
      opacity: {
        ...TDS_UI_CONFIG.theme.extend.opacity,
      },
      fontSize: {
        ...TDS_UI_CONFIG.theme.extend.fontSize,
      },
      placeholderColor: {
        ...COLOR,
      },
      ringWidth: {
        ...TDS_UI_CONFIG.theme.extend.ringWidth,
      },
      height: {
        ...TDS_UI_CONFIG.theme.extend.height,
      },
      borderRadius: {
        ...TDS_UI_CONFIG.theme.extend.borderRadius,
      },
      fontWeight: {
        ...TDS_UI_CONFIG.theme.extend.fontWeight,
      },
      borderWidth: {
        ...TDS_UI_CONFIG.theme.extend.borderWidth,
      },
      spacing: {
        ...TDS_UI_CONFIG.theme.extend.spacing,
      },
      backgroundImage: {
        ...TDS_UI_CONFIG.theme.extend.backgroundImage,
      },
      transitionProperty: {
        ...TDS_UI_CONFIG.theme.extend.transitionProperty,
      },
      transitionTimingFunction: {
        ...TDS_UI_CONFIG.theme.extend.transitionTimingFunction,
      },
      keyframes: {
        ...TDS_UI_CONFIG.theme.extend.keyframes,
        moveInRight: {
          "0%": {
            opacity: 0,
            transform: "translateX(50%)",
          },
          "50%": {
            transform: "translateX(50%)",
          },
          "100% ": {
            opacity: 1,
            transform: "translateX(100%)",
          },
        },

        moveInLeft: {
          "0%": {
            transform: "translateX(0%)",
          },
          "50%": {
            transform: "translateX(0%)",
          },
          "100% ": {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        ...TDS_UI_CONFIG.theme.extend.animation,
        "move-in-r": "moveInRight 1s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards",
        "move-in-l": "moveInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) 0s 1 normal forwards",
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
