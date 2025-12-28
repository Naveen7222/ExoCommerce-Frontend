import { useState } from "react";
import Loading from "../components/ui/Loading";

export default function TestLoader() {
    const [isTestLoading, setIsTestLoading] = useState(false);

    const triggerLoader = () => {
        setIsTestLoading(true);
        // Automatically stop after 3 seconds so you can see the exit
        setTimeout(() => setIsTestLoading(false), 3000);
    };

    return (
        <div className="p-10 flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">ExoCommerce Loader Test</h1>

            <button
                onClick={triggerLoader}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition"
            >
                {isTestLoading ? "Shinobi Running..." : "Test Naruto Run"}
            </button>

            <div className="mt-10 p-4 border border-dashed rounded text-gray-500 w-full max-w-lg relative  min-h-[100px] flex items-center justify-center">
                {/* Pass manualLoading prop so we can force it to show, plus new props */}
                <Loading manualLoading={isTestLoading} position="absolute" size="sm" />
                <p className="text-sm">Loader will appear inside this box, running LTR.</p>
            </div>
        </div>
    );
}