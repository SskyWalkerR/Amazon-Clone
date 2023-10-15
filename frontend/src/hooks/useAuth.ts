import { useMemo } from "react";

import { selectCurrentUser } from "../app/Features/Auth/authSlice";
import { useAppSelector } from "./store";

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
