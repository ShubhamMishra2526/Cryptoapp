import React, { useEffect, useRef } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import "./styles.css";

function BackToTop() {
  const myButtonRef = useRef(null);

  useEffect(() => {
    // Function to handle scroll event
    function scrollFunction() {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        if (myButtonRef.current) {
          myButtonRef.current.style.display = "flex";
        }
      } else {
        if (myButtonRef.current) {
          myButtonRef.current.style.display = "none";
        }
      }
    }

    // Attach scroll event listener
    window.addEventListener("scroll", scrollFunction);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Scroll to top function
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }

  return (
    <div
      className="back-to-top"
      ref={myButtonRef}
      onClick={topFunction}
      style={{ display: "none" }} // Initially hide the button
    >
      <ArrowUpwardRoundedIcon style={{ color: "var(--blue)" }} />
    </div>
  );
}

export default BackToTop;
