import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header-container">
      <ul className="header-nav">
        <li>
          <NavLink to="/">Startsida</NavLink>
        </li>
        <li>
          <NavLink to="/inventory">Admin</NavLink>
        </li>
        <li className="loginout-li">
          {!user ? (
            <NavLink to="/login">Logga in</NavLink>
          ) : (
            <button onClick={logout}>Logga ut</button>
          )}
        </li>
      </ul>
    </header>
  )
}

export default Header