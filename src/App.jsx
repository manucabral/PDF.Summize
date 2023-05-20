import openai from './libs/openai'
import React from 'react'
import { pdfToText } from './services/pdfService'


export default function App() {
    const [pages, setPages] = React.useState(null)
    const [summary, setSummary] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [pdf, setPdf] = React.useState(null)

    const summarize = async (text) => {
        try{
            const response = await openai.createCompletion(
                {
                    model: 'text-davinci-003',
                    prompt: `Summarize the following text: ${text}`,
                    max_tokens: 64,
                    temperature: 0.3,
                }
            )
            return response.data.choices[0].text
        }
        catch(error){
            alert('Something went wrong while summarizing the text')
        }
        finally{
            setLoading(false)
        }
    }

    const convert = async () => {
        if (!pdf) return
        setLoading(true)
        try {
            const response = await pdfToText(pdf)
            setPages(response.data.content)
            const firstPage = response.data.content[0].text
            setSummary(await summarize(firstPage))
        } catch (error) {
            alert('Something went wrong while converting the pdf')
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
                    onClick={convert}
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
            {pages && summary && (
                <div className="flex flex-col items-center gap-10 h-full overflow-y-auto"> 
                    <h2 className="text-2xl font-bold text-white">
                        Summary
                    </h2>
                    <p className="text-white">{summary}</p>
                </div>
            )}
        </main>
    )
}
