import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import { books } from "../../../book_data";
import "./explore.css";
import Preview from "../../components/Preview/preview";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Explore() {

    const romanceRef = useRef(null);
    const fictionRef = useRef(null);
    const scifiRef = useRef(null);
    const mysteryRef = useRef(null);

    function scrollToSection(ref) {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function getTrendingBooks() {
        let trendingBooks = [];
        let selectedIndexes = new Set();
    
        while (selectedIndexes.size < 6) {
            let randomIndex = Math.floor(Math.random() * books.length);
            if (!selectedIndexes.has(randomIndex)) {
                selectedIndexes.add(randomIndex);
            }
        }
    
        selectedIndexes.forEach(index => trendingBooks.push(books[index]));
    
        return trendingBooks;
    }
    
    function getRomanceBooks() {
        return books.filter(book => book.genre.includes("Romance"))
    }

    function getFictionBooks() {
        return books.filter(book => book.genre.includes("Fiction"))
    }

    function getScifiBooks() {
        return books.filter(book => book.genre.includes("Science Fiction"));
    }

    function getMysteryBooks() {
        return books.filter(book => book.genre.includes("Mystery"));
    }

    function getNewReleases() {
        return books.sort((a, b) => b.year - a.year).slice(0, 6);
    }

    function useSmoothScroll(books) {
        const [startIndex, setStartIndex] = useState(0);
        const totalBooks = books.length;

        useEffect(() => {
            if (totalBooks <= 3) return;

            const interval = setInterval(() => {
                setStartIndex(prevIndex => {
                    return prevIndex + 1 > (totalBooks - 3) ? 0 : prevIndex + 1;
                });
            }, 5000);

            return () => clearInterval(interval);
        }, [totalBooks]);

        const scrollLeft = () => {
            setStartIndex(prevIndex => 
                prevIndex - 1 < 0 ? totalBooks - 3 : prevIndex - 1
            );
        };

        const scrollRight = () => {
            setStartIndex(prevIndex => 
                prevIndex + 1 > (totalBooks - 3) ? 0 : prevIndex + 1
            );
        };

        return { startIndex, scrollLeft, scrollRight };
    }

    const trendingBooks = getTrendingBooks();
    const romanceBooks = getRomanceBooks();
    const fictionBooks = getFictionBooks();
    const scifiBooks = getScifiBooks();
    const mysteryBooks = getMysteryBooks();
    const newReleases = getNewReleases();

    const trendingScrolling = useSmoothScroll(trendingBooks);
    const romanceScrolling = useSmoothScroll(romanceBooks);
    const fictionScrolling = useSmoothScroll(fictionBooks);
    const scifiScrolling = useSmoothScroll(scifiBooks);
    const mysteryScrolling = useSmoothScroll(mysteryBooks);
    const newReleasesScrolling = useSmoothScroll(newReleases);

    function renderBookSection(books, scrollingInfo) {
        if (books.length <= 3) {
            return books.map((book, index) => (
                <Preview 
                    key={index} 
                    book={book} 
                    className={`book-${index + 1}`} 
                />
            ));
        }
    
        const displayBooks = [
            books[scrollingInfo.startIndex % books.length],
            books[(scrollingInfo.startIndex + 1) % books.length],
            books[(scrollingInfo.startIndex + 2) % books.length]
        ];
    
        return (
            <>
                <button 
                    className="scroll-btn scroll-left" 
                    onClick={scrollingInfo.scrollLeft}
                >
                    <FaChevronLeft />
                </button>

                {displayBooks.map((book, index) => {
                    const className = `preview book-${index + 1}`;
        
                    return (
                        <Preview 
                            key={index} 
                            book={book} 
                            className={className}
                        />
                    );
                })}

                <button 
                    className="scroll-btn scroll-right" 
                    onClick={scrollingInfo.scrollRight}
                >
                    <FaChevronRight />
                </button>
            </>
        );
    }

    return (
        <div className="explore-container">
            <Navbar />
            <div className="explore-content">
                <h1>Explore Books</h1>
                <p>Explore a diverse collection of books across genres, from thrilling mysteries to inspiring non-fiction. Discover new favorites, read reviews, and uncover hidden literary gems on your journey to the perfect read!</p>
            </div>
            
            <div className="explore-genres">
                <div className="genre genre1" onClick={() => scrollToSection(romanceRef)}>
                    <div className="genre-img-container">
                        <img src="/images/romance-logo.png" alt="Romance Logo" />
                    </div>
                    <div className="genre-text-content">
                        <h2>Explore Romance</h2>
                        <p>Love, passion, and unforgettable moments. Dive into heartwarming stories filled with emotion and connection.</p>
                    </div>
                </div>
                <div className="genre genre2" onClick={() => scrollToSection(scifiRef)}>
                    <div className="genre-img-container">
                        <img src="/images/science-fiction-logo.png" alt="Science Fiction Logo" />
                    </div>
                    <div className="genre-text-content">
                        <h2>Explore Science Fiction</h2>
                        <p>Explore the unknown! From space odysseys to futuristic tech, embark on mind-bending adventures beyond reality.</p>
                    </div>
                </div>
                <div className="genre genre3" onClick={() => scrollToSection(fictionRef)}>
                    <div className="genre-img-container">
                        <img src="/images/fiction-logo.png" alt="Fiction Logo" />
                    </div>
                    <div className="genre-text-content">
                        <h2>Explore Fiction</h2>
                        <p>Step into different worlds! Lose yourself in captivating stories that blur the lines between reality and imagination.</p>
                    </div>
                </div>
                <div className="genre genre4" onClick={() => scrollToSection(mysteryRef)}>
                    <div className="genre-img-container">
                        <img src="/images/mystery-logo.png" alt="Mystery Logo" />
                    </div>
                    <div className="genre-text-content">
                        <h2>Explore Mystery</h2>
                        <p>Unravel secrets, follow the clues, and solve thrilling mysteries that will keep you guessing till the last page!</p>
                    </div>
                </div>
            </div>

            <div className="explore-trending">
                <h2>Trending Now</h2>
                <div className="scrolling-container">
                    {renderBookSection(trendingBooks, trendingScrolling)}
                </div>
            </div>

            <div className="explore-new-releases">
                <h2>New Releases</h2>
                <div className="scrolling-container">
                    {renderBookSection(newReleases, newReleasesScrolling)}
                </div>
            </div>

            <div ref={romanceRef} className="explore-romance">
                <h2>Explore Romance Novels</h2>
                <div className="scrolling-container">
                    {renderBookSection(romanceBooks, romanceScrolling)}
                </div>
            </div>

            <div ref={fictionRef} className="explore-fiction">
                <h2>Explore Fiction Novels</h2>
                <div className="scrolling-container">
                    {renderBookSection(fictionBooks, fictionScrolling)}
                </div>
            </div>

            <div ref={scifiRef} className="explore-scifi">
                <h2>Explore Science Fiction Novels</h2>
                <div className="scrolling-container">
                    {renderBookSection(scifiBooks, scifiScrolling)}
                </div>
            </div>

            <div ref={mysteryRef} className="explore-mystery">
                <h2>Explore Mystery Novels</h2>
                <div className="scrolling-container">
                    {renderBookSection(mysteryBooks, mysteryScrolling)}
                </div>
            </div>
        </div>
    );
}
