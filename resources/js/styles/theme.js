import { createTheme } from "@mui/material/styles";
import {
  yellowPalette,
  bluePalette,
  grayPalette,
  orangePalette,
  brownPalette,
  pinkPalette,
  purplePalette,
  greenPalette,
  cyanPalette,
  redPalette
} from "./colors.js";

let theme = createTheme({});

theme = createTheme({
    spacing: 8,
    palette: {
        primary: bluePalette,
        error: redPalette,
        neutral: {
            main: "#FFFFFF",
            secondary: "#FFFFFF",
            contrastText: "#424242",
        },
        white: {
            main: "#FFFFFF",
            contrastText: "#424242",
        },
        black: {
            main: "#000000",
            contrastText: "#FFFFFF",
        },
        blue: bluePalette,
        brown: brownPalette,
        cyan: cyanPalette,
        gray: grayPalette,
        green: greenPalette,
        orange: orangePalette,
        pink: pinkPalette,
        purple: purplePalette,
        red: redPalette,
        yellow: yellowPalette,
    },

    typography: {
        fontFamily: "Rubik, Arial, sans-serif",
        allVariants: {
            color: "#FFFFFF",
        },
        h1: {
            fontSize: "1.75rem",
            lineHeight: "2.5rem",
            fontWeight: 900,
        },
        h2: {
            fontSize: "1.5rem",
            lineHeight: "2.0rem",
            fontWeight: 700,
        },
        h3: {
            fontSize: "1.25rem",
            lineHeight: "2.0rem",
            fontWeight: 500,
        },
        h4: {
            fontSize: "1.0rem",
            lineHeight: "1.25rem",
            fontWeight: 500,
        },
        h5: {
            fontSize: "0.88rem",
            lineHeight: "1.0rem",
            fontWeight: 400,
        },
        p: {
            fontSize: "0.69rem",
            lineHeight: "1rem",
            fontWeight: 400,
        },
        small: {
            fontSize: "0.62rem",
            lineHeight: "0.88rem",
            fontWeight: 400,
        },
    },

    card: {
        mobile: {
            innerWidth: 104,
            innerHeight: 95,
            outerWidth: 104,
            outerHeight: 104,
            borderRadius: 8,
            planetSize: 45,
            moonSize: 12,
        },
        desktop: {
            innerWidth: 128,
            innerHeight: 115,
            outerWidth: 128,
            outerHeight: 128,
            borderRadius: 12,
            planetSize: 55,
            moonSize: 15,
        },
    },

    zIndex: {
        subjectPicker: 2,
        subjectInfo: 1,
    },

    glassmorphism: {
        level2: {
            backdropFilter: "blur(2px)",
            color: "rgb(194, 220, 245, 0.2)",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.089)",
        },

        level3: {
            backdropFilter: "blur(5px)",
            color: "rgb(194, 220, 245, 0.2)",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.089)",
        },
    },
});

export default theme;
