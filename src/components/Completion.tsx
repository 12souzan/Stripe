import BackLink from "./BackLink";

const Completion = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <BackLink onBack={onBack} />
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
        <p className="text-gray-300">Thank you for your purchase.</p>
      </div>
    </div>
  );
};

export default Completion;