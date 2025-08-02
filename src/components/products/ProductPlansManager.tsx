import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import EnhancedFileUpload from './EnhancedFileUpload';

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  max_installments?: number;
  max_installments_no_interest?: number;
  featured: boolean;
  available_for_sale: boolean;
  files: Array<{
    id: number;
    name: string;
    url: string;
  }>;
  terms_conditions?: string;
  affiliate_commission: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  payment_discount_enabled: boolean;
  billing_type: 'single' | 'recurring';
  boleto_installments_enabled: boolean;
  boleto_notification_enabled: boolean;
  custom_commission_enabled: boolean;
  hide_from_affiliates: boolean;
  watermark_enabled: boolean;
  [key: string]: any;
}

interface ProductPlansManagerProps {
  productId: number;
  plans?: Plan[];
  onPlansUpdate?: (plans: Plan[]) => void;
  className?: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  original_price: string;
  max_installments: string;
  max_installments_no_interest: string;
  featured: boolean;
  available_for_sale: boolean;
  files: Array<{
    id: number;
    name: string;
    url: string;
  }>;
  terms_conditions: string;
  affiliate_commission: {
    type: 'percentage' | 'fixed';
    value: string;
  };
  payment_discount_enabled: boolean;
  billing_type: 'single' | 'recurring';
  boleto_installments_enabled: boolean;
  boleto_notification_enabled: boolean;
  custom_commission_enabled: boolean;
  hide_from_affiliates: boolean;
  watermark_enabled: boolean;
}

