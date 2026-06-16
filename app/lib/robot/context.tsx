"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ZentroRobotPose } from "@/components/robot/ZentroRobotModel";

type ZentroRobotContextValue = {
  open: boolean;
  pose: ZentroRobotPose;
  pendingMessage: string;
  openChat: (initialMessage?: string) => void;
  closeChat: () => void;
  clearPendingMessage: () => void;
  setPose: (pose: ZentroRobotPose) => void;
};

const ZentroRobotContext = createContext<ZentroRobotContextValue | null>(null);

export function ZentroRobotProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pose, setPose] = useState<ZentroRobotPose>("wave");
  const [pendingMessage, setPendingMessage] = useState("");

  const openChat = useCallback((initialMessage?: string) => {
    setPose("wave");
    setPendingMessage(initialMessage?.trim() || "");
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    setPendingMessage("");
    setPose("wave");
  }, []);

  const clearPendingMessage = useCallback(() => {
    setPendingMessage("");
  }, []);

  const value = useMemo(
    () => ({
      open,
      pose,
      pendingMessage,
      openChat,
      closeChat,
      clearPendingMessage,
      setPose,
    }),
    [open, pose, pendingMessage, openChat, closeChat, clearPendingMessage]
  );

  return (
    <ZentroRobotContext.Provider value={value}>{children}</ZentroRobotContext.Provider>
  );
}

export function useZentroRobot() {
  const ctx = useContext(ZentroRobotContext);
  if (!ctx) {
    throw new Error("useZentroRobot must be used inside ZentroRobotProvider");
  }
  return ctx;
}
