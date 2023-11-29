import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { GiHamburgerMenu } from "react-icons/gi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, Navigate, useLoaderData, useLocation } from "react-router-dom";

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  // const [userDonation, setUserDonation] = useState([]);
  // console.log(userDonation);

  const [donationLength,setDonationLength] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const numberOfPages = Math.ceil(donationLength / itemPerPage);
  
  const pages = [];
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i);
  }

  const { data: userDonationData = [], refetch } = useQuery({
    queryKey: ["myDonationRequest", currentPage, itemPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/userDonationRequest/${user?.email}?page=${currentPage}&&size=${itemPerPage}`
      );
      setDonationLength(res.data.length.length)
     
      return res.data.result;
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

  // pagination related
  const handelItemPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemPerPage(val);
    setCurrentPage(0);
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBtn = (page) => {
    setCurrentPage(page);
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userDonationData?.map((data, index) => (
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
                  <td
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>current page : {currentPage}</p>
          <div className="pagination justify-center flex gap-8 mt-10">
            <button className="btn btn-active btn-neutral" onClick={handlePrev}>
              prev
            </button>
            {pages.map((page) => (
              <button
                className={
                  currentPage === page ? "selected btn-outline  btn" : "btn"
                }
                // onClick={() => setCurrentPage(page)}
                onClick={() => handleBtn(page)}
                key={page}
              >
                {page}
              </button>
            ))}
            <button className="btn btn-active btn-neutral" onClick={handleNext}>
              next
            </button>
            <select
              value={itemPerPage}
              onChange={handelItemPerPage}
              className="border px-4 py-2"
              name=""
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
