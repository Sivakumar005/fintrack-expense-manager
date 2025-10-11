import React, { useContext, useRef, useState } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import { FiCamera } from 'react-icons/fi';

const SideMenu = ({ activeMenu, isMobile = false, onMenuClick }) => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    
    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
        if (isMobile && onMenuClick) {
            onMenuClick();
        }
    }
    
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
        if (isMobile && onMenuClick) {
            onMenuClick();
        }
    };

    const handleImageClick = () => {
        setShowMenu(!showMenu);
    };

    const handleChangeImage = () => {
        fileInputRef.current?.click();
        setShowMenu(false);
    };

    const handleRemoveImage = async () => {
        setShowMenu(false);
        
        // Update user context to remove image
        const updatedUser = {
            ...user,
            profileImageUrl: null
        };
        
        updateUser(updatedUser);
        
        // Also update in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('Profile image removed successfully!');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only .jpeg, .jpg, and .png formats are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);

        try {
            const token = localStorage.getItem('token'); // Adjust based on your token storage
            
            // Note: Don't set Content-Type header - browser will set it automatically with boundary
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch('http://localhost:5000/api/auth/upload-image', {
                method: 'POST',
                headers: headers,
                body: formData
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error('Upload failed:', data);
                throw new Error(data.message || 'Upload failed');
            }

            console.log('Upload successful:', data);
            console.log('Image URL:', data.imageUrl);
            
            // Update user context with new image URL
            const updatedUser = {
                ...user,
                profileImageUrl: data.imageUrl
            };
            
            updateUser(updatedUser);

            // Also store in localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));

            alert('Profile image updated successfully!');

        } catch (error) {
            console.error('Image upload error:', error);
            alert(`Failed to upload image: ${error.message}`);
        } finally {
            setUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const containerClasses = isMobile 
        ? "w-full overflow-y-auto" 
        : "w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 overflow-y-auto";

    return (
        <div className={containerClasses} onClick={() => showMenu && setShowMenu(false)}>
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                <div className="relative group" onClick={(e) => e.stopPropagation()}>
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                                console.error('Image failed to load:', user.profileImageUrl);
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    
                    {/* Fallback div */}
                    <div 
                        className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                        style={{ display: user?.profileImageUrl ? 'none' : 'flex' }}
                    >
                        {user?.fullname ? user.fullname.charAt(0).toUpperCase() : '?'}
                    </div>
                    
                    {/* Upload Button with Camera Icon */}
                    <button
                        onClick={handleImageClick}
                        disabled={uploading}
                        className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                        title="Upload profile picture"
                    >
                        {uploading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <FiCamera className="w-4 h-4" />
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && !uploading && (
                        <div className="absolute top-24 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 min-w-[180px]">
                            <button
                                onClick={handleChangeImage}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2"
                            >
                                <FiCamera className="w-4 h-4" />
                                Change Profile Image
                            </button>
                            {user?.profileImageUrl && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove Profile Image
                                </button>
                            )}
                        </div>
                    )}
                    
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
                
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullname || ""}
                </h5>
            </div>
            
            {SIDE_MENU_DATA.map((item, index) => {
                const isActive = activeMenu === item.label;
                return (
                    <button
                        key={`menu-${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] font-medium ${
                            isActive
                                ? "text-white bg-purple-500"
                                : "text-gray-700 hover:bg-gray-100"
                        } py-3 px-6 rounded-lg mb-3 transition-colors duration-200`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SideMenu;