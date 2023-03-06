import React, { useEffect, useState } from "react";
import { useDevOps } from "../providers/devOps";
import { EverHourHub } from "./EverHourDrop";
import { ResolvedIsland } from "./ResolvedIsland";

const DragDrop = () => {
  const { getWorkItems, workItems, isInProgress } = useDevOps();

  useEffect(() => {
    getWorkItems();
  }, []);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div>
      <ResolvedIsland ResolvedItems={workItems} />

      <div style={{ height: "45rem" }}>
        <EverHourHub />
      </div>
    </div>
  );
};

export default DragDrop;
