import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar_Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col border-[var(--bordercolor)]">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between gap-[2vh] text-[1.25vw] rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)] transition w-full"
            >
                RESOURCES
                {isOpen ? <ChevronUp className="text-2xl" /> : <ChevronDown className="text-2xl" />}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="pl-[1vw] rounded-2xl text-[1vw]">

                    <ul className="space-y-[2vh] py-[1vh]">

                        <li>
                            <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                                <img src="./src/images/question.png" alt="" className="h-[2vw]" />
                                <p className="px-[1vw]">Help</p>
                            </div>
                        </li>

                        <li>
                            <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                                <img src="./src/images/info.png" alt="" className="h-[2vw]" />
                                <p className="px-[1vw]">About Booksphere</p>
                            </div>
                        </li>

                        <li>
                            <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                                <img src="./src/images/handshake.png" alt="" className="h-[2vw]" />
                                <p className="px-[1vw]">User Agreement</p>
                            </div>
                        </li>

                        <li>
                            <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                                <img src="./src/images/privacy-policy.png" alt="" className="h-[2vw]" />
                                <p className="px-[1vw]">Privacy Policy</p>
                            </div>
                        </li>

                        <li>
                            <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                                <img src="./src/images/law.png" alt="" className="h-[2vw]" />
                                <p className="px-[1vw]">Rules</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
