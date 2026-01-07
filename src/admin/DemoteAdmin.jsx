import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loading from "../components/ui/Loading";
import { demoteAdminToUser } from "../services/api";

export default function DemoteAdmin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await demoteAdminToUser(email.trim());
            // Ensure success message is always a string
            const successMessage = typeof response === 'string' ? response : "Admin demoted to USER successfully";
            setSuccess(successMessage);
            setEmail(""); // Clear the input

            // Auto-redirect after 2 seconds
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
        } catch (err) {
            console.error(err);

            if (err.response?.status === 404) {
                setError("User not found with this email");
            } else if (err.response?.status === 400) {
                const errorMsg = typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.error || "User is not an admin";
                setError(errorMsg);
            } else if (err.response?.status === 403) {
                setError("You don't have permission to perform this action");
            } else {
                const errorMsg = typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.error || "Failed to demote admin";
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading manualLoading={true} />;
    }

    return (
        <div className="max-w-xl mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold mb-2 text-white text-center">
                Demote Admin to User
            </h1>
            <p className="text-slate-400 text-center mb-8">
                Remove admin privileges from a user by entering their email
            </p>

            <div className="bg-[#1E293B]/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Admin Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                    />

                    {error && (
                        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            {success}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={loading} className="flex-1 shadow-lg shadow-red-500/25 bg-red-600 hover:bg-red-700">
                            Demote to User
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
