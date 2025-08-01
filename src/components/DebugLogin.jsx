import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const DebugLogin = () => {
  const [loginStatus, setLoginStatus] = useState('Não logado');
  const [token, setToken] = useState(null);

  const doLogin = async () => {
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

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setLoginStatus('Logado com sucesso!');
        console.log('Login realizado:', data);
      } else {
        setLoginStatus('Erro no login: ' + data.message);
      }
    } catch (error) {
      setLoginStatus('Erro: ' + error.message);
    }
  };

  const checkToken = () => {
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