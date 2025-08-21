import React from 'react';
import { ArrowLeft, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';
import BackLink from './BackLink';
import FormTitle from './FormTitle';

interface CashPaymentProps {
    totalAmount: number;
    paymentDetails: {
        merchantName: string;
        accountNumber: string;
    };
}

const CashPayment: React.FC<CashPaymentProps> = ({ onBack, totalAmount, paymentDetails }) => {

    const qrData = `upi://pay?pa=${paymentDetails.accountNumber}&pn=${paymentDetails.merchantName}&am=${totalAmount}&cu=INR`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4">
            <BackLink onBack={onBack}/>
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center  gap-4">

                <FormTitle MainTitle='Cash Payment' SecondTitle='Scan the QR code to complete payment'/>

                <QRCode
                    value={qrData}
                    size={192}
                    bgColor="#ffffff"
                    fgColor="#000000"
                />

                {/* Payment Details */}
                <div className="space-y-4 bg-gray-100 p-4 rounded-lg  w-full">
                    <div className="flex justify-between">
                        <span className="text-gray-700">Amount:</span>
                        <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">UPI ID:</span>
                        <span className="font-mono">{paymentDetails.accountNumber}</span>
                    </div>
                </div>

                <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                    onClick={() => alert('Mark payment as completed')}
                >
                    I've Paid
                </button>
            </div>
        </div>
    );
};


export default CashPayment;