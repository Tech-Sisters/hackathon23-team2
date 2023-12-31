import logoPng from "../../Assets/Tazkeer.png"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { removeAccessToken } from "../../Redux/Actions/userActions"
const Navbar = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    // Sign out from Firebase
    auth
      .signOut()
      .then(() => {
        dispatch(removeAccessToken())
        window.location.href = "/log-in"
      })
      .catch((error) => {
        console.error("Logout failed:", error)
      })
  }

  return (
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#3C2E4C" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logoPng} alt="Logo" style={{ width: "120px", height: "120px", padding: "15px" }} />
        </a>

        <>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ backgroundColor: "#FFF" }}
          >
            <span className="navbar-toggler-icon" style={{ backgroundColor: "#FFF" }}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="text nav-link fw-bold FontSize12"
                  style={{ color: "#FFFFFF" }}
                  aria-current="page"
                  href="/home-screen"
                >
                  Surahs
                </a>
              </li>
              <li className="nav-item">
                <a className="text nav-link fw-bold FontSize12" style={{ color: "#FFFFFF" }} href="/profile">
                  My Profile
                </a>
              </li>
            </ul>

            <button
              onClick={handleLogout}
              className="btn fw-bold FontSize12"
              style={{ backgroundColor: "#FFFFFF", color: "#3C2E4D" }}
            >
              Logout
            </button>
          </div>
        </>
      </div>
    </nav>
  )
}

export default Navbar
