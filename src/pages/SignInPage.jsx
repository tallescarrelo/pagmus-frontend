import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInLayer from "../components/SignInLayer";
import AccountService from "../services/api";

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // TODO: SALVAR TOKEN PÓS LOGIN
  const handleAuthenticate = async (credentials) => {
    setLoading(true);
    try {
      const response = await AccountService.login(credentials);
      console.log(response);
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
