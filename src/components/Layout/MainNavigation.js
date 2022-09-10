import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const userId = authCtx.userId;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav>
      <ul className={classes["site-nav"]}>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        {!isLoggedIn && (
          <Fragment>
            <li className={classes["nav-right"]}>
              <Link to="/auth/login">Login</Link>
            </li>
            <li>
              <Link to="/auth/signup">Signup</Link>
            </li>
          </Fragment>
        )}

        {isLoggedIn && (
          <Fragment>
            <li className={classes["nav-right"]}>
              <div>{userId}</div>
            </li>
            <li>
              <div>|</div>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
