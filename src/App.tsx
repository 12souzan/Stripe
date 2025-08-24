'use client'
import React, { useEffect, useState } from 'react'
import PaymentMethodSelection from './components/PaymentSelection'
import { product } from './utils/dummyData'
import CardPayment from './components/CardPayment'
import CashPayment from './components/CashPayment'
import { loadStripe } from '@stripe/stripe-js'
import Completion from './components/Completion'

type Screen = 'selection' | 'card-payment' | 'cash-payment' | 'whish-payment' | 'success' | 'home'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('selection')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setCurrentScreen('success');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (query.get('canceled')) {
      setCurrentScreen('selection');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);


  const handlePaymentMethodSelect = async (method: 'card' | 'cash' | 'whish') => {
    if (method === 'card') {
      try {
        const payload = {
          successUrl:"http://localhost:5173/success",
          cancelUrl:"http://localhost:5173/canceled",
          productName: "adsc",
          amount: 20,
          quantity: 3,
          order: {
            tableNumber: "22223",
            totalItems: 10,
            totalCalories: 2800,
            totalPrice: 92,
            currency: "USD",
            categories: [
              {
                name: "Breakfast",
                totalItems: 9,
                totalCalories: 1600,
                totalPrice: 72,
                items: [
                  { name: "Burrito", quantity: 3, instructions: "extra spicy", totalPrice: 30, totalCalories: 600 },
                  { name: "Eggs", quantity: 6, instructions: "no salt", totalPrice: 42, totalCalories: 1000 }
                ],
              },
              {
                name: "Desserts",
                totalItems: 1,
                totalCalories: 1200,
                totalPrice: 20,
                items: [
                  { name: "Chocko", quantity: 1, instructions: "dark chocolate", totalPrice: 20, totalCalories: 1200 }
                ],
              },
            ],
          },
        };
        console.log("Sending payload to backend:", payload);
        const response = await fetch(`http://130.61.17.86:8080/api/stripe/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        console.log("Raw response:", response);
        if (!response.ok) {
          console.error("❌ Backend returned error:", response.status);
          return;
        }
        const session = await response.json();
        console.log("Checkout session response:", session);

        if (!session.checkoutUrl) {
          console.error("No checkout URL returned from backend.");
          return;
        }
        console.log("Redirecting to Stripe Checkout URL...");
        window.location.href = session.checkoutUrl;
      } catch (err) {
        console.error("Payment flow failed:", err);
      }
    } else if (method === "cash") {
      setCurrentScreen("cash-payment");
    } else if (method === "whish") {
      try {
        const payload = {
          amount: 2,
          currency: "USD",
          invoice: "invoice1",
          externalId: 114,
        };

        console.log("Sending WHISH payload to backend:", payload);

        const response = await fetch(`http://130.61.17.86:8080/api/whish/create-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        console.log("Raw response (whish):", response);

        if (!response.ok) {
          console.error("WHISH backend returned error:", response.status);
          return;
        }

        const session = await response.json();
        console.log("WHISH checkout session response:", session);

        if (!session.data.collectUrl) {
          console.error("No checkout URL returned from WHISH backend.");
          return;
        }

        console.log("Redirecting to WHISH Checkout URL...");
        window.location.href = session.data.collectUrl;
      } catch (err) {
        console.error("WHISH Payment flow failed:", err);
      }
    }
  };



  const resetToSelection = () => {
    setCurrentScreen('selection')
    setIsProcessing(false)
  }

  const restToHome = () => {
    setCurrentScreen('home')
  }

  if (currentScreen === 'selection') {
    return <PaymentMethodSelection
      product={product}
      onSelectMethod={handlePaymentMethodSelect}
    />
  }

  if (currentScreen === 'cash-payment') {
    return (
      <CashPayment
        totalAmount={product.price}
        paymentDetails={{
          merchantName: "My Store",
          accountNumber: "store@upi"
        }}
        onBack={resetToSelection}
        onSuccess={() => setCurrentScreen('success')}
      />
    )
  }

  if (currentScreen === 'success') {
    return <Completion onBack={restToHome} />
  }

  return null
}

export default App