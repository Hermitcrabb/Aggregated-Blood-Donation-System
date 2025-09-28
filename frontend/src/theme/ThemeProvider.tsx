import React, { PropsWithChildren, createContext, useContext } from "react";
import { DefaultTheme, Theme as NavigationTheme } from "@react-navigation/native";
import { theme, Theme } from "./index";

const ThemeContext = createContext<Theme>(theme);

export const useAppTheme = () => useContext(ThemeContext);

export const navigationTheme: NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    border: theme.colors.border,
    notification: theme.colors.primaryLight
  }
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
