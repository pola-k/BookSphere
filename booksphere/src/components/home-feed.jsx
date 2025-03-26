import Post from "./post"
import {posts} from "../../posts_data"  // dummy data

export default function HomeFeed(){

    // Get posts from api call instead of dummy data

    function renderPosts(posts){
       
        if (posts) {
            return (
                <div className="flex flex-col gap-[5vh]">
                    {posts.map((postObject) => (
                        <Post key={postObject.id} post={postObject}/> 
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

