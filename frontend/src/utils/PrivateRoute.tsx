import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { jwt } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!jwt || !jwt.access_token) {
      navigate("/auth/signin");
      console.log("jh");
    }
  }, [jwt]);

  return <Outlet />;
};

export default PrivateRoute;
