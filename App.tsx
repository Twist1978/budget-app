import { NavigationContainer } from "@react-navigation/native";
import { SyncProvider } from "./src/sync/SyncProvider";
import HomeTabs from "./Navigation";
import type { ReactElement } from "react";

export default function App(): ReactElement {
  return (
    <SyncProvider>
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    </SyncProvider>
  );
}
