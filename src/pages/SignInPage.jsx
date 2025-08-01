import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInLayer from "../components/SignInLayer";
import { setToken, setUser } from "../redux/reducers/userReducer";
import AccountService from "../services/api/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const handleAuthenticate = async (credentials) => {
    setLoading(true);
    try {
      const response = await AccountService.login(credentials);
      console.log("response", response);

      if (response?.success && response?.token) {
        dispatch(setToken(response.token));
        localStorage.setItem("token", response.token);

        dispatch(setUser(response.user));
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
