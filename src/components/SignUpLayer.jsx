import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpLayer = ({ handleSignUp, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [image, setImage] = useState("teste");
  const [password, setPassword] = useState("");

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="Logo" />
            </Link>
            <h4 className="mb-12">Crie sua conta</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Bem-vindo! Preencha seus dados para se cadastrar.
            </p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSignUp({ name, email, password, image, phone, cpf });
          }}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="f7:person" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:phone" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="lucide:file" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="CPF ou CNPJ"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>

            <div className="mb-20">
              <div className="position-relative">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type="password"
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    id="your-password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <span
                  className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  data-toggle="#your-password"
                />
              </div>
              <span className="mt-12 text-sm text-secondary-light">
                Sua senha deve conter pelo menos 8 caracteres.
              </span>
            </div>

            <div className="d-flex justify-content-between gap-2">
              <div className="form-check style-check d-flex align-items-start">
                <input
                  className="form-check-input border border-neutral-300 mt-4"
                  type="checkbox"
                  id="condition"
                />
                <label
                  className="form-check-label text-sm"
                  htmlFor="condition"
                >
                  Ao criar uma conta, você concorda com os{" "}
                  <Link to="#" className="text-primary-600 fw-semibold">
                    Termos e Condições
                  </Link>{" "}
                  e com nossa{" "}
                  <Link to="#" className="text-primary-600 fw-semibold">
                    Política de Privacidade
                  </Link>.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>

            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Já possui uma conta?{" "}
                <Link to="/" className="text-primary-600 fw-semibold">
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
