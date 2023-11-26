/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from './../Provider/AuthProvider/AuthProvider';
import useAdmin from './../Hooks/useAdmin';
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({children}) => {
    const location = useLocation()
   
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isAdminLoading]= useAdmin()

    if(loading || isAdminLoading){
        return <p>Loading.....</p>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate state={{from:location}} replace  to='/'></Navigate>
};

export default AdminRoutes;