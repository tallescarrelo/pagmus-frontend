import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

const RegisterProductStepOne = ({ onNext, data, updateData }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      updateData({ image: files[0] });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <div className="w-[549px] bg-white rounded-xl px-6 py-8 shadow-md">
      {/* Barra de progresso */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-[#44ADD4] text-sm font-bold">
            Detalhe do produto
          </span>
          <span className="text-[#44ADD4] text-sm font-bold">Etapa 1/4</span>
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-[#44ADD4] h-1 rounded-full"
            style={{ width: "25%" }}
          />
        </div>
      </div>

      {/* Nome */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">Nome</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Digite o nome do produto"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
      </div>

      {/* Descrição */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          Descrição
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Digite a descrição do produto"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
      </div>

      {/* Categoria */}
      {/* Categoria */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          Categoria
        </label>
        <select
          name="category"
          className="form-control h-56-px bg-neutral-50 radius-12"
          onChange={handleChange}
          value={data.category}
        >
          <option disabled selected value="">
            Selecione uma categoria
          </option>
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
          <option value="12">
            Educacional, Cursos Técnicos e Profissionalizantes
          </option>
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

      {/* Tags */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">Tags</label>
        <input
          placeholder="Digite as tags do produto"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
      </div>

      {/* Formato */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          Formato
        </label>
        <select
          className="form-control h-56-px bg-neutral-50 radius-12"
          name="format"
          onChange={handleChange}
          value={data.format}
        >
          <option value="physical-product">Produto Físico</option>
          <option value="digital-product">Produto Digital</option>
        </select>
      </div>

      {/* Preço - Novo campo */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          Preço *
        </label>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          placeholder="Digite o preço do produto"
          className="form-control h-56-px bg-neutral-50 radius-12"
          min="0"
          step="0.01"
        />
      </div>

      {/* URL Slug - Novo campo */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          URL Slug
        </label>
        <input
          type="text"
          name="url_slug"
          value={data.url_slug}
          onChange={handleChange}
          placeholder="Digite o slug da URL (opcional)"
          className="form-control h-56-px bg-neutral-50 radius-12"
        />
        <p className="text-[#B2B2B2] text-[12px] leading-6 mt-1">
          Se não preenchido, será gerado automaticamente a partir do nome
        </p>
      </div>

      {/* Dropzone */}
      <div className="flex flex-col mt-4">
        <label className="text-[#344054] text-sm font-medium mb-1">
          Imagem do Produto
        </label>
        <div
          {...getRootProps()}
          className="form-control h-56-px bg-neutral-50 radius-12"
        >
          <input {...getInputProps()} />
          <Upload className="text-[#2EB4B4] w-6 h-6" />
          <p className="text-[#2EB4B4] text-sm font-medium mt-2">
            Clique aqui ou arraste o arquivo
          </p>
          <p className="text-[#667085] text-sm font-mediu">
            SVG, PNG, JPG ou GIF (máx. 800x400px)
          </p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-64">
        <button className="border border-[#D0D5DD] rounded-fulltext-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100">
          Cancelar
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

export default RegisterProductStepOne;
