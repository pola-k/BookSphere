import { useState, useRef, useEffect } from "react";
import { CircleArrowRight } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import Comment from "./comment";

export default function CommentBox({ parentID, postID, depth }) {

    const [text, setText] = useState("");
    const textareaRef = useRef(null);
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState(null);
    const userId = sessionStorage.getItem("user_id");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // these pixels are causing an issue i think***
        }
    }, [text]);

    const AddComment = async (comment_text) => {


        if (comment_text !== "") {

            setLoading(true);

            const payload = {
                user_id: userId,
                post_id: postID,
                parent_id: parentID,
                text: comment_text,
            };

            console.log(payload)

            try {
                const response = await axios.post('http://localhost:5001/api/auth/create-comment', payload,
                    {
                        withCredentials: true,
                    }
                );

                const fetched_comment = response.data.comment;

                if (fetched_comment)
                    setComment(fetched_comment);

            } catch (error) {
                setMessage(error.response?.data?.message || 'Comment could not be created...');
            } finally {
                setText("")
                setLoading(false);
            }
        }
    }

    return (

        <div className="flex flex-col gap-[2vh]">

            <div className="flex items-end gap-[0.5vw] border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-4xl px-[1vw] py-[1.25vh] max-w-full text-[0.8vw]">
                <textarea
                    ref={textareaRef}
                    value={text}
                    placeholder="Add a comment"
                    onChange={(e) => setText(e.target.value)}
                    rows="1"
                    className="w-full overflow-hidden resize-none focus:outline-none"

                />

                {
                    loading ?
                        <LoaderCircle className="animate-spin" /> :
                        <CircleArrowRight className="cursor-pointer h-[2.5vh]" onClick={() => AddComment(text)} disabled={text.trim() === ""} />
                }
            </div>

            {/* Display the newly created comment??? */}
            {comment && <Comment key={comment.id} comment={comment} depth={depth} postID={postID} />}

        </div>
    )
}