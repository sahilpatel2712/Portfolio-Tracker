import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./Routers/Auth";
import NonAuth from "./Routers/NonAuth";
import Layout from "./components/Layouts/Layout";
// import Loader from "./components/Loader";

export default function App() {
  return (
   <>
   {/* <Loader/> */}
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {Auth()}
          {NonAuth()}
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}
