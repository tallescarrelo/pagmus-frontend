import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import TeamLayer from "../../components/tools/TeamLayer";

const TeamPage: React.FC = () => {
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