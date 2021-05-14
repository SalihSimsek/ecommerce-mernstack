import React from "react";
import "./Footer.css";

const Footer = () => {
  if (window.location.pathname === '/login' || window.location.pathname === '/register') return null;

  return (
    <div className="footer">
      <div className="footer_container">
        <h2>
          <span>&copy;</span> 2021 - salihfsimsek.com
        </h2>
      </div>
    </div>
  );
};

export default Footer;
