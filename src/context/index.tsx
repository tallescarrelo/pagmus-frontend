import { createContext, useCallback, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { dark } from "../styles/theme/dark";
import { light } from "../styles/theme/light";
import { MainProps, ThemeContextData } from "./types";


export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)


export const CustomThemeProvider = ({ children }: MainProps) => {
    const [theme, setTheme] = useState<DefaultTheme>(light)

    const toggleTheme = useCallback(() => {
        if (theme.title === 'light') {
            setTheme(dark)
        } else if (theme.title === 'dark') {
            setTheme(light)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;