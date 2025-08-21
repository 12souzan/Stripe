import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';
import CheckoutForm from './CheckoutForm';

interface CardPaymentProps {
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
  onBack: () => void;
  onSuccess: () => void;
}

const CardPayment: React.FC<CardPaymentProps> = ({ product, onBack, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        onBack={onBack}
        onSuccess={onSuccess}
        product={product}
      />
    </Elements>
  );
};

export default CardPayment;