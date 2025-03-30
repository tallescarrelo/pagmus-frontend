import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  console.log("myProducts do dash", myProducts);

  const getProducts = useCallback(async () => {
    try {
      const response = await ProductsServices.getProducts();
      console.log("response", response);
      dispatch(setProducts(response));
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
      <TopCustomer />

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
