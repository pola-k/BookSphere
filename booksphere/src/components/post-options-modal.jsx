import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Render Only Save & Delete for Self Posts
export default function PostOptionsModal({ isOpen, closeModal, feedType, postID, isSaved }) {

    const userId = sessionStorage.getItem("user_id");
    const [saved, setSaved] = useState(isSaved);
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

    const handleSave = async () => {
        try {
            const userId = sessionStorage.getItem("user_id");

            if (!userId) {
                alert("Please login first!");
                return;
            }

            await axios.post(
                "http://localhost:5001/api/auth/save-post",
                { user_id: userId, post_id: postID },
                {
                    withCredentials: true
                }
            );

            alert("Post saved successfully!");
            setSaved(true);
            closeModal(false);
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post.");
        }
    };

    const handleUnsave = async () => {
        try {
            const userId = sessionStorage.getItem("user_id");

            if (!userId) {
                alert("Please login first!");
                return;
            }

            await axios.post(
                "http://localhost:5001/api/auth/unsave-post",
                { userId, postId: postID },
                {
                    withCredentials: true
                }
            );

            alert("Post unsaved successfully!");
            setSaved(false);
            closeModal(false);
        } catch (error) {
            console.error("Error unsaving post:", error);
            alert("Failed to unsave post.");
        }
    };

    const deletePost = async () => {
        try {
            const response = await axios.delete('http://localhost:5001/api/auth/delete-post', {
                params: {
                    user_id: userId,
                    post_id: postID,
                },
                withCredentials: true,
            });
            // Optionally refresh UI
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error deleting post...');
        }
    };

    return (
        <div
            ref={modalRef}
            className="z-60 absolute flex flex-col items-start mt-[1.25vh] p-[0.5vw] right-0 gap-[1vh] rounded text-[1vw] w-[8vw] shadow-xl bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* ✅ Save / Unsave logic */}
            {saved ? (
                <div
                    onClick={handleUnsave}
                    className="cursor-pointer w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]"
                >
                    <img
                        src="/images/bookmark-outline.png"
                        alt="Unsave-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />
                    Unsave
                </div>
            ) : (
                <div
                    onClick={handleSave}
                    className="cursor-pointer w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]"
                >
                    <img
                        src="/images/bookmark-outline.png"
                        alt="Save-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />
                    Save
                </div>
            )}

            {(feedType === "home" || feedType === "saved") && (
                <>
                    <div className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">
                        <img
                            src="/images/hide-icon.png"
                            alt="Hide-Icon"
                            className="h-[3.5vh] w-auto"
                            priority="true"
                        />
                        Hide
                    </div>

                    <div className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">
                        <img
                            src="/images/finish.png"
                            alt="Report-Icon"
                            className="h-[3.5vh] w-auto"
                            priority="true"
                        />
                        Report
                    </div>
                </>
            )}

            {feedType === "user" && (
                <div
                    onClick={deletePost}
                    className="cursor-pointer w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]"
                >
                    <img
                        src="/images/hide-icon.png"
                        alt="Trash-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />
                    Delete
                </div>
            )}
        </div>
    );
}





