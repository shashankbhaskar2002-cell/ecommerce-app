import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/axios";

function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            alert("Please fill all fields");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            alert("Phone number must contain 10 digits");
            return;
        }

        try {
            setLoading(true);

            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            };

            const { data } = await API.post(
                "/users/register",
                userData
            );

            alert(
                data.message ||
                "Registration successful. OTP has been sent to your email."
            );

            navigate("/verify-otp", {
                state: {
                    email: formData.email
                }
            });

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Register
            </h2>

            <form onSubmit={handleSubmit}>

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                {/* Password */}
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                    className="text-blue-600 text-sm mb-4"
                >
                    {showPassword
                        ? "Hide Password"
                        : "Show Password"}
                </button>

                {/* Confirm Password */}
                <input
                    type={
                        showConfirmPassword
                            ? "text"
                            : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-2"
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowConfirmPassword(
                            !showConfirmPassword
                        )
                    }
                    className="text-blue-600 text-sm mb-6"
                >
                    {showConfirmPassword
                        ? "Hide Confirm Password"
                        : "Show Confirm Password"}
                </button>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white ${
                        loading
                            ? "bg-gray-400"
                            : "bg-black hover:bg-gray-800"
                    }`}
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>

            </form>

        </div>
    );
}

export default Register;