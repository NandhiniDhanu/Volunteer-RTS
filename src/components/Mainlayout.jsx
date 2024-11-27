import { Outlet } from "react-router-dom";
import {Navbar} from './../components';

const MainLayout = () => {
  return (
    <div className="application">
      <div className="navbar">
        <Navbar />
      </div>
      <main className="screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
