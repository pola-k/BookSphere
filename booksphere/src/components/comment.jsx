import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Dot } from "lucide-react";
import message_bubble from '/images/speech-bubble.png';
import CommentBox from "./comment-box";
import CommentOptionsModal from "./comment-options-modal";
import CommentEditBox from "./comment-edit-box";
import axios from "axios";

export default function Comment({ comment, depth, postID }) {

    // deal with very long chain of replies by paging

    const userID = sessionStorage.getItem("user_id");
    const [commentText, setCommentText] = useState(comment.text);
    const [liked, setLiked] = useState(comment.liked || false);
    const [numLikes, setNumLikes] = useState(comment.likes_count || 0);
    const [reply, setReply] = useState(false);
    const [isEditBox, ToggleEditBox] = useState(false);
    const [isOptionsModal, ToggleOptionsModal] = useState(false);
    const [message, setMessage] = useState("")

    function formatDate(date) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
        const zonedDate = toZonedTime(date, userTimeZone); // Convert UTC to user's timezone
        let difference = formatDistanceToNow(zonedDate, { addSuffix: true });

        difference = difference.replace(/^about\s/, "");
        return difference;
    }

    const toggleCommentLike = async () => {

        try {
            console.log("inside try block")
            const payload = {
                user_id: userID,
                comment_id: comment.id,
            }

            const response = await axios.put('http://localhost:5001/api/auth/toggle-comment-like', payload,
                {
                    withCredentials: true,
                }
            );
            console.log("after api call", response)

            const updated_like = !liked
            setLiked(updated_like);

            if (updated_like)
                setNumLikes(numLikes + 1);
            else
                setNumLikes(numLikes - 1);

        } catch (error) {
            setMessage(error.response?.data?.message || "Comment's like could not be toggled");
        }
    };

    return (

        <div className="rounded-2xl text-[var(--postcolor)]">
            {/* make 'px' or 'w' dynamic so cater the chaining of comments */}
            <div className="flex flex-col gap-[0.85vh] items-start w-full" style={{ paddingLeft: `${depth === 1 ? depth * 1.15 : depth * 1.25}vw` }}>

                {/* Username + Timestamp*/}
                <div className="flex w-full items-center justify-between text-[0.80vw]">

                    <div className="flex gap-[0.15vw] items-center">
                        <p className="font-semibold">{comment.username}</p>
                        <Dot />
                        <p>{formatDate(comment.date_created)}</p>
                    </div>

                </div>

                {/* Comment */}
                <div className="text-[0.9vw] text-left">
                    {!isEditBox && commentText}
                </div>

                {/* Optional Edit Box */}
                {isEditBox && <CommentEditBox commentObject={comment} setCommentState={setCommentText} toggleEditBox={ToggleEditBox}/>}

                {/* Icons */}
                <div className="flex items-center justify-start gap-[1.15vw] pt-[0.5vh]">

                    {/* Like */}
                    <div className="flex items-center gap-[0.2vw] text-[0.9vw] font-bold cursor-pointer  transition-transform duration-300 ease-in-out hover:-translate-y-[0.3vh] text-[var(--navbarcolor)]" onClick={toggleCommentLike}>

                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[1vw] transition-all duration-100"
                            fill={liked ? "red" : "none"} // Toggle fill color
                            stroke="red" // Keep red stroke for outline effect
                            strokeWidth="3" // Make outline more visible
                        >
                            <path
                                id="primary"
                                d="M20.28,4.74a5.82,5.82,0,0,0-8.28,0,5.82,5.82,0,0,0-8.28,0,5.94,5.94,0,0,0,0,8.34l7.57,7.62a1,1,0,0,0,1.42,0l7.57-7.62a5.91,5.91,0,0,0,0-8.34Z"
                            />
                        </svg>

                        {numLikes}

                    </div>

                    {/* Reply */}

                    <div className="flex gap-[0.5vw] transition-transform duration-100 ease-in-out hover:-translate-y-[0.3vh] text-[var(--navbarcolor)] cursor-pointer" onClick={() => setReply(!reply)}>
                        <img src={message_bubble} alt="" className="h-[1vw]" />
                        <p className="text-[0.8vw]">Reply</p>
                    </div>

                    {/* Options */}

                    {userID === comment.user_id &&

                        <div className="relative p-[0.30vw] rounded-3xl hover:bg-[var(--optionshovercolor)] cursor-pointer" onClick={() => ToggleOptionsModal(!isOptionsModal)}>
                            <img src="/images/dots.png" alt="" className="h-[1.25vw]" />

                            <CommentOptionsModal
                                isOpen={isOptionsModal}
                                closeModal={ToggleOptionsModal}
                                commentID={comment.id}
                                toggleEditBox={ToggleEditBox}
                            />

                        </div>
                    }

                    {/* configure properly to send the reply/comment and parent id and maybe depth too*/}
                    {reply && <CommentBox parentID={comment.id} postID={postID} depth={depth} />}

                </div>

            </div>

        </div>
    )
}