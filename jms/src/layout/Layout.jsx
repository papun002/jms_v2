import { React, useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import AdminSidebarEmbbed from "../components/functionalities/ClientLeftSidebarEmbbed";
import { PageTitleProvider } from "../components/functionalities/PageTitleProvider";
import axios from "axios";
import ClientNonSubSideBarData from "../components/functionalities/ClientNonSubSideBarData";
import verification from "../context/Context";

function Layout() {
  const redirect = useNavigate();
  const [log, setIsLog] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const handleLogout = (val) => {
    setIsLog(val);
  };

  useEffect(() => {
    if (!localStorage.token) {
      redirect("/login");
      // console.log("Not Effecting2...");
    }
  }, [log]);

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:4000/clientloginauth/substs", {
          headers: {
            authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          setSubscription(res.data.subPeriod);
          // console.log(res.data.subPeriod);
        });
    }
  }, []);

  return (
    <>
      {localStorage.token ? (
        <PageTitleProvider>
          {subscription ? <AdminSidebarEmbbed /> : null}
          <div id="main_content">
            <div className="page">
              <Navbar onLogout={handleLogout} />
              <div className="section-body mt-3">
                <div className="container-fluid">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </PageTitleProvider>
      ) : (

           <Outlet />
      )}
    </>
  );
}

export default Layout;
