import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TwoStepVerification from "./components/TwoStepVerification";
import Webview from "./components/Webview";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Webview"
          component={Webview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TwoStepVerification"
          component={TwoStepVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
