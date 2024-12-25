import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./Routers/Auth";
import NonAuth from "./Routers/NonAuth";
import Layout from "./components/Layouts/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {Auth()}
          {NonAuth()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
