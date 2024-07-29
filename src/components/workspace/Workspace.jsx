import { useLoaderData } from "react-router-dom";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import "./Workspace.css";
import { useState } from "react";
import Picklist from "../picklist/Picklist";
const Workspace = () => {
  const tasks = useLoaderData();
  const [filter, setFilter] = useState("none");

  return (
    <>
      <Picklist value={filter} onChange={setFilter} />
      <KanbanBoard tasks={tasks} filter={filter} />
    </>
  );
};

export default Workspace;
