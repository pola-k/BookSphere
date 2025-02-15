import { useState } from "react"

export default function Sidebar() {

    const [hover, setHover] = useState(false)

    return (

        <div className="flex flex-col justify-between h-full overflow-y-auto p-[1vw] border-1" style={{backgroundColor: "var(--bgcolordark)", borderColor: "var(--bordercolor)", color: "var(--headingcolordark)"}}>

            <div className="flex flex-col justify-start gap-[2vh] text-[1.15vw] font-bold overflow-y-auto">

                <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                    <img src="./src/images/home.png" alt="" className="h-[2.5vw]" />
                    <p className="px-[1vw]">Home</p>
                </div>

                <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                    <img src="./src/images/books.png" alt="" className="h-[2.5vw]" />
                    <p className="px-[1vw]">My List</p>
                </div>

                <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                    <img src="./src/images/encyclopedia.png" alt="" className="h-[2.5vw]" />
                    <p className="px-[1vw]">Encyclopedia</p>
                </div>

                <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                    <img src="./src/images/sparkle.png" alt="" className="h-[2.5vw]" />
                    <p className="px-[1vw]">Summarizer</p>
                </div>

            </div>

            <p className="text-center text-[0.85vw]">BookSphere &#169; 2025. All rights reserved</p>

        </div>
    )
}