import Rating from "../rating"
import "./review.css"

export default function Review({ review }) {
    return (
        <>
            <div className="review-container">
                <div className="review-left">
                    <img src={review.user_img ? review.user_img : "/images/default-profile-image.jpg"} alt="User" />
                </div>
                <div className="review-right">
                    <div className="review-right-top">
                        <h2>{review.username}</h2>
                        <h4>{review.time}</h4>
                    </div>
                    <p>{review.text}</p>
                </div>
            </div>
        </>
    )
}