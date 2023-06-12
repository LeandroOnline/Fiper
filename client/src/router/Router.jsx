import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Verify from "../pages/Verify";
import useGlobalStore from "../store/Store";
import Maintenance from "../pages/Maintenance";

const Router = () => {
  const apiTest = useGlobalStore((state) => state.apiTest);
  const setApiTest = useGlobalStore((state) => state.setApiTest);
  setApiTest();
  return (
    <Routes>
      <Route
        path="/"
        element={apiTest === "Working" ? <Home /> : <Maintenance />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkvalidate/:id" element={<Verify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
