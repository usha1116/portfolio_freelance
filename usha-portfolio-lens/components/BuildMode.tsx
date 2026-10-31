"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Ctx = { on: boolean; toggle: () => void };
const BuildCtx = createContext<Ctx>({ on: false, toggle: () => {} });
export const useBuild = () => useContext(BuildCtx);

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.build = on ? "on" : "off";
  }, [on]);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const value = useMemo(() => ({ on, toggle }), [on, toggle]);
  return <BuildCtx.Provider value={value}>{children}</BuildCtx.Provider>;
}

export function BuildSwitch({ className = "" }: { className?: string }) {
  const { on, toggle } = useBuild();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={`switch ${className}`}
    >
      <span className="switch-track" aria-hidden="true">
        <span className="switch-knob" />
      </span>
      <span>Show the build</span>
    </button>
  );
}
