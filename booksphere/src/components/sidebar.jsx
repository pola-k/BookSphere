export default function Sidebar() {

    return (

        <div className="flex flex-col justify-between bg-[#C19A6B] h-full overflow-y-auto p-[1vw]">

            <div className="flex flex-col justify-start gap-[1vh] text-xl font-bold overflow-y-auto">

                <div className="flex items-center justify-start">
                    <img src="./src/images/logo.png" alt="" className="h-[5vw]" />
                    <p className="px-[1vw]">Home</p>
                </div>

                <div className="flex items-center">
                    <img src="./src/images/logo.png" alt="" className="h-[5vw]" />
                    <p className="px-[1vw]">My List</p>
                </div>

                <div className="flex items-center">
                    <img src="./src/images/logo.png" alt="" className="h-[5vw]" />
                    <p className="px-[1vw]">Encyclopedia</p>
                </div>

                <div className="flex items-center">
                    <img src="./src/images/logo.png" alt="" className="h-[5vw]" />
                    <p className="px-[1vw]">Summarizer</p>
                </div>

            </div>

            <p className="text-center">BookSphere &#169; 2025. All rights reserved</p>

        </div>
    )
}