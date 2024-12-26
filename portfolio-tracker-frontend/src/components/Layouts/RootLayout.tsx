import Header from "../Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-full flex flex-col items-center text-white relative">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
