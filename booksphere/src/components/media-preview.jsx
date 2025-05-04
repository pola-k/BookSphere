import { useState, useEffect } from "react";
import MediaModal from "./media-modal";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function MediaPreview({ media_list }) {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const isPortrait = dimensions.height > dimensions.width;
    const [mediaModal, setMediaModal] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const handleMediaModal = () => {
        setMediaModal(!mediaModal);
    }

    useEffect(() => {

        const getMediaFiles = async () => {
            
        }

        const img = new Image();
        img.src = media_list[currentMediaIndex];
        img.onload = () => {
            setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
    }, [currentMediaIndex]);

    // Cycle to the next image
    const nextMediaFile = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === media_list.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Cycle to the previous image
    const prevMediaFile = () => {
        setCurrentMediaIndex((prevIndex) =>
            prevIndex === 0 ? media_list.length - 1 : prevIndex - 1
        );
    };

    return (

        <div className="relative flex w-full justify-center">
            {/* add check for image existence and maybe only display the image if some description exists too */}

            <div className="relative w-full max-h-[60vh] flex items-center justify-center overflow-hidden rounded-lg">
                {/* Add isPotrait check */}
                {isPortrait &&
                    <img
                        src={media_list[currentMediaIndex]}
                        alt="Blurred background"
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 brightness-50"
                    />
                }

                <img
                    src={media_list[currentMediaIndex]}
                    alt="Post"
                    onClick={handleMediaModal}
                    className="relative max-h-[60vh] max-w-full object-contain z-10"
                />
            </div>

            {(media_list.length > 1) && 
            <div>
                <button className="absolute top-[50%] left-[3%] z-50 p-[0.25vw] rounded-4xl bg-black opacity-55 hover:cursor-pointer hover:opacity-65" onClick={prevMediaFile}>
                    <ChevronLeft size={"1.5vw"} color="white"/>
                </button>

                <button className="absolute top-[50%] right-[3%] z-50 p-[0.25vw] rounded-4xl bg-black opacity-55 hover:cursor-pointer hover:opacity-65" onClick={nextMediaFile}>
                    <ChevronRight size={"1.5vw"} color="white"/>
                </button>
            </div>}



            {mediaModal &&
                <MediaModal image={media_list[currentMediaIndex]} closeModal={handleMediaModal} prevMedia={prevMediaFile} nextMedia={nextMediaFile} />
            }

        </div>
    )
}