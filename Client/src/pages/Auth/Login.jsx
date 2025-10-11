import { useState } from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   // keep as string
    const [loading, setLoading] = useState(false);
    const {updateUser}=useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // ✅ Validation
        if (!validateEmail(email)) {
            setError("Enter a valid Email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError("");
        setLoading(true);
        console.log(API_PATHS.AUTH.LOGIN);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            <AuthLayout>
                {/* Left: Form */}
                <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 h-full">
                    <div className="max-w-md w-full">
                        {/* Header with enhanced styling */}
                        <div className="mb-8">
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                                Welcome Back
                            </h3>
                            <p className="text-base text-slate-600">
                                Please enter your details to login
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <Input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                label="Email Address"
                                placeholder="john@example.com"
                                type="text"
                            />
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 6 characters"
                                type="password"
                            />

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-pulse">
                                    <p className="text-red-600 text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 transform shadow-lg ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95"
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    "Login"
                                )}
                            </button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-slate-500">New to our platform?</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center gap-2 font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 group"
                                >
                                    Create an account
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthLayout>

            {/* Right: Expense Graph Visualization */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 items-center justify-center p-10 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

                <div className="relative z-10 w-full max-w-lg">
                    <div className="text-white mb-10">
                        <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">Track Your Expenses</h2>
                        <p className="text-slate-300 text-lg">Get insights into your spending habits</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 shadow-2xl border border-purple-400">
                            <div className="text-purple-200 text-xs mb-2 font-semibold uppercase tracking-wide">This Month</div>
                            <div className="text-white text-3xl font-bold drop-shadow">$2,847</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-2xl border border-blue-400">
                            <div className="text-blue-200 text-xs mb-2 font-semibold uppercase tracking-wide">Last Month</div>
                            <div className="text-white text-3xl font-bold drop-shadow">$3,124</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 shadow-2xl border border-green-400">
                            <div className="text-green-200 text-xs mb-2 font-semibold uppercase tracking-wide">Saved</div>
                            <div className="text-white text-3xl font-bold drop-shadow">9%</div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="mt-6 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-3xl p-7 border border-slate-700 shadow-2xl">
                        <h3 className="text-white font-bold mb-5 text-xl">Top Categories</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Food & Dining', amount: '$845', percent: 30, color: 'from-pink-500 to-pink-600' },
                                { name: 'Transportation', amount: '$432', percent: 15, color: 'from-cyan-500 to-cyan-600' },
                                { name: 'Shopping', amount: '$678', percent: 24, color: 'from-purple-500 to-purple-600' },
                                { name: 'Entertainment', amount: '$234', percent: 8, color: 'from-green-500 to-green-600' },
                            ].map((cat, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-white text-base font-semibold">{cat.name}</span>
                                            <span className="text-white text-base font-bold">{cat.amount}</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                                            <div className={`bg-gradient-to-r ${cat.color} h-full rounded-full transition-all duration-500 shadow-lg`} 
                                                 style={{ width: `${cat.percent}%` }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};