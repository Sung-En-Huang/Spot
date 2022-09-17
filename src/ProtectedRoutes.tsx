import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    console.log(loggedIn)
    
    return loggedIn==="true" ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default ProtectedRoutes;  