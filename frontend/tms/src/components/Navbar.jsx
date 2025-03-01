import React, { useState } from "react";


const NavBar = () => {
    const onLogoutClick = (event) => {
        localStorage.clear();
        window.location.href = "/";
    };
    return (
        <>
            {true ? (
                <nav
                    className="navbar sticky-top navbar-expand-lg bg-body-tertiary"
                    data-bs-theme="dark"
                >
                    <div className="container-fluid justify-content-between">
                        <a class="navbar-brand" href="/">
                            <img src="public\icon.png" alt="Logo" width="50" height="40" class="d-inline-block align-text-top"/>
                        </a>
                        <button
                            className="navbar-toggler"
                            style={{ backgroundColor: "aliceblue" }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarScroll"
                            aria-controls="navbarScroll"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse justify-content-between"
                            style={{ flexGrow: "0 !important", flexBasis: "10% !important" }}
                            id="navbarScroll"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/hotel">
                                        Hotels
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/flights">
                                        Flights
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/hotel">
                                        Restaurants
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/hotel">
                                        Plan a trip
                                    </a>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </nav>
            ) : null}
        </>
    );
};
export default NavBar;