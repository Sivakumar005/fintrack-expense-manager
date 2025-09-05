import { createContext, useState } from "react";

export const userContext = createContext();

const userProvider = ({ childern }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    }

    const clearUser = () => {
        setUser(null);
    }
    return (
        <userContext.Provider
            value={{ user, updateUser, clearUser }}>
                {childern}
        </userContext.Provider>
    )
}

export default userProvider;