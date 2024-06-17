import { User } from "@types/models";

interface LoginSliceProps {
  user: User;
  loading: boolean;
  isLoggedIn: boolean;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}

export default LoginSliceProps;
