import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiouSecure from "../../../hook/useAxiouSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  console.log(parcelId);
  const [erromsg, setErromsg] = useState("");
  const axiouSecure  = useAxiouSecure();
 

  const {isPending, data: parcelData = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiouSecure.get(`/parcels/${parcelId}`);
       return res.data;
    },
  });
 
  console.log(parcelData);
  const price = parcelData.cost;
  const amountIncens = price*100;
  console.log(amountIncens)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setErromsg(error.message);
    } else {
      setErromsg("");
      console.log("paymentmethed is ok", paymentMethod);
    }
    const res = await axiouSecure.post('/create-payment-intent',{
        amountIncens,
        parcelId

        
    })
     console.log('res from intent',res)
    const clientsecre = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientsecre,{
        payment_method:{
            card:elements.getElement( CardElement),
            billing_details:{
                name:'kalam'
            }
        }
    })
    if(result.error){
        console.log(result.error.message)
    }else{
        if(result.paymentIntent.status==='success' )
            console.log('payment succes')

        }
    }
   
    
  

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm bg-amber-50 p-3 rounded-2xl space-y-8 mx-auto"
      >
        <CardElement> </CardElement>
        <button
          className="btn btn-primary w-full mx-auto"
          type="submit"
          disabled={!stripe}
        >
          pay ${price}
        </button>
        {erromsg && <p className="text-red-500 mt-5">{erromsg}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
