import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image_url?: string;
  category?: string;
  [key: string]: any;
}

interface Affiliate {
  id: number;
  product: Product;
  [key: string]: any;
}

interface ViewProductAffiliateProps {
  affiliatesProducts: Affiliate[];
}

const ViewProductAffiliate: React.FC<ViewProductAffiliateProps> = ({ affiliatesProducts }) => {
  const navigate = useNavigate();

  const handleClick = (affiliate: Affiliate): void => {
    navigate("/products/view-product", { state: { affiliate } });
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row gy-4">
          {affiliatesProducts?.map((affiliate, index) => (
            <div className="col-xxl-3 col-md-6 user-grid-card" key={index}>
              <div className="position-relative border radius-16 overflow-hidden">
                <img
                  src={"/assets/images/user-grid/user-grid-bg1.png"}
                  alt=""
                  className="w-100 object-fit-cover"
                />
                <div className="ps-16 pb-16 pe-16 text-center mt--50">
                  <img
                    src={affiliate.product?.image_url}
                    alt=""
                    className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover"
                  />
                  <h6 className="text-lg mb-0 mt-4">
                    {affiliate.product?.name}
                  </h6>
                  <span className="text-secondary-light mb-16">
                    Código: {affiliate.product?.category}
                  </span>

                  <button
                    onClick={() => handleClick(affiliate)}
                    className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
                  >
                    Mais Informações
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      className="icon text-xl line-height-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProductAffiliate; 