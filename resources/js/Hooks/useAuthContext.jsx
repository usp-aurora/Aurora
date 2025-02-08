import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children })  {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading ] = useState(true); // Track loading state

    useEffect(() => {
        axios
          .get("/api/user")
          .then((response) => {
            setAuthUser(response.data && Object.keys(response.data).length > 0 ? response.data : null);
          })
          .catch((error) => console.error("Failed to load auth user:", error))
          .finally(() => setIsAuthLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() { return useContext(AuthContext) }

export {useAuth, AuthProvider}