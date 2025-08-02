import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
}

const DebugLogin: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<string>('Não logado');
  const [token, setToken] = useState<string | null>(null);

  const doLogin = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: "test@pagmus.com",
          password: "123456"
        })
      });

      const data: LoginResponse = await response.json();
      
      if (data.success) {
        localStorage.setItem('auth_token', data.token || '');
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token || null);
        setLoginStatus('Logado com sucesso!');
        console.log('Login realizado:', data);
      } else {
        setLoginStatus('Erro no login: ' + (data.message || 'Erro desconhecido'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setLoginStatus('Erro: ' + errorMessage);
    }
  };

  const checkToken = (): void => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setLoginStatus('Token encontrado');
    } else {
      setLoginStatus('Nenhum token encontrado');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h6 className="mb-0">
          <Icon icon="mdi:bug" className="me-2" />
          Debug Login
        </h6>
      </div>
      <div className="card-body">
        <p><strong>Status:</strong> {loginStatus}</p>
        {token && (
          <p><strong>Token:</strong> <code>{token.substring(0, 50)}...</code></p>
        )}
        <div className="d-flex gap-2">
          <Button variant="primary" size="sm" onClick={doLogin}>
            <Icon icon="mdi:login" className="me-2" />
            Fazer Login
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={checkToken}>
            <Icon icon="mdi:refresh" className="me-2" />
            Verificar Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebugLogin; 