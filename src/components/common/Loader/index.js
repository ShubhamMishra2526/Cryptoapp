import { CircularProgress } from "@mui/material";
import "./styles.css";
import React from "react";

function Loader() {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
}

export default Loader;
