import Typography from "@mui/material/Typography";
import AuthLayout from "../components/layouts/AuthLayout";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { FormValidator, SigninType } from "../validator/form";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { login, reset as resetAsyncState } from "../app/Features/Auth/authSlice";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Signin = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninType>({
    resolver: zodResolver(FormValidator.signinSchema),
  });

  const onSubmit = (values: SigninType) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAsyncState());
      reset();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated]);

  // If the user is already authenticated, redirect back to the home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (isLoading) return <CircularProgress color="warning" />;

  return (
    <AuthLayout>
      <Stack padding={3} width={{ xs: "100%", md: "50%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" textAlign="center">
            Signin
          </Typography>
          <Stack spacing={2} marginBottom={1}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="email"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Typography color="error">{errors.email?.message}</Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Typography color="error">{errors.password?.message}</Typography>
          </Stack>
          <Button variant="contained" color="warning" fullWidth type="submit">
            SIGNIN
          </Button>
        </form>
        <Typography marginTop={1}>
          Don't have an account? <Link to="/auth/register">Sign-Up</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
};

export default Signin;
