"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";

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

    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      document.body.classList.add("keyboard-open");
      applyHeight();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      document.body.classList.remove("keyboard-open");
      applyHeight();
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return null;
}
