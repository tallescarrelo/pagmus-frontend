import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PostbackLayer from "../../components/tools/PostbackLayer";


const PostbackPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Webhook" />

        {/* PostbackPage */}
        <PostbackLayer />

      </MasterLayout>

    </>
  );
};

export default PostbackPage; 
