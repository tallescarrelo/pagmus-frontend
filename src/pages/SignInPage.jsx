import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInLayer from "../components/SignInLayer";
import AccountService from "../services/api/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // TODO: SALVAR TOKEN PÓS LOGIN
  const handleAuthenticate = async (credentials) => {
    setLoading(true);
    try {
      const response = await AccountService.login(credentials);

      if (response?.access_token) {
        localStorage.setItem("token", response.access_token);
      }

      navigate("/Dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {/* SignInLayer */}
      <SignInLayer handleAuthenticate={handleAuthenticate} loading={loading} />
    </>
  );
};

export default SignInPage;
