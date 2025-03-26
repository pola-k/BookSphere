import "./Book.css"
import Navbar from "../../components/navbar"
import Rating from "../../components/rating"
import Review from "../../components/Review/review"
import { useParams } from "react-router-dom"
import { useState, useRef } from "react"
import {books} from "../../../book_data"

export default function Book() 
{
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id))

    const [reviews, setReviews] = useState(book.reviews || [])

    const reviewBox = useRef(null)
    const currUser = {username: "Sameer Khawar", user_img: "/images/user1.png"}

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
                <Navbar/>
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
                        <img src="/images/user1.png" alt="User" />
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