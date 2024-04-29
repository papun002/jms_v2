import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/client/Home";
import AddStaffs from "./pages/client/AddStaffs";
import AddProductCategory from "./pages/client/AddProductCategory";
import AddProducts from "./pages/client/AddProducts";
import GenerateBarcodes from "./pages/client/GenerateBarcodes";
import ViewReports from "./pages/client/ViewReports";
import Login from "./pages/login/Login";
import ClientSub from "./pages/client/ClientSub";
import SuccessPayment from "./components/subscription/SuccessPayment";
import ErrorPage from "./pages/404/ErrorPage";
import axios from "axios";
import Profiles from "./components/profile/Profiles";
import ModalComponent from "./components/modal/ModalComponent";
import Orders from "./pages/client/Orders";
import verification from "./context/Context";
import Authrize from "./utils/Authrize";
import AuthVerify from "./utils/AuthVerify";
import ClientProfile from "./components/profile/ClientProfile";
function App() {
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get("http://localhost:4000/clientloginauth/substs", {
          headers: {
            authorization: "Bearer " + localStorage.token,
          },
        })
        .then((res) => {
          setVerify((prev) => (prev = res.data.subPeriod));
          // console.log("SubPeriod",res.data.subPeriod);
        });
    } else {
      setVerify((prev) => (prev = false));
    }
  }, []);

  useEffect(() => {
    console.log("Verify", verify);
  }, [verify]);

  return (
    <>
    <Authrize>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<AuthVerify><Home/></AuthVerify>} />
            
                <Route path="/staffs" element={<AuthVerify><AddStaffs /></AuthVerify>} />
                <Route
                  path="/products/category"
                  element={<AddProductCategory />}
                />
                <Route path="/products/products" element={<AuthVerify><AddProducts /></AuthVerify>} />
                <Route path="/orders/products" element={<AuthVerify><Orders /></AuthVerify>} />
                <Route
                  path="/barcodes/generate-barcodes"
                  element={<AuthVerify><GenerateBarcodes /></AuthVerify>}
                />
                <Route path="/reports" element={<AuthVerify><ViewReports /></AuthVerify>} />
                <Route path="/profile" element={<AuthVerify><Profiles /></AuthVerify>} />
                <Route path="/profile/:id" element={<AuthVerify><Profiles /></AuthVerify>} />
                <Route path="/clients/profile" element={<AuthVerify><ClientProfile /></AuthVerify>} />

                <Route
                  path="/products/category/:id"
                  element={<AuthVerify><ModalComponent /></AuthVerify>}
                />

                <Route path="/sub" element={<AuthVerify><ClientSub /></AuthVerify>} />
                <Route path="/paymentsuccess" element={<AuthVerify><SuccessPayment /></AuthVerify>} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
          </Authrize>
    
    </>
  );
}

function Loading() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="loader"></div>
    </div>
  );
}

function UnauthorizedRoutes() {
  return (
 
      // <Route path="/login" element={<Login />} />
      <Navigate to="/home" />
   
  );
}

export default App;
