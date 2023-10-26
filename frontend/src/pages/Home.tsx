import Button from "@mui/material/Button";

import { logout } from "../app/Features/Auth/authSlice";
import { useGetProductsQuery } from "../app/services/Product/productServices";
import { useAppDispatch } from "../hooks/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetProductsQuery();
  console.log(data);
  return (
    <div>
      <Button onClick={() => dispatch(logout())}>LOGOUT</Button>
    </div>
  );
};

export default Home;

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
