"use client";

interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--surface-bg)" }}
    >
      {sidebar}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

export default AppShell;
