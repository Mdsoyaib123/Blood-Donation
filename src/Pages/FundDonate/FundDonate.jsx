import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./../../Conponent/PaymentForm/PaymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
import Container from "../../Conponent/Container/Container";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const FundDonate = () => {
  const axiosPublic = useAxiosPublic();
  const { data: loader = [], refetch } = useQuery({
    queryKey: ["fund"],
    queryFn: async () => {
      const res = await axiosPublic.get("http://localhost:5000/payments");
      return res.data;
    },
  });

  return (
    <Container>
      <div className="mt-10">
        {/* <h1 className="text-3xl font-bold text-center my-5">Donate Fund</h1> */}
        <Elements stripe={stripePromise}>
          <PaymentForm refetch={refetch}></PaymentForm>
        </Elements>
      </div>
      <div className="mt-10">
        <h1 className="text-xl mb-4 font-bold ">Funding History</h1>
        <div>
          <table className="table table-zebra  text-gray-800">
            {/* head */}
            <thead>
              <tr className="text-lg font-bold text-black">
                <th>No.</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transaction Id</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loader?.map((data, index) => (
                <tr className="font-bold  " key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.email}</td>
                  <td>{data.amount}</td>
                  <td>{data.transactionId}</td>
                  <td>{data.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default FundDonate;
