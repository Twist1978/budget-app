import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./Navigation";
import type { ReactElement } from "react";

export default function App(): ReactElement {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  );
}
