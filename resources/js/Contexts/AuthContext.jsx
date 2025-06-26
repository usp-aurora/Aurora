import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children, loggedUser }) => {
    const [user] = useState(loggedUser);
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };