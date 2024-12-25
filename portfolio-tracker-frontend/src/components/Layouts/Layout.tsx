import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-bgColor">
      <Outlet />
    </div>
  );
};

export default Layout;
