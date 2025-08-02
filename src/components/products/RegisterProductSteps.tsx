import React, { useState } from "react";
import ProductsServices from "../../services/api/products";
import RegisterProductStepFour from "./RegisterProductStepFour";
import RegisterProductStepOne from "./RegisterProductStepOne";
import RegisterProductStepThree from "./RegisterProductStepThree";
import RegisterProductStepTwo from "./RegisterProductStepTwo";

interface Dimensions {
  height: string;
  width: string;
  length: string;
  weight: string;
}

interface AffiliateProgram {
  enabled: boolean;
  storeVisible: boolean;
  autoApprove: boolean;
  buyerDataAccess: boolean;
  cookieTime: string;
  cookieValue: string;
  comission_type: 'percentage' | 'fixed';
  comission_value: number;
}

interface ProductData {
  // Step 1
  name: string;
  description: string;
  category: string;
  tags: string[];
  format: string;
  image: File | null;
  price: number;
  url_slug: string;
  product_type: 'physical' | 'digital';

  // Step 2
  is_available: boolean;
  warranty_time: number;
  salesPageUrl: string;
  thanksPageUrl: string;
  complaintUrl: string;
  supportEmail: string;
  dimensions: Dimensions;
  packageType: string;
  product_status: 'approved' | 'pending' | 'rejected';

  // Step 3
  origin_cep: string;
  freight_type: 'physical' | 'digital';
  pacFree: boolean;
  acceptsSedex: boolean;
  defaultShippingValue: string;

  // Step 4
  affiliateProgram: AffiliateProgram;
}

const RegisterProductSteps: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [productData, setProductData] = useState<ProductData>({
    // Step 1
    name: "",
    description: "",
    category: "",
    tags: [],
    format: "",
    image: null,
    price: 0,
    url_slug: "",
    product_type: "physical",

    // Step 2
    is_available: false,
    warranty_time: 0,
    salesPageUrl: "",
    thanksPageUrl: "",
    complaintUrl: "",
    supportEmail: "",
    dimensions: {
      height: "",
      width: "",
      length: "",
      weight: "",
    },
    packageType: "",
    product_status: "approved",

    // Step 3
    origin_cep: "",
    freight_type: "physical",
    pacFree: false,
    acceptsSedex: false,
    defaultShippingValue: "",

    // Step 4
    affiliateProgram: {
      enabled: false,
      storeVisible: false,
      autoApprove: false,
      buyerDataAccess: false,
      cookieTime: "",
      cookieValue: "",
      comission_type: "percentage",
      comission_value: 0,
    },
  });

  const updateProductData = (newData: Partial<ProductData>): void => {
    setProductData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const nextStep = (): void => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = (): void => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (): Promise<void> => {
    try {
      const payload = {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        url_slug:
          productData.url_slug ||
          productData.name.toLowerCase().replace(/\s+/g, "-"),
        origin_cep: productData.origin_cep,
        is_available: productData.is_available,
        freight_type: "physical",
        product_status: "approved",
        warranty_time: Number(productData.warranty_time),
        product_type: "physical",
        comission_type: productData.affiliateProgram.comission_type,
        comission_value: Number(productData.affiliateProgram.comission_value),
        category: productData.category,
        dimensions: productData.dimensions,
        support_email: productData.supportEmail,
        sales_page_url: productData.salesPageUrl,
        thanks_page_url: productData.thanksPageUrl,
        complaint_url: productData.complaintUrl,
      };

      const response = await ProductsServices.registerProduct(payload);
    } catch (error) {
      console.error(
        "Erro ao registrar produto:",
        error instanceof Error ? error.message : 'Erro desconhecido'
      );
    }
  };

  const renderStep = (): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <RegisterProductStepOne
            productData={productData}
            updateProductData={updateProductData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <RegisterProductStepTwo
            productData={productData}
            updateProductData={updateProductData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <RegisterProductStepThree
            productData={productData}
            updateProductData={updateProductData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <RegisterProductStepFour
            productData={productData}
            updateProductData={updateProductData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <RegisterProductStepOne
            productData={productData}
            updateProductData={updateProductData}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Cadastrar Produto</h4>
              <div className="step-indicator">
                <span className={`step ${step >= 1 ? "active" : ""}`}>1</span>
                <span className={`step ${step >= 2 ? "active" : ""}`}>2</span>
                <span className={`step ${step >= 3 ? "active" : ""}`}>3</span>
                <span className={`step ${step >= 4 ? "active" : ""}`}>4</span>
              </div>
            </div>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductSteps; 