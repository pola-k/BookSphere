import { useState } from "react";
import { ClipboardCopy, CheckCircle, UploadCloud } from "lucide-react";

export default function PaymentInstructions() {
    const paymentNumber = "0301-1234567";
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(paymentNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-white via-white to-[#C19A6B] font-sans">
            {/* Sidebar */}
            <aside className="w-72 p-8 bg-yellow-100 border-r border-yellow-200 shadow-md sticky top-0 h-screen hidden md:flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-800 mb-6">Support</h1>
                    <p className="text-yellow-900 text-sm leading-relaxed">
                        Make your payment securely. If you need help, reach out via contact options provided.
                    </p>
                </div>
                <div className="text-sm text-yellow-700 mt-10">
                    © {new Date().getFullYear()} BookSphere
                </div>
            </aside>

            {/* Main Section */}
            <main className="flex-1 flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-2xl bg-white/60 backdrop-blur-lg border border-[#C19A6B] rounded-3xl shadow-2xl p-10 relative animate-fade-in">
                    <h2 className="text-4xl font-extrabold text-yellow-700 mb-8 text-center">
                        Payment Instructions
                    </h2>

                    {/* Payment Info Box */}
                    <div className="bg-white rounded-xl border border-yellow-300 shadow-sm p-5 mb-6 flex justify-between items-center">
                        <div className="text-xl font-semibold text-yellow-800 tracking-wide">
                            {paymentNumber}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="relative group bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition"
                        >
                            <ClipboardCopy className="w-5 h-5" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-700 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                {copied ? "Copied!" : "Copy"}
                            </span>
                        </button>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="text-yellow-600 w-6 h-6 mt-1" />
                            <p className="text-gray-800">
                                Send the payment to the number above using jazzcash/easypaisa.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <UploadCloud className="text-yellow-600 w-6 h-6 mt-1" />
                            <p className="text-gray-800">
                                Take a clear screenshot of the transaction receipt and send it to our whatsapp for confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
