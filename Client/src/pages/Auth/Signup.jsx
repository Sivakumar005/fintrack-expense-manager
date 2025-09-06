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
    <AuthLayout>
        <div className="h-auto lg:w-[100%] md:h-full  flex flex-col  justify-center px-6 py-10">
            <h2 className="text-xl font-semibold text-black">Create an Account</h2>
            <p className="text-xs text-slate-700 mt-[5px] mb-5">Join us today by entering your details below</p>

            <form onSubmit={handleSignup}>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                            placeholder=""
                            type="password" />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
                >
                    Signup
                </button>

                <p className="text-sm text-center text-slate-800 mt-4">
                    already have an account?{" "}
                    <Link to='/login' className="font-medium text-purple-600 underline">Login</Link>
                </p>
            </form>
        </div>
    </AuthLayout>
)
}