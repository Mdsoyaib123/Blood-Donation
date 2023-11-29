import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAddressData from "../../../Hooks/useAddressData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [district, upazilas] = useAddressData();
  const axiosPublic = useAxiosPublic();
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectUpazila, setSelectUpazila] = useState("");
  const [isActiveUser,setIsActiveUser] = useState({})
    
  useEffect(()=>{
    axiosPublic.get(`/isActive/${user?.email}`)
    .then(res=>{
        setIsActiveUser(res.data)
    })
  },[axiosPublic,user?.email])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = form.requesterName.value;
    const requesterEmail = form.requesterEmail.value;
    const recipientName = form.recipientName.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;
    const status = 'pending'
    const donationData = {
      requesterName,
      requesterEmail,
      recipientName,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      requestMessage,
      selectDistrict,
      selectUpazila,
      status
    };
    
    const res = await axiosPublic.post("/donation", donationData);
    console.log(res.data);
    if(res.data.insertedId ){
      toast.success('Create donation request successfully')
    }
  };

  return (
    
    <div>
      <h1 className="text-center text-3xl font-bold mb-20">Create Donation Request </h1>
      {
        isActiveUser?.status === 'Blocked' ? <div>
            <h1 className="text-center text-3xl font-bold mt-10">You can not Create Donation Request . Because you are blocked by admin</h1>
        </div>
        :
        <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Requester Name</span>
              </label>
              <input
                value={user?.displayName}
                readOnly
                type="text"
                name="requesterName"
                placeholder="Requester Name"
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Requester Email</span>
              </label>
              <input
                value={user?.email}
                readOnly
                type="email"
                name="requesterEmail"
                placeholder="Requester Email"
                className="input border-gray-400 py-4 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Recipient Name</span>
              </label>
              <input
                type="text"
                name="recipientName"
                placeholder="Recipient Name "
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Hospital Name</span>
              </label>
              <input
                type="text"
                name="hospitalName"
                placeholder="Hospital Name"
                className="input border-gray-400 py-4 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Recipient Upazila </span>
              </label>
              <select
                onChange={(e) => setSelectUpazila(e.target.value)}
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
              >
                <option value="select upazila" disabled selected>
                  Select Upazila
                </option>
                {upazilas.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Recipient District</span>
              </label>
              <select
                onChange={(e) => setSelectDistrict(e.target.value)}
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
              >
                <option value="select district" disabled selected>
                  {" "}
                  Select District
                </option>
                {district.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Full Address Line</span>
              </label>
              <input
                type="text"
                name="fullAddress"
                placeholder="Full  Address Line"
                className="input border-gray-400  py-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Donation Date</span>
              </label>
              <input
                type="date"
                name="donationDate"
                placeholder="Donation Date"
                className="input border-gray-400 py-4 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text font-bold">Donation Time</span>
            </label>
            <input
              type="time"
              name="donationTime"
              placeholder="Donation Time"
              className="input border-gray-400 py-4 rounded-lg"
              required
            />
          </div>
          <div className="form-control w-2/3">
            <label className="label">
              <span className="label-text font-bold"> Request Message</span>
            </label>
            <textarea
              name="requestMessage"
              className="border-2 px-5 py-6"
              cols="30"
              rows="4"
              placeholder="Type your message "
            ></textarea>
          </div>
          <input
            className="btn btn-md bg-[#e61710] text-white mt-4"
            type="submit"
            value="Request"
          />
        </form>
      </div>
      }
    
    </div>
  );
};

export default CreateDonationRequest;
