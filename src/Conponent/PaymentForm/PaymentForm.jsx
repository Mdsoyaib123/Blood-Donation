/* eslint-disable react/prop-types */
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import toast from "react-hot-toast";

const PaymentForm = ({refetch}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();
  const totalPrice = 500;

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { amount: totalPrice })
      .then((res) => {
        console.log("clientSecret", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("payment intent ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transition id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        // navigate("/dashboard/paymentHistory");
        // now save the payment info in database
        const Donate = {
          email: user?.email,
          amount: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        // console.log(Donate);
        const res = await axiosSecure.post("/payments", Donate);
        console.log(res.data);

        if (res.data?.insertedId) {
          refetch()
         toast.success('Your fund donate successful')
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
      className="border py-2 px-10"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-md px-6 btn-outline bg-[#e61710] text-white my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-400 text-xl ">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id : {transactionId}</p>
      )}
    </form>
  );
};

export default PaymentForm;
