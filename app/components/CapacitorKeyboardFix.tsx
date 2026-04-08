"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Keyboard, type KeyboardInfo } from "@capacitor/keyboard";
import type { PluginListenerHandle } from "@capacitor/core";

export default function CapacitorKeyboardFix() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const applyHeight = () => {
      const vv = window.visualViewport;
      const height = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
    };

    applyHeight();

    const onResize = () => applyHeight();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    let showHandle: PluginListenerHandle | null = null;
    let hideHandle: PluginListenerHandle | null = null;

    const setup = async () => {
      showHandle = await Keyboard.addListener(
        "keyboardDidShow",
        (_info: KeyboardInfo) => {
          document.body.classList.add("keyboard-open");
          applyHeight();
        }
      );

      hideHandle = await Keyboard.addListener("keyboardDidHide", () => {
        document.body.classList.remove("keyboard-open");
        applyHeight();
      });
    };

    void setup();

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      void showHandle?.remove();
      void hideHandle?.remove();
    };
  }, []);

  return null;
}
