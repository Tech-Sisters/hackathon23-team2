import { ReactComponent as Logo } from "../../Assets/TazkeerLogo.svg";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{ backgroundColor: "#3C2E4C" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Logo style={{ width: "125px", height: "125px" }} />
        </a>
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
          <span
            className="navbar-toggler-icon"
            style={{ backgroundColor: "#FFF" }}
          ></span>
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
              <a
                className="text nav-link fw-bold FontSize12"
                style={{ color: "#FFFFFF" }}
                href="/surah-history"
              >
                Revision History
              </a>
            </li>
            <li className="nav-item">
              <a
                className="text nav-link fw-bold FontSize12"
                style={{ color: "#FFFFFF" }}
                href="/profile"
              >
                My Profile
              </a>
            </li>
          </ul>

          <button
            className="btn fw-bold FontSize12"
            style={{ backgroundColor: "#FFFFFF", color: "#3C2E4D" }}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
