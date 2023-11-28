import { Link, NavLink } from "react-router-dom";
import Container from "../../../Conponent/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import useVolunteer from "../../../Hooks/useVolunteer";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const handleLogout = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  const links = (
    <div className="grid grid-cols-1 lg:flex  gap-8 font-semibold text-lg items-center">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500  "
            : ""
        }
      >
        <button>Home</button>
      </NavLink>
      <NavLink
        to={"/donationRequests"}
        className={({ isActive }) =>
          isActive
            ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500 "
            : ""
        }
      >
        <button>Donation Requests</button>
      </NavLink>
      <NavLink
        to={"/blog"}
        className={({ isActive }) =>
          isActive
            ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500 "
            : ""
        }
      >
        <button>Blog</button>
      </NavLink>
      <NavLink
        to={"/fundDonate"}
        className={({ isActive }) =>
          isActive
            ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500 "
            : ""
        }
      >
        <button> Fund Donate </button>
      </NavLink>
      {user && isAdmin && (
        <li>
          <Link to={"/dashboard/adminDashboard"}> DashBoard</Link>
        </li>
      )}
      {user && isVolunteer && (
        <li>
          <Link to={"/dashboard/volunteerDashboard"}> DashBoard</Link>
        </li>
      )}
      {user && !isAdmin && !isVolunteer && (
        <li>
          <Link to={"/dashboard/userDashboard"}> DashBoard</Link>
        </li>
      )}

      {user ? (
        <div className="flex gap-8 items-center">
          {/* <NavLink
        to={"/dashBoard"}
        className={({ isActive }) =>
          isActive
            ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500 "
            : ""
        }
      >
        <button>DashBoard</button>
      </NavLink> */}
          <button
            onClick={handleLogout}
            className=" btn text-white text-lg bg-[#e61710]"
          >
            logOut
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-8">
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              isActive
                ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500"
                : ""
            }
          >
            <button> Login</button>
          </NavLink>
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              isActive
                ? "text-[#e61710] font-bold text-xl border-b-2 border-red-500 "
                : ""
            }
          >
            <button> Register</button>
          </NavLink>
        </div>
      )}
    </div>
  );
  return (
    <Container>
      <div className="navbar  bg-base-100  flex items-center py-6">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost  lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  z-[1]  shadow bg-base-100 rounded-box w-56 pl-5 pt-4 "
            >
              {links}
            </ul>
          </div>
          <Link className="hidden md:flex lg:flex" to={"/"}>
            <img src="https://i.ibb.co/Tb05XN0/logo.png" alt="" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
