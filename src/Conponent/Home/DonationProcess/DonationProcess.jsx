import Container from "../../Container/Container";

const DonationProcess = () => {
  return (
    <Container>
      <div className="my-10">
       <div className="my-10">
       <h1 className="text-3xl  font-bold text-center  ">DONATION PROCESS</h1>
        <div className="flex justify-center">
          <div className="divider w-1/3 text-black"></div>
        </div>
        <p className="text-center text-xl font-bold">The donation process from the time you arrive center until the time you leave</p>
       </div>
        <div className="lg:flex gap-7 ">
          <div className="flex-1 space-y-5 rounded-md bg-base-200 ">
            <img
              className=""
              src="https://i.ibb.co/G7YMxCr/process-1.jpg"
              alt=""
            />
            <div className="px-4 pb-6 space-y-3 ">
              <h1 className="text-xl font-bold">REGISTRATION</h1>
              <p>
                You need to complete a very simple registration form. Which
                contains all required contact information to enter in the
                donation process.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-5 bg-base-200 rounded-md">
            <img src="https://i.ibb.co/RS8b3VR/process-2.jpg" alt="" />
            <div className="px-4 pb-6 space-y-3">
              <h1 className="text-xl font-bold">SCREENING</h1>
              <p>
                A drop of blood from your finger will take for simple test to
                ensure that your blood iron levels are proper enough for
                donation process.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-5 bg-base-200 rounded-md">
            <img src="https://i.ibb.co/prcZxPb/process-3.jpg" alt="" />
            <div className="px-4 py-3 space-y-3">
              <h1 className="text-xl font-bold">DONATION</h1>
              <p>
                After ensuring and passed screening test successfully you will
                be directed to a donor bed for donation. It will take only 6-10
                minutes.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-5 bg-base-200 rounded-md">
            <img
              src="https://templates.bwlthemes.com/blood_donation/images/process_4.jpg"
              alt=""
            />
            <div className="px-4 py-3 space-y-3 ">
              <h1 className="text-xl font-bold">REFRESHMENT</h1>
              <p>
                You can also stay in sitting room until you feel strong enough
                to leave our center. You will receive awesome drink from us in
                donation zone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonationProcess;
