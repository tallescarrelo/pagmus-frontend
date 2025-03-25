import React from "react";
import { Route, Routes } from "react-router-dom";
import AffiliatesSolicitation from "../components/AffialtesSolictation";
import {
  Clients,
  Financial,
  Home,
  Orders,
  Product,
  Reports,
} from "../screens";
import Affiliates from "../screens/Affiliates";
import MyProducts from "../screens/ImportProducts";
import Integration from "../screens/Integration";
import RecoverPassword from "../screens/RecoverPassword";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Store from "../screens/Store";

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
