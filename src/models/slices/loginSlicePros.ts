import { User } from "@models/models";

interface LoginSliceProps {
  user: User;
  loading: boolean;
  isLoggedIn: boolean;
  badLogin: boolean;
}

export default LoginSliceProps;
