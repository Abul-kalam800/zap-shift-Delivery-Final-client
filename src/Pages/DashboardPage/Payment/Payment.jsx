import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');
const Payment = () => {
    return (
       <Elements stripe={stripePromise}>
        <PaymentForm>

        </PaymentForm>
       </Elements>
    );
};

export default Payment;