import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "1vh",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="loader">
        <span className="loader__inner"></span>
      </div>
    </div>
  );
};

export default Loader;
