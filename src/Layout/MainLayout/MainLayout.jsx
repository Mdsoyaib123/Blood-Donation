import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/shered/Navbar/Navbar";
import Footer from "../../Conponent/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;