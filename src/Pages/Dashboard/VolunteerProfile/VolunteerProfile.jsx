import { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const VolunteerProfile = () => {
   
    const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: profile ={} ,refetch} = useQuery({
    queryKey: ["volunteerProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/volunteerProfile/${user?.email}`);
     
      return res.data;
    },
  });
  console.log(profile);
    return (
        <div className="bg-base-200 mx-10 px-10 py-20 mt-20">
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold mb-10">My Profile</h1>
        <Link to={""} className="text-[#e61710] text-xl underline">
          Edit
        </Link>
      </div>
      <div className="flex gap-12  ">
        <div className="">
          <img
            className="rounded-full w-[150px]"
            src={profile?.Avatar}
            alt=""
          />
          <button className="btn-sm rounded-md mt-10 text-white bg-[#e61710] w-full">
            Edit Profile
          </button>
        </div>
        <div className="  flex gap-10">
          <div className="space-y-4">
            <h3>
              Full Name : <br></br>{" "}
              <span className="text-xl font-bold">{profile?.name}</span>
            </h3>
            <h3>
              Email Address : <br></br>{" "}
              <span className="text-xl font-bold">{profile?.email}</span>
            </h3>
            <h3>
              District: <br></br>{" "}
              <span className="text-xl font-bold">
                {profile?.District ? profile?.District : "Not Avalable"}
              </span>
            </h3>
          </div>
          <div className="space-y-4">
            <h3>
              Upazila: <br></br>{" "}
              <span className="text-xl font-bold">
                {profile?.upazila ? profile?.upazila : "Not Avalable"}
              </span>
            </h3>
            <h3>
              Blood Group : <br></br>{" "}
              <span className="text-xl font-bold">
                {profile?.bloodGroup
                  ? profile?.bloodGroup
                  : "Not Avalable"}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    );
};

export default VolunteerProfile;