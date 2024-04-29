import { React, useEffect } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import AdminCardEmbbed from "../../components/functionalities/ClientCardEmbbed";
import HeaderIntroduction from "../../components/header/HeaderIntroduction";

import verification from "../../context/Context";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/Authrize";
import Analytics from "../../components/graph/Analytics";
function Home() {
  const { handlePageTitleChange } = usePageTitle();
  const { user } = useAuth();

  useEffect(() => {
    handlePageTitleChange("Client Dashboard");
    return () => {
      handlePageTitleChange("Empty"); // Fix the typo here
    };
  }, [handlePageTitleChange]);

  const introText =
    "Welcome to your dashboard, kindly manage your products, orders, and users from here.";

  //checking context

  console.log("Verification", user);
  return (
    <>
   {user ? (
        <>
          <HeaderIntroduction introText={introText} />
          <AdminCardEmbbed />{" "}
          <div className=" row clearfix row-deck">
          <Analytics />

          </div>
        </>
      ) : (
        <Navigate to="/sub" />
      )}
    </>
  );
}

export default Home;
