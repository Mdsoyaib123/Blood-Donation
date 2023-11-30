import { PiUsersThree } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
import { PiGitPullRequestLight } from "react-icons/pi";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";

const AdminDashboard = () => {
    const {user} = useContext(AuthContext)
    const [statistics,setStatistics] =useState({})
    useEffect(()=>{
      fetch('http://localhost:5000/dashboard/statist')
      .then(res=>res.json())
      .then(data=>{
        setStatistics(data)
      })
    },[])
    // console.log(statistics);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-16">
          Hi  {user?.displayName} ! Welcome to your Dashboard
        </h1>
      <div>
        <div className="lg:flex  gap-5 mb-6">
          <div className="lg:flex justify-between px-8 py-8 rounded-md items-center w-1/2 bg-[#9ADE7B]">
            <button className="px-4 py-2 rounded-md bg-[#508D69]">
              <PiUsersThree className="text-4xl text-white "></PiUsersThree>
            </button>
            <div className="text-center">
              <h3 className="text-lg">Total User</h3>
              <p className="text-3xl font-bold">{statistics.totalUser}</p>
            </div>
          </div>
          <div className="lg:flex justify-between px-8 py-8 rounded-md items-center w-1/2 bg-[#F5CCA0]">
            <button className="px-4 py-2 rounded-md bg-[#E48F45] text-white ">
              <RiRefund2Line className="text-4xl"></RiRefund2Line>
            </button>
            <div className="text-center">
              <h3 className="text-lg">Total Blood Donation request</h3>
              <p className="text-3xl font-bold">{statistics.totalDonation}</p>
            </div>
          </div>
        </div>
        <div className="lg:flex gap-5 ">
          <div className="lg:flex justify-between px-8 py-8 rounded-md items-center w-1/2 bg-[#6DB9EF]">
            <button className="px-4 py-2 rounded-md text-white bg-[#3081D0]">
              <PiGitPullRequestLight className="text-4xl"></PiGitPullRequestLight>
            </button>
            <div className="text-center">
              <h3 className="text-lg ">Total Funding</h3>
              <p className="text-3xl font-bold">${statistics.totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
