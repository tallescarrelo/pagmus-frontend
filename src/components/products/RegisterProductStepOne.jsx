import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const RegisterProductStepOne = ({ onNext, data, updateData }) => {
  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => updateData({ image: files[0] }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const formatted = value.replace(/[^0-9]/g, "");
      updateData({ [name]: formatted });
    } else {
      updateData({ [name]: value });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = true;
    if (!data.description) newErrors.description = true;
    if (!data.category) newErrors.category = true;
    if (!data.tags) newErrors.tags = true;
    if (!data.format) newErrors.format = true;
    if (!data.price) newErrors.price = true;
    if (!data.image) newErrors.image = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) onNext();
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Cadastro de Produto</h5>
        </div>
        <div className="card-body">
          <div className="mb-24">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-primary text-sm fw-semibold">Detalhe do produto</span>
              <span className="text-primary text-sm fw-semibold">Etapa 1/4</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div className="progress-bar bg-primary" style={{ width: "25%" }}></div>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Nome *</label>
            <div className="col-sm-9">
              <input type="text" name="name" value={data.name} onChange={handleChange} className={`form-control ${errors.name ? "is-invalid" : ""}`} placeholder="Digite o nome do produto" />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Descrição *</label>
            <div className="col-sm-9">
              <textarea name="description" value={data.description} onChange={handleChange} className={`form-control ${errors.description ? "is-invalid" : ""}`} placeholder="Digite a descrição do produto" />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Categoria *</label>
            <div className="col-sm-9">
              <select name="category" value={data.category} onChange={handleChange} className={`form-select ${errors.category ? "is-invalid" : ""}`}>
                <option disabled value="">Selecione uma categoria</option>
                <option value="1">Administração e Negócios</option>
                <option value="2">Animais de Estimação</option>
                <option value="3">Arquitetura e Engenharia</option>
                <option value="4">Artes e Música</option>
                <option value="5">Auto-ajuda e Desenvolvimento Pessoal</option>
                <option value="6">Automóveis</option>
                <option value="7">Blogs e Redes Sociais</option>
                <option value="8">Casa e Jardinagem</option>
                <option value="9">Culinária, Gastronomia, Receitas</option>
                <option value="10">Design e Templates PSD, PPT ou HTML</option>
                <option value="11">Edição de Áudio, Vídeo ou Imagens</option>
                <option value="12">Educacional, Cursos Técnicos e Profissionalizantes</option>
                <option value="13">Entretenimento, Lazer e Diversão</option>
                <option value="14">Esportes e Fitness</option>
                <option value="15">Filmes e Cinema</option>
                <option value="16">Geral</option>
                <option value="17">Histórias em Quadrinhos</option>
                <option value="18">Idiomas</option>
                <option value="19">Informática</option>
                <option value="20">Internet Marketing</option>
                <option value="21">Investimentos e Finanças</option>
                <option value="22">Jogos de Cartas, Poker, Loterias</option>
                <option value="23">Jogos de Computador, Jogos Online</option>
                <option value="24">Jurídico</option>
                <option value="25">Literatura e Poesia</option>
                <option value="26">Marketing de Rede</option>
                <option value="27">Marketing e Comunicação</option>
                <option value="28">Meio Ambiente</option>
                <option value="29">Música, Bandas e Shows</option>
                <option value="30">Paquera, Sedução e Relacionamentos</option>
                <option value="31">Plugins, Widgets e Extensões</option>
                <option value="32">Produtividade e Organização Pessoal</option>
                <option value="33">Relatórios, Artigos e Pesquisas</option>
                <option value="34">Religião e Crenças</option>
                <option value="35">Romances, Dramas, Estórias e Contos</option>
                <option value="36">RPG e Jogos de Mesa</option>
                <option value="37">Saúde, Bem-estar e Beleza</option>
                <option value="38">Scripts</option>
                <option value="39">Segurança do Trabalho</option>
                <option value="40">Sexologia e Sexualidade</option>
                <option value="41">Snippets (Trechos de Vídeo)</option>
                <option value="42">Turismo</option>
                <option value="43">Pessoas com deficiência</option>
                <option value="44">Moda e vestuário</option>
                <option value="45">Produtos infantis</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Tags *</label>
            <div className="col-sm-9">
              <input type="text" name="tags" value={data.tags} onChange={handleChange} className={`form-control ${errors.tags ? "is-invalid" : ""}`} placeholder="Digite as tags do produto" />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Formato *</label>
            <div className="col-sm-9">
              <select name="format" value={data.format} onChange={handleChange} className={`form-select ${errors.format ? "is-invalid" : ""}`}>
                <option value="physical-product">Produto Físico</option>
                <option value="digital-product">Produto Digital</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Preço *</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="price"
                value={data.price ? `R$ ${parseFloat(data.price / 100).toFixed(2).replace('.', ',')}` : ""}
                onChange={handleChange}
                placeholder="Digite o preço do produto"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
              />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">URL Slug</label>
            <div className="col-sm-9">
              <input type="text" name="url_slug" value={data.url_slug} onChange={handleChange} placeholder="Digite o slug da URL (opcional)" className="form-control" />
              <small className="text-muted d-block mt-1">Se não preenchido, será gerado automaticamente a partir do nome</small>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Imagem do Produto *</label>
            <div className="col-sm-9">
              <div {...getRootProps()} className={`border border-dashed rounded-3 p-4 text-center cursor-pointer ${errors.image ? "border-danger" : "border-gray-400"} bg-light`}>
                <input {...getInputProps()} />
                <Upload className="text-primary mb-2" />
                <p className="mb-1 text-primary">Clique aqui ou arraste o arquivo</p>
                <p className="text-muted small">SVG, PNG, JPG ou GIF (máx. 800x400px)</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button type="button" className="btn btn-outline-secondary">
              Cancelar
            </button>
            <button type="button" onClick={handleNext} className="btn btn-primary-600">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepOne;