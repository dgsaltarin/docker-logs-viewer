import { User } from "@models/models";

interface LoginSliceProps {
  user: User;
  loading: boolean;
  isLoggedIn: boolean;
}

export default LoginSliceProps;
