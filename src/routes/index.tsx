import { Route, Routes } from "react-router-dom";
import {
  Clients,
  Financial,
  Home,
  Orders,
  Product,
  Reports,
} from "../screens";
import MyProducts from "../screens/ImportProducts";
import RecoverPassword from "../screens/RecoverPassword";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Integration from "../screens/Integration";
import Store from "../screens/Store";
import Affiliates from "../screens/Affiliates";
import AffiliatesSolicitation from "../components/AffialtesSolictation";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/myproducts" element={<MyProducts/>}/>
      <Route path="/clientes" element={<Clients />} />
      <Route path="/financeiro" element={<Financial />} />
      <Route path="/pedidos" element={<Orders />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/integration" element={<Integration />} />
      <Route path="/store" element={<Store />} />
      <Route path="/afiliados" element={<Affiliates />} />
      <Route path="/solicitações" element={< AffiliatesSolicitation/>} />
    </Routes>
  );
};

export default Router;
