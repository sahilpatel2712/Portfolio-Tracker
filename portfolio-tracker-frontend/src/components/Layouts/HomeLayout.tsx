import { Outlet } from "react-router";
import Summary from "../Summary";
import StocksList from "../StocksList";

const HomeLayout = () => {
  return (
    <div className="flex w-full gap-2 justify-center items-start">
      <div className="hidden lg:flex max-w-[348px] w-full max-h-[calc(100vh-140px)] h-full bg-bgColor-custom rounded-md flex-col items-center py-3 max-[1200px]:w-[300px]">
        <StocksList />
      </div>

      <div className="max-w-[1244px] w-full max-h-[calc(100vh-140px)] bg-bgColor-custom rounded-md flex flex-col items-center overflow-y-auto p-6 gap-10">
        <Summary />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
