import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="place-self-center mt-10">
      <CircularProgress size="4rem" />
    </div>
  );
}
