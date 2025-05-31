// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00e676",
    },
    background: {
      default: "#121212",
      paper: "#1E1E2F",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
