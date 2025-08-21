import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, Lock } from 'lucide-react';
import BackLink from './BackLink';
import FormTitle from './FormTitle';

interface CheckoutFormProps {
    product: {
        name: string;
        price: number;
        image: string;
    };
    onBack: () => void;
    onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ product, onBack, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <BackLink onBack={onBack} />
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <FormTitle
                        MainTitle="Payment Details"
                        SecondTitle="Complete your purchase securely"
                    />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="pt-4">
                            <div className="flex justify-between items-center mb-4 pt-2 border-t border-white/10">
                                <span className="text-lg font-semibold text-white">Total</span>
                                <span className="text-xl font-bold text-white">${product.price}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${isProcessing
                                    ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Redirecting to Checkout...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Pay ${product.price} Securely
                                </div>
                            )}
                        </button>

                        {error && (
                            <div className="text-red-400 text-sm py-2 px-4 bg-red-400/10 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div className="text-xs text-gray-400 text-center mt-4">
                            You'll be redirected to Stripe's secure checkout page.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;