import React from 'react';
import { CreditCard, DollarSign, Package } from 'lucide-react';

interface PaymentMethodSelectionProps {
    product: {
        name: string;
        description: string;
        price: number;
        image: string;
    };
    onSelectMethod: (method: 'card' | 'cash' | 'whish') => Promise<void>;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ product, onSelectMethod }) => {
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleCardClick = async () => {
        setIsProcessing(true);
        try {
            await onSelectMethod('card');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black  flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md  w-full text-center border border-white/20">
                <div className="mb-6">
                    <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Choose Payment Method</h1>
                    <p className="text-gray-300">Select how you'd like to pay for your order</p>
                </div>

                <div className="flex flex-col gap-4  justify-center align-center">
                    {/* Card Payment Button */}
                    <button
                        onClick={handleCardClick}
                        disabled={isProcessing}
                        className={`p-6 bg-white/5 border rounded-xl transition-all duration-300 group  ${isProcessing
                                ? 'border-gray-500 cursor-not-allowed'
                                : 'border-white/20 hover:border-blue-500/50 hover:bg-[#60a5fa47]'
                            }`}
                    >
                        {isProcessing ? (
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-3"></div>
                                <h3 className="text-lg font-semibold text-white mb-2">Processing...</h3>
                            </div>
                        ) : (
                            <>
                                <CreditCard className="w-12 h-12 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="text-lg font-semibold text-white mb-2">Credit/Debit Card</h3>
                                <p className="text-gray-400 text-sm">Pay securely with your card via Stripe</p>
                            </>
                        )}
                    </button>

                    {/* Whish Payment Button */}
                    <button
                        onClick={() => onSelectMethod('whish')}
                        className="p-6 bg-white/5 hover:bg-[#e7244447] border border-white/20 hover:border-[#e72444c9] rounded-xl transition-all duration-300 group "
                    >
                        <img
                            src="/whish.png"
                            alt="Whish"
                            className="w-16 h-10 object-contain mx-auto mb-3 group-hover:scale-110 transition-transform "
                        />
                        <h3 className="text-lg font-semibold text-white mb-2">Whish Payment</h3>
                        <p className="text-gray-400 text-sm">Pay securely with your card via Whish</p>
                    </button>

                    {/* Cash Payment Button */}
                    <button
                        onClick={() => onSelectMethod('cash')}
                        className="p-6 bg-white/5 hover:bg-[#4ade8047] border border-white/20 hover:border-green-500/50 rounded-xl transition-all duration-300 group "
                    >
                        <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-semibold text-white mb-2">Cash Payment</h3>
                        <p className="text-gray-400 text-sm">Pay with cash</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSelection;