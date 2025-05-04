export const posts = [
    {
        id: "11111111-2222-3333-4444-555555555555",
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
                user: "abdullah",
                date: "2024-01-18T14:32:00Z",
                text: "Andrew Ng course on Coursera",
                reply_id: 0,
                likes: 2,
                replies: []
            },
            {
                id: 2,
                user: "rafay",
                date: "2024-01-18T14:32:00Z",
                text: "Andrei Karpathy + 1Blue3Brown videos on Youtube are good supplements to that too",
                reply_id: 1,
                likes: 4,
                replies: []
            },
            {
                id: 3,
                user: "sameer",
                date: "2024-01-18T14:32:00Z",
                text: "Learn the fundamentals from anywhere and implement the code yourself",
                reply_id: 0,
                likes: 8,
                replies: []
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
        description: "What is a good roadmap to getting started with ML in order to land a job quickly?",
        likes: 3,
        comments: [
            {
                id: 1,
                user: "hassaan",
                date: "2024-01-18T14:32:00Z",
                text: "Andrew Ng's course on Coursera",
                reply_id: 0,
                likes: 2,
                replies: [
                    {
                        id: 2,
                        user: "alex",
                        date: "2025-02-02T14:30:00Z",
                        text: "Andrei Karpathy + 3Blue1Brown videos on YouTube are good supplements to that too",
                        reply_id: 1,
                        likes: 4,
                        replies: [
                            {
                                id: 3,
                                user: "sarah",
                                date: "2025-02-02T14:30:00Z",
                                text: "Learn the fundamentals from anywhere and implement the code yourself",
                                reply_id: 1,
                                likes: 8
                            }
                        ]
                    },
                    {
                        id: 3,
                        user: "sarah",
                        date: "2025-02-02T14:30:00Z",
                        text: "Learn the fundamentals from anywhere and implement the code yourself",
                        reply_id: 1,
                        likes: 8
                    }
                ]
            },
            {
                id: 4,
                user: "james",
                date: "2024-01-18T14:35:00Z",
                text: "I also recommend the 'Hands-on Machine Learning' book by Aurélien Géron",
                reply_id: 0,
                likes: 5,
                replies: []
            },
            {
                id: 5,
                user: "sophia",
                date: "2024-01-18T14:40:00Z",
                text: "Math and linear algebra are essential, check out Gilbert Strang's lectures.",
                reply_id: 0,
                likes: 7,
                replies: [
                    {
                        id: 6,
                        user: "michael",
                        date: "2025-02-02T14:30:00Z",
                        text: "Yes! Understanding eigenvalues/vectors makes ML concepts much clearer.",
                        reply_id: 5,
                        likes: 3
                    }
                ]
            }
        ]
    },

    {
        id: 3,
        user: "hassaan",
        date: "2025-02-07T14:30:00Z",
        flair: "Question",
        title: "How to learn machine learning?",
        media: ["/images/harry-potter-deathly-hallows.jpeg", "/images/fire.jpg"],
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
        media: ["/images/fire.jpg",],
        description: "What is a good roadmap to getiing started with ML in order to land a job quickly?",
        likes: 3,
        comments: [],
    },
]