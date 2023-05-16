export default function App() {
    return (
        <div className="flex flex-col items-center gap-10 bg-gradient-to-r from-red-400 to-red-900 h-screen">
            <h1 className="text-4xl font-bold text-white">PDF Summize</h1>
            <input type="file" />
            <button className="bg-white text-black rounded-full px-4 py-2 hover:bg-gray-200">
                Upload PDF
            </button>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl">Summary</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
                    voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </p>
            </div>
        </div>
    )
}
