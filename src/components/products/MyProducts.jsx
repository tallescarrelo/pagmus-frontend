import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = ({ myProducts }) => {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row gy-4">
          {myProducts?.map((product, index) => (
            <div className="col-xxl-3 col-md-6 user-grid-card" key={index}>
              <div className="position-relative border radius-16 overflow-hidden">
                <img
                  src={"/assets/images/user-grid/user-grid-bg1.png"}
                  alt=""
                  className="w-100 object-fit-cover"
                />
                <div className="ps-16 pb-16 pe-16 text-center mt--50">
                  <img
                    src={product?.image || "/assets/images/product/default-product.png"}
                    alt=""
                    className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover"
                  />
                  <h6 className="text-lg mb-0 mt-4">{product?.name}</h6>
                  <span className="text-secondary-light mb-16">
                    Código: {product?.category}
                  </span>

                  <button
                    onClick={() => handleClick(product)}
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

export default MyProducts;
