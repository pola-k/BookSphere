import { X, ChevronRight, ChevronLeft } from "lucide-react"

export default function MediaModal({ image, closeModal, nextMedia, prevMedia }) {

    return (

        <div className="fixed top-0 left-0 z-55 w-screen h-screen flex items-center justify-center">

            <button className="absolute top-[2vh] right-[3vh] z-60 p-[0.25vw] rounded-4xl bg-black opacity-55 hover:cursor-pointer hover:opacity-65" onClick={closeModal}>
                <X size={"2.5vw"} color="white"/>
            </button>

            <button className="absolute top-[50vh] left-[3vh] z-60 p-[0.25vw] rounded-4xl bg-black opacity-55 hover:cursor-pointer hover:opacity-65" onClick={prevMedia}>
                <ChevronLeft size={"2.5vw"} color="white"/>
            </button>

            <button className="absolute top-[50vh] right-[3vh] z-60 p-[0.25vw] rounded-4xl bg-black opacity-55 hover:cursor-pointer hover:opacity-65" onClick={nextMedia}>
                <ChevronRight size={"2.5vw"} color="white"/>
            </button>

            {/* Need to cater this for multiple images using map*/}

            <img
                src={image}
                alt="Blurred background"
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 brightness-50"
            />

            <img
                src={image}
                alt="Post"
                className="relative max-h-screen max-w-full"
            />
        </div>
    )
}