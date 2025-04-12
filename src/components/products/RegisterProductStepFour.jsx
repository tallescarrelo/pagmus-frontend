import { useState } from "react";

const RegisterProductStepFour = ({ onBack, data, updateData, onSubmit }) => {
  const [isOn, setIsOn] = useState(false);
  const [storeVisible, setStoreVisible] = useState(false);
  const [autoAprove, setAutoAprove] = useState(false);
  const [acessBuyerData, setAcessBuyerData] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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
    <div className="max-w-[600px] mx-auto bg-white p-8 rounded-2xl shadow-sm space-y-8">
      {/* Título e status */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#030229]">
            Cadastro de Produto
          </h1>
          <div className="bg-[#ECFDF3] inline-block px-2 py-1 mt-1 rounded-md">
            <span className="text-[#008B52] text-xs font-medium">Ativo</span>
          </div>
        </div>
        <span className="text-[#44ADD4] text-sm font-bold self-end">
          Etapa 2/4
        </span>
      </div>

      {/* PRIMEIRA PARTE */}
      <div className="flex flex-row w-full mt-2">
        <span className="text-sm font-medium">
          Participar do Programa de Afiliados?
        </span>
        <div
          className={`ml-2 w-10 h-5 rounded-full relative cursor-pointer transition-all ${
            isOn ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => setIsOn(!isOn)}
        >
          <div
            className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${
              isOn ? "left-[22px]" : "left-[2px]"
            }`}
          />
        </div>
      </div>

      {!isOn && (
        <>
          {[
            {
              label: "Visível na Loja?",
              value: storeVisible,
              set: setStoreVisible,
            },
            {
              label: "Aprovação automática?",
              value: autoAprove,
              set: setAutoAprove,
            },
            {
              label: "Acesso aos dados do comprador?",
              value: acessBuyerData,
              set: setAcessBuyerData,
            },
          ].map(({ label, value, set }) => (
            <div key={label} className="flex flex-row w-full mt-2">
              <span className="text-sm font-medium">{label}</span>
              <div
                className={`ml-2 w-10 h-5 rounded-full relative cursor-pointer transition-all ${
                  value ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => set(!value)}
              >
                <div
                  className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${
                    value ? "left-[22px]" : "left-[2px]"
                  }`}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col w-full mt-8">
            <label className="text-sm font-medium text-[#344054] mb-1">
              Tempo do Cookie*
            </label>
            <select
              name="cookieTime"
              value={data.affiliateProgram.cookieTime}
              onChange={handleChange}
              className="form-select form-select-sm flex bg-base text-secondary-light"
            >
              <option disabled value="">
                Selecione o tempo dos cookies
              </option>
              <option value="forever">Eterno</option>
              <option value="30days">30 dias</option>
              <option value="60days">60 dias</option>
              <option value="90days">90 dias</option>
              <option value="120days">120 dias</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div className="flex flex-col w-full mt-8">
            <label className="text-sm font-medium text-[#344054] mb-1">
              Valor do Cookie
            </label>
            <input
              name="cookieValue"
              value={data.affiliateProgram.cookieValue}
              onChange={handleChange}
              className="form-control h-56-px bg-neutral-50 radius-12"
              placeholder="Digite o valor do tempo de Cookie"
            />
          </div>

          <div className="flex flex-col w-full mt-8">
            <label className="text-sm font-medium text-[#344054] mb-1">
              Tipo de comissionamento
            </label>
            <select
              name="commissionType"
              value={data.affiliateProgram.comission_type}
              onChange={handleChange}
              className="form-select form-select-sm flex bg-base text-secondary-light"
            >
              <option disabled value="">
                Selecione o tipo de comissionamento
              </option>
              <option value="firstClick">Primeiro Clique</option>
              <option value="lastClick">Último Clique</option>
            </select>
          </div>

          <div className="flex flex-col w-full mt-4 mb-4">
            <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <span className="text-sm font-medium">
                Selecione o tipo de comissão
              </span>
              <select
                className="form-select form-select-sm flex bg-base text-secondary-light"
                name="comission_type"
                value={data.affiliateProgram.comission_type}
                onChange={handleChange}
              >
                <option value="fix-percentage">Porcentagem</option>
                <option value="fix-value">Valor fixo</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full mt-8">
            <input
              name="comission_value"
              value={data.affiliateProgram.comission_value}
              onChange={handleChange}
              placeholder="Digite o valor da comissão"
              className="form-control h-56-px bg-neutral-50 radius-12"
            />
          </div>
        </>
      )}

      {/* Botões */}
      <div className="flex justify-between mt-64">
        <button
          onClick={onBack}
          className="border border-[#D0D5DD] rounded-fulltext-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
        >
          Voltar
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export default RegisterProductStepFour;
