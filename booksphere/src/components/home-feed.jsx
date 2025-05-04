import Post from "./post"
import {posts} from "../../posts_data"  // dummy data
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomeFeed({ feedType }){

    // Get posts from api call instead of dummy data
    // implement pagination
    // figure out useEffect()

    // may need to do these using useEffect()
    const [page, setPage] = useState(1);
    const [EOP, setEOP] = useState(false);
    const [limit, setLimit] = useState(10);
    const [message, setMessage] = useState("");

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const getPosts = async () => {

            const payload = {
                type: "home",
                page: page,
                limit: limit,
            };

            try {
                const response = await axios.get('http://localhost:5001/api/auth/get-posts', 
                    {   
                        params: payload,
                        withCredentials: true,
                    }
                );

                const posts_list = response.data.posts

                if (posts_list.length > 0) {
                    const updated_posts = [...posts, ...posts_list]
                    setPosts(updated_posts);
                }
                
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching posts...');
            }

        };

        const handleScroll = () => {

        };

        getPosts();

    }, [page])

    function renderPosts(posts){
       
        if (posts) {
            return (
                <div className="flex flex-col gap-[5vh]">
                    {posts.map((postObject) => (
                        <Post key={postObject.id} post={postObject} feedType={feedType}/> 
                        // Maybe add showoptions{true/false later on depending on if user is signed in or not}
                    ))}
                </div>
            );

        } else {
            return <div>No Posts Available</div>;
        } 
    }

    return (

        <div>
            {renderPosts(posts)}
        </div>
    )
}

