import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import API from "../../api/axios";

function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Email not found. Please register again.");
            navigate("/register");
            return;
        }

        if (!otp) {
            alert("Please enter OTP");
            return;
        }

        if (!/^[0-9]{4,6}$/.test(otp)) {
            alert("Please enter a valid OTP");
            return;
        }

        try {
            setLoading(true);

            const { data } = await API.post(
                "/users/verify-otp",
                {
                    email: email,
                    otp: otp
                }
            );

            alert(
                data.message ||
                "Account verified successfully"
            );

            navigate("/login");

        } catch (error) {
            console.error(
                "OTP VERIFICATION ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "OTP Verification Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-8 rounded-xl">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Verify OTP
            </h2>

            <p className="mb-6 text-center text-gray-600">
                OTP has been sent to:
                <br />

                <b className="text-black">
                    {email || "Email not available"}
                </b>
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(
                            e.target.value.replace(
                                /\D/g,
                                ""
                            )
                        )
                    }
                    className="w-full border p-3 rounded-lg mb-6 text-center text-xl tracking-widest"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                >
                    {loading
                        ? "Verifying..."
                        : "Verify OTP"}
                </button>

            </form>

            <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full mt-4 text-blue-600 hover:underline"
            >
                Back to Register
            </button>

        </div>
    );
}

export default VerifyOTP;