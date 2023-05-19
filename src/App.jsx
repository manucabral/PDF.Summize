import { useState } from 'react'
import { pdfToText } from './services/pdfService'

export default function App() {
    const [pages, setPages] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [pdf, setPdf] = useState(null)

    const summarize = async () => {
        if (!pdf) return
        setLoading(true)
        try {
            const response = await pdfToText(pdf)
            setPages(response.data.content)
        } catch (error) {
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        setPdf(file)
    }

    return (
        <main className="flex flex-col items-center gap-10 h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="flex flex-col items-center gap-2 text-white">
                <h1 className="text-4xl font-bold">
                    PDF<span className="text-orange-500">.Summize</span>
                </h1>
                <p className="text-xl font-bold">
                    Summarize your pdf files with ease
                </p>
            </div>
            <div
                className="flex text-white flex-col items-center justify-center gap-2 p-10 border-4 border-dashed rounded-lg border-gray-500"
                onDragEnter={() => setIsHovered(true)}
                onDragLeave={() => setIsHovered(false)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                    event.preventDefault()
                    setIsHovered(false)
                    const file = event.dataTransfer.files[0]
                    if (file.type !== 'application/pdf') return
                    setPdf(file)
                }}
            >
                {pdf ? (
                    <p className="text-xl">{pdf.name}</p>
                ) : (
                    <p className="text-xl">
                        {isHovered
                            ? 'Drop the file here'
                            : 'Drag and drop your pdf here'}
                    </p>
                )}
                <label
                    htmlFor="file"
                    className="px-4 py-2 text-white bg-gray-500 rounded-lg cursor-pointer"
                >
                    Browse Files
                </label>
                <input
                    type="file"
                    id="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex items-center gap-2 text-white">
                <button
                    className="px-4 py-2 text-white bg-orange-500 rounded-lg"
                    onClick={summarize}
                    disabled={loading || !pdf}
                >
                    {loading ? 'Loading...' : 'Summarize'}
                </button>
                <button
                    className="px-4 py-2 text-white bg-gray-500 rounded-lg"
                    onClick={() => setPages(null) || setPdf(null)}
                    disabled={!pages}
                >
                    Clear
                </button>
            </div>
            {pages && (
                <div className="flex flex-col items-center gap-10 text-white h-full overflow-y-auto">
                    {pages.map((page) => (
                        <div key={page.page}>
                            <h1 className="text-2xl font-bold">
                                Page {page.page}
                            </h1>
                            <p>{page.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}
