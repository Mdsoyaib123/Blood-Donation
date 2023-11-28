import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAddressData from "../../Hooks/useAddressData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const UpdateDonation = () => {
    const navigate = useNavigate()
  const loader = useLoaderData();
  const { user } = useContext(AuthContext);
  const [district, upazilas] = useAddressData();
  const axiosPublic = useAxiosPublic();
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
    const status = form.status.value;
    const district = form.district.value 
    const upazila = form.upazila.value 
    
    const donationData = {
      requesterName,
      requesterEmail,
      recipientName,
      hospitalName,
      fullAddress,
      donationDate,
      donationTime,
      requestMessage,
      district,
      upazila,
      status
      
    };
    // console.log(donationData);

    const res = await axiosPublic.put(`/updateDonation/${loader?._id}`, donationData);
    console.log(res.data);
    if(res.data.modifiedCount > 0 ){
        toast.success('Your donation update successfully')
        // navigate('/dashBoard/myDonationRequests')
        
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="lg:flex w-full justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Requester Name</span>
              </label>
              <input
                defaultValue={loader?.requesterName}
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
                defaultValue={loader?.requesterEmail}
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
                defaultValue={loader?.recipientName}
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
                defaultValue={loader?.hospitalName}
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
                
                defaultValue={loader?.selectUpazila}
                name="upazila"
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
              >
                <option value="select upazila" disabled>
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
                
                defaultValue={loader?.selectDistrict}
                name="district"
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
              >
                <option value="select district" disabled>
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
                defaultValue={loader?.fullAddress}
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
                defaultValue={loader?.donationDate}
                type="date"
                name="donationDate"
                placeholder="Donation Date"
                className="input border-gray-400 py-4 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="lg:flex justify-between gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Donation Time</span>
              </label>
              <input
                defaultValue={loader?.donationTime}
                type="time"
                name="donationTime"
                placeholder="Donation Time"
                className="input border-gray-400 py-4 rounded-lg"
                required
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Status</span>
              </label>
              <select
                
                defaultValue={loader?.status}
                name="status"
                className="border rounded-lg border-gray-400 px-1 py-3 w-full"
              >
                <option value="select Status" disabled>
                  Select Status
                </option>
                <option value="pending" >
                 Pending
                </option>
                <option value="inprogress" >
                inprogress
                </option>
                <option value="Done" >
                Done
                </option>
                <option value="Canceled" >
                Canceled
                </option>
              </select>
            </div>
          </div>
          <div className="form-control w-2/3">
            <label className="label">
              <span className="label-text font-bold"> Request Message</span>
            </label>
            <textarea
              defaultValue={loader?.requestMessage}
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
    </div>
  );
};

export default UpdateDonation;
