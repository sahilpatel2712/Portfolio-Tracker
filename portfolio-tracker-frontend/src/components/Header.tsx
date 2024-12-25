import { Link, useLocation } from "react-router";

const Header = () => {
  const path = useLocation();
  return (
    <div className="bg-bgColor-custom mb-4 p-3 rounded-md max-w-[1600px] w-full">
      <ul className="flex items-center gap-5 justify-end">
        <li
          className={`cursor-pointer text-lg ${
            path.pathname === "/dashboard" ? "text-blue-500" : ""
          }`}
        >
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`cursor-pointer text-lg ${
            path.pathname === "/portfolio" ? "text-blue-500" : ""
          }`}
        >
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li className="cursor-pointer">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
            SP
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
