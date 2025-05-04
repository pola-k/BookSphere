import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/post"; // adjust import path if needed

export default function SavedPostsPage() {
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const userId = sessionStorage.getItem("user_id");

                const response = await axios.get(
                    `http://localhost:5001/api/auth/saved-posts?user_id=${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Saved Posts</h1>
            <div className="flex flex-col gap-8">
                {savedPosts.length === 0 ? (
                    <p>No saved posts found.</p>
                ) : (
                    savedPosts.map((entry) => (
                        <Post
                        key={entry.post_id}
                        post={entry.post}
                        feedType="saved"
                        isSaved={true} // 👈 pass this
                      />
                    ))
                )}
            </div>
        </div>
    );
}
