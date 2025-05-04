import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import axios from "axios";

// Render Only Save & Delete for Self Posts
export default function PostOptionsModal({ isOpen, closeModal, feedType, postID }) {

    const user = sessionStorage.getItem("user")
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id

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

    const deletePost = async () => {

        console.log(postID, userId)
        try {
            console.log("Inside Try block", userId)
            const response = await axios.delete('http://localhost:5001/api/auth/delete-post',
                {   
                    params: 
                    {
                        user_id: userId,
                        post_id: postID
                    },
                    withCredentials: true,
                }
            );

            // console.log(response)
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error fetching posts...');
        }
    };

    return (

        <div ref={modalRef} className="z-60 absolute flex flex-col items-start mt-[1.25vh] p-[0.5vw] right-0 gap-[1vh] rounded text-[1vw] w-[8vw] shadow-xl bg-[var(--navbarcolor)] text-[var(--bgcolorlight)]" onClick={(e) => e.stopPropagation()}>

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

            {feedType === "home" &&
                <div href="/settings" className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="/images/hide-icon.png"
                        alt="Report-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Hide
                </div>
            }

            {feedType === "home" &&
                <div href="/settings" className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]">

                    <img
                        src="/images/finish.png"
                        alt="Report-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Report
                </div>
            }

            {feedType === "user" &&
                <div href="/settings" className="w-full rounded-lg flex items-center justify-start gap-[0.75vw] px-[0.5vw] py-[0.5vh] hover:bg-[var(--optionshovercolor)]" onClick={deletePost}>

                    <img
                        src="/images/hide-icon.png"
                        alt="Trash-Icon"
                        className="h-[3.5vh] w-auto"
                        priority
                    />

                    Delete
                </div>
            }

        </div>
    )
}