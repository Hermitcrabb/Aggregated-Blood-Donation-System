import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { navigationTheme } from "@theme/ThemeProvider";
import { HomeScreen } from "@screens/HomeScreen";
import { DonorRegistrationScreen } from "@screens/DonorRegistrationScreen";
import { RequestsScreen } from "@screens/RequestsScreen";
import { DonorSearchScreen } from "@screens/DonorSearchScreen";
import { NotificationsScreen } from "@screens/NotificationsScreen";
import { AdminDashboardScreen } from "@screens/AdminDashboardScreen";

const Tab = createBottomTabNavigator();

const iconByRoute: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "heart",
  "Register": "person-add",
  Requests: "alert-circle",
  Donors: "people",
  Notifications: "notifications",
  Admin: "speedometer"
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: navigationTheme.colors.primary,
          tabBarInactiveTintColor: navigationTheme.colors.text,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopColor: "rgba(0,0,0,0.05)",
            paddingBottom: 6,
            paddingTop: 6,
            height: 64
          },
          tabBarIcon: ({ color, size }) => {
            const iconName = iconByRoute[route.name] ?? "ellipse";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Register" component={DonorRegistrationScreen} />
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Donors" component={DonorSearchScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Admin" component={AdminDashboardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
