import { Navigate } from "react-router-dom";
import { useAuth } from "./Authrize"
import { useEffect } from "react";

const AuthVerify = ({children}) => {
 const {user,setUser} = useAuth();
 window.onload = function() {return (<Loading/>)}
 setUser(localStorage.getItem("name"));
 if(localStorage.getItem("name")&&user == null){
    return (<><Loading/></>)
  }
  return (
    <div>{children}</div>
  )
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
export default AuthVerify