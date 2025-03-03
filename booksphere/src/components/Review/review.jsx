import Rating from "../rating"
import "./review.css"

export default function Review({ review }) {
    return (
        <>
            <div className="review-container">
                <div className="review-left">
                    <img src={review.user_img} alt="User" />
                </div>
                <div className="review-right">
                    <div className="review-right-top">
                        <h2>{review.username}</h2>
                        <Rating rating={review.rating} rateable={false} />
                    </div>
                    <p>{review.review}</p>
                </div>
            </div>
        </>
    )
}