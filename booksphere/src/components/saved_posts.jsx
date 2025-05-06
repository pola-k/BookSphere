import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./post";

export default function SavedPosts() {
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const userId = sessionStorage.getItem("user_id");

                const response = await axios.get(
                    `http://localhost:5001/api/auth/get-saved-posts?user_id=${userId}`,
                    {
                        params: {user_id: userId},
                        withCredentials: true
                    }
                );

                setSavedPosts(response.data.saved_posts || []);
            } catch (error) {
                console.error("Error fetching saved posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedPosts();
    }, []);

    if (loading) return <div className="p-8">Loading saved posts...</div>;

    return (
        <div className="p-[2vw]">
            <p className="text-[2vw] text-[var(--headingcolordark)] font-bold pb-[4vh]">Saved Posts</p>
            <div className="flex flex-col gap-8">
                {savedPosts.length === 0 ? (
                    <p>No saved posts found.</p>
                ) : (
                    savedPosts.map((post) => (
                        <Post
                        key={post.id}
                        post={post}
                        feedType="saved"
                        isSaved={post.isSaved}
                      />
                    ))
                )}
                {/* <Post key={postObject.id} post={postObject} feedType={feedType} isSaved={postObject.isSaved} */}
            </div>
        </div>
    );
}