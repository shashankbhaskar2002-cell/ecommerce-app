import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const isLoggedIn = true;
    const role = "admin";


    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }


    return children;
}

export default AdminRoute;