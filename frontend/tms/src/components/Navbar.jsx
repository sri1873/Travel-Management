import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserToken, selectUserRole, logout } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectUserToken);
  const role = useSelector(selectUserRole);
  const isLoggedIn = Boolean(token);

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (!isLoggedIn) {
    // No extra items if not logged in, just register login dropdown
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid justify-content-between">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="brandDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="public/icon.png"
                  alt="Logo"
                  width="50"
                  height="40"
                  className="d-inline-block align-text-top"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="brandDropdown">
                <li>
                  <Link className="dropdown-item" to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else if (role === 'Admin') {
    // Admin navbar just has logout dropdown
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="brandDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="public/icon.png"
                  alt="Logo"
                  width="50"
                  height="40"
                  className="d-inline-block align-text-top"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="brandDropdown">
                <li>
                  <button className="dropdown-item" onClick={onLogoutClick}>
                    Logout
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    //User navbar
    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="brandDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="public/icon.png"
                  alt="Logo"
                  width="50"
                  height="40"
                  className="d-inline-block align-text-top"
                />
              </a>
              <ul className="dropdown-menu" aria-labelledby="brandDropdown">
                <li>
                  <button className="dropdown-item" onClick={onLogoutClick}>
                    Logout
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Placeholder 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Placeholder 2
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            style={{ backgroundColor: 'aliceblue' }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotel">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/flights">
                  Flights
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trip">
                  Plan a trip
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
export default NavBar;