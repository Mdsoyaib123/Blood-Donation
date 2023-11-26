import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [showMenu, setShowMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      
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
  const handleBlock = (id) => {
    axiosSecure.patch(`/users/block/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User Block successfully");
      }
    });
  };
  const handleUnBlock = (id) => {
    axiosSecure.patch(`/users/unblock/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User Unblock successfully");
      }
    });
  };
  const handleMakeAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User make admin successfully");
      }
    });
  };
  const handleMakeVolunteer = (id) => {
    axiosSecure.patch(`/users/volunteer/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User make admin successfully");
      }
    });
  };
  const [selectedValue, setSelectedValue] = useState("select option");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    // const filtered = users.filter(item=>item.status.includes(e.target.value))
    // setUsers(filtered)
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-12 ">All Users </h1>
      <div>
        <div>
          <div className="flex justify-end mb-5 mx-10">
            <h1 className="text-xl font-bold">Filter By Status :</h1>
            <select onChange={handleChange} className="px-6">
              <option defaultValue="select option" disabled selected>
                Select Option
              </option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-xl font-bold text-black">
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users?.map((user, index) => (
                  <tr className="" key={user._id}>
                    <th>{index + 1}</th>
                    <th>
                      <img
                        className="rounded-full w-12"
                        src={user.Avatar}
                        alt=""
                      />
                    </th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className=""> {user.status}</td>

                    <td
                      onClick={() => handleMenu(user._id)}
                      className="cursor-pointer relative  text-xl"
                    >
                      <button className="">
                        <GiHamburgerMenu></GiHamburgerMenu>
                      </button>
                      {openMenu === user._id && showMenu && (
                        <div className="dropdown-content flex flex-col gap-2 bg-base-300 px-5 py-2 display rounded-lg absolute right-20 top-2 ">
                          {user?.status === "Active" ? (
                            <button
                              onClick={() => handleBlock(user._id)}
                              className="btn btn-outline bg-[#e61710] text-white"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnBlock(user._id)}
                              className="btn btn-outline bg-[#e61710] text-white"
                            >
                              Unblock
                            </button>
                          )}
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="btn btn-outline bg-[#e61710] text-white"
                          >
                            Admin
                          </button>
                          <button
                            onClick={() => handleMakeVolunteer(user._id)}
                            className="btn btn-outline bg-[#e61710] text-white"
                          >
                            Volunteer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
