import React, { useState } from "react";
import SignUpLayer from "../components/SignUpLayer";
import AccountService from "../services/api";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (credentials) => {
    setLoading(true);
    try {
      const response = await AccountService.register(credentials);
      console.log("response", response);
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
