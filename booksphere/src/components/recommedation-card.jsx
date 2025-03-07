import { Link } from "react-router-dom"

export default function RecommendationCard({ book }) {

    return (

        // This link is hardcoded for now, needs to be updated
        <Link to={"http://localhost:5173/book/" + book.id}>
            <div className="flex gap-[1vw] w-full rounded-2xl px-[1vw] py-[2vh] text-[var(--bgcolorlight)] bg-[var(--postcolor)] hover:cursor-pointer hover:bg-[var(--posthovercolor)]">

                {/* Media */}
                <img className="rounded-xl max-h-full max-w-[7vw] object-contain" src={book.image} alt="Book-Image" />


                <div className="flex flex-col gap-[2vh] text-left">

                    {/* Title */}
                    <p className="text-[1vw] font-bold">{book.title}</p>

                    {/* Author + Year*/}
                    <div className="text-[0.95vw]">
                        <p>{book.author}</p>
                        <p>{book.year}</p>
                    </div>

                </div>

            </div>
        </Link>
    )
}