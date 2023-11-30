import Container from "../../Container/Container";

const Gallery = () => {
  return (
    <Container>
      <div className="my-10">
        <div className="my-10">
          <h1 className="text-3xl  font-bold text-center  ">OUR VOLUNTEERS</h1>
          <div className="flex justify-center">
            <div className="divider w-1/3 text-black"></div>
          </div>
          <p className="text-center text-xl font-bold">
            The volunteers who give their time and talents help to fulfill our
            mission.
          </p>
        </div>
        <div data-aos="fade-up"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="1000" className="lg:flex gap-6">
          <div className="flex-1 text-center border space-y-1 py-4">
            <img className="mb-4" src="https://i.ibb.co/HTK3nFh/team-9.jpg" alt="" />
            <h1 className="text-2xl font-bold">ALEXANDER GARY</h1>
            <p>CO-FOUNDER</p>
          </div>
          <div className="flex-1 text-center border space-y-1 py-4">
            <img className="mb-4" src="https://i.ibb.co/DpnTwyC/team-6.jpg" alt="" />
            <h1 className="text-2xl font-bold">MELISSA MUNOZ</h1>
            <p>FOUNDER</p>
          </div>
          <div className="flex-1 text-center border space-y-1 py-4">
            <img className="mb-4" src="https://i.ibb.co/cgpRcqW/team-7.jpg" alt="" />
            <h1 className="text-2xl font-bold ">JOHN ABRAHAM</h1>
            <p>MANAGER</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Gallery;
