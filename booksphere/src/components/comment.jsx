import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Dot } from "lucide-react";
import message_bubble from '/images/speech-bubble.png';
import CommentBox from "./comment-box";

export default function Comment({ comment, depth, postID }) {

    // deal with very long chain of replies by paging

    const [liked, setLiked] = useState(false);
    const [reply, setReply] = useState(false);

    function formatDate(date) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
        const zonedDate = toZonedTime(date, userTimeZone); // Convert UTC to user's timezone
        let difference = formatDistanceToNow(zonedDate, { addSuffix: true });

        difference = difference.replace(/^about\s/, "");
        return difference;
    }

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
                    {comment.text}
                </div>

                {/* Icons */}
                <div className="flex items-center justify-start gap-[1.15vw] pt-[0.5vh]">

                    {/* Like */}
                    <div className="flex items-center gap-[0.2vw] text-[0.9vw] font-bold cursor-pointer  transition-transform duration-300 ease-in-out hover:-translate-y-[0.3vh] text-[var(--navbarcolor)]" onClick={() => setLiked(!liked)}>

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

                        {comment.likes_count}

                    </div>

                    {/* Reply */}

                    <div className="flex gap-[0.5vw] transition-transform duration-100 ease-in-out hover:-translate-y-[0.3vh] text-[var(--navbarcolor)] cursor-pointer" onClick={() => setReply(!reply)}>
                        <img src={message_bubble} alt="" className="h-[1vw]" />
                        <p className="text-[0.8vw]">Reply</p>
                    </div>

                    {/* configure properly to send the reply/comment and parent id and maybe depth too*/}
                    {reply && <CommentBox parentID={comment.id} postID={postID} depth={depth}/> }

                </div>

            </div>

        </div>
    )
}