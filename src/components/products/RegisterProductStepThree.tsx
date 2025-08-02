import { useState } from "react";
import { Upload } from "lucide-react";

interface ProductData {
  originZipCode: string;
  shippingType: string;
  freePac: string;
  acceptsSedex: string;
  defaultShippingValue: string;
  [key: string]: any;
}

interface RegisterProductStepThreeProps {
  onBack: () => void;
  onNext: () => void;
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
}

const RegisterProductStepThree: React.FC<RegisterProductStepThreeProps> = ({ onBack, onNext, data, updateData }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const validateFields = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (!data.originZipCode) newErrors.originZipCode = true;
    if (!data.shippingType) newErrors.shippingType = true;
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
          {/* Barra de progresso */}
          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-primary text-sm fw-semibold">Frete e envio</span>
              <span className="text-primary text-sm fw-semibold">Etapa 3/4</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary" style={{ width: "75%" }}></div>
            </div>
          </div>

          {/* CEP de origem */}
          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label col-sm-3 mb-0">CEP de origem *</label>
            <div className="col-sm-9">
              <input
                name="originZipCode"
                value={data.originZipCode}
                onChange={handleChange}
                placeholder="Digite o CEP de origem"
                className={`form-control ${errors.originZipCode ? "is-invalid" : ""}`}
              />
              <small className="text-muted">Digite o CEP de onde o produto será enviado</small>
            </div>
          </div>

          {/* Tipo de frete */}
          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label col-sm-3 mb-0">Tipo de frete *</label>
            <div className="col-sm-9">
              <select
                name="shippingType"
                value={data.shippingType}
                onChange={handleChange}
                className={`form-select ${errors.shippingType ? "is-invalid" : ""}`}
              >
                <option value="">Selecione o tipo de frete</option>
                <option value="fixed">Frete fixo</option>
                <option value="variable">Frete variável ou grátis</option>
              </select>
            </div>
          </div>

          {/* PAC Grátis */}
          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label col-sm-3 mb-0">PAC Grátis</label>
            <div className="col-sm-9">
              <select
                name="freePac"
                value={data.freePac}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Pac Grátis?</option>
                <option value="fixed">Sim</option>
                <option value="variable">Não</option>
              </select>
            </div>
          </div>

          {/* Aceita Sedex */}
          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label col-sm-3 mb-0">Aceita Sedex?</label>
            <div className="col-sm-9">
              <select
                name="acceptsSedex"
                value={data.acceptsSedex}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Aceita Sedex?</option>
                <option value="fixed">Sim</option>
                <option value="variable">Não</option>
              </select>
            </div>
          </div>

          {/* Valor padrão do frete */}
          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label col-sm-3 mb-0">Valor padrão do frete</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="defaultShippingValue"
                value={data.defaultShippingValue}
                onChange={handleChange}
                placeholder="Digite o valor padrão do frete"
                className="form-control"
              />
              <small className="text-muted">Deixe em branco se o frete for grátis</small>
            </div>
          </div>

          {/* Botões de navegação */}
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

export default RegisterProductStepThree; 