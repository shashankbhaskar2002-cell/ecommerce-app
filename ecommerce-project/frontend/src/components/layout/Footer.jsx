import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaGithub
} from "react-icons/fa";

function Footer() {

    return (

        <footer className="bg-gray-900 text-white mt-auto">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Company */}

                    <div>

                        <h2 className="text-xl font-bold mb-4">

                            Amazon Clone

                        </h2>

                        <p className="text-gray-300">

                            A full-stack MERN E-Commerce application
                            built for learning real-world development.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-lg font-semibold mb-4">

                            Quick Links

                        </h3>

                        <ul className="space-y-2 text-gray-300">

                            <li>Home</li>

                            <li>Products</li>

                            <li>Wishlist</li>

                            <li>Cart</li>

                            <li>My Orders</li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-lg font-semibold mb-4">

                            Contact

                        </h3>

                        <p className="text-gray-300">

                            support@amazonclone.com

                        </p>

                        <p className="text-gray-300">

                            +91 9876543210

                        </p>

                        <div className="flex gap-5 mt-5 text-2xl">

                            <FaFacebook />

                            <FaInstagram />

                            <FaLinkedin />

                            <FaGithub />

                        </div>

                    </div>

                </div>

                <hr className="my-8 border-gray-700" />

                <div className="text-center text-gray-400">

                    © 2026 Amazon Clone. All Rights Reserved.

                </div>

            </div>

        </footer>

    );

}

export default Footer;