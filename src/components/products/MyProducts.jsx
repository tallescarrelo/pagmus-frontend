import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

const MyProducts = () => {

    const products = [
        {
            name: "100 Rugas",
            category: "prodes12",
            producer: "Fulano de Tal",
            price: "R$ 97,00 até R$ 197,00",
            watts: 90,
            img: "/assets/images/product/product-img6.png",
            bg: "/assets/images/user-grid/user-grid-bg1.png"
        },
        {
            name: "Gota Angolana",
            category: "prodes23",
            producer: "Joana Silva",
            price: "R$ 49,90 até R$ 79,90",
            watts: 130,
            img: "/assets/images/product/product-img6.png",
            bg: "/assets/images/user-grid/user-grid-bg1.png"
        },
    ];

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="d-flex justify-content-between align-items-center mb-4 px-24 pt-24">
                <h6 className="mb-0 fw-semibold">Meus Produtos</h6>
                <Link
                    to="#"
                    className="btn btn-primary d-flex align-items-center gap-2 radius-8"
                >
                    <Icon icon="ic:baseline-plus" className="text-xl" />
                    Cadastrar Produto
                </Link>
            </div>

            <div className="card-body p-24">
                <div className="row gy-4">
                    {products.map((product, index) => (
                        <div className="col-xxl-3 col-md-6 user-grid-card" key={index}>
                            <div className="position-relative border radius-16 overflow-hidden">
                                <img src={product.bg} alt="" className="w-100 object-fit-cover" />
                                <div className="ps-16 pb-16 pe-16 text-center mt--50">
                                    <img src={product.img} alt="" className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover" />
                                    <h4 className="text-lg mb-0 mt-4">{product.name}</h4>
                                    <span className="text-secondary-light mb-12"><b>Código:</b> {product.category}</span>

                                    <Link
                                        to="/products/view-product"
                                        className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
                                    >
                                        Mais Informações
                                        <Icon icon="solar:alt-arrow-right-linear" className="icon text-xl line-height-1" />
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

export default MyProducts;