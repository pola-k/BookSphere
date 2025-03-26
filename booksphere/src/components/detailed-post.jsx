import { Link } from "react-router-dom";
import { CircleArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Post from "./post"
import Comment from "./comment";
import CommentBox from "./comment-box";
import {posts} from "../../posts_data"  // dummy data

export default function DetailedPost({ post_id }) { // use post_id to fetch comments + make sure to convert it to int/num before api call
                                                    // as this prop is being extracted using useParams() which makes it a string
    
    // get post's comments using api call
    // how to get the post itself?  maybe separate out the apis of simple posts and posts with comments???

    // single post
    let post_with_comments = posts.find((postObj) => postObj.id === parseInt(post_id))
    console.log(post_with_comments)

    // Add check for fetched post
    if (!post_with_comments)
        return null

    function renderComments(comment, depth) {

        if (comment) {
            return (
                <div className="flex flex-col gap-[1.75vh]">

                    <Comment key={comment.id} comment={comment} depth={depth} />

                    <div>

                        {comment.replies && comment.replies.length > 0 &&
                            comment.replies.map((reply) => (
                                renderComments(reply, depth + 1)
                                // Maybe add edit/delete options {true/false later on, depending on if user is signed in or not}
                            ))
                        }

                    </div>

                </div>
            );

        } else {
            return <div>No Posts Available</div>;
        }

    }

    return (

        <div className="flex flex-col gap-[3vh]">

            <Post key={post_with_comments.id} post={post_with_comments} />

            {/* Sending parent_id = 0 as these are root comments */}
            <CommentBox parent_id={0}/> 

            {/* Comments */}
            <div className="flex flex-col gap-[2vh]">

                {post_with_comments.comments && (post_with_comments.comments.length > 0) ?

                    post_with_comments.comments.map((commentsObject) => (
                        renderComments(commentsObject, 1)

                        // Maybe add showoptions{true/false later on depending on if user is signed in or not}
                    )) :

                    <div className="text-center text-[1vw] text-[var(--postcolor)] mt-[4vh]"> Oh oh...you're the first one here. Let's get the conversation flowing! </div>
                }

            </div>

        </div>
    )
}