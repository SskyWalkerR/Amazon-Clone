import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Lazy from "./components/Lazy";
import { AuthOutlet } from "./utils/AuthOutlet";
import { PrivateOutlet } from "./utils/PrivateOutlet";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Signin = lazy(() => import("./pages/Signin"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateOutlet />}>
        <Route path="/" element={<Lazy Page={Home} />} />
      </Route>
      <Route path="auth" element={<AuthOutlet />}>
        <Route path="signin" element={<Lazy Page={Signin} />} />
        <Route path="register" element={<Lazy Page={Register} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
