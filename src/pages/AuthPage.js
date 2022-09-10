import { Outlet } from "react-router-dom";
import classes from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <div className={classes.page}>
      <Outlet />
    </div>
  );
};

export default AuthPage;
