import { useState } from "react";
import Navbar from "../../components/navbar";
import image1 from "/images/the-old-man-and-the-sea.jpg";
import image2 from "/images/to-kill-a-mockingbird.png";
export default function Summarizer() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");
    const bookImages = {
        "The Old Man and The Sea": image1,
        "To Kill a Mockingbird": image2,
        
    };
    const handleSummarize = () => {
        if (!title) return;
        setSummary(` This is a brief summary of the book.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua `);
        setImage(bookImages[title] || "https://via.placeholder.com/150");
    };

    return (
        <div className="h-screen w-full bg-[var(--bgsumarizerpage)]">
             <Navbar />
        <div className="bg-[var(--bgsumarizerpage)]  flex flex-col items-center p-6">
           
            <h1 className="text-4xl font-bold mt-10">Summarize Books instantly!</h1>
            <p className="text-grey-300 text-xs mt-5">Get quick Summaries for over a million books</p>
            
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-xl h-full flex flex-col items-center justify-center">
            {image && <img src={image} alt="Book Cover" className="w-40 h-60 mb-4 rounded-lg shadow-md" />}
            {title && <h2 className="text-xl font-semibold text-gray-800 mt-2">{title}</h2>}
            <p className={`text-lg text-gray-700 mb-4 text-center h-full flex items-center justify-center ${summary ? "" : "text-gray-400"}`}>
    {summary || "Your summary will appear here..."}
</p>
            </div>
            
            <input 
                type="text" 
                placeholder="Enter book title..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full max-w-lg p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--bgcolordark)] mt-4" 
            />
            <button 
                onClick={handleSummarize} 
                className="mt-4 bg-[var(--bgcolordark)] text-white px-6 py-2 rounded-lg cursor-pointer"
            >
                Summarize
            </button>
        </div>
        <div className="bg-[var(--bgcolordark)] w-full h-34"></div>

        </div>
    );
}
