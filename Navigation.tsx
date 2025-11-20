import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingsScreen from "./screens/SettingsScreen";
import BudgetScreen from "./screens/BudgetScreen";
import type { ReactElement } from "react";

/* -------- Typdefinitionen -------- */
export type RootTabsParamList = {
  Home: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Budget: undefined;
};

/* -------- Navigation -------- */
const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Homescreen after loading the App.
 *
 * @returns ReactElement
 */
function HomeStack(): ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Budget" component={BudgetScreen} />
    </Stack.Navigator>
  );
}

/* -------- Tabs -------- */
export default function HomeTabs(): ReactElement {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({
          focused,
          size,
          color,
        }: {
          focused: boolean;
          size: number;
          color: string;
        }): ReactElement => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === "Home"
              ? focused
                ? "home"
                : "home-outline"
              : focused
              ? "settings"
              : "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarStyle: { backgroundColor: "aliceblue" },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Budget" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Einstellungen" }}
      />
    </Tab.Navigator>
  );
}
