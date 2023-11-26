import { useLoaderData } from "react-router-dom";
import Banner from "../../Conponent/Home/Banner/Banner";
import Contact from "../../Conponent/Home/Contact/Contact";
import TitleBanner from "../shered/TitleBanner/TitleBanner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* <Contact></Contact> */}
            {/* <TitleBanner></TitleBanner> */}
        </div>
    );
};

export default Home;