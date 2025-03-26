import PostUploadModal from "./post-upload-modal"

import { useState } from "react"
export default function CreatePostModal() {

    const [activeTab, setActiveTab] = useState("text")

    return (

        <div className="flex flex-col gap-[5vh]">

            <p className="text-[2vw] text-[var(--headingcolordark)] font-bold">Create Post</p>

            <div className="flex flex-col gap-[2vh]">

                <div className="flex gap-[1vw] text-[1.25vw]">

                    <p onClick={() => setActiveTab("text")} className={`px-[1vw] py-[0.5vh] rounded-2xl hover:cursor-pointer hover:bg-[var(--accentcolor)] hover:text-[var(--bgcolorlight)] ${activeTab === "text" ? "text-[var(--bgcolorlight)] bg-[var(--posthovercolor)] hover:bg-[var(--posthovercolor)] hover:text-[var(--bgcolorlight)]" : null}`}>Text</p>

                    <p onClick={() => setActiveTab("image")} className={`px-[1vw] py-[0.5vh] rounded-2xl hover:cursor-pointer hover:bg-[var(--accentcolor)] hover:text-[var(--bgcolorlight)] ${activeTab === "image" ? "text-[var(--bgcolorlight)] bg-[var(--posthovercolor)] hover:bg-[var(--posthovercolor)] hover:text-[var(--bgcolorlight)]" : null}`}>Image</p>

                </div>

                {/* Title Input */}
                <div className="flex items-center border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-2xl px-[1vw] py-[1.25vh] max-w-[40vw] text-[1vw] mt-[2vh]">
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        className="outline-none w-full bg-transparent"
                    />
                </div>

                {/* Decription Input */}
                <div className="flex items-center border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-2xl px-[1vw] py-[1.25vh] max-w-[40vw] text-[1vw] mb-[2vh]">
                    <textarea
                        placeholder="Description"
                        required
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        className="outline-none resize-none w-full bg-transparent h-[8vh]"
                    />
                </div>

                {/* Image Input */}
                {activeTab === "image" && <PostUploadModal/>}

                {/* Post Button */}
                <button className="max-w-[7vw] text-[1.25vw] rounded-4xl px-[1vw] py-[1vh] text-[var(--bgcolorlight)] bg-[var(--navbarcolor)] hover:bg-[var(--posthovercolor)] hover:cursor-pointer">

                    Publish
                </button>

            </div>

        </div >


    )
}