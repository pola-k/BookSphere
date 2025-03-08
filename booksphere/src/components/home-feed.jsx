import Post from "./post"

export default function HomeFeed(){

    // Get posts from api call
    const posts = [
        {
            id: 1,
            user: "hassaan",
            date: "2025-02-18T14:30:00Z",
            flair: "Question",
            title: "How to learn machine learning?",
            media: [],
            description: "What is a good roadmap to getiing started with ML in order to land a job quickly?",
            likes: 3,
            comments: [
                {
                    id: 1,
                    text: "Andrew Ng course on Coursera",
                    reply_id: 0,
                    likes: 2
                },
                {
                    id: 2,
                    text: "Andrei Karpathy + 1Blue3Brown videos on Youtube are good supplements to that too",
                    reply_id: 1,
                    likes: 4
                },
                {
                    id: 3,
                    text: "Learn the fundamentals from anywhere and implement the code yourself",
                    reply_id: 0,
                    likes: 8
                },
            ] 
        },

        {
            id: 2,
            user: "hassaan",
            date: "2024-01-18T14:30:00Z",
            flair: "Question",
            title: "How to learn machine learning?",
            media: [],
            description: "What is a good roadmap to getiing started with ML in order to land a job quickly?",
            likes: 3,
            comments: [
                {
                    id: 1,
                    text: "Andrew Ng course on Coursera",
                    reply_id: 0,
                    likes: 2
                },
                {
                    id: 2,
                    text: "Andrei Karpathy + 1Blue3Brown videos on Youtube are good supplements to that too",
                    reply_id: 1,
                    likes: 4
                },
                {
                    id: 3,
                    text: "Learn the fundamentals from anywhere and implement the code yourself",
                    reply_id: 0,
                    likes: 8
                },
            ] 
        },

        {
            id: 3,
            user: "hassaan",
            date: "2025-02-07T14:30:00Z",
            flair: "Question",
            title: "How to learn machine learning?",
            media: ["./src/images/harry-potter-deathly-hallows.jpeg", "./src/images/fire.jpg"],
            description: "What is a good roadmap to getiing started with ML in order to land a job quickly?",
            likes: 3,
            comments: [],
        },

        {
            id: 4,
            user: "hassaan",
            date: "2025-02-02T14:30:00Z",
            flair: "Question",
            title: "How to learn machine learning?",
            media: ["./src/images/fire.jpg", ],
            description: "What is a good roadmap to getiing started with ML in order to land a job quickly?",
            likes: 3,
            comments: [],
        },
    ]

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

