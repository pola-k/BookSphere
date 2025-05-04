import { useState } from "react";
import { X } from "lucide-react";

export default function PostUploadModal({ setFilesMethod }) {

  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log("Existing Valid Files: ", files)  //kfidvoievoireofmeovenbcijnoren
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles) => {
    // Filter files to only allow JPEG and PNG
    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    const validFiles = selectedFiles.filter((file) =>
      validTypes.includes(file.type)
    );

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      setFilesMethod(updatedFiles);    // setting these files in the main form
      console.log("New Valid Files: ", updatedFiles)    //ncibdinvpomeonvfroivencpef
    }

    else {
      alert("Only JPEG and PNG images are allowed.");
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (

    <div className="max-w-[40vw] mb-[2vh]">
      {/* Upload Box */}
      <label
        className={`flex flex-col items-center justify-center w-full p-[2vh] border-[0.25vh] border-dashed rounded-2xl cursor-pointer ${dragging ? "border-[var(--bgcolorlight)] bg-[var(--navbarcolor)]" : "border-[var(--accentcolor)]"
          }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          multiple
          required
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />

        {/* Upload Icon */}
        <svg
          className="w-[4vh] h-[4vh] text-[var(--navbarcolor)] mb-[1vh]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
          ></path>
        </svg>

        {/* Upload Text */}
        <p className="text-[0.75vw] text-[var(--textcolor)]">
          Drag & drop images here or{" "}
          <span className="text-[0.75vw] text-[var(--postcolor)] font-bold">click to upload</span>
        </p>
      </label>

      {/* Image Previews with Remove Button */}
      {files.length > 0 && (
        <div className="mt-[1.25vh] grid grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-[10vh] object-fit rounded-lg shadow-md"
              />
              {/* Remove Button */}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-[0.5vh] right-[0.5vh] text-[0.75vw] text-[0.75vw] bg-black opacity-0 text-gray-300 text-[0.75vw] rounded-full w-[2.5vh] h-[2.5vh] flex items-center justify-center group-hover:opacity-70 transition"
              >
                <X />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
