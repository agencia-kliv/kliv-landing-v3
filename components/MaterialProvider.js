"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const createCustomTheme = () => {
  return createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#000000dd",
            backdropFilter: "blur(10px)",
            //fontFamily is dmSans
            fontFamily: "__DM_Sans_6ff133",
            fontSize: "14px",
            padding: "10px",
            borderRadius: "5px",
            color: "#fff",
            maxWidth: "250px",
            letterSpacing: "-0.02em",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
  });
};

const MaterialProvider = (props) => {
  const theme = createCustomTheme();

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default MaterialProvider;
