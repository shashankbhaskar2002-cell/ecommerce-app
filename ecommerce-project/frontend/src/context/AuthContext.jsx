import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(

        localStorage.getItem("token") || ""

    );

    const [isAuthenticated, setIsAuthenticated] = useState(

        !!localStorage.getItem("token")

    );

    // Login

    const login = (userData, jwtToken) => {

        setUser(userData);

        setToken(jwtToken);

        setIsAuthenticated(true);

        localStorage.setItem("token", jwtToken);

        localStorage.setItem(

            "user",

            JSON.stringify(userData)

        );

    };

    // Logout

    const logout = () => {

        setUser(null);

        setToken("");

        setIsAuthenticated(false);

        localStorage.removeItem("token");

        localStorage.removeItem("user");

    };

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

    }, []);

    return (

        <AuthContext.Provider

            value={{
                user,
                setUser,
                token,
                isAuthenticated,
                login,
                logout,
            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}