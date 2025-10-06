import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar at the top */}
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="max-[1080px]:hidden h-full overflow-y-auto">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    {/* Main content area */}
                    <div className="grow mx-5 overflow-y-auto">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
