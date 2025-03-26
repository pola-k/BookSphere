import { Link } from "react-router-dom"
import { useRef, useEffect } from "react";

// Render Login/Sgnup Buttons if not logged in
export default function ProfileIconModal({ isOpen, closeModal }) {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(!isOpen);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, closeModal]);

    if (!isOpen) return null

    return (

        <div ref={modalRef} className="absolute flex flex-col items-start mt-[2vh] p-[0.75vw] right-[0.125vw] gap-[1vh] rounded text-[1vw] font-bold w-[15vw] bg-[var(--postcolor)] text-[var(--bgcolorlight)]">

            <Link to="http://localhost:5173/profile" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="./src/images/profile-icon-light.png"
                        alt="Profile-Icon"
                        className="rounded-full h-[5vh] w-auto"
                        priority
                    />

                    Profile
                </div>
            </Link>

            <Link to="http://localhost:5173/settings" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="./src/images/settings-icon.png"
                        alt="Settings-Icon"
                        className="rounded-full h-[5vh] w-auto"
                        priority
                    />

                    Settings
                </div>
            </Link>

            {/* Send API Call for Logging Out || href will be replaced with onclick, I guess */}
            <Link to="http://localhost:5173/list" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="./src/images/logout-icon.png"
                        alt="Logout-Icon"
                        className="rounded-full h-[5vh] w-auto"
                        priority
                    />

                    Logout
                </div>
            </Link>

        </div>
    )
}