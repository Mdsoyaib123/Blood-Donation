import { useLoaderData } from "react-router-dom";
import Banner from "../../Conponent/Home/Banner/Banner";
import Contact from "../../Conponent/Home/Contact/Contact";
import AboutUs from "../../Conponent/Home/AboutUs/AboutUs";
import DonationProcess from "../../Conponent/Home/DonationProcess/DonationProcess";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutUs></AboutUs>
      <DonationProcess></DonationProcess>
      <Contact></Contact>
    </div>
  );
};

export default Home;
