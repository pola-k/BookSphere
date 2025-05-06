import PostUploadModal from "./post-upload-modal"
import axios from "axios";
import { useState } from "react"

export default function CreatePostModal() {

    const userId = sessionStorage.getItem("user_id");

    const [activeTab, setActiveTab] = useState("text")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState([])
    const [message, setMessage] = useState("")

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        if (activeTab === "text") {

            try {

                const payload = {
                    user_id: userId,
                    title: title,
                    description: description
                }

                const response = await axios.post('http://localhost:5001/api/auth/create-text-post', payload,
                    {
                        withCredentials: true,
                    }
                );

                // maybe change this or use response.data
                setMessage("Post created successfully");
                setTitle("");
                setDescription("");

            } catch (err) {
                setMessage(err.response?.data?.message || 'Unable to create post. Please try again.');
            }
        }

        else if (activeTab === "image") {

            try {

                console.log("inside_try block")

                const formData = new FormData();
                formData.append('user_id', userId);
                formData.append('title', title);
                formData.append('description', description);

                files.forEach((file, index) => {
                    formData.append('media[]', file);
                });

                console.log("made formData", formData)

                const response = await axios.post('http://localhost:5001/api/auth/create-media-post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });

                console.log("api call successful")

                // maybe change this or use response.data
                setMessage("Post created successfully")
                setTitle("");
                setDescription("");
                setFiles([]);

            } catch (err) {
                setMessage(err.response?.data?.message || 'Unable to create post. Please try again.');
            }
        }

    }

    return (

        <div className="flex flex-col gap-[5vh]">

            <p className="text-[2vw] text-[var(--headingcolordark)] font-bold">Create Post</p>

            <div className="flex flex-col gap-[2vh]">

                <div className="flex gap-[1vw] text-[1.25vw]">

                    <p onClick={() => { setActiveTab("text"); setMessage("")}} className={`px-[1vw] py-[0.5vh] rounded-2xl hover:cursor-pointer hover:bg-[var(--accentcolor)] hover:text-[var(--bgcolorlight)] ${activeTab === "text" ? "text-[var(--bgcolorlight)] bg-[var(--posthovercolor)] hover:bg-[var(--posthovercolor)] hover:text-[var(--bgcolorlight)]" : null}`}>Text</p>

                    <p onClick={() => { setActiveTab("image"); setMessage("")}} className={`px-[1vw] py-[0.5vh] rounded-2xl hover:cursor-pointer hover:bg-[var(--accentcolor)] hover:text-[var(--bgcolorlight)] ${activeTab === "image" ? "text-[var(--bgcolorlight)] bg-[var(--posthovercolor)] hover:bg-[var(--posthovercolor)] hover:text-[var(--bgcolorlight)]" : null}`}>Image</p>

                </div>

                {/* see if the type needs to be multipart form */}
                <form className="flex flex-col gap-[2vh]" onSubmit={handleFormSubmit}>

                    {/* Title Input */}
                    <div className="flex items-center border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-2xl px-[1vw] py-[1.25vh] max-w-[40vw] text-[1vw] mt-[2vh]">
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="outline-none w-full bg-transparent"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="flex items-center border-[0.25vh] border-[var(--bordercolor)] bg-[var(--bgcolorlight)] text-[var(--headingcolordark)] rounded-2xl px-[1vw] py-[1.25vh] max-w-[40vw] text-[1vw] mb-[2vh]">
                        <textarea
                            placeholder="Description"
                            {...(activeTab === "text" ? { required: true } : {})}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="outline-none resize-none w-full bg-transparent h-[8vh]"
                        />
                    </div>

                    {/* Image Input */}
                    {activeTab === "image" && <PostUploadModal setFilesMethod={setFiles} />}

                    {/* Post Button */}
                    <button type="submit" className="max-w-[7vw] text-[1.25vw] rounded-4xl px-[1vw] py-[1vh] text-[var(--bgcolorlight)] bg-[var(--navbarcolor)] hover:bg-[var(--posthovercolor)] hover:cursor-pointer">

                        Publish
                    </button>

                    {message && <div className="text-[1vw] font-bold text-red-800">{message}</div>}

                </form>

            </div>

        </div >


    )
}