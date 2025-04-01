import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AffiliatesServices from "../services/api/affiliates";
import ProductsServices from "../services/api/products";
import { selectProducts, setProducts } from "../services/reducers/products";
import IncomeVsExpense from "./child/IncomeVsExpense";
import OverallReport from "./child/OverallReport";
import PurchaseAndSales from "./child/PurchaseAndSales";
import RecentTransactions from "./child/RecentTransactions";
import TopCustomer from "./child/TopCustomer";
import TopSuppliers from "./child/TopSuppliers";
import UnitCountSeven from "./child/UnitCountSeven";
import UsersChart from "./child/UsersChart";

const DashBoardLayerTen = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector(selectProducts);

  const [affiliates, setAffiliates] = useState();

  const getProducts = useCallback(async () => {
    try {
      const response = await ProductsServices.getProducts();
      dispatch(setProducts(response));
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts();
    getAllAfilliates();
  }, [getProducts]);

  const getAllAfilliates = async () => {
    try {
      const response = await AffiliatesServices.getAffiliatesProducts();
      setAffiliates(response);
    } catch (error) {
      console.error("Error in getAllAfilliates:", error);
    }
  };

  return (
    <div className="row gy-4">
      <UnitCountSeven />

      {/* IncomeVsExpense */}
      <IncomeVsExpense />

      {/* UsersChart */}
      <UsersChart />

      {/* TopSuppliers */}
      <TopSuppliers myProducts={myProducts} />

      {/* TopCustomer */}
      <TopCustomer affiliates={affiliates} />

      {/* OverallReport */}
      <OverallReport />

      {/* PurchaseAndSales */}
      <PurchaseAndSales />

      {/* RecentTransactions */}
      <RecentTransactions />
    </div>
  );
};

export default DashBoardLayerTen;
