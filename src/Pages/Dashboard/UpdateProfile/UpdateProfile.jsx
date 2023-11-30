import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import useAddressData from "../../../Hooks/useAddressData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useVolunteer from "../../../Hooks/useVolunteer";

const UpdateProfile = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [ isVolunteer] = useVolunteer()
    const [district, upazilas] = useAddressData();
  const axiosPublic = useAxiosPublic();
  const Navigate = useNavigate()
 
  const [updatebleData, setUpdatebleData] = useState({});

  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedUpazila, setSelectedUpazila] = useState();
  const [selectedBlood, setSelectedBlood] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://blood-donation-server-one.vercel.app/UpdateProfile/${id}`)
    .then((res) => {
      setUpdatebleData(res.data)

      setSelectedBlood(res.data?.bloodGroup);
      setSelectedDistrict(res.data?.District);
      setSelectedUpazila(res.data?.upazila);
    });
  }, [id]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const district = selectedDistrict;
    const upazila = selectedUpazila;
    const blood = selectedBlood;
    console.log(name, photoUrl, district, upazila, blood );
    const updateData = { name, photoUrl, district, upazila, blood };
    
    const res = await axiosPublic.patch(
      `/updateProfile/${updatebleData._id}`,
      updateData
    );
    console.log(res.data);
    if(res.data.modifiedCount > 0 ){ 
       { 
        isAdmin ? Navigate('/dashBoard/adminProfile') :  isVolunteer ? Navigate('/dashBoard/volunteerProfile') :  Navigate('/dashBoard/userProfile') 
       }
      toast.success('Profile information updated')
    }
    
  };
  <Navigate state={{from:location}} replace  to='/login'></Navigate>
    return (
        <div>
      <h1 className="text-center text-3xl font-bold"> Update Profile</h1>
      <form onSubmit={handleSubmit} className="card-body bg-white px-10   ">
        <div className="form-control">
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-2/3">
              <label className="label">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <input
                defaultValue={updatebleData?.name}
                type="text"
                name="name"
                placeholder="name"
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-1/3">
              <label className="label">
                <span className="label-text font-bold">Blood Group</span>
              </label>
              <select
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
                name="blood"
                id="blood"
                required
              >
                <option value={"  please select"}>please select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
          <div className="lg:flex justify-between gap-5 ">
            <div className="w-1/2">
              <label className="label">
                <span className="label-text font-bold">District</span>
              </label>
              <select
                onChange={(e) => setSelectedDistrict(e.target.value)}
                value={selectedDistrict}
                name="district"
                required
                className="border rounded-lg border-gray-400 px-2 py-3 w-full"
              >
                <option value={" please select"}>please select</option>
                {district?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="label">
                <span className="label-text font-bold">Upazila</span>
              </label>
              <select
                onChange={(e) => setSelectedUpazila(e.target.value)}
                value={selectedUpazila}
                className="border rounded-lg border-gray-400 px-2  py-3 w-full"
                name="upazila"
                id="1"
              >
                <option value={"please select"}>please select</option>
                {upazilas?.map((item) => (
                  
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="lg:flex w-full justify-between gap-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Photo Url</span>
            </label>
            <input
              defaultValue={updatebleData?.Avatar}
              type="url"
              name="photoUrl"
              placeholder="photo url"
              className="input border-gray-400  py-4 rounded-lg"
              required
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <p className="text-red-500 py-2"></p>
          <input
            className="btn bg-[#e61710] text-white rounded-lg"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
    );
};

export default UpdateProfile;