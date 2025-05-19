import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";

import ApiLayer from "../../components/tools/ApiLayer";
import TeamLayer from "../../components/tools/TeamLayer";


const TeamPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="API" />

        {/* TeamPage */}
        <TeamLayer />

      </MasterLayout>

    </>
  );
};

export default TeamPage; 
