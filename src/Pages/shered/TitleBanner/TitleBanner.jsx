const TitleBanner = ({ heading, Home, data }) => {
  return (
    <>
      <div className="image-container  ">
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="relative "
        >
          <img
            className="h-[300px] opacity-80 w-full object-cover object-center "
            src="https://i.ibb.co/R9nLBrp/colleagues-working-together-call-center-office.jpg"
            alt=""
          />
          <div className="absolute top-0 flex flex-col items-center justify-center text-inherit h-full w-full bg-gradient-to-r from-[#0f0a09] to-[rgba(21, 21, 21, 0)  space-y-2">
            <h1 className="text-5xl top-1/2 font-bold text-white">
              Contact with us
            </h1>
            <p className="text-2xl text-white font-semibold">
              Home / Contact Us{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleBanner;
