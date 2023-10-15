import Button from "@mui/material/Button";
import { logout } from "../app/Features/Auth/authSlice";
import { useAppDispatch } from "../hooks/store";

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(logout())}>LOGOUT</Button>
    </div>
  );
};

export default Home;
