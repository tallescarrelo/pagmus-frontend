import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInLayer from "../components/SignInLayer";
import { useAuth } from "../contexts/AuthContext";

interface Credentials {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  // Redirecionar se já estiver autenticado (apenas uma vez)
  useEffect(() => {
    if (isAuthenticated && !loading && !authLoading) {
      navigate("/Dashboard");
    }
  }, [isAuthenticated, loading, authLoading, navigate]);

  const handleAuthenticate = async (credentials: Credentials): Promise<void> => {
    setLoading(true);
    try {
      const result = await login(credentials.email, credentials.password);
      console.log("Login result:", result);

      if (result?.success) {
        // Aguardar um pouco antes de navegar para evitar loops
        setTimeout(() => {
          navigate("/Dashboard");
        }, 100);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      // Aqui você pode adicionar uma notificação de erro
    } finally {
      setLoading(false);
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