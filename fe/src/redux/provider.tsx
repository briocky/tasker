"use client";
import { Provider } from "react-redux";
import { globalStore } from "./global-store";

export function ReduxProvider({ children } : { children: React.ReactNode }) {
  return <Provider store={globalStore}>{children}</Provider>;
}