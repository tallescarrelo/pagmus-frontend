import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import EnhancedProductRegistration from "../../components/products/EnhancedProductRegistration";
import ProductsServices from "../../services/api/products";

const RegisterProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Preparar dados para envio
      const productData = {
        ...formData,
        price: parseFloat(formData.price.replace(/[^\d,]/g, '').replace(',', '.')),
        commission_value: parseFloat(formData.commission_value),
        // Remover arquivos do formData principal (serão enviados separadamente)
        files: undefined
      };

      // Registrar produto
      await ProductsServices.registerProduct(productData);

      // Se houver arquivos, fazer upload separadamente
      if (formData.files && formData.files.length > 0) {
        console.log('Arquivos para upload:', formData.files);
        // Aqui você implementaria o upload dos arquivos
        // await uploadProductFiles(productData.id, formData.files);
      }

      // Redirecionar para lista de produtos
      navigate('/products');
      
    } catch (error) {
      console.error('Erro ao registrar produto:', error);
      setSubmitError('Erro ao registrar produto. Verifique os dados e tente novamente.');
      throw error; // Re-throw para o componente tratar
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb 
          title="Registrar Produto" 
          items={[
            { label: 'Produtos', path: '/products' },
            { label: 'Novo Produto', path: '/products/register' }
          ]}
        />

        {/* Formulário Avançado */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <EnhancedProductRegistration
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                className="mt-4"
              />
            </div>
          </div>
        </div>

        {/* Mensagem de Erro Global */}
        {submitError && (
          <div className="alert alert-danger mt-3" role="alert">
            <strong>Erro:</strong> {submitError}
          </div>
        )}
      </MasterLayout>

      <style jsx>{`
        .container-fluid {
          padding: 0 24px;
        }

        .alert {
          margin: 0 24px 24px 24px;
          border-radius: 8px;
          padding: 16px 20px;
        }

        .alert-danger {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
        }
      `}</style>
    </>
  );
};

export default RegisterProduct;
