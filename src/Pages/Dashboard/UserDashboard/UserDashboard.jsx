import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import Container from "../../../Conponent/Container/Container";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [userDonation, setUserDonation] = useState([]);
  const threeData = userDonation.slice(0, 3);
  console.log(threeData);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/userDonationRequest/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserDonation(data);
      });
  }, [user?.email]);
  return (
    
      <div className="max-w-[2520px]  mx-auto">
        {/*todo: welcome section */}
        <div>
            <h1 className="text-3xl font-bold ">Hi ! Welcome {user?.displayName}</h1>
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra mt-10 text-gray-800">
              {/* head */}
              <thead>
                <tr className="text-xl font-bold text-black">
                  
                  <th>Requester Name</th>
                  <th>District</th>
                  <th>Upazila</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {threeData?.map((data, index) => (
                  <tr className="font-bold  text-lg" key={data._id}>
                    
                    <td>{data.requesterName}</td>
                    <td>{data.selectDistrict}</td>
                    <td>{data.selectUpazila}</td>
                    <td>{data.donationDate}</td>
                    <td>{data.donationTime}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
  );
};

export default UserDashboard;
