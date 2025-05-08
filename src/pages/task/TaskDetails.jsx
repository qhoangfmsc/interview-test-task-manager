import React from "react";
import { useParams } from "react-router";

function TaskDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Task Detail</h1>
      <p> ID: {id}</p>
    </div>
  );
}

export default TaskDetails;
