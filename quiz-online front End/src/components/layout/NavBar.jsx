import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"} style={{ color: "#0D6EFD" }}>
          Online Quiz App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/admin"}
                style={{ color: "#0D6EFD" }}
                activeClassName="active"
              >
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/quiz-stepper"}
                style={{ color: "#0D6EFD" }}
                activeClassName="active"
              >
                Take Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
