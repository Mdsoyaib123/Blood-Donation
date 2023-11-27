import { useLoaderData, useNavigate } from "react-router-dom";
import Container from "../../Conponent/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const DonationRequestDetails = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const loader = useLoaderData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const updatePending = {
      status: "inprogress",
      donorName: name,
      donarEmail: email,
    };

    const res = await axiosPublic.put(
      `/pendingUpdate/${loader?._id}`,
      updatePending
    );
    // console.log(res.data);
    if (res.data.modifiedCount > 0) {
      toast.success("You donation request accept successfully");
      navigate("/donationRequests");
    }
  };
  return (
    <Container>
      <div className="lg:grid justify-center mt-10 bg-base-200 lg:mx-28 py-20 rounded-md ">
        <div className="lg:flex gap-20 ">
          <div className="space-y-2">
            <h3>
              {" "}
              <span className="text-xl font-bold">Requester Name </span>:{" "}
              {loader.requesterName}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Requester Email </span>:{" "}
              {loader.requesterEmail}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Recipient Name </span>:{" "}
              {loader.recipientName}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Date </span>:{" "}
              {loader.donationDate}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Time </span>:{" "}
              {loader.donationTime}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Hospital Name </span>:{" "}
              {loader.hospitalName}
            </h3>
          </div>
          <div className="space-y-2">
            <h3>
              {" "}
              <span className="text-xl font-bold">District </span>:{" "}
              {loader.selectDistrict}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Upazila </span>:{" "}
              {loader.selectUpazila}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Full Address </span>:{" "}
              {loader.fullAddress}
            </h3>
            <h3>
              {" "}
              <span className="text-xl font-bold">Status </span>:{" "}
              {loader.status}
            </h3>
            <p>
              <span className="text-xl font-bold">Request Massage</span> :{" "}
              {loader.requestMessage}
            </p>
          </div>
        </div>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-md bg-[#e61710] text-white mt-16 "
        >
          Donate
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
          <div className="modal-box flex flex-col space-y-4 ">
            <div className="flex justify-center">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  readOnly
                  value={user?.displayName}
                  className="px-5 py-2 border"
                  type="text"
                  name="name"
                />
                <br></br>
                <input
                  readOnly
                  value={user?.email}
                  className="px-5 py-2 border"
                  type="email"
                  name="email"
                />
                <br></br>
                <div className="flex justify-center">
                  <input
                    className="btn btn-ghost px-6 text-white bg-[#e61710]"
                    type="submit"
                    value="Confirm"
                  />
                </div>
              </form>
            </div>
            <br></br>

            <div className="modal-action flex justify-center">
              <form method="dialog">
                <button className="btn btn-outline px-6 btn-ghost ">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </Container>
  );
};

export default DonationRequestDetails;
