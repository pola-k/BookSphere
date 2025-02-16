import { useState } from "react";
import { Link } from "react-router-dom";
import "./Subscription.css";
import Card from "../components/cards";
import Crown from "../images/card.png";

export default function Subscription() {
    const Myarray = ["Basic", "Premium"];
    return (
        <div className="body">
            <div className="flex overflow-hidden flex-col relative z-10 bg-white h-100vh shadow-lg rounded-4xl p-12  max-w-full sm:w-4xl">
                <h1 className="text-2xl font-bold md:text-left text-center">Choose Your Plan</h1>
                <p className="text-gray-600  md:text-left text-center">🚀 14 days free trial</p>
                <p className="text-gray-300 text-sm mt-4 mb-4  md:text-left text-center">Pick one that works for you</p>
                <img src={Crown} alt="Red Circle" className="w-30 h-30 absolute hidden sm:block top-4 right-4 sm:" />
                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 items-center justify-center">
                    <Card messages={[Myarray[0]]} />
                    <Card messages={[Myarray[1]]} />
                </div>
            </div>
        </div>
    );
}