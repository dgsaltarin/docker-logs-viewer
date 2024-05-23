import { User } from "../models";

interface LoginSliceProps {
  user: User;
  loading: boolean;
  isLoggedIn: boolean;
}

export default LoginSliceProps;
