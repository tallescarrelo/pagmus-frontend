import { useState } from "react";

const RegisterProductStepFour = ({ onBack, data, updateData, onSubmit }) => {
  const [isOn, setIsOn] = useState(false);
  const [storeVisible, setStoreVisible] = useState(false);
  const [autoAprove, setAutoAprove] = useState(false);
  const [acessBuyerData, setAcessBuyerData] = useState(false);

  const handleSubmit = async () => {
    await onSubmit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      affiliateProgram: {
        ...data.affiliateProgram,
        [name]: value,
      },
    });
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-0">Cadastro de Produto</h5>
          </div>
        </div>

        <div className="card-body">
          {/* Barra de progresso */}
          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-primary text-sm fw-semibold">Programa de Afiliados</span>
              <span className="text-primary text-sm fw-semibold">Etapa 4/4</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary" style={{ width: "100%" }}></div>
            </div>
          </div>

          {/* Participa do programa */}
          <div className="row mb-24 align-items-center">
            <label className="form-label col-sm-6 mb-0">Participar do Programa de Afiliados?</label>
            <div className="col-sm-6">
              <div
                className={`form-switch cursor-pointer ${isOn ? "bg-success" : "bg-secondary-subtle"}`}
                onClick={() => setIsOn(!isOn)}
                style={{
                  width: "42px",
                  height: "22px",
                  borderRadius: "9999px",
                  position: "relative",
                }}
              >
                <div
                  className="bg-white"
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    position: "absolute",
                    top: "3px",
                    left: isOn ? "22px" : "3px",
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>
          </div>

          {!isOn && (
            <>
              {[
                { label: "Visível na Loja?", value: storeVisible, set: setStoreVisible },
                { label: "Aprovação automática?", value: autoAprove, set: setAutoAprove },
                { label: "Acesso aos dados do comprador?", value: acessBuyerData, set: setAcessBuyerData },
              ].map(({ label, value, set }) => (
                <div key={label} className="row mb-24 align-items-center">
                  <label className="form-label col-sm-6 mb-0">{label}</label>
                  <div className="col-sm-6">
                    <div
                      className={`form-switch cursor-pointer ${value ? "bg-success" : "bg-secondary-subtle"}`}
                      onClick={() => set(!value)}
                      style={{
                        width: "42px",
                        height: "22px",
                        borderRadius: "9999px",
                        position: "relative",
                      }}
                    >
                      <div
                        className="bg-white"
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "9999px",
                          position: "absolute",
                          top: "3px",
                          left: value ? "22px" : "3px",
                          transition: "all 0.2s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Tempo do Cookie */}
              <div className="row mb-24 align-items-center">
                <label className="form-label col-sm-3 mb-0">Tempo do Cookie*</label>
                <div className="col-sm-9">
                  <select
                    name="cookieTime"
                    value={data.affiliateProgram.cookieTime}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option disabled value="">Selecione o tempo dos cookies</option>
                    <option value="forever">Eterno</option>
                    <option value="30days">30 dias</option>
                    <option value="60days">60 dias</option>
                    <option value="90days">90 dias</option>
                    <option value="120days">120 dias</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>

              {/* Valor do Cookie */}
              <div className="row mb-24 align-items-center">
                <label className="form-label col-sm-3 mb-0">Valor do Cookie</label>
                <div className="col-sm-9">
                  <input
                    name="cookieValue"
                    value={data.affiliateProgram.cookieValue}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite o valor do tempo de Cookie"
                  />
                </div>
              </div>

              {/* Tipo de comissionamento */}
              <div className="row mb-24 align-items-center">
                <label className="form-label col-sm-3 mb-0">Tipo de comissionamento</label>
                <div className="col-sm-9">
                  <select
                    name="commissionType"
                    value={data.affiliateProgram.commissionType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option disabled value="">Selecione o tipo de comissionamento</option>
                    <option value="firstClick">Primeiro Clique</option>
                    <option value="lastClick">Último Clique</option>
                  </select>
                </div>
              </div>

              {/* Tipo de comissão */}
              <div className="row mb-24 align-items-center">
                <label className="form-label col-sm-3 mb-0">Tipo de comissão</label>
                <div className="col-sm-9">
                  <select
                    name="comission_type"
                    value={data.affiliateProgram.comission_type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="fix-percentage">Porcentagem</option>
                    <option value="fix-value">Valor fixo</option>
                  </select>
                </div>
              </div>

              {/* Valor da comissão */}
              <div className="row mb-24 align-items-center">
                <label className="form-label col-sm-3 mb-0">Valor da comissão</label>
                <div className="col-sm-9">
                  <input
                    name="comission_value"
                    value={data.affiliateProgram.comission_value}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite o valor da comissão"
                  />
                </div>
              </div>
            </>
          )}

          {/* Botões */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button onClick={onBack} className="btn btn-outline-secondary" type="button">
              Voltar
            </button>
            <button onClick={handleSubmit} className="btn btn-primary-600" type="button">
              Finalizar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepFour;
