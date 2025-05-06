import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

function NoPage() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "404 Page Not Found";
  }, []);

  const handleClick = () => {
    navigate("/", { preventScrollReset: true });
  };

  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <img width={300} src="/404.avif" alt="404" />
      <Button variant="outlined" color="error" onClick={handleClick}>
        Back to Task Manager
      </Button>
    </div>
  );
}

export default NoPage;
