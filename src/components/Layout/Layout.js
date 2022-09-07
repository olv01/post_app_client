import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = () => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h3>Post-app</h3>
      </header>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
