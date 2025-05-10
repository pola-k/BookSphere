import Post from "./post"
import axios from "axios";
import InfiniteScroll from "./infinite-scroll";

export default function HomeFeed({ feedType }) {

    const userID = sessionStorage.getItem("user_id");

    const getPosts = async (pageNum, objectLimit) => {

        const payload = {
            user_id: userID,
            type: feedType,
            page: pageNum,
            limit: objectLimit,
        };

        try {
            const response = await axios.get('http://localhost:5001/api/auth/get-posts',
                {
                    params: payload,
                    withCredentials: true,
                }
            );

            const posts_list = response.data.posts;
            return posts_list;

        } catch (error) {
            throw error;
        }

    };

    const renderPosts = (posts, lastElementRef, hasMore) => {

        if (posts.length > 0) {
            return (
                <div className="flex flex-col gap-[5vh]">
                    {posts.map((postObject, index) => (
                        <div key={postObject.id} ref={posts.length === index + 1 && hasMore ? lastElementRef : null}>
                            <Post post={postObject} feedType={feedType} isSaved={postObject.isSaved} />
                        </div>
                    ))}
                </div>
            );

        } else {
            return <div className="flex items-center justify-center">No Posts Available</div>;
        }
    }

    return (

        <InfiniteScroll fetchObjects={getPosts} renderObjects={renderPosts} />
    )
}