import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

export default function Rating({ rating, rateable, book_id, refetch, setNotification }) {   
    const stars = Array(5).fill(0);
    const [selectedRating, setSelectedRating] = useState(rating);
    const [hoverValue, setHoverValue] = useState(null);
    const userId = sessionStorage.getItem("user_id");

    useEffect(() => {
        if(rateable && userId)
        {
            fetchRating();
        }
    }, []);

    useEffect(() => {
        if (!rateable) 
        {
            setSelectedRating(rating);
        }
    }, [rating]);
    

    async function updateRating(value) 
    {
        if(userId === null)
        {
            return;
        }
        try 
        {
            const rating_status = await axios.post(`http://localhost:5001/api/rating/updateRating`, {
                user_id: userId,
                book_id: book_id,
                score: value
            }); 
        }
        catch
        {
            console.error("Error updating rating");
        }
    }

    async function fetchRating() {
        if(userId === null)
        {
            return;
        }
        try 
        {
            const response = await axios.get(`http://localhost:5001/api/rating/getRating`, {
                params: {
                    user_id: userId,
                    book_id: book_id
                }
            });
    
            if (response.data.score !== undefined) 
            {
                setSelectedRating(response.data.score);
            }
        } 
        catch (error) 
        {
            console.error("Error fetching rating", error);
        }
    }
    

    const handleClickStar = async (value) => {
        if (rateable && userId) 
        {
            setSelectedRating(value);
            await updateRating(value);
            await refetch();
        }
        else if(rateable && userId === null)
        {
            setNotification("Please log in to rate books");
            return
        }
    };

    const handleMouseOverStar = (value) => {
        if (rateable) {
            setHoverValue(value);
        }
    };

    const handleMouseLeaveStar = () => {
        if (rateable) {
            setHoverValue(null);
        }
    };

    return (
        <>
            {stars.map((_, index) => {
                const starValue = index + 1;
                let fillPercentage = 0;
                
                if (hoverValue !== null) 
                {
                    fillPercentage = hoverValue >= starValue ? 100 : 0;
                } else if (selectedRating >= starValue) 
                {
                    fillPercentage = 100;
                } else if (selectedRating > index)
                {
                    fillPercentage = (selectedRating - index) * 100;
                }

                return (
                    <span
                        key={index}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            cursor: rateable ? "pointer" : "default"
                        }}
                        onClick={() => handleClickStar(starValue)}
                        onMouseOver={() => handleMouseOverStar(starValue)}
                        onMouseLeave={handleMouseLeaveStar}
                    >
                        <FaStar size={20} color="#a9a9a9" />
                        <span
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "20px",
                                height: "20px",
                                overflow: "hidden",
                                display: "flex",
                                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                            }}
                        >
                            <FaStar size={20} color="#F2C265" />
                        </span>
                    </span>
                );
            })}
        </>
    )
}
