import { useContext } from "react";
import { ThemeContext } from "./index";
import { ThemeContextData } from "./types";

export const useTheme = (): ThemeContextData => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a CustomThemeProvider");
    }
    return context;
};
