import { useState } from "react";

interface Dimensions {
  height: string;
  width: string;
  length: string;
  weight: string;
}

interface ProductData {
  is_available: string;
  warranty_time: string;
  salesPageUrl: string;
  thanksPageUrl: string;
  complaintUrl: string;
  supportEmail: string;
  dimensions: Dimensions;
  packageType: string;
  [key: string]: any;
}

interface RegisterProductStepTwoProps {
  onBack: () => void;
  onNext: () => void;
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
}

const RegisterProductStepTwo: React.FC<RegisterProductStepTwoProps> = ({ onBack, onNext, data, updateData }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    updateData({
      dimensions: {
        ...data.dimensions,
        [name]: value,
      },
    });
  };

  const validateFields = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (!data.is_available) newErrors.is_available = true;
    if (!data.warranty_time) newErrors.warranty_time = true;
    if (!data.salesPageUrl) newErrors.salesPageUrl = true;
    if (!data.thanksPageUrl) newErrors.thanksPageUrl = true;
    if (!data.complaintUrl) newErrors.complaintUrl = true;
    if (!data.supportEmail) newErrors.supportEmail = true;
    if (!data.dimensions?.height) newErrors.height = true;
    if (!data.dimensions?.width) newErrors.width = true;
    if (!data.dimensions?.length) newErrors.length = true;
    if (!data.dimensions?.weight) newErrors.weight = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateFields()) onNext();
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
          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-primary text-sm fw-semibold">Informações complementares</span>
              <span className="text-primary text-sm fw-semibold">Etapa 2/4</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary" style={{ width: "50%" }}></div>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Disponível para venda? *</label>
            <div className="col-sm-9">
              <select
                className={`form-select ${errors.is_available ? "is-invalid" : ""}`}
                name="is_available"
                value={data.is_available}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Yes">Sim</option>
                <option value="No">Não</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Tempo de garantia *</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="warranty_time"
                value={data.warranty_time}
                onChange={handleChange}
                className={`form-control ${errors.warranty_time ? "is-invalid" : ""}`}
                placeholder="Digite o tempo de garantia"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">URL da página de vendas *</label>
            <div className="col-sm-9">
              <input
                type="url"
                name="salesPageUrl"
                value={data.salesPageUrl}
                onChange={handleChange}
                className={`form-control ${errors.salesPageUrl ? "is-invalid" : ""}`}
                placeholder="Digite a URL da página de vendas"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">URL da página de agradecimento *</label>
            <div className="col-sm-9">
              <input
                type="url"
                name="thanksPageUrl"
                value={data.thanksPageUrl}
                onChange={handleChange}
                className={`form-control ${errors.thanksPageUrl ? "is-invalid" : ""}`}
                placeholder="Digite a URL da página de agradecimento"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">URL de reclamações *</label>
            <div className="col-sm-9">
              <input
                type="url"
                name="complaintUrl"
                value={data.complaintUrl}
                onChange={handleChange}
                className={`form-control ${errors.complaintUrl ? "is-invalid" : ""}`}
                placeholder="Digite a URL de reclamações"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Email de suporte *</label>
            <div className="col-sm-9">
              <input
                type="email"
                name="supportEmail"
                value={data.supportEmail}
                onChange={handleChange}
                className={`form-control ${errors.supportEmail ? "is-invalid" : ""}`}
                placeholder="Digite o email de suporte"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Tipo de embalagem</label>
            <div className="col-sm-9">
              <select
                className="form-select"
                name="packageType"
                value={data.packageType}
                onChange={handleChange}
              >
                <option value="">Selecione o tipo de embalagem</option>
                <option value="box">Caixa</option>
                <option value="envelope">Envelope</option>
                <option value="plastic">Plástico</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Dimensões *</label>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-md-3">
                  <input
                    type="text"
                    name="height"
                    value={data.dimensions?.height || ""}
                    onChange={handleDimensionsChange}
                    className={`form-control ${errors.height ? "is-invalid" : ""}`}
                    placeholder="Altura (cm)"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="width"
                    value={data.dimensions?.width || ""}
                    onChange={handleDimensionsChange}
                    className={`form-control ${errors.width ? "is-invalid" : ""}`}
                    placeholder="Largura (cm)"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="length"
                    value={data.dimensions?.length || ""}
                    onChange={handleDimensionsChange}
                    className={`form-control ${errors.length ? "is-invalid" : ""}`}
                    placeholder="Comprimento (cm)"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    name="weight"
                    value={data.dimensions?.weight || ""}
                    onChange={handleDimensionsChange}
                    className={`form-control ${errors.weight ? "is-invalid" : ""}`}
                    placeholder="Peso (kg)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button onClick={onBack} className="btn btn-secondary">
              Anterior
            </button>
            <button onClick={handleNext} className="btn btn-primary">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepTwo; 