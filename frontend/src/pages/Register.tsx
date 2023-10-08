import Typography from "@mui/material/Typography";
import AuthLayout from "../components/layouts/AuthLayout";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { FormValidator, RegisterType } from "../validator/form";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { register, reset as resetAsyncState } from "../features/auth/authSlice";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({
    resolver: zodResolver(FormValidator.registerSchema),
  });

  const onSubmit = (values: RegisterType) => {
    const { confirmPassword, ...newUser } = values;
    dispatch(register(newUser));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetAsyncState());
      reset();
      navigate("/auth/signin");
    }
  }, [isSuccess]);

  if (isLoading) return <CircularProgress color="warning" />;

  return (
    <AuthLayout>
      <Stack padding={3} width={{ xs: "100%", md: "50%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" textAlign="center">
            Create Account
          </Typography>
          <Stack spacing={2} marginBottom={1}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="text"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Typography color="error">{errors.name?.message}</Typography>
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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  type="password"
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Typography color="error">{errors.confirmPassword?.message}</Typography>
          </Stack>
          <Button variant="contained" color="warning" fullWidth type="submit">
            REGISTER
          </Button>
        </form>
        <Typography marginTop={1}>
          Already have an account? <Link to="/auth/signin">Sign-In</Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
};

export default Register;
