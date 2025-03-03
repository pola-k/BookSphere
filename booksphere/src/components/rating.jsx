import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ rating, rateable }) {   
    const stars = Array(5).fill(0);
    const [selectedRating, setSelectedRating] = useState(rating);
    const [hoverValue, setHoverValue] = useState(null);

    const handleClickStar = (value) => {
        if (rateable) {
            setSelectedRating(value);
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
