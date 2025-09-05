import { useState } from "react"
import { AuthLayout } from "../../components/layouts/AuthLayout"
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Enter a valid Email address");
            return;
        }
        if (!password) {
            setError("please enter the password");
            return;
        }
        setError("");
        // Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }

    }

    return (
        <AuthLayout>

            {/* Left: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
                <div className="max-w-md w-full">
                    <h3 className="text-2xl font-semibold text-black mb-2">Welcome Back</h3>
                    <p className="text-sm text-slate-700 mb-6">Please enter your details to login</p>

                    <form onSubmit={handleLogin} className="space-y-4">
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
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center text-slate-800 mt-4">
                            Don't have an account?{" "}
                            <Link to='/signup' className="font-medium text-purple-600 underline">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

