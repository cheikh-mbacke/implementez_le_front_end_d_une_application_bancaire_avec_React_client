import "./Navbar.scss";
import argentBankLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../services/exchangeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCircleUser, faArrowRightFromBracket);

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token) || localStorage.token;

  const firstName = useSelector((state) => state.user.firstName);

  const onclick = () => {
    logout(dispatch);
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {token === "null" ? (
          <NavLink className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink className="main-nav-item" to="/user">
              <FontAwesomeIcon icon={faCircleUser} />
              {firstName || localStorage.firstName}
            </NavLink>
            <NavLink className="main-nav-item" to="/login" onClick={onclick}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Sign Out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
