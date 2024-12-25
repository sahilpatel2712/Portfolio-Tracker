import { Route } from "react-router";
import Dashboard from "../pages/Non-Auth/Dashboard";
import Portfolio from "../pages/Non-Auth/Portfolio";
import HomeLayout from "../components/Layouts/HomeLayout";

const NonAuth = () => {
  return (
    <>
      <Route element={<HomeLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>
    </>
  );
};

export default NonAuth;
