import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

export const Input = ({ value, placeholder, onChange, type, label }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="flex flex-col gap-[4px] w-full">
            {label && <label className='text-[13px] text-slate-800'>{label}</label>}
            <div className="relative w-full">
                <input
                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    className='w-full pr-10 pl-2 bg-purple-50 border border-gray-300 rounded-md outline-none h-10 text-sm'
                    onChange={onChange}
                />
                {type === 'password' && (
                    <div
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-primary"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                    </div>
                )}
            </div>
        </div>
    );
}
