import React, { useState } from "react";
import SignUpLayer from "../components/SignUpLayer";
import AccountService from "../services/api/auth";

interface Credentials {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

const SignUpPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (credentials: Credentials): Promise<void> => {
    setLoading(true);
    try {
      const response = await AccountService.register(credentials);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error during user registration:", error);
      throw error;
    }
  };

  return (
    <>
      {/* SignUpLayer */}
      <SignUpLayer handleSignUp={handleSignUp} loading={loading} />
    </>
  );
};

export default SignUpPage; 