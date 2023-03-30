import React, { useState } from "react";
import "./NavBar.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      {!showMenu ? (
        <FiArrowRight className="arrow-open" onClick={toggleMenu} />
      ) : (
        <div className="side-menu">
          <div className="side-menu-header">
            <p className="restaurant-header">Restaurant Dash</p>
            <FiArrowLeft className="arrow-close" onClick={toggleMenu} />
          </div>
          <ul>
            <li
              className={activeMenuItem === "Home" ? "active" : ""}
              onClick={() => {
                setActiveMenuItem("Home");
                navigate("/home");
              }}
            >
              Home
            </li>
            <li
              className={activeMenuItem === "Account" ? "active" : ""}
              onClick={() => {
                setActiveMenuItem("Account");
                navigate("/account");
              }}
            >
              Account
            </li>
            <li
              className={activeMenuItem === "Edit Website" ? "active" : ""}
              onClick={() => {
                setActiveMenuItem("Edit Website");
                navigate("/editwebsite");
              }}
            >
              Edit Website
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
