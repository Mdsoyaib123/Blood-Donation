import Container from "./../../Container/Container";
import { IoHomeOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { GiWorld } from "react-icons/gi";

const Contact = () => {
  return (
    <>
      <Container>
      <h1 className="text-5xl font-bold text-center  ">Contact us</h1>
      <div className="border-b-4 mt-3 my-5"></div>
        <div className="flex items-center">
          <div className="flex-1">
           <h1 className="text-4xl py-10"> Here  some method to <br></br>contact with us</h1>
            <div className="space-y-6 mt-3">
              <div className="text-lg  flex items-center gap-2  px-2 py-1">
                <IoHomeOutline className="bg-[#e61710] text-white px-2 py-1 text-4xl rounded-sm"></IoHomeOutline>
                <p>3100 C/A Mouchak,Sylhet,UK</p>
              </div>
              <div className="text-lg  flex items-center gap-2  px-2 py-1">
                <FiPhone className="bg-[#e61710] text-white px-2 py-1 text-4xl rounded-sm"></FiPhone>
                <a className="hover:text-red-500 cursor-pointer">
                  {" "}
                  +093-120-525-9162
                </a>
              </div>
              <div className="text-lg  flex items-center gap-2  px-2 py-1">
                <MdOutlineMail className="bg-[#e61710] text-white px-2 py-1 text-4xl rounded-sm"></MdOutlineMail>
                <a className="hover:text-red-500 cursor-pointer">
                  {" "}
                  mdsoyaibsourav@gmail.com
                </a>
              </div>
              <div className="text-lg  flex items-center gap-2  px-2 py-1">
                <GiWorld className="bg-[#e61710] text-white px-2 py-1 text-4xl rounded-sm"></GiWorld>
                <a className="hover:text-red-500 cursor-pointer">
                  {" "}
                  www.bloodDonation.com
                </a>
              </div>
            </div>
          </div>


          <div className="bg-base-200 rounded-md mt-0 flex-1 mb-10 pb-5">
         
            {/* form */}
            <div className=" space-y-6 px-6 py-6 ">
              <h2 className="text-2xl mb-3  font-bold">Say hello to us</h2>
              <input
                type="text "
                placeholder="Enter your name"
                className="px-6 shadow py-3 w-full"
              />
              <input
                type="email "
                placeholder="Enter your email"
                className="px-6 shadow py-3 w-full"
              />
              <input
                type="text "
                placeholder="Subject"
                className="px-6 shadow py-3 w-full"
              />

              <textarea
                placeholder="message "
                className="w-full px-6 py-3"
                rows={"5"}
              ></textarea>
              <button className="btn text-white  bg-[#e61710]">SEND NOW</button>
            </div>
            {/* map */}
          
       
      </div>

        </div>
      </Container>

     
    </>
  );
};

export default Contact;

{
  /* <div className="w-1/2"> */
}
{
  /* <h2 className="text-2xl font-bold ">Our Location</h2> */
}
{
  /* <img src="https://i.ibb.co/C8JLQQJ/undraw-Personal-text-re-vqj3.png" alt="" /> */
}
// </div>
