import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-ful flex justify-center items-center">
      <div className="bg-bgColor-custom max-w-[593px] w-full flex justify-center items-center text-white p-8 rounded-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
