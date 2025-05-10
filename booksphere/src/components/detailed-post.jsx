import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import Post from "./post"
import Comment from "./comment";
import CommentBox from "./comment-box";
import Loading from "./Loading/Loading.jsx";

export default function DetailedPost() {

    const { state } = useLocation();
    const { postID } = useParams();
    const feedType = state.feedType;
    const userID = sessionStorage.getItem("user_id");
    const [post, setPost] = useState(state?.post || null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {

        if (!post) {

            try {
                axios.get("http://localhost:5001/api/auth/get-single-post",
                    {
                        params: {
                            user_id: userID,
                            post_id: postID,
                        },
                        withCredentials: true,
                    }

                ).then((res) => setPost(res.data));

            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching post...');
            }
        }

        const getComments = async () => {

            try {
                const response = await axios.get("http://localhost:5001/api/auth/get-comments",
                    {
                        params: { post_id: postID, user_id: userID },
                        withCredentials: true,
                    }
                );

                const fetched_comments = response.data.comments;
                setComments(fetched_comments);
                setLoading(false);

            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching post\'s comments...');
            }
        };

        getComments();


    }, [postID]);

    function renderComments(comment, depth) {

        if (comment) {
            return (
                <div className="flex flex-col gap-[1.75vh]">

                    <Comment key={comment.id} comment={comment} depth={depth} postID={postID} />

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

            <Post key={post.id} post={post} feedType={feedType} isSaved={post.isSaved} />

            {/* Comments */}
            {!loading ?

                <>
                    {/* Sending parent_id = 0 as these are root comments */}
                    <CommentBox parentID={null} postID={postID} depth={1}/>

                    <div className="flex flex-col gap-[2vh]">

                        {comments && (comments.length > 0) ?

                            comments.map((commentsObject) => (
                                renderComments(commentsObject, 1)

                                // Maybe add showoptions{true/false later on depending on if user is signed in or not}
                            )) :

                            <div className="text-center text-[1vw] text-[var(--postcolor)] mt-[4vh]"> Oh oh...you're the first one here. Let's get the conversation flowing! </div>
                        }

                    </div>
                </>

                :

                <div>
                    <Loading />
                </div>
            }

        </div>
    )
}