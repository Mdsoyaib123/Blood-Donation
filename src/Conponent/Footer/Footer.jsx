import toast from "react-hot-toast";
import Container from "../Container/Container";

const Footer = () => {
  const handleSubscribe = () => {
    toast.success("Subscribe successful");
  };
  return (
    <div className="bg-[#0a0b0d] text-white pt-16">
      <Container>
        <div className="lg:flex gap-10">
          <img src="https://i.ibb.co/CVp7ZHM/logo-footer.png" alt="" />
          <p>
            We are world largest and trustful blood donation center. We have
            been working since 1973 with a prestigious vision to helping patient
            to provide blood. We are working all over the world, organizing
            blood donation campaign to grow awareness among the people to donate
            blood.
          </p>
        </div>
        <div className="divider"></div>
        <footer className="footer p-10   ">
          <aside className="space-y-2">
            <h1 className="text-2xl font-bold">SUBSCRIBE US</h1>
            <p>
              Signup for regular newsletter and stay up to date with our latest
              news.
            </p>
            <input
              required
              className="py-2 px-6 w-full"
              type="text"
              name=""
              placeholder="Enter your Email"
              id=""
            />
            <button
              onClick={handleSubscribe}
              className="btn text-white bg-[#e61710]"
            >
              SUBSCRIBE NOW
            </button>
          </aside>
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <header className="footer-title">Company</header>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
