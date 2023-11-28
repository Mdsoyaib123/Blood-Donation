import { Link, useLoaderData } from "react-router-dom";
import Container from "../../Conponent/Container/Container";
import { GiHamburgerMenu } from "react-icons/gi";

const DonationRequests = () => {
  const donationData = useLoaderData();
  // console.log(donationData);
  const pendingStatus = donationData.filter(
    (item) => item.status === "pending"
  );
    // console.log(pendingStatus);
  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table table-zebra mt-10 text-gray-800">
          {/* head */}
          <thead>
            <tr className="text-xl font-bold text-black">
              <th>No.</th>
              <th>Requester Name</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
           
           
           {pendingStatus?.map((data, index) => (
              <tr className="font-bold  text-lg" key={data._id}>
                <td>{index + 1}</td>
                <td>{data.requesterName}</td>
                <td>{data.selectDistrict}</td>
                <td>{data.selectUpazila}</td>
                <td>{data.donationDate}</td>
                <td >{data.donationTime}</td>
                <td><Link to={`/donationRequestsDetails/${data._id}`}><button className="btn btn-sm text-white bg-[#e61710]">View Details </button></Link></td>

              </tr>
            ))}
        
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default DonationRequests;
