import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { TOOLS } from "../assets/consts";
import { Link } from "react-router-dom";

const Header = () => {
  const [headerLinks, setHeaderLinks] = useState([]);

  useEffect(() => {
    const mapLinks = () => {
      return Object.values(TOOLS).map((data) => (
        <Link
          className="Header-link"
          key={data.name + data.path}
          to={data.path}
        >
          {data.name}
        </Link>
      ));
    };

    setHeaderLinks(mapLinks());
  }, []);

  return (
    <div className="Header">
      <div className="Header-content">
        <div className="Header-logo-container">
          <a href="https://www.onetruemint.com">
            <img className="Header-logo" src={logo} alt="One True Mint logo" />
          </a>
        </div>
        <h1 className="Header-title">One True Mint Financial Tools</h1>
        <div className="Header-links">{headerLinks}</div>
      </div>
    </div>
  );
};

export default Header;
