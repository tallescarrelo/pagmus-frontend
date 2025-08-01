import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { ProductValidator, ValidationUtils } from '../../utils/validation';
import EnhancedFileUpload from './EnhancedFileUpload';
import { useAuth } from '../../contexts/AuthContext';

const EnhancedProductRegistration = ({ 
  onSubmit, 
  onCancel,
  initialData = {},
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados Básicos
    name: '',
    description: '',
    category: '',
    tags: '',
    format: 'digital-product',
    price: '',
    url_slug: '',
    image_url: '',
    
    // Dimensões e Peso (para produtos físicos)
    dimensions: {
      width: '',
      height: '',
      length: '',
      weight: ''
    },
    
    // URLs e Páginas
    sales_page_url: '',
    thank_you_page_url: '',
    thank_you_processing_url: '',
    reclame_aqui_url: '',
    
    // Configurações de Venda
    available_for_sale: true,
    warranty_days: '',
    support_email: '',
    
    // Comissionamento
    commission_type: 'percentage',
    commission_value: '',
    
    // Arquivos
    files: [],
    
    // Planos (será expandido)
    plans: [],
    
    // Checkouts (será expandido)
    checkouts: [],
    
    // URLs (será expandido)
    urls: [],
    
    // Cupons (será expandido)
    coupons: [],
    
    // Componentes (será expandido)
    components: [],
    
    // Relacionamento com usuário
    user_id: null, // Será preenchido automaticamente
    
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getUserId } = useAuth();

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
    validateField(field, value);
  };

  const handleDimensionsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: value }
    }));
    setTouched(prev => ({ ...prev, [`dimensions.${field}`]: true }));
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

  const validateStep = (step) => {
    const stepErrors = {};
    
    switch (step) {
      case 1: // Dados Básicos
        if (!formData.name) stepErrors.name = 'Nome é obrigatório';
        if (!formData.description) stepErrors.description = 'Descrição é obrigatória';
        if (!formData.category) stepErrors.category = 'Categoria é obrigatória';
        if (!formData.price) stepErrors.price = 'Preço é obrigatório';
        if (formData.format === 'physical-product' && !formData.dimensions.weight) {
          stepErrors.weight = 'Peso é obrigatório para produtos físicos';
        }
        break;
        
      case 2: // URLs e Configurações
        if (!formData.sales_page_url) stepErrors.sales_page_url = 'URL da página de vendas é obrigatória';
        if (formData.support_email && !ProductValidator.isValidEmail(formData.support_email)) {
          stepErrors.support_email = 'Email de suporte inválido';
        }
        break;
        
      case 3: // Comissionamento
        if (!formData.commission_value) stepErrors.commission_value = 'Valor da comissão é obrigatório';
        break;
        
      case 4: // Arquivos
        // Validação opcional para arquivos
        break;
    }
    
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // Adicionar user_id automaticamente do contexto de autenticação
      const userId = getUserId();
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }
      
      const finalData = {
        ...formData,
        user_id: userId
      };
      
      await onSubmit(finalData);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErrors({ submit: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
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
    const numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    const floatValue = parseFloat(numericValue);
    
    if (!isNaN(floatValue)) {
      return formatCurrency(floatValue);
    }
    return value;
  };

  const steps = [
    { id: 1, title: 'Dados Básicos', icon: 'mdi:information' },
    { id: 2, title: 'URLs e Configurações', icon: 'mdi:link' },
    { id: 3, title: 'Comissionamento', icon: 'mdi:account-group' },
    { id: 4, title: 'Arquivos', icon: 'mdi:file-upload' }
  ];

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className="step-progress">
        <div 
          className="step-progress-bar" 
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
      <div className="step-list">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`step-item ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
          >
            <div className="step-icon">
              {currentStep > step.id ? (
                <Icon icon="mdi:check" />
              ) : (
                <Icon icon={step.icon} />
              )}
            </div>
            <div className="step-content">
              <span className="step-number">{step.id}</span>
              <span className="step-title">{step.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="step-content">
      <h4 className="step-title">
        <Icon icon="mdi:information" />
        Dados Básicos do Produto
      </h4>
      
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
        <div className="col-md-6">
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

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Formato *
              {isFieldValid('format') && (
                <Icon icon="mdi:check-circle" className="valid-icon" />
              )}
            </label>
            <select
              className={`form-control ${getFieldError('format') ? 'is-invalid' : ''} ${isFieldValid('format') ? 'is-valid' : ''}`}
              value={formData.format}
              onChange={(e) => handleInputChange('format', e.target.value)}
            >
              <option value="digital-product">Produto Digital</option>
              <option value="physical-product">Produto Físico</option>
            </select>
            {getFieldError('format') && (
              <div className="invalid-feedback">{getFieldError('format')}</div>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tags</label>
        <input
          type="text"
          className="form-control"
          value={formData.tags}
          onChange={(e) => handleInputChange('tags', e.target.value)}
          placeholder="Digite as tags separadas por vírgula"
        />
        <div className="form-text">
          Separe as tags por vírgula (ex: marketing, digital, curso)
        </div>
      </div>

      {formData.format === 'physical-product' && (
        <div className="physical-product-fields">
          <h5 className="section-subtitle">Dimensões e Peso</h5>
          <div className="row">
            {[
              { label: "Largura (cm)*", name: "width", helper: "Em cm. Máx: 105cm / Mín: 11cm." },
              { label: "Altura (cm)*", name: "height", helper: "Em cm. Máx: 105cm / Mín: 11cm." },
              { label: "Comprimento (cm)*", name: "length", helper: "Em cm. Máx: 105cm / Mín: 11cm." },
              { label: "Peso (Kg)*", name: "weight", helper: "Entre 0.010Kg e 30.000Kg." },
            ].map(({ label, name, helper }) => (
              <div className="col-md-6" key={name}>
                <div className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.dimensions[name]}
                    onChange={(e) => handleDimensionsChange(name, e.target.value)}
                    placeholder={`Digite ${label.toLowerCase()}`}
                  />
                  <small className="text-muted">{helper}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="step-content">
      <h4 className="step-title">
        <Icon icon="mdi:link" />
        URLs e Configurações
      </h4>
      
      <div className="form-group">
        <label className="form-label">
          URL da Página de Vendas *
          {isFieldValid('sales_page_url') && (
            <Icon icon="mdi:check-circle" className="valid-icon" />
          )}
        </label>
        <input
          type="url"
          className={`form-control ${getFieldError('sales_page_url') ? 'is-invalid' : ''} ${isFieldValid('sales_page_url') ? 'is-valid' : ''}`}
          value={formData.sales_page_url}
          onChange={(e) => handleInputChange('sales_page_url', e.target.value)}
          placeholder="https://exemplo.com/vendas"
        />
        {getFieldError('sales_page_url') && (
          <div className="invalid-feedback">{getFieldError('sales_page_url')}</div>
        )}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">URL da Página de Agradecimento</label>
            <input
              type="url"
              className="form-control"
              value={formData.thank_you_page_url}
              onChange={(e) => handleInputChange('thank_you_page_url', e.target.value)}
              placeholder="https://exemplo.com/obrigado"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">URL do Reclame Aqui</label>
            <input
              type="url"
              className="form-control"
              value={formData.reclame_aqui_url}
              onChange={(e) => handleInputChange('reclame_aqui_url', e.target.value)}
              placeholder="https://reclameaqui.com.br/empresa"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Dias de Garantia</label>
            <input
              type="number"
              className="form-control"
              value={formData.warranty_days}
              onChange={(e) => handleInputChange('warranty_days', e.target.value)}
              placeholder="30"
              min="0"
              max="365"
            />
          </div>
        </div>

        <div className="col-md-6">
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
        </div>
      </div>

      <div className="form-group">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="available_for_sale"
            checked={formData.available_for_sale}
            onChange={(e) => handleInputChange('available_for_sale', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="available_for_sale">
            Disponível para venda?
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-content">
      <h4 className="step-title">
        <Icon icon="mdi:account-group" />
        Configurações de Comissionamento
      </h4>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Tipo de Comissão *
              {isFieldValid('commission_type') && (
                <Icon icon="mdi:check-circle" className="valid-icon" />
              )}
            </label>
            <select
              className={`form-control ${getFieldError('commission_type') ? 'is-invalid' : ''} ${isFieldValid('commission_type') ? 'is-valid' : ''}`}
              value={formData.commission_type}
              onChange={(e) => handleInputChange('commission_type', e.target.value)}
            >
              <option value="percentage">Porcentagem (%)</option>
              <option value="fixed">Valor Fixo (R$)</option>
            </select>
            {getFieldError('commission_type') && (
              <div className="invalid-feedback">{getFieldError('commission_type')}</div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">
              Valor da Comissão *
              {isFieldValid('commission_value') && (
                <Icon icon="mdi:check-circle" className="valid-icon" />
              )}
            </label>
            <input
              type="text"
              className={`form-control ${getFieldError('commission_value') ? 'is-invalid' : ''} ${isFieldValid('commission_value') ? 'is-valid' : ''}`}
              value={formData.commission_value}
              onChange={(e) => handleInputChange('commission_value', e.target.value)}
              placeholder={formData.commission_type === 'percentage' ? '25' : 'R$ 50,00'}
            />
            {getFieldError('commission_value') && (
              <div className="invalid-feedback">{getFieldError('commission_value')}</div>
            )}
          </div>
        </div>
      </div>

      <div className="alert alert-info">
        <Icon icon="mdi:information" />
        <strong>Informação:</strong> As configurações de afiliados e metas podem ser ajustadas após o cadastro do produto.
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="step-content">
      <h4 className="step-title">
        <Icon icon="mdi:file-upload" />
        Arquivos do Produto
      </h4>
      
      <EnhancedFileUpload
        onFileUpload={handleFileUpload}
        onFileRemove={handleFileRemove}
        accept="image/*,.pdf,.doc,.docx,.zip,.rar"
        maxSize={50 * 1024 * 1024} // 50MB
        maxFiles={20}
        multiple={true}
        showPreview={true}
      />

      <div className="alert alert-info mt-3">
        <Icon icon="mdi:information" />
        <strong>Dica:</strong> Você pode adicionar arquivos após salvar o produto. Os arquivos serão organizados por categoria.
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className={`enhanced-product-registration ${className}`}>
      <div className="registration-container">
        {renderStepIndicator()}
        
        <div className="step-container">
          {renderCurrentStep()}
        </div>

        {/* Mensagens de Erro */}
        {errors.submit && (
          <div className="alert alert-danger">
            <Icon icon="mdi:alert-circle" />
            {errors.submit}
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="step-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <Icon icon="mdi:close" />
            Cancelar
          </button>
          
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <Icon icon="mdi:arrow-left" />
              Voltar
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Próximo
              <Icon icon="mdi:arrow-right" />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className="spinning" />
                  Salvando...
                </>
              ) : (
                <>
                  <Icon icon="mdi:content-save" />
                  Salvar Produto
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .enhanced-product-registration {
          max-width: 900px;
          margin: 0 auto;
        }

        .registration-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .step-indicator {
          padding: 24px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        .step-progress {
          height: 4px;
          background: #e9ecef;
          border-radius: 2px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .step-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #0d6efd, #0b5ed7);
          transition: width 0.3s ease;
        }

        .step-list {
          display: flex;
          justify-content: space-between;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          position: relative;
        }

        .step-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -50%;
          width: 100%;
          height: 2px;
          background: #dee2e6;
          transform: translateY(-50%);
          z-index: 1;
        }

        .step-item.completed:not(:last-child)::after {
          background: #0d6efd;
        }

        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          color: #6c757d;
          font-size: 16px;
          z-index: 2;
          position: relative;
        }

        .step-item.active .step-icon {
          background: #0d6efd;
          color: #fff;
        }

        .step-item.completed .step-icon {
          background: #28a745;
          color: #fff;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .step-number {
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
        }

        .step-title {
          font-size: 12px;
          color: #6c757d;
          white-space: nowrap;
        }

        .step-item.active .step-number,
        .step-item.active .step-title {
          color: #0d6efd;
        }

        .step-item.completed .step-number,
        .step-item.completed .step-title {
          color: #28a745;
        }

        .step-container {
          padding: 32px;
        }

        .step-content {
          margin-bottom: 32px;
        }

        .step-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #212529;
          margin-bottom: 24px;
          font-size: 20px;
          font-weight: 600;
        }

        .section-subtitle {
          color: #495057;
          margin: 24px 0 16px 0;
          font-size: 16px;
          font-weight: 600;
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

        .alert-info {
          background-color: #d1ecf1;
          border: 1px solid #bee5eb;
          color: #0c5460;
        }

        .alert-danger {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }

        .step-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 24px 32px;
          border-top: 1px solid #dee2e6;
          background: #f8f9fa;
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

        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
          color: #fff;
        }

        .btn-success:hover:not(:disabled) {
          background-color: #218838;
          border-color: #1e7e34;
        }

        .btn-outline-primary {
          background-color: transparent;
          border-color: #0d6efd;
          color: #0d6efd;
        }

        .btn-outline-primary:hover:not(:disabled) {
          background-color: #0d6efd;
          color: #fff;
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

        .physical-product-fields {
          margin-top: 24px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }

        .row {
          display: flex;
          margin: 0 -12px;
        }

        .col-md-6 {
          padding: 0 12px;
          flex: 0 0 50%;
        }
      `}</style>
    </div>
  );
};

export default EnhancedProductRegistration; 