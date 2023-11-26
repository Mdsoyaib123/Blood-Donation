import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const Navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((res) => {
        toast.success("Successfully logged In!");
        console.log(res.user);
        Navigate(from,{replace:true})
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        Navigate(from,{replace:true})
        
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          Avatar: res.user.photoURL,
          role: "Donor",
          status: "Active",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success('successfully created account')
          
          }
        });
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-red-500 to-amber-600">
      <div className="hero-content flex-col lg:flex-row w-full">
        <div className="card flex-shrink-0 w-1/2 max-w-xl   ">
          <form onSubmit={handleSubmit} className="card-body ">
            <div className="form-control">
              {/* <label className="label">
                <span className="label-text">Email</span>
              </label> */}
              <h1 className="text-center text-5xl mb-12 text-white font-bold">
                Login Now
              </h1>
              <label className="label ">
                <span className="label-text font-bold text-white">
                  Full Name
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter name"
                className="input bg-white py-4 rounded-2xl"
                required
              />
            </div>
            <div className="form-control">
              <label className="label ">
                <span className="label-text font-bold text-white">
                  Password
                </span>
              </label>
              <input
                type="Password"
                name="password"
                placeholder="Enter email"
                className="input bg-white rounded-2xl"
                required
              />

              <label className="label flex justify-end">
                <a href="#" className="text-white link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <p className="text-red-500 text-lg py-2"></p>
              <input
                className="btn bg-[#e61710] text-white rounded-2xl"
                type="submit"
                value="LOGIN"
                data-aos="zoom-in"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
              />
            </div>
            <div className="text-center">
              <h3 className="py-3 text-xl font-bold">--- Or Login with ---</h3>

              <button
                onClick={handleGoogleLogin}
                className="btn text-lg w-full "
              >
                <FcGoogle className="text-2xl"></FcGoogle> Login with Google
              </button>
            </div>
            <p className="text-md mt-4 font-bold text-white">
              If you Do not have account you can{" "}
              <Link to={"/register"} className="text-black text-xl underline">
                &nbsp;Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
