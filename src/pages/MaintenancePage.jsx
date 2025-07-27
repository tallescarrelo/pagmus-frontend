import React from "react";

const MaintenancePage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="display-4 mb-4">Manutenção</h1>
        <p className="lead mb-4">Sistema em manutenção. Voltaremos em breve.</p>
        <a href="/" className="btn btn-primary">
          Voltar ao Login
        </a>
      </div>
    </div>
  );
};

export default MaintenancePage;
