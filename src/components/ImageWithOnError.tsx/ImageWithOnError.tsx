import React from "react";
import "./style.css";

const ImageWithOnError = ({ poster }) => {
  const errorHandler = (e: React.MouseEvent<HTMLImageElement>): void => {
    e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/84/84275.png";
  };
  return (
    <>
      <img
        className="image"
        src={poster}
        onError={errorHandler}
        alt="Some pict"
      />
    </>
  );
};

export default ImageWithOnError;
