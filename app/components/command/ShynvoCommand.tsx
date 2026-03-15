"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ENVIRONMENT_ITEMS = [
  { label: "Shynvo Enterprise", href: "/enterprise" },
  { label: "University Hub", href: "/university" },
  { label: "Shynvo Academy", href: "/academy" },
  { label: "Experiments", href: "/experiments" },
  { label: "Frontier Lab", href: "/frontier" },
  { label: "Arcade Sim", href: "/arcade" },
];

const ENTERPRISE_ITEMS = [
  { label: "Command Center", href: "/enterprise/dashboard" },
  { label: "Missions", href: "/enterprise/missions" },
  { label: "Teams", href: "/enterprise/teams" },
  { label: "Rooms", href: "/enterprise/rooms" },
  { label: "Analytics", href: "/enterprise/analytics" },
  { label: "Directory", href: "/enterprise/directory" },
  { label: "Schedule", href: "/enterprise/schedule" },
  { label: "Strategy", href: "/enterprise/strategy" },
  { label: "OS Core", href: "/enterprise/os" },
  { label: "Settings", href: "/enterprise/settings" },
  { label: "Help", href: "/enterprise/help" },
];

function Item({
  label,
  href,
  onSelect,
}: {
  label: string;
  href: string;
  onSelect: (href: string) => void;
}) {
  return (
    <Command.Item
      value={label}
      onSelect={() => onSelect(href)}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm text-white/85 outline-none data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
    >
      {label}
    </Command.Item>
  );
}

export default function ShynvoCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
      <div
        className="mx-auto mt-24 w-[92%] max-w-2xl rounded-2xl border border-white/10 bg-[#0B0F14]/95 p-3 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Shynvo Command Palette"
      >
        <Command className="w-full">
          <Command.Input
            autoFocus
            placeholder="Search environments, modules, or commands..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />

          <Command.Empty className="px-3 py-4 text-sm text-white/55">
            No results found.
          </Command.Empty>

          <Command.List className="mt-3 max-h-[60vh] overflow-auto">
            <Command.Group
              heading="Environments"
              className="mb-4 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-white/40"
            >
              {ENVIRONMENT_ITEMS.map((item) => (
                <Item
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  onSelect={handleSelect}
                />
              ))}
            </Command.Group>

            <Command.Group
              heading="Enterprise"
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-white/40"
            >
              {ENTERPRISE_ITEMS.map((item) => (
                <Item
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  onSelect={handleSelect}
                />
              ))}
            </Command.Group>
          </Command.List>
        </Command>

        <div className="mt-3 border-t border-white/10 px-2 pt-3 text-xs text-white/45">
          Use Ctrl+K or ⌘K to open, Esc to close.
        </div>
      </div>
    </div>
  );
}
