import { AuthLayout } from "../../components/layouts/AuthLayout"
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useState } from "react";
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

export const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { updateUser } = useContext(UserContext);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";

        if (!fullname) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Enter a valid Email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                console.log("Image Upload Response:", imgUploadRes);

                // FIX: use correct key (depends on backend response)
                profileImageUrl =
                    imgUploadRes.imageUrl || "";
            }
            console.log('Register URL:',API_PATHS.AUTH.REGISTER);

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullname,
                email,
                password,
                profileImageUrl, 
            });

            console.log("Signup response:", response.data);

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
                <div className="h-auto lg:w-[100%] md:h-full flex flex-col justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Create an Account</h2>
                        <p className="text-base text-slate-600">Join us today by entering your details below</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <Input value={fullname}
                                onChange={({ target }) => setFullname(target.value)}
                                label="Full Name"
                                placeholder="john"
                                type="text" />
                            <Input value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                label="Enter your email address "
                                placeholder="john@example.com"
                                type="text" />

                            <div className="col-span-2">
                                <Input value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    label="Password"
                                    placeholder="Min 6 characters"
                                    type="password" />
                            </div>
                        </div>
                        
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 animate-pulse">
                                <p className="text-red-600 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 transform shadow-lg"
                        >
                            Signup
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-500">Already have an account?</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link 
                                to='/login' 
                                className="inline-flex items-center gap-2 font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 group"
                            >
                                Login here
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </form>
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
                    <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-3xl p-7 border border-slate-700 shadow-2xl">
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
}