import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const {
        login,
        isAuthenticated
    } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please fill all fields");
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            alert("Please enter a valid email");
            return;
        }

        try {
            setLoading(true);

            const { data } = await API.post(
                "/users/login",
                {
                    email: formData.email,
                    password: formData.password
                }
            );

            console.log("LOGIN RESPONSE:", data);

            if (!data.token) {
                alert(
                    "Login successful but token was not received."
                );
                return;
            }

            login(
                data.user,
                data.token
            );

            if (rememberMe) {
                localStorage.setItem(
                    "rememberEmail",
                    formData.email
                );
            } else {
                localStorage.removeItem(
                    "rememberEmail"
                );
            }

            alert("Login Successful");

            navigate("/");

        } catch (error) {
            console.error(
                "LOGIN ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Login
            </h2>

            <form onSubmit={handleSubmit}>

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Password */}
                <div className="relative">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg mb-4"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="absolute right-3 top-3 text-sm"
                    >
                        {showPassword
                            ? "Hide"
                            : "Show"}
                    </button>

                </div>

                {/* Remember Me */}
                <div className="flex items-center mb-6">

                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) =>
                            setRememberMe(
                                e.target.checked
                            )
                        }
                        className="mr-2"
                    />

                    <span>
                        Remember Me
                    </span>

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>

            {/* Register */}
            <div className="text-center mt-6">

                <span className="text-gray-600">
                    Don't have an account?
                </span>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/register")
                    }
                    className="ml-2 font-semibold text-blue-600 hover:underline"
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Login;