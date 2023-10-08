import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <Typography textAlign="center">APP LOGO</Typography>
      {children}
    </Stack>
  );
};

export default AuthLayout;
