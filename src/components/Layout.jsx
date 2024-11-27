import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="application">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
