const Banner = () => {
  return (
    <div className="h-screen relative mb-28">
      <div>
        <img src="https://i.ibb.co/C25Qxsk/home-1-slider-1.jpg" alt="" />
      </div>
      <div className="flex justify-center">
        <div className="text-center text-white font-bold absolute top-60">
          <h1 className="text-5xl mb-8">DONATE BLOOD AND GET REAL BLESSINGS.</h1>
          <h3 className="text-2xl">
            Blood is the most precious gift that anyone can give to another
            person.
          </h3>
          <h3 className="text-2xl mb-20">
            Donating blood not only saves the life also save donors lives.
          </h3>
       
            <button className=" bg-red-600 px-5 py-3 rounded-md border hover:bg-[#e61710]  mr-12 text-xl">Join as a donor</button>
            <button className=" bg-red-600 px-5 py-3 rounded-md border hover:bg-[#e61710] text-xl text-white ">Search Donors</button>
        
        </div>
      </div>
    </div>
  );
};

export default Banner;
