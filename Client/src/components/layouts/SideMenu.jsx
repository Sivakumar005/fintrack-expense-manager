import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ activeMenu, isMobile = false, onMenuClick }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    
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

    const containerClasses = isMobile 
        ? "w-full overflow-y-auto" 
        : "w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 overflow-y-auto";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-20 h-20 bg-slate-400 rounded-full"
                    />
                ) : (
                    <div className="w-20 h-20 bg-slate-400 rounded-full"></div>
                )}
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
