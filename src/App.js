import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RouteScrollToTop from "./helper/RouteScrollToTop";

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

// Páginas de erro e acesso
import ErrorPage from "./pages/ErrorPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MaintenancePage from "./pages/MaintenancePage";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <HashRouter future={{ v7_relativeSplatPath: true }}>
      <RouteScrollToTop />
      <Routes>
        {/* Rotas Públicas de Autenticação */}
        <Route exact path="/" element={<SignInPage />} />
        <Route exact path="/sign-up" element={<SignUpPage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Rotas de Sistema */}
        <Route exact path="/error" element={<ErrorPage />} />
        <Route exact path="/access-denied" element={<AccessDeniedPage />} />
        <Route exact path="/maintenance" element={<MaintenancePage />} />
        <Route exact path="/coming-soon" element={<ComingSoonPage />} />

        {/* Rotas Privadas - Core Business */}
        <Route
          exact
          path="/Dashboard"
          element={
            <PrivateRoute>
              <HomePageTen />
            </PrivateRoute>
          }
        />
        
        <Route
          exact
          path="/view-profile"
          element={
            <PrivateRoute>
              <ViewProfilePage />
            </PrivateRoute>
          }
        />

        {/* Produtos */}
        <Route
          exact
          path="/products/products"
          element={
            <PrivateRoute>
              <MyProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/products/register"
          element={
            <PrivateRoute>
              <RegisterProductPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/products/view-product"
          element={
            <PrivateRoute>
              <ViewProductPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/products/affiliates"
          element={
            <PrivateRoute>
              <ProductsAffiliates />
            </PrivateRoute>
          }
        />

        {/* Loja */}
        <Route
          exact
          path="/store/store-products"
          element={
            <PrivateRoute>
              <ProductGridPage />
            </PrivateRoute>
          }
        />

        {/* Afiliados */}
        <Route
          exact
          path="/affiliate/my-affiliate-products"
          element={
            <PrivateRoute>
              <MyAffiliateProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/affiliate/affiliates-of-my-products"
          element={
            <PrivateRoute>
              <AffiliatesOfMyProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/performance-affiliates"
          element={
            <PrivateRoute>
              <PerformanceAffiliates />
            </PrivateRoute>
          }
        />

        {/* Vendas e Relatórios */}
        <Route
          exact
          path="/invoice-list"
          element={
            <PrivateRoute>
              <InvoiceListPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/churn"
          element={
            <PrivateRoute>
              <ChurnPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/abandon"
          element={
            <PrivateRoute>
              <AbandonPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/reversal"
          element={
            <PrivateRoute>
              <ReversalPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/indicators"
          element={
            <PrivateRoute>
              <IndicatorsPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/afterpay"
          element={
            <PrivateRoute>
              <AfterPayPage />
            </PrivateRoute>
          }
        />

        {/* Entregas */}
        <Route
          exact
          path="/delivery-pending"
          element={
            <PrivateRoute>
              <PendingPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/delivery-forwarded"
          element={
            <PrivateRoute>
              <Forwarded />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/delivery-completed"
          element={
            <PrivateRoute>
              <Completed />
            </PrivateRoute>
          }
        />

        {/* Financeiro */}
        <Route
          exact
          path="/banks"
          element={
            <PrivateRoute>
              <BanksPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/withdrawals"
          element={
            <PrivateRoute>
              <Withdrawals />
            </PrivateRoute>
          }
        />

        {/* Ferramentas */}
        <Route
          exact
          path="/api"
          element={
            <PrivateRoute>
              <ApiPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/frete"
          element={
            <PrivateRoute>
              <FreightPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/webhook"
          element={
            <PrivateRoute>
              <PostbackPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/team"
          element={
            <PrivateRoute>
              <TeamPage />
            </PrivateRoute>
          }
        />

        {/* Integrações */}
        <Route
          exact
          path="/integration"
          element={
            <PrivateRoute>
              <IntegrationPage />
            </PrivateRoute>
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
