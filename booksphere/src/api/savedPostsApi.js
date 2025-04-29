import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/auth"; // your backend server URL

// Save Post
export const savePost = async (userId, postId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/save-post`, {
            user_id: userId,
            post_id: postId,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Unsave Post
export const unsavePost = async (userId, postId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/unsave-post`, {
            data: {
                userId: userId,
                postId: postId
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get Saved Posts
export const getSavedPosts = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-saved-posts?user_id=${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
