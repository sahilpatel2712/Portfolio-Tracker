import { Outlet, useLocation, useNavigate } from "react-router";
import {  useAppSelector } from "../../redux/hooks";
import React from "react";

const Layout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const path = useLocation();
  React.useEffect(() => {
    if (!token && path.pathname !== "/signup") {
      navigate("/signin", { replace: true });
    } else if (token && ["/signin", "/signup"].includes(path.pathname)) {
      navigate("/dashboard");
    } 
  }, [token]);
  return (
    <div className="min-h-screen py-8 px-4 bg-bgColor">
      <Outlet />
    </div>
  );
};

export default Layout;
