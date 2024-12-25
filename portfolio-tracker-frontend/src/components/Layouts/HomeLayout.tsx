import { Outlet } from "react-router";
import { SearchIcon } from "../../assets/svgs";
import Stock from "../Stock";
import Header from "../Header";
const list = [
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
];
const HomeLayout = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-ful flex flex-col items-center text-white relative">
      <Header />
      <div className="flex w-full gap-2 justify-center">
        <div className="max-w-[348px] w-full bg-bgColor-custom rounded-md flex flex-col items-center overflow-y-hidden py-2">
          <div className="flex h-[52px] w-full px-3 py-1 gap-2">
            <span className="flex w-5">{SearchIcon()}</span>
            <input
              type="text"
              placeholder="Stocks"
              className=" flex-grow shadow focus:outline-none focus:shadow-none focus:ring-0 text-white bg-bgColor-custom"
            />
          </div>
          <div className="w-full">
            {list.map((item, index) => (
              <Stock key={index} indicatorValue={item} />
            ))}
          </div>
        </div>
        <div className="max-w-[1244px] w-full bg-bgColor-custom rounded-md flex flex-col items-center p-6 gap-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
