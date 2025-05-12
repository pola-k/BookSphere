import { Link } from "react-router-dom";

export default function Card({ messages, hideButton }) {
    return (
        <div className="p-5 space-y-5 relative z-10 h-70 w-55 max-w-full sm:w-55 rounded-2xl border-2 border-[var(--bgcolordark)] flex flex-col items-center justify-start transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">  
            <h2 className="font-bold text-sm">{messages}</h2>
            {messages[0] === "Premium" ? <span className="text-3xl">$14.99</span> : <p className="text-3xl">$0.00</p>}
            
            <ul className="space-y-3 pr-12">
                {messages[0] === "Premium" ? (
                    <ul className="pl-5 mb-12">
                        <li>🔸Basic Plan</li> 
                        <li>🔸Summarizer</li>
                    </ul>
                ) : (
                    <ul className="pl-5 mb-12">
                        <li>🔸 Feature 1</li>
                        <li>🔸 Feature 2</li>
                        <li>🔸 Feature 3</li>
                        <li>🔸 Feature 4</li>
                    </ul>
                )}
            </ul>
            {!hideButton && (
                <Link to="/subscriptioninstruction">
                    <button className="rounded-full bg-gradient-to-tr from-[var(--bgcolordark)] to-[var(--bgcolorlight)] py-2 px-4 border border-transparent text-center text-sm text-white shadow-md cursor-pointer w-half max-w-xs" type="button">
                        Get Plan
                    </button>
                </Link>
            )}
        </div>
    );
}
