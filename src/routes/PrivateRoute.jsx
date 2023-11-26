/* eslint-disable react/prop-types */
import { useContext } from "react"
import { AuthContext } from "../Provider/AuthProvider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <p className="text-2xl text-center">loading......</p>
    }
    if(user){
        return children
    }
    return <Navigate state={{from:location}} replace  to='/login'></Navigate>
}
export default PrivateRoute;