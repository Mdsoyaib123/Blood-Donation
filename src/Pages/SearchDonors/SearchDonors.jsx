import axios from "axios";
import Container from "../../Conponent/Container/Container";
import useAddressData from "../../Hooks/useAddressData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const SearchDonors = () => {
  const [searchData, setSearchData] = useState([]);
  const [district, upazilas] = useAddressData();
  const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const blood = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const searchData = { blood, district, upazila };

    const res = await axios.get(
      `https://blood-donation-server-one.vercel.app/searchData?district=${district}&&upazila=${upazila}&&blood=${blood}`
    );
    console.log(res.data);
    setSearchData(res.data);
  };

  return (
    <Container>
      <div className=" flex justify-center w-1/2 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex  w-full items-center">
            <label className="label ">
              <span className="label-text font-bold">Blood Group : </span>
            </label>
            <select name="blood" className="border  px-10 py-1">
              <option value="select blood group  " disabled selected>
                select blood group
              </option>
              {bloodGroup.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          <div className="flex w-full items-center">
            <label className="label">
              <span className="label-text font-bold">District : </span>
            </label>
            <select name="district" className="border px-10 py-1">
              <option value="select district  " disabled selected>
                select blood group
              </option>
              {district.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full  items-center">
            <label className="label">
              <span className="label-text font-bold">Upazila : </span>
            </label>
            <select name="upazila" className="border px-10 py-1">
              <option value="select upazila  " disabled selected>
                select blood group
              </option>
              {upazilas.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center mt-6">
            <input className="btn btn-secondary" type="submit" value="Search" />
          </div>
        </form>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold my-5"> Search Donor list : </h1>
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
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {searchData?.map((user, index) => (
              <tr className="" key={user._id}>
                <th>{index + 1}</th>
                <th>
                  <img className="rounded-full w-12" src={user.Avatar} alt="" />
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td> {user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default SearchDonors;
