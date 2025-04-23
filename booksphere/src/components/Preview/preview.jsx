import "./preview.css";
import { useNavigate } from "react-router-dom";

export default function Preview(props) 
{
    const { book, className } = props;
    const navigate = useNavigate();

    return(
        <div className={`preview ${className}`}>
            <div className="preview-img-container" onClick={() => navigate(`/book/${book.id}`)}>
                <img src={book.image} alt={book.title} />
                <div className="preview-hover-overlay">
                    <div className="preview-book-info">
                        <h3>{book.title}</h3>
                        <p>Author: {book.Authors.length ? book.Authors[0].name : book.author_id}</p>
                        <div className="preview-rating">
                            Rating: {book.averageRating ? `${book.averageRating}/5` : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}