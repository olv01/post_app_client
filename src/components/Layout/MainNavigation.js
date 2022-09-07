import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav>
      <ul className={classes["site-nav"]}>
        <li>
          <Link to="/posts">Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
