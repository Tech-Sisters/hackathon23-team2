import { ReactComponent as Logo } from "../../Assets/TazkeerLogo.svg"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { useDispatch } from "react-redux"
import { removeAccessToken } from "../../Redux/Actions/userActions"
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Function to update the login status
    const updateLoginStatus = () => {
      const token = localStorage.getItem("accessToken")
      setIsLoggedIn(!!token) // Sets to true if token exists, false otherwise
    }
    // Update status on component mount
    updateLoginStatus()
    // Event listener for local storage changes
    const handleStorageChange = (event) => {
      if (event.key === "accessToken") {
        updateLoginStatus()
      }
    }
    // Add event listener
    window.addEventListener("storage", handleStorageChange)
    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [isLoggedIn])

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
          <Logo style={{ width: "125px", height: "125px" }} />
        </a>
        {isLoggedIn && (
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
                  <a className="text nav-link fw-bold FontSize12" style={{ color: "#FFFFFF" }} href="/surah-history">
                    Revision History
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
        )}
      </div>
    </nav>
  )
}

export default Navbar
