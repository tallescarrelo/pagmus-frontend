import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProducts } from "../../services/reducers/products";

const ProductGrid = () => {
  const products = useSelector(selectProducts);

  const ProgressWithCircle = ({ watts }) => {
    const percent = Math.min((watts / 150) * 100, 100);

    return (
      <div className="position-relative w-100 mt-3" style={{ height: "30px" }}>
        {/* Barra de progresso */}
        <div
          className="progress h-8-px w-100 bg-neutral-200 radius-8 overflow-hidden"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <div
            className="rounded-pill"
            style={{
              width: `${percent}%`,
              height: "8px",
              background: "#44ADD4",
            }}
          />
        </div>

        {/* Círculo com valor e label */}
        <div
          className="position-absolute"
          style={{
            left: `${percent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#44ADD4",
              color: "white",
              fontSize: "11px",
              fontWeight: "600",
              boxShadow: "0 0 4px rgba(0,0,0,0.1)",
              padding: "2px",
            }}
          >
            <div style={{ fontSize: "11px", lineHeight: "12px" }}>{watts}</div>
            <div style={{ fontSize: "8px", opacity: 0.8, lineHeight: "10px" }}>
              watts
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row gy-4">
          {products.map((product, index) => (
            <div className="col-xxl-3 col-md-6 user-grid-card" key={index}>
              <div className="position-relative border radius-16 overflow-hidden">
                <img
                  src={"/assets/images/user-grid/user-grid-bg1.png"}
                  alt=""
                  className="w-100 object-fit-cover"
                />
                <div className="ps-16 pb-16 pe-16 text-center mt--50">
                  <img
                    src={product.image_url}
                    alt=""
                    className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover"
                  />
                  <h6 className="text-lg mb-0 mt-4">{product.name}</h6>
                  <span className="text-secondary-light mb-16">
                    {product.category}
                  </span>
                  <div className="center-border position-relative bg-danger-50 radius-8 p-12 d-flex align-items-center gap-4">
                    <div className="text-center w-50">
                      <h6 className="text-md mb-0">Produtor</h6>
                      <span className="text-secondary-light text-sm mb-0">
                        {product.producer}
                      </span>
                    </div>
                    <div className="text-center w-50">
                      <h6 className="text-md mb-0">Preço</h6>
                      <span className="text-secondary-light text-sm mb-0">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  {/* ProgressBar com watts */}
                  <ProgressWithCircle watts={product.watts} />

                  <Link
                    to="#"
                    className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
                  >
                    Mais Informações
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      className="icon text-xl line-height-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
