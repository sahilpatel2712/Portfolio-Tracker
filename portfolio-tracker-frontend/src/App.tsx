import { Route, Routes } from "react-router";
import Auth from "./Routers/Auth";
import NonAuth from "./Routers/NonAuth";
import Layout from "./components/Layouts/Layout";
import { useAppSelector } from "./redux/hooks";

import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";

export default function App() {
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  return (
    <>
      <Toaster reverseOrder={true} position="bottom-center" />
      {isLoading ? <Loader /> : null}
      <Routes>
        <Route element={<Layout />}>
          {Auth()}
          {NonAuth()}
        </Route>
      </Routes>
    </>
  );
}
