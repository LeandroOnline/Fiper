import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Verify from "../pages/Verify";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkvalidate/:id" element={<Verify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
