import createMuiTheme, {
  Theme as T_Theme,
} from "@material-ui/core/styles/createMuiTheme";
import { PaletteType } from "@material-ui/core";

const PRIMARY_MAIN = "#42C8A2";
const PRIMARY_LIGHT = "#47DCA5";
const PRIMARY_DARK = "#008371";
const SECONDARY_MAIN = "#004C68";
const SECONDARY_LIGHT = "#0D6D67";
const SECONDARY_DARK = "#003344";

export const createTheme = (type: PaletteType): Theme =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        light: PRIMARY_LIGHT,
        main: PRIMARY_MAIN,
        dark: PRIMARY_DARK,
        contrastText: "white",
      },
      secondary: {
        light: SECONDARY_LIGHT,
        main: SECONDARY_MAIN,
        dark: SECONDARY_DARK,
        contrastText: "white",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "Lato", "Roboto"].join(","),
    },
    overrides: {
      MuiCard: {
        root: {
          borderRadius: 8,
        },
      },
      MuiPaper: {
        elevation1: {
          boxShadow: "none",
        },
        elevation2: {
          boxShadow: "none",
        },
        rounded: {
          borderRadius: 8,
        },
      },
      MuiStepper: {
        root: {
          background: "none",
          border: "none",
          padding: 0,
        },
      },
    },
  });

export type Theme = T_Theme;

export const PRIMARY_GRADIENT = `linear-gradient( 135deg, ${PRIMARY_LIGHT} 0%, ${SECONDARY_LIGHT} 50%, ${SECONDARY_DARK} 100%)`;
