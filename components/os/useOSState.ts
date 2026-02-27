"use client";

import { useEffect, useMemo, useState } from "react";

type JSONValue = string | number | boolean | null | JSONValue[] | { [k: string]: JSONValue };

const PREFIX = "shynvo_os_state_v1:";

function safeParse(raw: string | null): JSONValue | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as JSONValue;
  } catch {
    return undefined;
  }
}

export function useOSState<T extends JSONValue>(key: string, initial: T) {
  const storageKey = useMemo(() => PREFIX + key, [key]);
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    const existing = safeParse(localStorage.getItem(storageKey));
    if (existing !== undefined) setValue(existing as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // ignore storage limits
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
