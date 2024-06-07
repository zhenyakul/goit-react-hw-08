import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };
  return (
    <nav className={css.navContainer}>
      <NavLink to="/login" className={buildLinkClass}>
        Log In
      </NavLink>
      <NavLink to="/registration" className={buildLinkClass}>
        Register
      </NavLink>
    </nav>
  );
}
