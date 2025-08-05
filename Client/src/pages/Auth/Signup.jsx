import { AuthLayout } from "../../components/layouts/AuthLayout"
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useState } from "react";
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector";

export const Signup = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        let ProfileImageUrl="";

        if(!fullname){
            setError("Please enter your name");
            return;
        }

        if(!validateEmail(email)){
            setError("Enter a valid Email address");
            return;
        }

        if(!password){
            setError("please enter the password");
            return;
        }
        
        setError("");
    }
    return (
        <AuthLayout>
            <div className="h-auto lg:w-[100%] md:h-full  flex flex-col  justify-center px-6 py-10">
                <h2 className="text-xl font-semibold text-black">Create an Account</h2>
                <p className="text-xs text-slate-700 mt-[5px] mb-5">Join us today by entering your details below</p>

                <form onSubmit={handleSignup}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
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