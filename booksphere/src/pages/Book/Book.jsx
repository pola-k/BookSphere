import "./Book.css"
import Navbar from "../../components/navbar"
import Rating from "../../components/rating"
import Review from "../../components/Review/review"
import { useParams } from "react-router-dom"
import { useState, useRef } from "react"

export default function Book() 
{
    const { id } = useParams();
    const books = [
        {
            "id": 1,
            "title": "Sherlock Holmes and the Hounds of Baskerville",
            "author": ["Arthur Conan Doyle"],
            "year": 1902,
            "genre": ["Mystery", "Detective"],
            "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
            "author_image": "../../../src/images/Arthur-Conan-Doyle.jpg",
            "ratedBy": 100,
            "rating": 4.5,
            "abstract": "In The Hound of the Baskervilles, Sherlock Holmes and Dr. Watson investigate the mysterious death of Sir Charles Baskerville on the desolate Dartmoor moors, where local legend tells of a monstrous, supernatural hound that stalks the Baskerville family, forcing Holmes to use his sharp deductive skills to unravel a complex web of deceit and expose a very real, human villain behind the terrifying facade of the Hound of Baskerville, ultimately battling against the power of superstition and fear to solve the case.",
            "publisher": "George Newnes",
            "isbn": "9780763630645",
            "pages": 256,
            "added": true,
            "reviewCount": 3,
            "reviews": [
                    {
                        username: "MysteryLover99",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "An absolute masterpiece! The eerie atmosphere of the moor, combined with the gripping mystery, kept me on edge. Sherlock Holmes' brilliant deductions were as sharp as ever, and Watson’s perspective added depth to the narrative. The blend of superstition and logic made this a thrilling read. Highly recommended for mystery lovers!"
                    },
                    {
                        username: "DetectiveFan42",
                        rating: 4,
                        user_img: "../../../src/images/user1.png",
                        review: "The novel masterfully builds suspense with its gothic setting and chilling legend of the hound. I loved the way the tension unfolded, keeping me engaged throughout. However, the pacing in the middle felt a little slow. That said, Holmes' grand reveal at the end made up for it. A classic detective novel worth reading!"
                    },
                    {
                        username: "ClassicReader",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "A true gem in detective fiction! Arthur Conan Doyle perfectly blends mystery, horror, and adventure in this novel. The Baskerville family curse adds a supernatural element that keeps the reader intrigued. Holmes' reasoning and logic shine throughout the story, making the resolution immensely satisfying. Definitely one of the best Sherlock Holmes stories!"
                    },
                ]
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
            "author_image": "../../../src/images/Arthur-Conan-Doyle.jpg",
            "ratedBy": 100,
            "rating": 4.5,
            "abstract": "In The Hound of the Baskervilles, Sherlock Holmes and Dr. Watson investigate the mysterious death of Sir Charles Baskerville on the desolate Dartmoor moors, where local legend tells of a monstrous, supernatural hound that stalks the Baskerville family, forcing Holmes to use his sharp deductive skills to unravel a complex web of deceit and expose a very real, human villain behind the terrifying facade of the Hound of Baskerville, ultimately battling against the power of superstition and fear to solve the case.",
            "publisher": "George Newnes",
            "isbn": "9780763630645",
            "pages": 256,
            "added": true,
            "reviewCount": 3,
            "reviews": [
                    {
                        username: "MysteryLover99",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "An absolute masterpiece! The eerie atmosphere of the moor, combined with the gripping mystery, kept me on edge. Sherlock Holmes' brilliant deductions were as sharp as ever, and Watson’s perspective added depth to the narrative. The blend of superstition and logic made this a thrilling read. Highly recommended for mystery lovers!"
                    },
                    {
                        username: "DetectiveFan42",
                        rating: 4,
                        user_img: "../../../src/images/user1.png",
                        review: "The novel masterfully builds suspense with its gothic setting and chilling legend of the hound. I loved the way the tension unfolded, keeping me engaged throughout. However, the pacing in the middle felt a little slow. That said, Holmes' grand reveal at the end made up for it. A classic detective novel worth reading!"
                    },
                    {
                        username: "ClassicReader",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "A true gem in detective fiction! Arthur Conan Doyle perfectly blends mystery, horror, and adventure in this novel. The Baskerville family curse adds a supernatural element that keeps the reader intrigued. Holmes' reasoning and logic shine throughout the story, making the resolution immensely satisfying. Definitely one of the best Sherlock Holmes stories!"
                    },
                ]
        },
        {
            "id": 6,
            "title": "Harry Potter and the Deathly Hallows",
            "author": ["J.K. Rowling"],
            "year": 2007,
            "genre": ["Fantasy", "Adventure"],
            "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
        },
        {
            "id": 7,
            "title": "Beyond Good and Evil",
            "author": ["Friedrich Nietzsche"],
            "year": 1886,
            "genre": ["Philosophy", "Non-fiction"],
            "image": "../../../src/images/beyond-good-and-evil.jpg",
        },
        {
            "id": 8,
            "title": "The Old Man and the Sea",
            "author": ["Ernest Hemingway"],
            "year": 1952,
            "genre": ["Fiction", "Classic"],
            "image": "../../../src/images/the-old-man-and-the-sea.jpg",
        },
        {
            "id": 9,
            "title": "Sherlock Holmes and the Hounds of Baskerville",
            "author": ["Arthur Conan Doyle"],
            "year": 1902,
            "genre": ["Mystery", "Detective"],
            "image": "../../../src/images/sherlock-hounds-of-baskerville.jpg",
            "author_image": "../../../src/images/Arthur-Conan-Doyle.jpg",
            "ratedBy": 100,
            "rating": 4.5,
            "abstract": "In The Hound of the Baskervilles, Sherlock Holmes and Dr. Watson investigate the mysterious death of Sir Charles Baskerville on the desolate Dartmoor moors, where local legend tells of a monstrous, supernatural hound that stalks the Baskerville family, forcing Holmes to use his sharp deductive skills to unravel a complex web of deceit and expose a very real, human villain behind the terrifying facade of the Hound of Baskerville, ultimately battling against the power of superstition and fear to solve the case.",
            "publisher": "George Newnes",
            "isbn": "9780763630645",
            "pages": 256,
            "added": true,
            "reviewCount": 3,
            "reviews": [
                    {
                        username: "MysteryLover99",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "An absolute masterpiece! The eerie atmosphere of the moor, combined with the gripping mystery, kept me on edge. Sherlock Holmes' brilliant deductions were as sharp as ever, and Watson’s perspective added depth to the narrative. The blend of superstition and logic made this a thrilling read. Highly recommended for mystery lovers!"
                    },
                    {
                        username: "DetectiveFan42",
                        rating: 4,
                        user_img: "../../../src/images/user1.png",
                        review: "The novel masterfully builds suspense with its gothic setting and chilling legend of the hound. I loved the way the tension unfolded, keeping me engaged throughout. However, the pacing in the middle felt a little slow. That said, Holmes' grand reveal at the end made up for it. A classic detective novel worth reading!"
                    },
                    {
                        username: "ClassicReader",
                        rating: 5,
                        user_img: "../../../src/images/user1.png",
                        review: "A true gem in detective fiction! Arthur Conan Doyle perfectly blends mystery, horror, and adventure in this novel. The Baskerville family curse adds a supernatural element that keeps the reader intrigued. Holmes' reasoning and logic shine throughout the story, making the resolution immensely satisfying. Definitely one of the best Sherlock Holmes stories!"
                    },
                ]
        },
        {
            "id": 10,
            "title": "Harry Potter and the Deathly Hallows",
            "author": ["J.K. Rowling"],
            "year": 2007,
            "genre": ["Fantasy", "Adventure"],
            "image": "../../../src/images/harry-potter-deathly-hallows.jpeg",
        },
        {
            "id": 11,
            "title": "Beyond Good and Evil",
            "author": ["Friedrich Nietzsche"],
            "year": 1886,
            "genre": ["Philosophy", "Non-fiction"],
            "image": "../../../src/images/beyond-good-and-evil.jpg",
        },
        {
            "id": 12,
            "title": "The Old Man and the Sea",
            "author": ["Ernest Hemingway"],
            "year": 1952,
            "genre": ["Fiction", "Classic"],
            "image": "../../../src/images/the-old-man-and-the-sea.jpg",
        },
    ] 
    const book = books.find((book) => book.id === parseInt(id))

    const [reviews, setReviews] = useState(book.reviews || [])

    const reviewBox = useRef(null)
    const currUser = {username: "Sameer Khawar", user_img: "../../../src/images/user1.png"}

    if (!book) 
    {
        return (
            <>
                <div className="error-container">
                    <Navbar/>
                    <h1>Book not found</h1>
                </div>
            </>
        ) 
    }

    function submitReview(book)
    {
        const reviewText = reviewBox.current.value

        if (!reviewText.trim()) 
        {
            return;
        }

        if (!currUser || !currUser.username) 
        {
            return;
        }

        const newReview = 
        {
            username: currUser.username,
            review: reviewText,
            user_img: currUser.user_img,
            rating: 3.5,
        };

        setReviews([...reviews, newReview])
    }

    const reviewComponents = reviews.map((review, index) => (<Review key={index} review={review}/>))

    return(
        <>
            <div className="book-container">
            <Navbar />
            <div className="book-main-container">
                <div className="book-left-container">
                    <img src={book.image} alt={book.title} />
                </div>
                <div className="book-right-container">
                    <h1 className="book-title">{book.title}</h1>
                    <div className="book-author-details">
                        {book.author_image && (
                            <div className="book-author-image">
                                <img src={book.author_image} alt={book.author} />
                            </div>
                        )}
                        <h2>{book.author.join(", ")}</h2>
                    </div>
                    <div className="book-rating">
                        <Rating rating={book.rating} rateable={false} />
                        <h4>Rated by: {book.ratedBy} Users</h4>
                    </div>
                    <p className="book-abstract">{book.abstract}</p>
                    <div className="book-publisher-details">
                        <h3>Publisher</h3>
                        <p>{book.publisher}</p>
                    </div>
                    <div className="book-first-published-details">
                        <h3>First Published</h3>
                        <p>{book.year}</p>
                    </div>
                    <div className="book-isbn">
                        <h3>ISBN</h3>
                        <p>{book.isbn}</p>
                    </div>
                    <div className="book-pages">
                        <h3>Pages</h3>
                        <p>{book.pages}</p>
                    </div>
                    <div className="book-genres">
                        <h3>Genres</h3>
                        <ul>
                            {book.genre.map((g, index) => (
                                <li key={index}>{g}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="user-rating">
                        <h3>Your Rating: </h3>
                        <Rating className="rating" rating={0} rateable={true} />
                    </div>
                    <button className="add-to-list-btn">{book.added? "Remove From List" : "Add to List"}</button>
                </div>
            </div>

            <div className="user-review-container">
                <h2>WRITE REVIEW</h2>
                <div className="review-main-container">
                    <div className="review-left-container">
                        <img src="../../../src/images/user1.png" alt="User" />
                    </div>
                    <div className="review-right-container">
                        <textarea name="user-review" id="user-review" placeholder="Type your Review here..." ref={reviewBox}></textarea>
                        <button className="review-submit-btn" onClick={submitReview}>Submit</button>
                    </div>
                </div>
            </div>
            <div className="book-reviews-container">
                <h2>Reviews {book.reviewCount}</h2>
                <div className="book-review-main-container">
                    {reviewComponents}
                </div>
            </div>
        </div>
        </>
    )
}