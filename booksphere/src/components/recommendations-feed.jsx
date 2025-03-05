import RecommendationCard from "./recommedation-card";

export default function RecommendationsFeed() {

    // Get top 5 books from api call
    const books = [
        {
            "id": 1,
            "title": "Sherlock Holmes and the Hounds of Baskerville",
            "author": ["Arthur Conan Doyle"],
            "year": 1902,
            "genre": ["Mystery", "Detective"],
            "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
        },
        {
            "id": 2,
            "title": "Harry Potter and the Deathly Hallows",
            "author": ["J.K. Rowling"],
            "year": 2007,
            "genre": ["Fantasy", "Adventure"],
            "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
        },
        {
            "id": 3,
            "title": "Beyond Good and Evil",
            "author": ["Friedrich Nietzsche"],
            "year": 1886,
            "genre": ["Philosophy", "Non-fiction"],
            "image": "../../../src/images/beyond-good-and-evil.jpg",
        },
        {
            "id": 4,
            "title": "The Old Man and the Sea",
            "author": ["Ernest Hemingway"],
            "year": 1952,
            "genre": ["Fiction", "Classic"],
            "image": "../../../src/images/the-old-man-and-the-sea.jpg",
        },
        {
            "id": 5,
            "title": "Sherlock Holmes and the Hounds of Baskerville",
            "author": ["Arthur Conan Doyle"],
            "year": 1902,
            "genre": ["Mystery", "Detective"],
            "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
        },
    ]

    function renderRecommendations(posts) {

        if (books) {
            return (
                <div className="flex flex-col gap-[3vh]">
                    {books.map((bookObject) => (
                        <RecommendationCard key={bookObject.id} book={bookObject} />
                        // Maybe add showoptions{true/false later on depending on if user is signed in or not}
                    ))}
                </div>
            );

        } else {
            return <div>No Posts Available</div>;
        }

    }

    return (

        <div className="flex flex-col gap-[3vh]">
            
            <p className="text-[1.5vw] font-bold text-center text-[var(--navbarcolor)]">Latest Additions</p>

            {renderRecommendations(books)}
        </div>
    )
}