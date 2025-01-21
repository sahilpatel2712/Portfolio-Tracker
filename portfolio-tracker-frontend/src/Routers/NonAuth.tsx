import { Route } from "react-router";
import Dashboard from "../pages/Non-Auth/Dashboard";
import Portfolio from "../pages/Non-Auth/Portfolio";
import HomeLayout from "../components/Layouts/HomeLayout";
import StockPage from "../pages/Non-Auth/StockPage";
import RootLayout from "../components/Layouts/RootLayout";
import useScreenWidth from "../components/hooks/useScreenWidth";
import StockChart from "../pages/Non-Auth/StockChart";
import SummaryLayout from "../components/Layouts/SummaryLayout";

const NonAuth = () => {
  const screenWidth = useScreenWidth();

  return (
    <>
      <Route element={<RootLayout />}>
        <Route element={<HomeLayout />}>
          <Route element={<SummaryLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>
          <Route path="/chart" element={<StockChart />} />
        </Route>
        {screenWidth <= 1024 && (
          <Route path="/stocks" element={<StockPage />} />
        )}
      </Route>
    </>
  );
};

export default NonAuth;
