import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import './summarizer.css';

export default function Summarizer() {
    const [fileName, setFileName] = useState("");
    const [summary, setSummary] = useState("");
    const [file, setFile] = useState(null); 
    const [notification, setNotification] = useState("");
    const [inprogress, setInProgress] = useState(false);

    const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFileName(uploadedFile.name.toUpperCase());
    setSummary("");
    };

    useEffect(() => {
        if (notification && notification !== "Generating summary") {
          const t = setTimeout(() => {
            if(inprogress)
                setNotification("Generating summary")
            else
                setNotification("")}, 3000);
          return () => clearTimeout(t);
        }
      }, [notification]);

    const handleSummarize = async () => {
        if (inprogress)
        {
            setNotification("Please wait for the current summary to finish.");
            return;
        } 

        setInProgress(true);
        
        if (!file)
        {
            setNotification("Please upload a file first.");
            setInProgress(false);
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try 
        {
            setNotification("Generating summary");
            setSummary("Generating summary... Please wait.");
            const response = await fetch("http://localhost:5000/summarize", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok || !response.body) {
                setSummary("Error: Failed to stream summary.");
                return;
            }
    
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = "";
    
            while (true) 
            {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                result += chunk;
                setSummary((prev) => prev.replace("Generating summary... Please wait.", "") + chunk + "Generating summary... Please wait.");
            }
            setSummary((prev) => prev.replace("Generating summary... Please wait.", "\n\nEND\n\n"));
            setNotification("Summary generated successfully!");
        } 
        catch (err) 
        {
            setInProgress(false);
            setSummary("Error: Failed to Generate Summary.");
            setNotification("Server Error")
        }
    };
    

    return (
        <div
            className="min-h-screen text-gray-900 font-sans bg-gradient-to-br from-[var(--bgsumarizerpage)] to-[#f0f2f5]"
            style={{ animation: "fadeInPage 0.7s ease-in-out" }}
        >
            {/* Inline Animation Styles */}
            <style>{`
                @keyframes fadeInPage {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes smoothPop {
                    from { opacity: 0; transform: scale(0.97); }
                    to { opacity: 1; transform: scale(1); }
                }
                .pop-in {
                    animation: smoothPop 0.4s ease forwards;
                }
            `}</style>

            <Navbar />
            {notification && (
                        <div className="notification-container">
                            <div className="notification">{notification}</div>
                        </div>
                    )}
            {/* Header */}
            <header className="w-full py-20 px-6 text-center">
                <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 mb-4 pop-in">
                    📘 AI Book Summarizer
                </h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto pop-in">
                    Upload your .txt or .pdf book and instantly generate a summary that saves time.
                </p>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start pb-20">
                {/* Upload Panel */}
                <section className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl pop-in">
                    <h2 className="text-2xl font-bold mb-6">📂 Upload File</h2>

                    <label className="block border-2 border-dashed border-gray-300 hover:border-[var(--bgcolordark)] p-6 rounded-2xl cursor-pointer transition duration-200 text-center">
                        <input
                            type="file"
                            accept=".txt,application/pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <p className="text-gray-600 font-medium">
                            Click or drag a <span className="text-[var(--bgcolordark)] font-semibold">.txt</span> or <span className="text-[var(--bgcolordark)] font-semibold">.pdf</span> file
                        </p>
                        <p className="text-sm text-gray-400 mt-1">Up to 5MB supported</p>
                        {fileName && (
                            <p className="mt-4 text-sm text-green-600 font-medium animate-fade-in">
                                ✅ {fileName}
                            </p>
                        )}
                    </label>

                    {fileName && (
                        <button
                            onClick={handleSummarize}
                            className="mt-6 w-full py-3 bg-[var(--bgcolordark)] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition"
                        >
                            ✨ Summarize File
                        </button>
                    )}
                </section>

                {/* Output Panel */}
                <section className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 w-full flex flex-col items-start pop-in">
                    <h3 className="text-2xl font-semibold mb-4 text-[var(--bgcolordark)]">
                        {fileName || "📄 No File Selected"}
                    </h3>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 min-h-[220px] w-full overflow-y-auto whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700 transition-all">
                        {summary || (
                            <span className="text-gray-400 italic">
                                Upload a file and click summarize to generate your summary.
                            </span>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-10 w-full py-6 text-center text-sm text-white bg-[var(--bgcolordark)] rounded-t-3xl shadow-inner tracking-wide">
                BookSphere © 2025 — Crafted with precision 📚✨
            </footer>
        </div>
    );
}
