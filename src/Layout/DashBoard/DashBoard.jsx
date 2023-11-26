import { NavLink, Outlet } from "react-router-dom";
import Container from "../../Conponent/Container/Container";
import { IoHomeSharp } from "react-icons/io5";
import useAdmin from "../../Hooks/useAdmin";
import useVolunteer from "../../Hooks/useVolunteer";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { CgProfile } from "react-icons/cg";
import { HiMiniUsers } from "react-icons/hi2";
import { MdManageHistory } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();

  return (
    <Container>
      <div className="md:flex lg:flex ">
        <div className=" lg:w-72   lg:min-h-screen bg-[#e61710]">
          <ul className="menu text-lg space-y-3 pt-8 ">
            {isAdmin ? (
              <>
                <li className="text-white">
                  <NavLink to="/dashBoard/adminProfile">
                    <CgProfile></CgProfile>Admin Profile
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/adminDashboard">
                    <IoHomeSharp></IoHomeSharp> Dashboard
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/allUsers">
                    <HiMiniUsers></HiMiniUsers>All Users
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/admin/allBloodDonation">
                    <VscGitPullRequestGoToChanges></VscGitPullRequestGoToChanges>{" "}
                    All Blood Donation Request
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/admin/contentManagement">
                    <MdManageHistory></MdManageHistory>Content Management
                  </NavLink>
                </li>
              </>
            ) : isVolunteer ? (
              <>
                <li className="text-white">
                  <NavLink to="/dashBoard/volunteerProfile">
                    <CgProfile></CgProfile>Volunteer Profile
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/volunteerDashboard">
                    <IoHomeSharp></IoHomeSharp> Dashboard
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/volunteer/allBloodDonation">
                    <IoHomeSharp></IoHomeSharp>All Blood Donation Request
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/volunteer/contentManagement">
                    <MdManageHistory></MdManageHistory>Content Management
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-white">
                  <NavLink to="/dashBoard/userProfile">
                    <CgProfile></CgProfile>User Profile
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/userDashboard">
                    <IoHomeSharp></IoHomeSharp> Dashboard
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/myDonationRequests">
                    <VscGitPullRequestGoToChanges></VscGitPullRequestGoToChanges>{" "}
                    My Donation Requests
                  </NavLink>
                </li>
                <li className="text-white">
                  <NavLink to="/dashBoard/createDonationRequest">
                    <IoIosCreate></IoIosCreate>Create Donation Request
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider text-gray-900 mx-4"></div>
            <li className="text-white">
              <NavLink to="/">
                <IoHomeSharp></IoHomeSharp>Home
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-1 py-10 px-8">
          <Outlet></Outlet>
        </div>
      </div>
    </Container>
  );
};

export default DashBoard;
