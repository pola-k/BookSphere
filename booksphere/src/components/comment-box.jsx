import { useState, useRef, useEffect } from "react";
import { CircleArrowRight } from "lucide-react";

export default function CommentBox({ parent_id }) {

    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // these pixels are causing an issue i think***
        }
    }, [text]);

    function AddComment(comment_text) {
    
        if (comment_text !== "") {

            const newComment = {
                id: parent_id + 10,   // replace with a proper dynamic id avoiding duplication
                user: "Cash",   // replace with actual user
                date: new Date().toISOString(),
                text: comment_text,
                reply_id: parent_id,
                likes: 0,
                replies: []
            };

            console.log(newComment)
            // post_with_comments.comments.push(newComment)  // this will be handled using api call so no need for this to be here
            setText("")                                     // also, we'll receive new comments using setQuery so no worries
        }
    }

    return (

        <div className="flex items-end gap-[0.5vw] border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-4xl px-[1vw] py-[1.25vh] max-w-full text-[0.8vw]">

            <textarea
                ref={textareaRef}
                value={text}
                placeholder="Add a comment"
                onChange={(e) => setText(e.target.value)}
                rows="1"
                className="w-full overflow-hidden resize-none focus:outline-none"

            />

            {/* Send API Call on Click */}

            <CircleArrowRight className="cursor-pointer h-[2.5vh]" onClick={() => AddComment(text)} disabled={text.trim() === ""} />

        </div>
    )
}