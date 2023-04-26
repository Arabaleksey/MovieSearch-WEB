import react, { useState, useEffect } from "react";
import { ArrowCircleUp } from "@mui/icons-material";
import "./style.css";

export const UpButton = () => {
  const [backToTop, setBackToTop] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollUp} className="scrollTop">
      {backToTop && <ArrowCircleUp sx={{ fontSize: 50, color: "black" }} />}
    </div>
  );
};
