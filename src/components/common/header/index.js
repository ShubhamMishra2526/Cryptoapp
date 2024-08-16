import React from "react";
import "./styles.css";
import AnchorTemporaryDrawer from "./drawer";
import CompanyLogo from "../../../assets/logo.png";
import Button from "../button";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="navbar">
      <h1 className="logo">
        <img src={CompanyLogo} className="sperax-logo" />
        SperaxCryptoWorld
        <span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          {/*not using anchor tag as it takes some time for loading */}
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button
            text={"Dashboard"}
            outlined={true}
            onClick={() => console.log("Btn clicked")}
          />
        </Link>
      </div>
      <div className="mobile-drawer">
        <AnchorTemporaryDrawer />
      </div>
    </div>
  );
};

export default Header;
