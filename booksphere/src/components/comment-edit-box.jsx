import { useState, useRef, useEffect } from "react";
import { CircleArrowRight, Edit } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import Comment from "./comment";

export default function CommentEditBox({ commentObject, setCommentState, toggleEditBox }) {

    const [text, setText] = useState(commentObject.text);
    const textareaRef = useRef(null);
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState(commentObject);
    const userId = sessionStorage.getItem("user_id");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // these pixels are causing an issue i think***
        }
    }, [text]);

    const editComment = async (comment_text) => {

        if (comment_text !== "") {

            setLoading(true);

            const payload = {
                comment_id: comment.id,
                text: comment_text,
            };

            console.log(payload)

            try {
                const response = await axios.put('http://localhost:5001/api/auth/edit-comment', payload,
                    {
                        withCredentials: true,
                    }
                );

                const updated_comment = response.data;
                console.log(updated_comment)

                if (updated_comment)
                    setCommentState(updated_comment.text);

            } catch (error) {
                setMessage(error.response?.data?.message || 'Comment could not be edited...');
            } finally {
                setText("")
                setLoading(false);
                toggleEditBox(false);
            }
        }
    };

    return (

        <div className="flex flex-col gap-[2vh]">

            <div className="flex gap-[1vw]">
                <div className="flex items-end gap-[0.5vw] border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-4xl px-[1vw] py-[1.25vh] max-w-full text-[0.8vw]">
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="1"
                        className="w-full overflow-hidden resize-none focus:outline-none"

                    />

                    {
                        loading ?
                            <LoaderCircle className="animate-spin" /> :
                            <CircleArrowRight className="cursor-pointer h-[2.5vh]" onClick={() => editComment(text)} disabled={text.trim() === ""} />
                    }
                </div>

                <button onClick={() => toggleEditBox(false)} className="bg-red-700 text-[0.8vw] text-white px-[1vw] py-[1vh] rounded-3xl hover:bg-red-800 cursor-pointer">
                    Cancel
                </button>

            </div>

        </div>
    )
}