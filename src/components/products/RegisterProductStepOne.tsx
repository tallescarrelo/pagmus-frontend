import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface ProductData {
  name: string;
  description: string;
  category: string;
  tags: string[];
  format: string;
  image: File | null;
  price: number;
  url_slug: string;
  product_type: 'physical' | 'digital';
  [key: string]: any;
}

interface RegisterProductStepOneProps {
  onNext: () => void;
  data: ProductData;
  updateData: (data: Partial<ProductData>) => void;
}

const RegisterProductStepOne: React.FC<RegisterProductStepOneProps> = ({ onNext, data, updateData }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => updateData({ image: files[0] }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    if (name === "price") {
      const formatted = value.replace(/[^0-9]/g, "");
      updateData({ [name]: formatted });
    } else {
      updateData({ [name]: value });
    }
  };

  const validateFields = (): boolean => {
    const newErrors: Record<string, boolean> = {};
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

  const handleNext = (): void => {
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
                <option value="27">Medicina e Saúde</option>
                <option value="28">Música</option>
                <option value="29">Negócios Online</option>
                <option value="30">Notícias e Política</option>
                <option value="31">Parenting e Família</option>
                <option value="32">Pessoas e Sociedade</option>
                <option value="33">Pets e Animais</option>
                <option value="34">Produtos Digitais</option>
                <option value="35">Religião e Espiritualidade</option>
                <option value="36">Saúde e Fitness</option>
                <option value="37">Tecnologia</option>
                <option value="38">Turismo e Viagem</option>
                <option value="39">Vídeos e Filmes</option>
                <option value="40">Web Design</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Tags *</label>
            <div className="col-sm-9">
              <input type="text" name="tags" value={data.tags.join(', ')} onChange={handleChange} className={`form-control ${errors.tags ? "is-invalid" : ""}`} placeholder="Digite as tags separadas por vírgula" />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Formato *</label>
            <div className="col-sm-9">
              <select name="format" value={data.format} onChange={handleChange} className={`form-select ${errors.format ? "is-invalid" : ""}`}>
                <option disabled value="">Selecione o formato</option>
                <option value="digital">Digital</option>
                <option value="physical">Físico</option>
              </select>
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Preço *</label>
            <div className="col-sm-9">
              <input type="text" name="price" value={data.price} onChange={handleChange} className={`form-control ${errors.price ? "is-invalid" : ""}`} placeholder="Digite o preço" />
            </div>
          </div>

          <div className="row mb-24 gy-3 align-items-center">
            <label className="form-label mb-0 col-sm-3">Imagem *</label>
            <div className="col-sm-9">
              <div {...getRootProps()} className={`dropzone ${errors.image ? "is-invalid" : ""}`}>
                <input {...getInputProps()} />
                <div className="text-center">
                  <Upload className="mb-2" />
                  <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button onClick={handleNext} className="btn btn-primary">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductStepOne; 