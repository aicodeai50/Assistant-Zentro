import { getSupabaseClient } from "@/lib/supabase/client";
import type { RobotMemoryItem } from "@/lib/robot/memory";
import type { RobotTaskItem } from "@/lib/robot/tasks";

export type AssistantCloudState = {
  memory: RobotMemoryItem[];
  tasks: RobotTaskItem[];
};

export type AssistantCloudResult =
  | {
      ok: true;
      signedIn: true;
      state: AssistantCloudState;
    }
  | {
      ok: true;
      signedIn: false;
      state: null;
    }
  | {
      ok: false;
      signedIn: boolean;
      state: null;
      error: string;
    };

function isMemoryItem(value: unknown): value is RobotMemoryItem {
  const item = value as RobotMemoryItem;
  return (
    typeof item?.id === "string" &&
    typeof item?.text === "string" &&
    typeof item?.createdAt === "string"
  );
}

function isTaskItem(value: unknown): value is RobotTaskItem {
  const item = value as RobotTaskItem;
  return (
    typeof item?.id === "string" &&
    typeof item?.title === "string" &&
    (item?.status === "open" || item?.status === "done") &&
    typeof item?.createdAt === "string"
  );
}

function normalizeCloudState(value: unknown): AssistantCloudState {
  const state = value as Partial<AssistantCloudState> | null;
  return {
    memory: Array.isArray(state?.memory) ? state.memory.filter(isMemoryItem) : [],
    tasks: Array.isArray(state?.tasks) ? state.tasks.filter(isTaskItem) : [],
  };
}

export function mergeAssistantCloudState(
  local: AssistantCloudState,
  cloud: AssistantCloudState
): AssistantCloudState {
  const memoryByText = new Map<string, RobotMemoryItem>();
  [...cloud.memory, ...local.memory].forEach((item) => {
    memoryByText.set(item.text.toLowerCase(), item);
  });

  const tasksById = new Map<string, RobotTaskItem>();
  [...cloud.tasks, ...local.tasks].forEach((item) => {
    tasksById.set(item.id, item);
  });

  return {
    memory: [...memoryByText.values()].slice(0, 12),
    tasks: [...tasksById.values()].slice(0, 30),
  };
}

export async function loadAssistantCloudState(): Promise<AssistantCloudResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: true, signedIn: false, state: null };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: true, signedIn: false, state: null };
  }

  const { data, error } = await supabase
    .from("assistant_state")
    .select("memory,tasks")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      signedIn: true,
      state: null,
      error: error.message,
    };
  }

  return {
    ok: true,
    signedIn: true,
    state: normalizeCloudState(data),
  };
}

export async function saveAssistantCloudState(
  state: AssistantCloudState
): Promise<{ ok: boolean; signedIn: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: true, signedIn: false };

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { ok: true, signedIn: false };

  const { error } = await supabase.from("assistant_state").upsert(
    {
      user_id: user.id,
      memory: state.memory,
      tasks: state.tasks,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return { ok: false, signedIn: true, error: error.message };
  }

  return { ok: true, signedIn: true };
}
