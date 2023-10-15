import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useLoginMutation, useMeMutation } from "../app/services/Auth/authServices";
import AuthLayout from "../components/layouts/AuthLayout";
import { FormValidator, SigninType } from "../validator/form";

const Signin = () => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [getMe, {}] = useMeMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninType>({
    resolver: zodResolver(FormValidator.signinSchema),
  });

  const onSubmit = async (values: SigninType) => {
    const res = await login(values).unwrap();
    if (res) {
      await getMe();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

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
