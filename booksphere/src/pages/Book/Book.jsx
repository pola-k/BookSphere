import "./Book.css"
import Navbar from "../../components/navbar"
import Rating from "../../components/rating"
import Review from "../../components/Review/review"
import { useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

export default function Book() 
{
    const { id } = useParams();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function fetchBookData() {
            try 
            {
                const res = await fetch(`http://localhost:5001/api/getbooksdata/id/${id}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setBook(data);
                console.log(data);
            } 
            catch (err) 
            {
                console.error("Fetch error:", err);
            }
            finally 
            {
                setLoading(false);
            }

        }

        fetchBookData();
    }, [id]);
    
    const [book, setBook] = useState(null)

    useEffect(() => {
        if (book && book.Reviews) {
          setReviews(book.Reviews)
        }
    }, [book])

    const [reviews, setReviews] = useState([])

    const reviewBox = useRef(null)
    const currUser = {username: "Sameer Khawar", user_img: "/images/user1.png"}

    if (loading) {
        return (
            <div className="loading-container">
                <Navbar />
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!book && !loading) 
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

    const reviewComponents = reviews.length === 0 ? <p>No reviews yet.</p> : 
    reviews.map((review, index) => (<Review key={index} review={review}/>))

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
                                <img src={book.Authors[0].image} alt={book.Authors[0].name} />
                            </div>
                        )}
                        <h2>{book.Authors.map((a) => a.name).join(", ")}</h2>
                    </div>
                    <div className="book-rating">
                        <Rating rating={book.averageRating} rateable={false} />
                        <h4>Rated by: {book.ratingCount} Users</h4>
                    </div>
                    <p className="book-abstract">{book.abstract}</p>
                    <div className="book-publisher-details">
                        <h3>Publisher</h3>
                        <p>{book.publisher}</p>
                    </div>
                    <div className="book-first-published-details">
                        <h3>First Published</h3>
                        <p>{book.publish_date}</p>
                    </div>
                    <div className="book-isbn">
                        <h3>ISBN</h3>
                        <p>{book.isbn}</p>
                    </div>
                    <div className="book-pages">
                        <h3>Pages</h3>
                        <p>{book.no_pages}</p>
                    </div>
                    <div className="book-genres">
                        <h3>Genres</h3>
                        <ul>
                            {book.Genres.map((g, index) => (
                                <li key={index}>{g.name.toUpperCase()}</li>
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
                <h2>Reviews {book.Reviews.length}</h2>
                <div className="book-review-main-container">
                    {reviewComponents ? reviewComponents : <h3>No Reviews Yet</h3>}
                </div>
            </div>
        </div>
        </>
    )
}