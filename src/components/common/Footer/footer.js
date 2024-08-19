import React from "react";
import "../Footer/styles.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="footer">
      <h2 className="logo" onClick={() => topFunction()}>
        SperaxCryptoWorld<span>.</span>
      </h2>
      <div className="social-links">
        <a href="#">
          <FacebookIcon className="social-link" />
        </a>
        <a href="#">
          <EmailIcon className="social-link" />
        </a>
        <a href="#">
          <TwitterIcon className="social-link" />
        </a>
        <a href="#">
          <InstagramIcon className="social-link" />
        </a>
      </div>
      <div className="contact-info">
        <p className="info">Contact Info</p>
        <p>0118722901</p>
        <a href="#" className="mail-info">
          <MailOutlineRoundedIcon />
          xyz@gmail.com
        </a>
      </div>
    </div>
  );
}

export default Footer;
