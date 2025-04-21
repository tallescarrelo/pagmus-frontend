import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerTen from "../components/DashBoardLayerTen";
import MasterLayout from "../masterLayout/MasterLayout";

const HomePageTen = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Início" />

        {/* DashBoardLayerTen */}
        <DashBoardLayerTen />
      </MasterLayout>
    </>
  );
};

export default HomePageTen;
