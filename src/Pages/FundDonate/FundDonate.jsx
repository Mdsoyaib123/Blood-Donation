import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./../../Conponent/PaymentForm/PaymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const FundDonate = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default FundDonate;
