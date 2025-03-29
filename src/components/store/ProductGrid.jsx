import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = () => {

    const products = [
        {
            name: "100 Rugas",
            category: "Saúde",
            producer: "Fulano de Tal",
            price: "R$ 97,00 até R$ 197,00",
            watts: 90,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "Gota Angolana",
            category: "Beleza",
            producer: "Joana Silva",
            price: "R$ 49,90 até R$ 79,90",
            watts: 130,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "100 Rugas",
            category: "Saúde",
            producer: "Fulano de Tal",
            price: "R$ 97,00 até R$ 197,00",
            watts: 90,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "Gota Angolana",
            category: "Beleza",
            producer: "Joana Silva",
            price: "R$ 49,90 até R$ 79,90",
            watts: 130,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "100 Rugas",
            category: "Saúde",
            producer: "Fulano de Tal",
            price: "R$ 97,00 até R$ 197,00",
            watts: 90,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "Gota Angolana",
            category: "Beleza",
            producer: "Joana Silva",
            price: "R$ 49,90 até R$ 79,90",
            watts: 130,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "100 Rugas",
            category: "Saúde",
            producer: "Fulano de Tal",
            price: "R$ 97,00 até R$ 197,00",
            watts: 90,
            img: "/assets/images/product/product-img6.png"
        },
        {
            name: "Gota Angolana",
            category: "Beleza",
            producer: "Joana Silva",
            price: "R$ 49,90 até R$ 79,90",
            watts: 130,
            img: "/assets/images/product/product-img6.png"
        },
    ];

    const ProgressWithCircle = ({ watts }) => {
        const percent = Math.min((watts / 150) * 100, 100);
        return (
            <div className="position-relative w-100 mt-3" style={{ height: '36px' }}>
                <div className="progress h-10-px w-100 bg-neutral-200 radius-8 overflow-hidden" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                    <div
                        className="rounded-pill"
                        style={{
                            width: `${percent}%`,
                            height: '10px',
                            background: '#44ADD4'
                        }}
                    />
                </div>
                <div
                    className="position-absolute"
                    style={{
                        left: `${percent}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: '#44ADD4',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: '600',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            padding: '2px'
                        }}
                    >
                        <div style={{ fontSize: '11px', lineHeight: '12px' }}>{watts}</div>
                        <div style={{ fontSize: '8px', opacity: 0.9, lineHeight: '10px' }}>watts</div>
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
                            <div
                                className="position-relative border radius-16 overflow-hidden shadow-sm"
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0px 8px 48px rgba(0,0,0,0.05)',
                                    padding: '16px'
                                }}
                            >

                                {/* Topo do Card */}
                                <div
                                    style={{
                                        background: '#eaeaea',
                                        height: '80px',
                                        borderTopLeftRadius: '12px',
                                        borderTopRightRadius: '12px'
                                    }}
                                />

                                {/* Imagem retangular */}
                                <div className="text-center mt--50">
                                    <img src={product.img} alt="" className="border br-white border-width-2-px w-100-px h-300-px radius-8 object-fit-cover mb-2" />
                                    <div className="bg-neutral-100 radius-8 p-2 mb-2" style={{ background: '#eaeaea' }}>
                                        <h6 className="text-lg mb-0">{product.name}</h6>
                                        <span className="text-secondary-light">{product.category}</span>
                                    </div>
                                </div>

                                {/* Barra */}
                                <ProgressWithCircle watts={product.watts} />

                                {/* Produtor e Preço com fundo cinza igual */}
                                <div className="center-border position-relative radius-8 p-12 d-flex align-items-start gap-4 mb-4" style={{ background: '#eaeaea', marginTop: '20px' }}>
                                    <div className="text-start w-50">
                                        <h6 className="text-md mb-0">Produtor</h6>
                                        <span className="text-secondary-light text-sm mb-0">{product.producer}</span>
                                    </div>
                                    <div className="text-start w-50">
                                        <h6 className="text-md mb-0">Preço</h6>
                                        <span className="text-secondary-light text-sm mb-0">{product.price}</span>
                                    </div>
                                </div>
                               

                                {/* Botão */}
                                <Link
                                    to="#"
                                    className="bg-primary-600 text-white bg-hover-primary-700 p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100"
                                >
                                    Mais Informações
                                    <Icon icon="solar:alt-arrow-right-linear" className="icon text-xl line-height-1" />
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;