import axios from "axios";
import Post from "./post";
import InfiniteScroll from "./infinite-scroll copy";

export default function SavedPosts() {

    const fetchSavedPosts = async (pageNum, objectLimit) => {
        try {
            const userId = sessionStorage.getItem("user_id");

            const response = await axios.get(
                `http://localhost:5001/api/auth/get-saved-posts?user_id=${userId}`,
                {
                    params: {
                        user_id: userId,
                        page: pageNum,
                        limit: objectLimit,
                    },
                    withCredentials: true
                }
            );

            const saved_posts = response.data.saved_posts || [];
            return saved_posts;

        } catch (error) {
            throw error;
        }
    };

    const renderSavedPosts = (posts, lastElementRef, hasMore) => {

        if (posts.length > 0) {
            return (
                <div className="p-[2vw]">
                    <p className="text-[2vw] text-[var(--headingcolordark)] font-bold pb-[4vh]">Saved Posts</p>
                    <div className="flex flex-col gap-8">
                        {posts.map((postObject, index) => (
                            <div key={postObject.id} ref={posts.length === index + 1 && hasMore ? lastElementRef : null}>
                                <Post
                                    key={postObject.id}
                                    post={postObject}
                                    feedType="saved"
                                    isSaved={postObject.isSaved}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            );

        } else {
            return <div className="flex items-center justify-center">No saved posts found.</div>;
        }
    }

    return (

        <InfiniteScroll fetchObjects={fetchSavedPosts} renderObjects={renderSavedPosts} />
    )
}