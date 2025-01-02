import { Route } from "react-router";
import Dashboard from "../pages/Non-Auth/Dashboard";
import Portfolio from "../pages/Non-Auth/Portfolio";
import HomeLayout from "../components/Layouts/HomeLayout";
import StockPage from "../pages/Non-Auth/StockPage";
import RootLayout from "../components/Layouts/RootLayout";
import useScreenWidth from "../components/hooks/useScreenWidth";

const NonAuth = () => {
  const screenWidth = useScreenWidth();
  
  return (
    (
      <>
        <Route element={<RootLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Route>
          {screenWidth <= 1024 && (
            <Route path="/stocks" element={<StockPage />} />
          )}
        </Route>
      </>
    )
  );
};

export default NonAuth;
