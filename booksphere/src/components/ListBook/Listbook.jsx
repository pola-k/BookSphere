import "./Listbook.css"

export default function ListBook(props)
{
    return(
        <>
            <div className="list-book-container">
                <img className="list-book-image" src={props.image} alt={props.title} />
                <svg onClick={() => props.remove(props.id)} className="favorite-icon" viewBox="0 0 24 24" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg">
                    <path id="primary" d="M20.28,4.74a5.82,5.82,0,0,0-8.28,0,5.82,5.82,0,0,0-8.28,0,5.94,5.94,0,0,0,0,8.34l7.57,7.62a1,1,0,0,0,1.42,0l7.57-7.62a5.91,5.91,0,0,0,0-8.34Z"></path>
                </svg>
            </div>
        </>
    )
}