import React, { useState } from "react";
import ProductsServices from "../../services/api/products";
import RegisterProductStepFour from "./RegisterProductStepFour";
import RegisterProductStepOne from "./RegisterProductStepOne";
import RegisterProductStepThree from "./RegisterProductStepThree";
import RegisterProductStepTwo from "./RegisterProductStepTwo";

const RegisterProductSteps = () => {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
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

  const updateProductData = (newData) => {
    setProductData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
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
      console.log("payload enviado", payload);

      const response = await ProductsServices.registerProduct(payload);
      console.log("cadastrou, carai", response);
    } catch (error) {
      console.error(
        "Erro ao registrar produto:",
        error.response?.data?.message || error.message
      );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterProductStepOne
            onNext={nextStep}
            data={productData}
            updateData={updateProductData}
          />
        );
      case 2:
        return (
          <RegisterProductStepTwo
            onNext={nextStep}
            onBack={prevStep}
            data={productData}
            updateData={updateProductData}
          />
        );
      case 3:
        return (
          <RegisterProductStepThree
            onNext={nextStep}
            onBack={prevStep}
            data={productData}
            updateData={updateProductData}
          />
        );
      case 4:
        return (
          <RegisterProductStepFour
            onBack={prevStep}
            data={productData}
            updateData={updateProductData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return <div className="bg-white radius-8">{renderStep()}</div>;
};

export default RegisterProductSteps;
