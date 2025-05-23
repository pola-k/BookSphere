import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import MediaPreview from "./media-preview";
import PostOptionsModal from "./post-options-modal";
import axios from "axios";

export default function Post({ post, feedType, isSaved }) {

    const [liked, setLiked] = useState(post.liked);
    const [numLikes, setNumLikes] = useState(post.likes_count);
    const [copied, setCopied] = useState(false);
    const [isOptionsModal, ToggleOptionsModal] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const userId = sessionStorage.getItem("user_id");

    function formatDate(date) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const zonedDate = toZonedTime(date, userTimeZone);
        let difference = formatDistanceToNow(zonedDate, { addSuffix: true });
        difference = difference.replace(/^about\s/, "");
        return difference;
    }

    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    const togglePostLike = async () => {

        try {
            console.log("inside try block")
            const payload = {
                user_id: userId,
                post_id: post.id,
            }

            const response = await axios.put('http://localhost:5001/api/auth/toggle-post-like', payload,
                {
                    withCredentials: true,
                }
            );

            const updated_like = !liked
            setLiked(updated_like);

            if (updated_like)
                setNumLikes(numLikes + 1);
            else
                setNumLikes(numLikes - 1);

        } catch (error) {
            setMessage(error.response?.data?.message || "Post's like could not be toggled");
        }
    };

    return (
        <div className="rounded-2xl text-[var(--bgcolorlight)] bg-[var(--postcolor)]">
            <div className="flex flex-col gap-[1vh] items-start w-full rounded-2xl hover:cursor-pointer px-[1.5vw] py-[2vh] hover:bg-[var(--posthovercolor)]">

                {/* Username + Timestamp + Options */}
                <div className="flex w-full items-center justify-between text-[0.95vw]">
                    <div className="flex gap-[0.25vw] items-center">
                        <p>{post.username}</p>
                        <Dot />
                        <p>{formatDate(post.date_created)}</p>
                    </div>

                    {/* Options */}
                    <div className="relative p-[0.30vw] rounded-3xl hover:bg-[var(--optionshovercolor)]" onClick={() => ToggleOptionsModal(!isOptionsModal)}>
                        <img src="/images/dots.png" alt="" className="h-[1.25vw]" />

                        <PostOptionsModal
                            isOpen={isOptionsModal}
                            closeModal={ToggleOptionsModal}
                            feedType={feedType}
                            postID={post.id}
                            isSaved={isSaved}
                        />

                    </div>
                </div>

                {/* Title */}
                <div className="text-[1.75vw] font-bold text-left">
                    {post.title}
                </div>

                {/* Description */}
                {(!post.media || post.media.length === 0) && (
                    <div className="text-[1.1vw] text-left">
                        {post.description}
                    </div>
                )}

                {/* Media */}
                {post.media && post.media.length > 0 && (
                    <div className="flex w-full justify-center">
                        <MediaPreview media_list={post.media} />
                    </div>
                )}

                {/* Icons */}
                <div className="flex items-center justify-start gap-[1.15vw] pt-[1vh]">
                    {/* Like */}
                    <div className="flex items-center gap-[0.4vw] p-[0.60vw] rounded-3xl text-[1vw] font-bold transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh] text-[var(--navbarcolor)] bg-[var(--bgcolorlight)]" onClick={togglePostLike}>

                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[1.25vw] cursor-pointer transition-all duration-200"
                            fill={liked ? "red" : "none"}
                            stroke="red"
                            strokeWidth="3"
                        >
                            <path
                                id="primary"
                                d="M20.28,4.74a5.82,5.82,0,0,0-8.28,0,5.82,5.82,0,0,0-8.28,0,5.94,5.94,0,0,0,0,8.34l7.57,7.62a1,1,0,0,0,1.42,0l7.57-7.62a5.91,5.91,0,0,0,0-8.34Z"
                            />
                        </svg>

                        {numLikes}

                    </div>

                    {/* Comments */}
                    <div onClick={() => navigate(`/comments/${post.id}`, { state: { post, feedType } })} className="p-[0.60vw] rounded-3xl transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh] text-[var(--navbarcolor)] bg-[var(--bgcolorlight)]">
                        <img src="/images/speech-bubble.png" alt="" className="h-[1.25vw]" />
                    </div>

                    {/* Share */}
                    <div
                        onClick={() => handleCopy(post.id)}
                        className="relative p-[0.60vw] rounded-3xl transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh] bg-[var(--bgcolorlight)]"
                    >
                        <img src="/images/share.png" alt="" className="h-[1.25vw]" />
                    </div>

                    {/* Copy Message */}
                    {copied && (
                        <div className="z-60 fixed top-22/25 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[3vw] py-[1vh] rounded-2xl text-3xl font-bold text-[var(--postcolor)] bg-[var(--bgcolorlight)]">
                            Post's Link Copied!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
