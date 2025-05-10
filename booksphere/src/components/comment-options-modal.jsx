import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Render Only Save & Delete for Self Posts
export default function CommentOptionsModal({ isOpen, closeModal, commentID, toggleEditBox }) {

    const userId = sessionStorage.getItem("user_id");
    const [message, setMessage] = useState("");
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
    

    const deleteComment = async () => {
        try {
            const response = await axios.delete('http://localhost:5001/api/auth/delete-comment', {
                params: {
                    user_id: userId,
                    comment_id: commentID,
                },
                withCredentials: true,
            });
            // Optionally refresh UI
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error deleting comment...');
        }
    };

    const setEditBox = () => {
        toggleEditBox(true);
        closeModal(false);
    };

    return (
        <div
            ref={modalRef}
            className="z-60 absolute flex flex-col items-start mt-[1.25vh] p-[0.5vw] gap-[1vh] rounded text-[0.75vw] w-[7vw] shadow-xl bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]"
            onClick={(e) => e.stopPropagation()}
        >

            <div onClick={setEditBox} className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)] cursor-pointer">
                <img
                    src="/images/hide-icon.png"
                    alt="Hide-Icon"
                    className="h-[3vh] w-auto"
                    priority="true"
                />
                Edit
            </div>

            <div
                onClick={deleteComment}
                className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)] cursor-pointer">
                <img
                    src="/images/finish.png"
                    alt="Delete-Icon"
                    className="h-[3vh] w-auto"
                    priority="true"
                />
                Delete
            </div>

        </div>
    );
}





