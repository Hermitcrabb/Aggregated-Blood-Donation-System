import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@theme/ThemeProvider";
import { DataProvider } from "@context/DataContext";
import { RootNavigator } from "@navigation/index";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
