import { CircularProgress } from "@mui/material";
import "./styles.css";
import React from "react";

/* Loader commponent for showing loading component when the api fetches real time coin data*/
function Loader() {
  return (
    <div className="loader-container">
      <CircularProgress />
    </div>
  );
}

export default Loader;
