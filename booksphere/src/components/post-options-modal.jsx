import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { savePost } from "../api/savedPostsApi"; // << Import the API function here

export default function PostOptionsModal({ isOpen, closeModal, postId }) {
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

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem('user_id'); // Example: you can get the logged-in user's ID from localStorage or context
            if (!userId) {
                alert("Please login first!");
                return;
            }
            await savePost(userId, postId);
            alert("Post saved successfully!");
            closeModal(false);
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post.");
        }
    };

    return (
        <div
            ref={modalRef}
            className="absolute flex flex-col items-start mt-[1.25vh] p-[0.5vw] right-0 gap-[1vh] rounded text-[1vw] w-[8vw] shadow-xl bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Save Post */}
            <div
                onClick={handleSave}
                className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)] cursor-pointer w-full"
            >
                <img
                    src="/images/bookmark-outline.png"
                    alt="Save-Icon"
                    className="h-[3.5vh] w-auto"
                    priority="true"
                />
                Save
            </div>

            {/* Hide */}
            <Link to="http://localhost:5173/settings" className="w-full">
                <div className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">
                    <img
                        src="/images/hide-icon.png"
                        alt="Hide-Icon"
                        className="h-[3.5vh] w-auto"
                        priority="true"
                    />
                    Hide
                </div>
            </Link>

            {/* Report */}
            <Link to="http://localhost:5173/list" className="w-full">
                <div className="rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">
                    <img
                        src="/images/finish.png"
                        alt="Report-Icon"
                        className="h-[3.5vh] w-auto"
                        priority="true"
                    />
                    Report
                </div>
            </Link>
        </div>
    );
}
