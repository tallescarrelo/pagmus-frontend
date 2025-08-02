import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AffiliateProvider } from "./contexts/AffiliateContext";
import { ReportsProvider } from "./contexts/ReportsContext";
import { ProductProvider } from "./contexts/ProductContext";

// Páginas de autenticação
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Dashboard principal
import HomePageTen from "./pages/HomePageTen";

// Páginas de perfil
import ViewProfilePage from "./pages/ViewProfilePage";

// Páginas de produtos
import MyProductsPage from "./pages/products/MyProductsPage";
import RegisterProductPage from "./pages/products/RegisterProduct";
import ViewProductPage from "./pages/products/ViewProductPage";
import ProductPlansPage from "./pages/products/ProductPlansPage";

// Páginas de loja
import ProductGridPage from "./pages/store/ProductGridPage";

// Páginas de afiliados
import AffiliatesOfMyProductsPage from "./pages/affiliate/AffiliatesOfMyProductsPage";
import MyAffiliateProductsPage from "./pages/affiliate/MyAffiliateProductsPage";
import ProductsAffiliates from "./pages/affiliate/ProductsAffiliates";
import PerformanceAffiliates from "./pages/affiliate/PerformanceAffiliates";

// Páginas de vendas e relatórios
import InvoiceListPage from "./pages/sales/InvoiceListPage";
import ChurnPage from "./pages/sales/ChurnPage";
import AbandonPage from "./pages/sales/AbandonPage";
import ReversalPage from "./pages/sales/ReversalPage";
import IndicatorsPage from "./pages/sales/IndicatorsPage";
import AfterPayPage from "./pages/sales/AfterPayPage";

// Páginas de entregas
import PendingPage from "./pages/delivery/Pending";
import Forwarded from "./pages/delivery/Forwarded";
import Completed from "./pages/delivery/Completed";

// Páginas financeiras e bancos
import BanksPage from "./pages/banks/Banks";
import Withdrawals from "./pages/banks/Withdrawals";

// Páginas de ferramentas
import ApiPage from "./pages/tools/ApiPage";
import FreightPage from "./pages/tools/FreightPage";
import PostbackPage from "./pages/tools/PostbackPage";
import TeamPage from "./pages/tools/TeamPage";

// Páginas de integração
import IntegrationPage from "./pages/integration/IntegrationPage";

// Páginas de checkout
import CheckoutPage from "./components/checkout/CheckoutPage";
import CheckoutSuccessPage from "./pages/checkout/CheckoutSuccessPage";

// Páginas de afiliados
import AffiliateMainPage from "./pages/affiliate/AffiliateMainPage";

// Páginas de relatórios
import ReportsMainPage from "./pages/reports/ReportsMainPage";

// Páginas de erro e acesso
import ErrorPage from "./pages/ErrorPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MaintenancePage from "./pages/MaintenancePage";
import ComingSoonPage from "./pages/ComingSoonPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AffiliateProvider>
            <ReportsProvider>
              <HashRouter future={{ v7_relativeSplatPath: true }}>
                <RouteScrollToTop />
                <Routes>
                  {/* Rotas Públicas de Autenticação */}
                  <Route path="/" element={<SignInPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Rotas de Sistema */}
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="/access-denied" element={<AccessDeniedPage />} />
                  <Route path="/maintenance" element={<MaintenancePage />} />
                  <Route path="/coming-soon" element={<ComingSoonPage />} />

                  {/* Rotas Privadas - Core Business */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <HomePageTen />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Produtos */}
                  <Route
                    path="/products"
                    element={
                      <PrivateRoute>
                        <MyProductsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/products/register"
                    element={
                      <PrivateRoute>
                        <RegisterProductPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/products/:id"
                    element={
                      <PrivateRoute>
                        <ViewProductPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/products/:id/plans"
                    element={
                      <PrivateRoute>
                        <ProductPlansPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Loja */}
                  <Route
                    path="/store"
                    element={
                      <PrivateRoute>
                        <ProductGridPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Afiliados */}
                  <Route
                    path="/affiliate"
                    element={
                      <PrivateRoute>
                        <AffiliateMainPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/affiliate/my-products"
                    element={
                      <PrivateRoute>
                        <MyAffiliateProductsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/affiliate/products/:id"
                    element={
                      <PrivateRoute>
                        <AffiliatesOfMyProductsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/affiliate/products"
                    element={
                      <PrivateRoute>
                        <ProductsAffiliates />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/affiliate/performance"
                    element={
                      <PrivateRoute>
                        <PerformanceAffiliates />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Vendas */}
                  <Route
                    path="/sales/invoices"
                    element={
                      <PrivateRoute>
                        <InvoiceListPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales/churn"
                    element={
                      <PrivateRoute>
                        <ChurnPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales/abandon"
                    element={
                      <PrivateRoute>
                        <AbandonPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales/reversal"
                    element={
                      <PrivateRoute>
                        <ReversalPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales/indicators"
                    element={
                      <PrivateRoute>
                        <IndicatorsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/sales/after-pay"
                    element={
                      <PrivateRoute>
                        <AfterPayPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Entregas */}
                  <Route
                    path="/delivery/pending"
                    element={
                      <PrivateRoute>
                        <PendingPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/delivery/forwarded"
                    element={
                      <PrivateRoute>
                        <Forwarded />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/delivery/completed"
                    element={
                      <PrivateRoute>
                        <Completed />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas Financeiras */}
                  <Route
                    path="/banks"
                    element={
                      <PrivateRoute>
                        <BanksPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/withdrawals"
                    element={
                      <PrivateRoute>
                        <Withdrawals />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Ferramentas */}
                  <Route
                    path="/tools/api"
                    element={
                      <PrivateRoute>
                        <ApiPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/tools/freight"
                    element={
                      <PrivateRoute>
                        <FreightPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/tools/postback"
                    element={
                      <PrivateRoute>
                        <PostbackPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/tools/team"
                    element={
                      <PrivateRoute>
                        <TeamPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Integração */}
                  <Route
                    path="/integration"
                    element={
                      <PrivateRoute>
                        <IntegrationPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Checkout */}
                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <CheckoutPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/checkout/success"
                    element={
                      <PrivateRoute>
                        <CheckoutSuccessPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Relatórios */}
                  <Route
                    path="/reports"
                    element={
                      <PrivateRoute>
                        <ReportsMainPage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas de Perfil */}
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <ViewProfilePage />
                      </PrivateRoute>
                    }
                  />

                  {/* Rota padrão - redireciona para login */}
                  <Route path="*" element={<SignInPage />} />
                </Routes>
              </HashRouter>
            </ReportsProvider>
          </AffiliateProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App; 