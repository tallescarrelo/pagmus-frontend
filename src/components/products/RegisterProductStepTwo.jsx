const RegisterProductStepTwo = ({ onBack, onNext, data, updateData }) => {
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

  const handleToggleAvailable = () => {
    updateData({ availableForSale: !data.availableForSale });
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

      {/* Switch de Disponível para venda */}

      <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
        <span className="text-sm font-medium">Disponível para a venda?</span>
        <select
          className="form-select form-select-sm flex bg-base text-secondary-light"
          name="is_available"
          value={data.is_available}
          onChange={handleChange}
        >
          <option value="Yes">Sim</option>
          <option value="No">Não</option>
        </select>
      </div>

      {/* Inputs principais */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="text-[#344054] text-sm font-medium mb-1">
            Tempo de garantia
          </label>
          <input
            type="text"
            name="warranty_time"
            value={data.warranty_time}
            onChange={handleChange}
            placeholder="Digite o tempo de garantia"
            className="form-control h-56-px bg-neutral-50 radius-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344054] mb-1">
            URL da página de vendas
          </label>
          <input
            type="url"
            name="salesPageUrl"
            value={data.salesPageUrl}
            onChange={handleChange}
            placeholder="Digite a URL da página de vendas"
            className="form-control h-56-px bg-neutral-50 radius-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344054] mb-1">
            URL da página de obrigado
          </label>
          <input
            type="url"
            name="thanksPageUrl"
            value={data.thanksPageUrl}
            onChange={handleChange}
            placeholder="Digite a URL da página de obrigado"
            className="form-control h-56-px bg-neutral-50 radius-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344054] mb-1">
            URL da página do Reclame Aqui
          </label>
          <input
            type="url"
            name="complaintUrl"
            value={data.complaintUrl}
            onChange={handleChange}
            placeholder="Digite a URL do Reclame Aqui"
            className="form-control h-56-px bg-neutral-50 radius-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#344054] mb-1">
            E-mail de suporte
          </label>
          <input
            type="email"
            name="supportEmail"
            value={data.supportEmail}
            onChange={handleChange}
            placeholder="Digite o e-mail de suporte"
            className="form-control h-56-px bg-neutral-50 radius-12"
          />
        </div>
      </div>

      {/* Dimensões e peso */}
      <div className="grid grid-cols-2 gap-6">
        {[
          {
            label: "Altura (A)*",
            name: "height",
            helper: "Em cm. Máx: 105cm / Mín: 2cm.",
          },
          {
            label: "Largura (L)*",
            name: "width",
            helper: "Em cm. Máx: 105cm / Mín: 16cm.",
          },
          {
            label: "Comprimento (C)*",
            name: "length",
            helper: "Em cm. Máx: 105cm / Mín: 11cm.",
          },
          {
            label: "Peso (Kg)*",
            name: "weight",
            helper: "Entre 0.010Kg e 30.000Kg.",
          },
        ].map(({ label, name, helper }) => (
          <div key={name} className="col-span-1">
            <label className="block text-sm font-medium text-[#344054] mb-1">
              {label}
            </label>
            <input
              type="number"
              name={name}
              value={data.dimensions[name]}
              onChange={handleDimensionsChange}
              placeholder={`Digite ${label.toLowerCase()}`}
              className="form-control h-56-px bg-neutral-50 radius-12"
            />
            <p className="text-xs text-[#B2B2B2] mt-1">{helper}</p>
          </div>
        ))}
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

export default RegisterProductStepTwo;
