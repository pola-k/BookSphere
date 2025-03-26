import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

// Render Only Save & Delete for Self Posts
export default function PostOptionsModal({ isOpen, closeModal }) {

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, closeModal]);

    if (!isOpen) return null;

    return (

        <div ref={modalRef} className="absolute flex flex-col items-start mt-[1.25vh] p-[0.5vw] right-0 gap-[1vh] rounded text-[1vw] w-[8vw] shadow-xl bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]" onClick={(e) => e.stopPropagation()}>

            <Link to="http://localhost:5173/saved" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="/images/bookmark-outline.png"
                        alt="Save-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Save
                </div>
            </Link>

            <Link to="http://localhost:5173/settings" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="/images/hide-icon.png"
                        alt="Hide-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Hide
                </div>
            </Link>

            <Link to="http://localhost:5173/list" className="w-full">
                <div href="/settings" className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="/images/finish.png"
                        alt="Report-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Report
                </div>
            </Link>

        </div>
    )
}