const ProductPlansManager: React.FC<ProductPlansManagerProps> = ({ 
  productId,
  plans = [],
  onPlansUpdate,
  className = ""
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    original_price: '',
    max_installments: '',
    max_installments_no_interest: '',
    featured: false,
    available_for_sale: true,
    files: [],
    terms_conditions: '',
    affiliate_commission: {
      type: 'percentage',
      value: ''
    },
    payment_discount_enabled: false,
    billing_type: 'single',
    boleto_installments_enabled: false,
    boleto_notification_enabled: true,
    custom_commission_enabled: false,
    hide_from_affiliates: false,
    watermark_enabled: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('store'); // store, payment, affiliation, files, terms

  const handleInputChange = (field: string, value: any): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validação simples
    if (field === 'name' && !value) {
      setErrors(prev => ({ ...prev, name: 'Nome do plano é obrigatório' }));
    } else if (field === 'price' && (!value || parseFloat(value) <= 0)) {
      setErrors(prev => ({ ...prev, price: 'Preço deve ser maior que zero' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAffiliateCommissionChange = (field: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      affiliate_commission: { ...prev.affiliate_commission, [field]: value }
    }));
  };

  const handleFileUpload = (uploadedFile: { id: number; name: string; url: string }): void => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, uploadedFile]
    }));
  };

  const handleFileRemove = (fileId: number): void => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const validatePlan = (): boolean => {
    const planErrors: Record<string, string> = {};
    
    if (!formData.name) planErrors.name = 'Nome do plano é obrigatório';
    if (!formData.price) planErrors.price = 'Preço é obrigatório';
    if (formData.price && parseFloat(formData.price) <= 0) {
      planErrors.price = 'Preço deve ser maior que zero';
    }
    
    setErrors(planErrors);
    return Object.keys(planErrors).length === 0;
  };

  const resetForm = (): void => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      max_installments: '',
      max_installments_no_interest: '',
      featured: false,
      available_for_sale: true,
      files: [],
      terms_conditions: '',
      affiliate_commission: {
        type: 'percentage',
        value: ''
      },
      payment_discount_enabled: false,
      billing_type: 'single',
      boleto_installments_enabled: false,
      boleto_notification_enabled: true,
      custom_commission_enabled: false,
      hide_from_affiliates: false,
      watermark_enabled: false
    });
    setErrors({});
    setTouched({});
    setEditingPlan(null);
  };

  const handleCreatePlan = (): void => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleEditPlan = (plan: Plan): void => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || '',
      price: plan.price.toString(),
      original_price: plan.original_price?.toString() || '',
      max_installments: plan.max_installments?.toString() || '',
      max_installments_no_interest: plan.max_installments_no_interest?.toString() || '',
      featured: plan.featured,
      available_for_sale: plan.available_for_sale,
      files: plan.files || [],
      terms_conditions: plan.terms_conditions || '',
      affiliate_commission: {
        type: plan.affiliate_commission.type,
        value: plan.affiliate_commission.value.toString()
      },
      payment_discount_enabled: plan.payment_discount_enabled,
      billing_type: plan.billing_type,
      boleto_installments_enabled: plan.boleto_installments_enabled,
      boleto_notification_enabled: plan.boleto_notification_enabled,
      custom_commission_enabled: plan.custom_commission_enabled,
      hide_from_affiliates: plan.hide_from_affiliates,
      watermark_enabled: plan.watermark_enabled
    });
    setShowCreateModal(true);
  };

  const handleDeletePlan = (planId: number): void => {
    // Implementar lógica de exclusão
    console.log('Deletar plano:', planId);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validatePlan()) return;

    setIsSubmitting(true);
    try {
      const planData = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
        max_installments: formData.max_installments ? parseInt(formData.max_installments) : undefined,
        max_installments_no_interest: formData.max_installments_no_interest ? parseInt(formData.max_installments_no_interest) : undefined,
        affiliate_commission: {
          ...formData.affiliate_commission,
          value: parseFloat(formData.affiliate_commission.value)
        }
      };

      // Aqui você faria a chamada para a API
      console.log('Salvando plano:', planData);

      // Simular sucesso
      setTimeout(() => {
        setShowCreateModal(false);
        resetForm();
        setIsSubmitting(false);
        if (onPlansUpdate) {
          // Atualizar lista de planos
          onPlansUpdate([...plans]);
        }
      }, 1000);

    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string => {
    return errors[fieldName] || '';
  };

  const isFieldValid = (fieldName: string): boolean => {
    return !errors[fieldName] && touched[fieldName];
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleCurrencyInput = (value: string): string => {
    return value.replace(/[^\d,]/g, '').replace(',', '.');
  };

  const renderPlanCard = (plan: Plan) => (
    <div key={plan.id} className="col-md-6 col-lg-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="card-title mb-0">{plan.name}</h6>
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                <Icon icon="mdi:dots-vertical" />
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleEditPlan(plan)}>
                  <Icon icon="mdi:pencil" className="me-2" />
                  Editar
                </button></li>
                <li><button className="dropdown-item text-danger" onClick={() => handleDeletePlan(plan.id)}>
                  <Icon icon="mdi:delete" className="me-2" />
                  Excluir
                </button></li>
              </ul>
            </div>
          </div>
          <p className="text-muted small mb-2">{plan.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-primary">{formatCurrency(plan.price)}</span>
            <span className={`badge ${plan.available_for_sale ? 'bg-success' : 'bg-secondary'}`}>
              {plan.available_for_sale ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className={`modal fade ${showCreateModal ? 'show' : ''}`} style={{ display: showCreateModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingPlan ? 'Editar Plano' : 'Criar Novo Plano'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'store' ? 'active' : ''}`} onClick={() => setActiveTab('store')}>
                  Loja
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
                  Pagamento
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'affiliation' ? 'active' : ''}`} onClick={() => setActiveTab('affiliation')}>
                  Afiliação
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'files' ? 'active' : ''}`} onClick={() => setActiveTab('files')}>
                  Arquivos
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>
                  Termos
                </button>
              </li>
            </ul>

            {activeTab === 'store' && (
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Nome do Plano *</label>
                    <input
                      type="text"
                      className={`form-control ${getFieldError('name') ? 'is-invalid' : isFieldValid('name') ? 'is-valid' : ''}`}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {getFieldError('name') && <div className="invalid-feedback">{getFieldError('name')}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Preço *</label>
                    <input
                      type="text"
                      className={`form-control ${getFieldError('price') ? 'is-invalid' : isFieldValid('price') ? 'is-valid' : ''}`}
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', handleCurrencyInput(e.target.value))}
                    />
                    {getFieldError('price') && <div className="invalid-feedback">{getFieldError('price')}</div>}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                      />
                      <label className="form-check-label">Plano em Destaque</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.available_for_sale}
                        onChange={(e) => handleInputChange('available_for_sale', e.target.checked)}
                      />
                      <label className="form-check-label">Disponível para Venda</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Preço Original</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.original_price}
                      onChange={(e) => handleInputChange('original_price', handleCurrencyInput(e.target.value))}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Máximo de Parcelas</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.max_installments}
                      onChange={(e) => handleInputChange('max_installments', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Parcelas sem Juros</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.max_installments_no_interest}
                      onChange={(e) => handleInputChange('max_installments_no_interest', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Tipo de Cobrança</label>
                    <select
                      className="form-select"
                      value={formData.billing_type}
                      onChange={(e) => handleInputChange('billing_type', e.target.value)}
                    >
                      <option value="single">Pagamento Único</option>
                      <option value="recurring">Recorrente</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'affiliation' && (
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Tipo de Comissão</label>
                    <select
                      className="form-select"
                      value={formData.affiliate_commission.type}
                      onChange={(e) => handleAffiliateCommissionChange('type', e.target.value)}
                    >
                      <option value="percentage">Porcentagem</option>
                      <option value="fixed">Valor Fixo</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Valor da Comissão</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.affiliate_commission.value}
                      onChange={(e) => handleAffiliateCommissionChange('value', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.custom_commission_enabled}
                        onChange={(e) => handleInputChange('custom_commission_enabled', e.target.checked)}
                      />
                      <label className="form-check-label">Comissão Personalizada</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.hide_from_affiliates}
                        onChange={(e) => handleInputChange('hide_from_affiliates', e.target.checked)}
                      />
                      <label className="form-check-label">Ocultar de Afiliados</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div>
                <EnhancedFileUpload
                  onFileUpload={handleFileUpload}
                  onFileRemove={handleFileRemove}
                  files={formData.files}
                />
              </div>
            )}

            {activeTab === 'terms' && (
              <div>
                <div className="mb-3">
                  <label className="form-label">Termos e Condições</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={formData.terms_conditions}
                    onChange={(e) => handleInputChange('terms_conditions', e.target.value)}
                    placeholder="Digite os termos e condições do plano..."
                  />
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : editingPlan ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Gerenciar Planos</h5>
        <button className="btn btn-primary" onClick={handleCreatePlan}>
          <Icon icon="mdi:plus" className="me-2" />
          Novo Plano
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-5">
          <Icon icon="mdi:package-variant-off" className="text-muted" style={{ fontSize: '3rem' }} />
          <h6 className="mt-3">Nenhum plano criado</h6>
          <p className="text-muted">Crie seu primeiro plano para começar a vender</p>
          <button className="btn btn-primary" onClick={handleCreatePlan}>
            <Icon icon="mdi:plus" className="me-2" />
            Criar Primeiro Plano
          </button>
        </div>
      ) : (
        <div className="row">
          {plans.map(renderPlanCard)}
        </div>
      )}

      {renderModal()}
    </div>
  );
};

export default ProductPlansManager; 