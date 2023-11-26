/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import useVolunteer from "../Hooks/useVolunteer";
import { Navigate, useLocation } from "react-router-dom";

const VolunteerRoutes = ({children}) => {
    const location = useLocation()
    const {user,loading} = useContext(AuthContext)
    const [isVolunteer,isVolunteerLoading] = useVolunteer()

    if(loading || isVolunteerLoading){
        return <p>Loading.....</p>
    }
    if(user && isVolunteer){
        return children
    }
    return <Navigate state={{from:location}} replace  to='/'></Navigate>
    
};

export default VolunteerRoutes;