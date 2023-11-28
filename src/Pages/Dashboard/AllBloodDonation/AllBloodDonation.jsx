import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import useVolunteer from "../../../Hooks/useVolunteer";

const AllBloodDonation = () => {
    const [isVolunteer] = useVolunteer()
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { data: allDonationRequest = [], refetch } = useQuery({
    queryKey: ["allDonationRequest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allDonationRequest`);
      //   setUserDonation(res.data);
      return res.data;
    },
  });

  const handleMenu = (id) => {
    setShowMenu(!showMenu);
    if (!showMenu) {
      setOpenMenu(id);
    } else {
      setOpenMenu(null);
    }
  };
  const handleDoneStatus = async (id) => {
    const res = await axiosPublic.patch(`/updateStatusDone/${id}`, {
      status: "Done",
    });
    // console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };
  const handleCancelStatus = async (id) => {
    const res = await axiosPublic.patch(`/updateStatusCancel/${id}`, {
      status: "Canceled",
    });
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/deleteDonation/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("You delete donation successfully");
        }
      }
    });
  };
  return (
    <div className="max-w-[2520px] mx-auto">
      {/* todo: welcome section */}
      <div>
        <h1 className="text-3xl font-bold ">
          Hi ! Welcome {user?.displayName}
        </h1>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra mt-10 text-gray-800">
            {/* head */}
            <thead>
              <tr className="text-base font-bold text-black">
                <th>Recipient Name </th>
                <th>District</th>
                <th>Upazila</th>
                <th>Date</th>
                <th>Time</th>
                <th className="text-center">Donation Status</th>
                {/* <th className="">Donor Info</th> */}
                {isVolunteer && user ? '' :  <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {allDonationRequest?.map((data, index) => (
                <tr className="  text-base" key={data._id}>
                  <td>{data.recipientName}</td>
                  <td>{data.selectDistrict}</td>
                  <td>{data.selectUpazila}</td>
                  <td>{data.donationDate}</td>
                  <td>{data.donationTime}</td>
                  <td>
                    <div className="text-center">
                      <h3>{data.status}</h3>
                      {data.status === "inprogress" && (
                        <div className="flex justify-center gap-2 mt-2">
                          <button
                            onClick={() => handleDoneStatus(data._id)}
                            className="btn btn-sm bg-[#FE0000] text-white"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleCancelStatus(data._id)}
                            className="btn btn-sm btn-outline text-white bg-[#7D7463]"
                          >
                            Canceled
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  {/* <td className="">
                      <div>
                        <h3> {data?.donorName ? data?.donorName : ""}</h3>
                        <h3> {data?.donarEmail ? data?.donarEmail : ""}</h3>
                      </div>
                    </td> */}
                 {isVolunteer && user ? '' : <td
                    onClick={() => handleMenu(data._id)}
                    className="cursor-pointer relative  text-xl"
                  >
                    <button className="">
                      <GiHamburgerMenu></GiHamburgerMenu>
                    </button>
                    {openMenu === data._id && showMenu && (
                      <div className="dropdown-content flex flex-col gap-2 bg-base-300 px-5 py-2 display rounded-lg absolute right-20 top-2 ">
                        <Link to={`/dashBoard/updateDonation/${data._id}`}>
                          <button className="btn btn-outline bg-[#e61710] px-8 text-white">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="btn btn-outline bg-[#7D7463] text-white"
                        >
                          Delete
                        </button>
                        <Link to={`/donationRequestsDetails/${data._id}`}>
                          <button className="btn btn-outline bg-[#e61710] px-8 text-white">
                            View
                          </button>
                        </Link>
                      </div>
                    )}
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBloodDonation;
