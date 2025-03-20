// import FONT_WEIGHT from './font'
// import FONT_FAMILY from './font-family'

const PRIMARY = {
  PRIMARY_LIGTH: "#161724",
  PRIMARY_DARK: "#9CC00C",
  YELLOW: "#FACF5A",
  RED: "#FC6973",
  BLUE: "#2196FD",
  BACKGROUND: "#383b51",
};

const RGB = {
  RED: "rgb(183, 49, 56)",
  YELLOW: "rgb(198, 162, 69)",
  BLUE: "rgb(26, 104, 173)",
};

const SECONDARY = {
  SECONDARY_LIGTH: "#9AA5BE",
  RED: "#F23641",
  BLUE: "#61b3fa",
  LIGHT_RED: "#FB4B56",
  BLACK: "#282a3e",
  GRAY: {
    900: "#212335",
    300: "#a9a9a9",
  },
  PURPLE: "#5968f8",
};

const LINEAR_GRADIENT = {
  BLACK: {
    800: "rgba(33, 35, 53, 0.64)",
    700: " rgba(255, 255, 255, 0)",
    400: "rgba(255, 255, 255, 0.04)",
    40: "rgba(73, 163, 253, 0)",
    30: "rgba(89, 104, 248, 0)",
    20: "rgba(251, 75, 86, 0)",
  },

  RED: "rgba(251, 75, 86, 0.08)",
  BLUE: "rgba(73, 163, 253, 0.16)",
};

const BOX_SHADOW = {
  SHADOW: {
    900: "rgba(0, 0, 0, 0.16)",
    800: "rgba(0, 0, 0, 0.24)",
  },
};

const BORDER = {
  GRAY: {
    700: "rgba(255, 255, 255, 0.08)",
    600: "rgba(255, 255, 255, 0.16)",
    500: " rgba(255, 255, 255, 0.24)",
  },
  BLUE: "#49A3FD",
  RED: "#f23641",
};

const LINEAR_GRADIENT_SECONDARY = {
  RED: "rgba(251, 75, 86, 0.16)",
  BLUE: "rgba(89, 104, 248, 0.16)",
};

const NEUTRAL = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GRAY_RGBA: "rgba(255, 255, 255, 0.48)",
};

const THEME = {
  PRIMARY,
  NEUTRAL,
  SECONDARY,
  //   FONT_WEIGHT,
  RGB,
  BORDER,
  BOX_SHADOW,
  LINEAR_GRADIENT,
  LINEAR_GRADIENT_SECONDARY,
  //   FONT_FAMILY,
};

export default THEME;
