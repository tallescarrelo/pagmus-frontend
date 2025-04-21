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

      if (response?.access_token) {
        dispatch(setToken(response.access_token));
        localStorage.setItem("token", response.access_token);

        const { access_token, ...userData } = response;
        dispatch(setUser(userData));
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
