export interface SignInProps {
  onLogin: (credentials: { email: string, password: string }) => void;
}
