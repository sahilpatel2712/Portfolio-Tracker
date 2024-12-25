import { Route } from "react-router";
import Signup from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";
import AuthLayout from "../components/Layouts/AuthLayout";

const Auth = () => {
  return (
    <>
      <Route element={<AuthLayout />}>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Route>
    </>
  );
};

export default Auth;
