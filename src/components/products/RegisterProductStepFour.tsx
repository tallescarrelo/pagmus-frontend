import { useState } from "react";

interface AffiliateProgram {
  enabled: boolean;
  storeVisible: boolean;
  autoApprove: boolean;
  buyerDataAccess: boolean;
  cookieTime: string;
  cookieValue: string;
  comission_type: 'percentage' | 'fixed';
  comission_value: number;
  [key: string]: any;
}

interface ProductData {
  affiliateProgram: AffiliateProgram;
  [key: string]: any;
}

interface RegisterProductStepFourProps {
  onBack: () => void;
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
  onSubmit: () => Promise<void>;
}

const RegisterProductStepFour: React.FC<RegisterProductStepFourProps> = ({ onBack, data, updateData, onSubmit }) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [storeVisible, setStoreVisible] = useState<boolean>(false);
  const [autoAprove, setAutoAprove] = useState<boolean>(false);
  const [acessBuyerData, setAcessBuyerData] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    await onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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

              {/* Tempo do cookie */}
              <div className="row mb-24 gy-3 align-items-center">
                <label className="form-label mb-0 col-sm-3">Tempo do cookie</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="cookieTime"
                    value={data.affiliateProgram?.cookieTime || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite o tempo do cookie"
                  />
                </div>
              </div>

              {/* Valor do cookie */}
              <div className="row mb-24 gy-3 align-items-center">
                <label className="form-label mb-0 col-sm-3">Valor do cookie</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="cookieValue"
                    value={data.affiliateProgram?.cookieValue || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite o valor do cookie"
                  />
                </div>
              </div>

              {/* Tipo de comissão */}
              <div className="row mb-24 gy-3 align-items-center">
                <label className="form-label mb-0 col-sm-3">Tipo de comissão</label>
                <div className="col-sm-9">
                  <select
                    name="comission_type"
                    value={data.affiliateProgram?.comission_type || ""}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Selecione o tipo de comissão</option>
                    <option value="percentage">Porcentagem</option>
                    <option value="fixed">Valor fixo</option>
                  </select>
                </div>
              </div>

              {/* Valor da comissão */}
              <div className="row mb-24 gy-3 align-items-center">
                <label className="form-label mb-0 col-sm-3">Valor da comissão</label>
                <div className="col-sm-9">
                  <input
                    type="number"
                    name="comission_value"
                    value={data.affiliateProgram?.comission_value || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Digite o valor da comissão"
                  />
                </div>
              </div>
            </>
          )}

          {/* Botões de navegação */}
          <div className="d-flex justify-content-between">
            <button onClick={onBack} className="btn btn-secondary">
              Anterior
            </button>
            <button onClick={handleSubmit} className="btn btn-primary">
              Finalizar Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepFour; 