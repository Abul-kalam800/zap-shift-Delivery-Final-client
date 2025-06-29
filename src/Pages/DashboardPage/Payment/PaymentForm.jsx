import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {
    const stripe= useStripe();
    const elements = useElements();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement)
        if(card ){
            return
        }
        const {error,paymentMethod} = stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('error',error.message)
        }else{
            console.log('paymentmethed is ok',paymentMethod)
        }

    }

    return (
        <div >
            <form onSubmit={handleSubmit()} className='max-w-sm bg-amber-50 p-3 rounded-2xl space-y-8 mx-auto'>
            <CardElement> </CardElement>
                <button className='btn btn-primary w-full mx-auto' disabled={!stripe} type='submit'>
                    pay for picup
                </button>
           
            </form>
        </div>
    );
};

export default PaymentForm;