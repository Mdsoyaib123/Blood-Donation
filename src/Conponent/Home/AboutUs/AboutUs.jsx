import Container from "../../Container/Container";
import '../../Home/AboutUs/AboutUs.css'

const AboutUs = () => {
  return (
    <Container>
      <div className="relative lg:flex gap-5 items-center my-20 mt-10">
        <div className="lg:w-1/2   ">
          <h1 className="text-4xl font-bold"><span className="underline underline-offset-8 ">Who</span> We Are?</h1>
          <p className="py-6">
            Blood Buddies is for public donation center with blood donation
            members in the changing health care system.
          </p>
          <ol className="circle space-y-2">
            <li>Specialist blood donors and clinical supervision.</li>
            <li>Increasing communication with our members.</li>
            <li>High quality assessment, diagnosis and treatment.</li>
            <li>Examine critically to ensure alignment.</li>
            <li>The extra care of a multi-disciplinary team.</li>
          </ol>
        </div>
        <div className="lg:w-1/2">
            <img src="https://i.ibb.co/jhD5671/portrait-young-military-man-giving-blood-donor-center-with-nurse-helping-copy-space-236854-39690.jpg" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
