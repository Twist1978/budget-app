import React, { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { syncNow } from "./syncService";

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const wasOffline = useRef(false);

  useEffect(() => {
    void syncNow({ reason: "app_start" });

    const sub = AppState.addEventListener("change", (nextState) => {
      const prev = appState.current;
      appState.current = nextState;

      if (
        (prev === "background" || prev === "inactive") &&
        nextState === "active"
      ) {
        void syncNow({ reason: "foreground" });
      }
    });

    const unsubNet = NetInfo.addEventListener((state) => {
      const online = Boolean(state.isConnected && state.isInternetReachable);

      if (!online) {
        wasOffline.current = true;
        return;
      }
      if (wasOffline.current) {
        wasOffline.current = false;
        void syncNow({ reason: "back_online" });
      }
    });

    return () => {
      sub.remove();
      unsubNet();
    };
  }, []);

  return <>{children}</>;
}
