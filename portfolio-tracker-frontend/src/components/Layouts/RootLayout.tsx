import React from "react";
import { getUserData } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router";
import { fetchPortfolio } from "../../redux/porfolio/portfolio";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    dispatch(getUserData(handleNavigation));
    dispatch(fetchPortfolio(handleNavigation));
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path, { replace: true });
  };
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-full flex flex-col items-center text-white relative">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
