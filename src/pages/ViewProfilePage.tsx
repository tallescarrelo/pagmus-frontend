import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../components/Breadcrumb";
import ViewProfileLayer from "../components/ViewProfileLayer";
import MasterLayout from "../masterLayout/MasterLayout";

interface RootState {
  user: {
    user: any;
  };
}

const ViewProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="View Profile" />

        {/* ViewProfileLayer */}
        <ViewProfileLayer user={user} />
      </MasterLayout>
    </>
  );
};

export default ViewProfilePage; 