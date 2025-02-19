import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function Post({ post }) {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = post.image;
        img.onload = () => {
            setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
    }, [post.image]);

    const isPortrait = dimensions.height > dimensions.width;
    const [liked, setLiked] = useState(false);

    function formatDate(date) {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's time zone
        const zonedDate = toZonedTime(date, userTimeZone); // Convert UTC to user's timezone
        let difference = formatDistanceToNow(zonedDate, { addSuffix: true });

        difference = difference.replace(/^about\s/, "");
        return difference;
    }

    return (

        <div className="rounded-2xl" style={{ backgroundColor: "var(--postcolor)", color: "var(--bgcolorlight)" }}>

            <div className="flex flex-col gap-[1vh] items-start w-full rounded-2xl hover:cursor-pointer px-[1.5vw] py-[2vh] hover:bg-[#5f322c]">

                {/* Username + Timestamp + Options*/}
                <div className="flex w-full items-center justify-between text-lg">

                    <div className="flex gap-[0.5vw] items-center">
                        <p>{post.user}</p>
                        <p>.</p>
                        <p>{formatDate(post.date)}</p>
                    </div>

                    {/* Options */}
                    <div className="p-[0.30vw] rounded-3xl hover:bg-[#833f36]">
                        <img src="./src/images/dots.png" alt="" className="h-[1.25vw]" />

                    </div>


                </div>

                {/* Flair */}
                {post.flair &&
                    <div className="text-xl text-black px-[0.5vw] py-[0.5vh] rounded-2xl bg-pink-200">
                        {post.flair}
                    </div>
                }

                {/* Title */}
                <div className="text-3xl font-bold text-left">
                    {post.title}

                </div>

                {/* Descrption */}
                {!post.image &&
                    <div className="text-xl text-left">
                        {post.description}
                    </div>
                }

                {/* Media */}
                {/* handle multiple media files */}
                <div className="flex w-full justify-center">
                    {/* add checkd for image existence and maybe only display the image if some description exists too */}
                    {post.image &&
                        <div className="relative w-full max-h-[60vh] flex items-center justify-center overflow-hidden rounded-lg">
                            {/* Add isPotrait check */}
                            {isPortrait &&
                                <img
                                    src={post.image}
                                    alt="Blurred background"
                                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 brightness-50"
                                />
                            }

                            <img
                                src={post.image}
                                alt="Post"
                                className="relative max-h-[60vh] max-w-full object-contain z-10"
                            />
                        </div>
                    }
                </div>

                {/* Icons */}
                <div className="flex items-center justify-start gap-[1.15vw] pt-[1vh]">

                    <div className="flex items-center gap-[0.4vw] p-[0.60vw] rounded-3xl text-xl font-bold transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh]" style={{ backgroundColor: "var(--bgcolorlight)", color: "var(--navbarcolor)" }} onClick={() => setLiked(!liked)}>

                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[1.25vw] cursor-pointer transition-all duration-200"
                            fill={liked ? "red" : "none"} // Toggle fill color
                            stroke="red" // Keep red stroke for outline effect
                            strokeWidth="3" // Make outline more visible
                        >
                            <path
                                id="primary"
                                d="M20.28,4.74a5.82,5.82,0,0,0-8.28,0,5.82,5.82,0,0,0-8.28,0,5.94,5.94,0,0,0,0,8.34l7.57,7.62a1,1,0,0,0,1.42,0l7.57-7.62a5.91,5.91,0,0,0,0-8.34Z"
                            />
                        </svg>

                        {post.likes}

                    </div>

                    <div className="p-[0.60vw] rounded-3xl transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh]" style={{ backgroundColor: "var(--bgcolorlight)" }}>
                        <img src="./src/images/speech-bubble.png" alt="" className="h-[1.25vw]" />
                    </div>

                    <div className="p-[0.60vw] rounded-3xl transition-transform duration-300 ease-in-out hover:-translate-y-[0.5vh]" style={{ backgroundColor: "var(--bgcolorlight)" }}>
                        <img src="./src/images/share.png" alt="" className="h-[1.25vw]" />
                    </div>



                </div>

            </div>

        </div>
    )
}