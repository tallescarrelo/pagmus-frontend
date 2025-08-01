import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { ProductValidator, ValidationUtils } from '../../utils/validation';
import EnhancedFileUpload from './EnhancedFileUpload';

const ValidatedProductForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel,
  isEditing = false,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    producer: '',
    watts: '',
    image_url: '',
    warranty_days: '',
    support_email: '',
    sales_page_url: '',
    thank_you_page_url: '',
    reclame_aqui_url: '',
    files: [],
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Validação em tempo real
  const validateField = useCallback(
    ValidationUtils.debounce((fieldName, value) => {
      const fieldValidation = ProductValidator.validateForm({ [fieldName]: value });
      if (!fieldValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: fieldValidation.errors[fieldName]
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }, 300),
    []
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validar campo em tempo real
    validateField(field, value);
  };

  const handleFileUpload = (uploadedFile) => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, uploadedFile]
    }));
  };

  const handleFileRemove = (fileId) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulário completo
    const validation = ProductValidator.validateProduct(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErrors({ submit: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isFieldValid = (fieldName) => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName];
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleCurrencyInput = (value) => {
    // Remover formatação e converter para número
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const floatValue = parseFloat(numericValue);
    
    if (!isNaN(floatValue)) {
      return formatCurrency(floatValue);
    }
    return value;
  };

  return (
    <div className={`validated-product-form ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h4>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h4>
          <p className="form-subtitle">
            Preencha as informações do produto abaixo
          </p>
        </div>

        {/* Informações Básicas */}
        <div className="form-section">
          <h5 className="section-title">
            <Icon icon="mdi:information" />
            Informações Básicas
          </h5>
          
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Nome do Produto *
                  {isFieldValid('name') && (
                    <Icon icon="mdi:check-circle" className="valid-icon" />
                  )}
                </label>
                <input
                  type="text"
                  className={`form-control ${getFieldError('name') ? 'is-invalid' : ''} ${isFieldValid('name') ? 'is-valid' : ''}`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite o nome do produto"
                  maxLength={100}
                />
                {getFieldError('name') && (
                  <div className="invalid-feedback">{getFieldError('name')}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Categoria *
                  {isFieldValid('category') && (
                    <Icon icon="mdi:check-circle" className="valid-icon" />
                  )}
                </label>
                <select
                  className={`form-control ${getFieldError('category') ? 'is-invalid' : ''} ${isFieldValid('category') ? 'is-valid' : ''}`}
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="eletronicos">Eletrônicos</option>
                  <option value="casa">Casa e Jardim</option>
                  <option value="beleza">Beleza</option>
                  <option value="saude">Saúde</option>
                  <option value="esporte">Esporte</option>
                  <option value="livros">Livros</option>
                  <option value="brinquedos">Brinquedos</option>
                  <option value="outros">Outros</option>
                </select>
                {getFieldError('category') && (
                  <div className="invalid-feedback">{getFieldError('category')}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Descrição *
              {isFieldValid('description') && (
                <Icon icon="mdi:check-circle" className="valid-icon" />
              )}
            </label>
            <textarea
              className={`form-control ${getFieldError('description') ? 'is-invalid' : ''} ${isFieldValid('description') ? 'is-valid' : ''}`}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva o produto detalhadamente"
              rows={4}
              maxLength={1000}
            />
            <div className="form-text">
              {formData.description.length}/1000 caracteres
            </div>
            {getFieldError('description') && (
              <div className="invalid-feedback">{getFieldError('description')}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">
                  Preço *
                  {isFieldValid('price') && (
                    <Icon icon="mdi:check-circle" className="valid-icon" />
                  )}
                </label>
                <input
                  type="text"
                  className={`form-control ${getFieldError('price') ? 'is-invalid' : ''} ${isFieldValid('price') ? 'is-valid' : ''}`}
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', handleCurrencyInput(e.target.value))}
                  placeholder="R$ 0,00"
                />
                {getFieldError('price') && (
                  <div className="invalid-feedback">{getFieldError('price')}</div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">
                  Produtor *
                  {isFieldValid('producer') && (
                    <Icon icon="mdi:check-circle" className="valid-icon" />
                  )}
                </label>
                <input
                  type="text"
                  className={`form-control ${getFieldError('producer') ? 'is-invalid' : ''} ${isFieldValid('producer') ? 'is-valid' : ''}`}
                  value={formData.producer}
                  onChange={(e) => handleInputChange('producer', e.target.value)}
                  placeholder="Nome do produtor"
                />
                {getFieldError('producer') && (
                  <div className="invalid-feedback">{getFieldError('producer')}</div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label className="form-label">
                  Watts *
                  {isFieldValid('watts') && (
                    <Icon icon="mdi:check-circle" className="valid-icon" />
                  )}
                </label>
                <input
                  type="number"
                  className={`form-control ${getFieldError('watts') ? 'is-invalid' : ''} ${isFieldValid('watts') ? 'is-valid' : ''}`}
                  value={formData.watts}
                  onChange={(e) => handleInputChange('watts', e.target.value)}
                  placeholder="0"
                  min="0"
                />
                {getFieldError('watts') && (
                  <div className="invalid-feedback">{getFieldError('watts')}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload de Arquivos */}
        <div className="form-section">
          <h5 className="section-title">
            <Icon icon="mdi:file-upload" />
            Arquivos do Produto
          </h5>
          
          <EnhancedFileUpload
            onFileUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
            accept="image/*,.pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
            maxFiles={10}
            multiple={true}
          />
        </div>

        {/* Configurações Avançadas */}
        <div className="form-section">
          <button
            type="button"
            className="btn btn-link section-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Icon icon={showAdvanced ? "mdi:chevron-up" : "mdi:chevron-down"} />
            Configurações Avançadas
          </button>

          {showAdvanced && (
            <div className="advanced-settings">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">URL da Imagem</label>
                    <input
                      type="url"
                      className={`form-control ${getFieldError('image_url') ? 'is-invalid' : ''}`}
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    {getFieldError('image_url') && (
                      <div className="invalid-feedback">{getFieldError('image_url')}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Dias de Garantia</label>
                    <input
                      type="number"
                      className={`form-control ${getFieldError('warranty_days') ? 'is-invalid' : ''}`}
                      value={formData.warranty_days}
                      onChange={(e) => handleInputChange('warranty_days', e.target.value)}
                      placeholder="30"
                      min="0"
                      max="365"
                    />
                    {getFieldError('warranty_days') && (
                      <div className="invalid-feedback">{getFieldError('warranty_days')}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email de Suporte</label>
                <input
                  type="email"
                  className={`form-control ${getFieldError('support_email') ? 'is-invalid' : ''}`}
                  value={formData.support_email}
                  onChange={(e) => handleInputChange('support_email', e.target.value)}
                  placeholder="suporte@exemplo.com"
                />
                {getFieldError('support_email') && (
                  <div className="invalid-feedback">{getFieldError('support_email')}</div>
                )}
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">URL da Página de Vendas *</label>
                    <input
                      type="url"
                      className={`form-control ${getFieldError('sales_page_url') ? 'is-invalid' : ''}`}
                      value={formData.sales_page_url}
                      onChange={(e) => handleInputChange('sales_page_url', e.target.value)}
                      placeholder="https://exemplo.com/vendas"
                    />
                    {getFieldError('sales_page_url') && (
                      <div className="invalid-feedback">{getFieldError('sales_page_url')}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">URL da Página de Agradecimento</label>
                    <input
                      type="url"
                      className={`form-control ${getFieldError('thank_you_page_url') ? 'is-invalid' : ''}`}
                      value={formData.thank_you_page_url}
                      onChange={(e) => handleInputChange('thank_you_page_url', e.target.value)}
                      placeholder="https://exemplo.com/obrigado"
                    />
                    {getFieldError('thank_you_page_url') && (
                      <div className="invalid-feedback">{getFieldError('thank_you_page_url')}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label className="form-label">URL do Reclame Aqui</label>
                    <input
                      type="url"
                      className={`form-control ${getFieldError('reclame_aqui_url') ? 'is-invalid' : ''}`}
                      value={formData.reclame_aqui_url}
                      onChange={(e) => handleInputChange('reclame_aqui_url', e.target.value)}
                      placeholder="https://reclameaqui.com.br/empresa"
                    />
                    {getFieldError('reclame_aqui_url') && (
                      <div className="invalid-feedback">{getFieldError('reclame_aqui_url')}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mensagens de Erro */}
        {errors.submit && (
          <div className="alert alert-danger">
            <Icon icon="mdi:alert-circle" />
            {errors.submit}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <Icon icon="mdi:close" />
            Cancelar
          </button>
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? (
              <>
                <Icon icon="mdi:loading" className="spinning" />
                Salvando...
              </>
            ) : (
              <>
                <Icon icon="mdi:content-save" />
                {isEditing ? 'Atualizar' : 'Salvar'} Produto
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .validated-product-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-header h4 {
          color: #212529;
          margin-bottom: 8px;
        }

        .form-subtitle {
          color: #6c757d;
          margin: 0;
        }

        .form-section {
          background: #fff;
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #212529;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 600;
        }

        .section-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0d6efd;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
          font-size: 16px;
          font-weight: 500;
        }

        .section-toggle:hover {
          color: #0b5ed7;
          text-decoration: underline;
        }

        .advanced-settings {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
        }

        .valid-icon {
          color: #28a745;
          font-size: 16px;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }

        .form-control.is-invalid {
          border-color: #dc3545;
        }

        .form-control.is-valid {
          border-color: #28a745;
        }

        .invalid-feedback {
          color: #dc3545;
          font-size: 12px;
          margin-top: 4px;
        }

        .form-text {
          color: #6c757d;
          font-size: 12px;
          margin-top: 4px;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-danger {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 32px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: #fff;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #0b5ed7;
          border-color: #0a58ca;
        }

        .btn-secondary {
          background-color: #6c757d;
          border-color: #6c757d;
          color: #fff;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #5a6268;
          border-color: #545b62;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .row {
          display: flex;
          margin: 0 -12px;
        }

        .col-md-4,
        .col-md-6 {
          padding: 0 12px;
          flex: 1;
        }

        .col-md-4 {
          flex: 0 0 33.333333%;
        }

        .col-md-6 {
          flex: 0 0 50%;
        }
      `}</style>
    </div>
  );
};

export default ValidatedProductForm; 