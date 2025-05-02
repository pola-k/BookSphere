import "./Book.css"
import Navbar from "../../components/navbar"
import Rating from "../../components/rating"
import Review from "../../components/Review/review"
import { useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Loading from "../../components/Loading/Loading"

export default function Book() 
{
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const user = sessionStorage.getItem("user")
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.id
    const [added, setAdded] = useState(false)
    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const reviewBox = useRef(null)
    const [reviewAdded, setReviewAdded] = useState(false)

    useEffect(() => {
        async function fetchBookData() {
            try 
            {
                const res = await fetch(`http://localhost:5001/api/getbooksdata/id/${id}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setBook(data);

                const book_status = await axios.get(`http://localhost:5001/api/list/CheckBookStatus`, {
                params: {
                    user_id: userId,
                    book_id: data.id
                }
                });
                if(book_status.data.status === "true")
                {
                    setAdded(true)
                }

                const latest_reviews = await axios.get(`http://localhost:5001/api/review/getReview`, {
                    params: {
                        bookId: data.id
                    }
                });
                
                const simplifiedReviews = latest_reviews.data.map(review => ({
                    username: review.User.username,
                    user_img: review.User.image,
                    text: review.text,
                    time: new Date(review.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                      })
                }));

                const user_with_reviews = latest_reviews.data.filter(review => review.user_id === userId);
                if(user_with_reviews.length > 0)
                {
                    setReviewAdded(true)
                }
                setReviews(simplifiedReviews)
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
    
    if (loading) {
        return (
            <Loading/>
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

    async function submitReview() 
    {
        const reviewText = reviewBox.current.value;
    
        if (!reviewText.trim() || !userId) 
        {
            return;
        }
        
        try 
        {
            await axios.post(`http://localhost:5001/api/review/postreview`, {
                userId,
                bookId: book.id,
                review: reviewText,
                time: new Date().toISOString()
            });

            reviewBox.current.value = "";
        } 
        catch (err) 
        {
            console.error("Failed to post review:", err);
        }

        try
        {
            const latest_reviews = await axios.get(`http://localhost:5001/api/review/getReview`, {
                params: {
                    bookId: book.id
                }
            });

            const user_with_reviews = latest_reviews.data.filter(review => review.user_id === userId);
            if(user_with_reviews.length > 0)
            {
                setReviewAdded(true)
            }
            
            const simplifiedReviews = latest_reviews.data.map(review => ({
                username: review.User.username,
                user_img: review.User.image,
                text: review.text,
                time: new Date(review.time).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                  })
            }));

            setReviews(simplifiedReviews);
        }
        catch(err)
        {
            console.error("Failed to fetch reviews:", err);
        }
    }
    

    async function manageList()
    {
        if(added)
        {
            const book_status = await axios.delete(`http://localhost:5001/api/list/removeBookFromList/`, {
                params: {
                    user_id: userId,
                    book_id: book.id
                }
                });
            if(book_status.data.status === "true")
            {
                setAdded(false)
            }
        }
        else
        {
            const book_status = await axios.post(`http://localhost:5001/api/list/addBookToList/`, {
                    user_id: userId,
                    book_id: book.id
                });
            if(book_status.status === 201)
            {
                setAdded(true)
            }
        }
    }

    async function reFetchBookData() {
        try {
            const res = await axios.get(`http://localhost:5001/api/rating/getRatingStats`, {
                params: {
                    book_id: book.id
                }
            });
    
            const { averageRating, ratingCount } = res.data;
    
            setBook(prevBook => ({
                ...prevBook,
                averageRating,
                ratingCount
            }));
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }
    

    const reviewComponents = reviews.length === 0 ? <p className="no-reviews">No reviews yet.</p> : 
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
                        <Rating rating={book.averageRating} rateable={false} book_id={book.id} refetch={reFetchBookData} />
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
                        <Rating className="rating" rating={0} rateable={true} book_id={book.id} refetch={reFetchBookData}/>
                    </div>
                    <button className="add-to-list-btn" onClick={manageList}>
                        {added? "Remove From List" : "Add to List"}</button>
                </div>
            </div>

            {!reviewAdded && <div className="user-review-container">
                <h2>WRITE REVIEW</h2>
                <div className="review-main-container">
                    <div className="review-left-container">
                        <img src={parsedUser.user_img ? parsedUser.user_img : "/images/default-profile-image.jpg"} alt="User" />
                    </div>
                    <div className="review-right-container">
                        <textarea name="user-review" id="user-review" placeholder="Type your Review here..." ref={reviewBox}></textarea>
                        <button className="review-submit-btn" onClick={submitReview}>Submit</button>
                    </div>
                </div>
            </div> }
            <div className="book-reviews-container">
                <h2>Reviews {reviews.length}</h2>
                <div className="book-review-main-container">
                    {reviewComponents ? reviewComponents : <h3>No Reviews Yet</h3>}
                </div>
            </div>
        </div>
        </>
    )
}