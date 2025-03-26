import Sidebar_Dropdown from "./sidebar-dropdown"

export default function Sidebar() {

    return (

        <div className="flex flex-col justify-between gap-[4vh] h-full p-[1vw] border-x-1 border-t-1 bg-[var(--bgcolordark)] border-[var(--bordercolor)] text-[var(--headingcolordark)]">

            <div className="flex flex-col justify-start gap-[4vh]">

                <div className="flex flex-col justify-start gap-[2vh] text-[1.15vw] font-bold">

<<<<<<< Updated upstream
                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                        <img src="./src/images/home.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Home</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                        <img src="./src/images/books.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">My List</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                        <img src="./src/images/encyclopedia.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Encyclopedia</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                        <img src="./src/images/bookmark.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Saved</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[var(--accentcolor)]">
                        <img src="./src/images/sparkle.png" alt="" className="h-[2.5vw]" />
=======
                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                        <img src="/images/home.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Home</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                        <img src="/images/books.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">My List</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                        <img src="/images/encyclopedia.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Encyclopedia</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                        <img src="/images/bookmark.png" alt="" className="h-[2.5vw]" />
                        <p className="px-[1vw]">Saved</p>
                    </div>

                    <div className="flex items-center rounded-2xl px-[1vw] py-[0.75vh] hover:bg-[#A76D3E]">
                        <img src="/images/sparkle.png" alt="" className="h-[2.5vw]" />
>>>>>>> Stashed changes
                        <p className="px-[1vw]">Summarizer</p>
                    </div>

                </div>

                <div className="border-t border-b py-[1vh]">

                    <Sidebar_Dropdown />

                </div>

            </div>

            <p className="text-center text-[0.85vw]">BookSphere &#169; 2025. All rights reserved</p>

        </div>
    )
}