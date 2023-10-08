import Typography from "@mui/material/Typography";
import AuthLayout from "../layouts/AuthLayout";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { FormValidator, SigninType } from "../validator/form";

const Signin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninType>({
    resolver: zodResolver(FormValidator.signinSchema),
  });

  const onSubmit = (values: SigninType) => {
    console.log(values);
  };
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
