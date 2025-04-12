const RegisterProductStepThree = ({ onBack, onNext, data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleToggle = (field) => {
    updateData({ [field]: !data[field] });
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

      {/* CEP */}
      <div className="flex flex-col w-full mt-8">
        <label className="text-[#344054] text-[14px] font-medium mb-1">
          CEP de origem *
        </label>
        <input
          name="originZipCode"
          value={data.originZipCode}
          onChange={handleChange}
          placeholder="Digite o CEP de origem"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
        <p className="text-[#B2B2B2] text-[12px] leading-6 mt-1">
          Digite o CEP de onde o produto será enviado
        </p>
      </div>

      {/* Tipo de frete */}
      <div className="flex flex-col w-full mt-8">
        <label className="text-[#344054] text-[14px] font-medium mb-1">
          Tipo de frete *
        </label>
        <select
          name="shippingType"
          value={data.shippingType}
          onChange={handleChange}
          className="form-select form-select-sm flex bg-base text-secondary-light"
        >
          <option value="">Selecione o tipo de frete</option>
          <option value="fixed">Frete fixo</option>
          <option value="variable">Frete variável ou grátis</option>
        </select>
      </div>

      {/* PAC Grátis */}

      <div className="flex flex-col w-full mt-8">
        <label className="text-[#344054] text-[14px] font-medium mb-1">
          PAC Grátis
        </label>
        <select
          name="freePac"
          value={data.freePac}
          onChange={handleChange}
          className="form-select form-select-sm flex bg-base text-secondary-light"
        >
          <option value="">Pac Grátis?</option>
          <option value="fixed">Sim</option>
          <option value="variable">Não</option>
        </select>
      </div>

      {/* Aceita Sedex */}
      <div className="flex flex-col w-full mt-8">
        <label className="text-[#344054] text-[14px] font-medium mb-1">
          Aceita sedex?
        </label>
        <select
          name="acceptsSedex"
          value={data.acceptsSedex}
          onChange={handleChange}
          className="form-select form-select-sm flex bg-base text-secondary-light"
        >
          <option value="">Aceita sedex?</option>
          <option value="fixed">Sim</option>
          <option value="variable">Não</option>
        </select>
      </div>

      {/* Valor padrão */}
      <div className="flex flex-col w-full mt-8">
        <label className="text-[#344054] text-[14px] font-medium mb-1">
          Valor padrão do frete
        </label>
        <input
          name="defaultShippingValue"
          value={data.defaultShippingValue}
          onChange={handleChange}
          placeholder="Digite o valor padrão do frete"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
        <p className="text-[#B2B2B2] text-[12px] leading-6 mt-1">
          Para evitar perder vendas quando o cálculo de frete dos Correios
          falhar, defina um valor padrão para essas situações.
        </p>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-64">
        <button
          onClick={onBack}
          className="border border-[#D0D5DD] rounded-fulltext-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default RegisterProductStepThree;
