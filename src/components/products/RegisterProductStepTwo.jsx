import { useState } from "react";

const RegisterProductStepTwo = ({ onBack, onNext, data, updateData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleDimensionsChange = (e) => {
    const { name, value } = e.target;
    updateData({
      dimensions: {
        ...data.dimensions,
        [name]: value,
      },
    });
  };

  const validateFields = () => {
    const newErrors = {};
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

  const handleNext = () => {
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
            <label className="form-label mb-0 col-sm-3">URL da página de obrigado *</label>
            <div className="col-sm-9">
              <input
                type="url"
                name="thanksPageUrl"
                value={data.thanksPageUrl}
                onChange={handleChange}
                className={`form-control ${errors.thanksPageUrl ? "is-invalid" : ""}`}
                placeholder="Digite a URL da página de obrigado"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">URL do Reclame Aqui *</label>
            <div className="col-sm-9">
              <input
                type="url"
                name="complaintUrl"
                value={data.complaintUrl}
                onChange={handleChange}
                className={`form-control ${errors.complaintUrl ? "is-invalid" : ""}`}
                placeholder="Digite a URL do Reclame Aqui"
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">E-mail de suporte *</label>
            <div className="col-sm-9">
              <input
                type="email"
                name="supportEmail"
                value={data.supportEmail}
                onChange={handleChange}
                className={`form-control ${errors.supportEmail ? "is-invalid" : ""}`}
                placeholder="Digite o e-mail de suporte"
              />
            </div>
          </div>

          <div className="row gy-3">
            {[
              { label: "Altura (A)*", name: "height", helper: "Em cm. Máx: 105cm / Mín: 2cm." },
              { label: "Largura (L)*", name: "width", helper: "Em cm. Máx: 105cm / Mín: 16cm." },
              { label: "Comprimento (C)*", name: "length", helper: "Em cm. Máx: 105cm / Mín: 11cm." },
              { label: "Peso (Kg)*", name: "weight", helper: "Entre 0.010Kg e 30.000Kg." },
            ].map(({ label, name, helper }) => (
              <div className="col-md-6" key={name}>
                <div className="mb-24">
                  <label className="form-label">{label}</label>
                  <input
                    type="number"
                    name={name}
                    value={data.dimensions[name]}
                    onChange={handleDimensionsChange}
                    className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                    placeholder={`Digite ${label.toLowerCase()}`}
                  />
                  <small className="text-muted">{helper}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button onClick={onBack} className="btn btn-outline-secondary" type="button">
              Voltar
            </button>
            <button onClick={handleNext} className="btn btn-primary-600" type="button">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepTwo;
