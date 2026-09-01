import { Link } from "react-router-dom";

import {
    FaHeart,
    FaShoppingCart,
    FaStar
} from "react-icons/fa";

function ProductCard({ product }) {

    return (

        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">

            <img

                src={

                    product.images?.[0]?.url ||

                    "https://via.placeholder.com/300x300?text=No+Image"

                }

                alt={product.name}

             className="w-full h-56 object-contain bg-white"

            />

            <div className="p-4">

                <h3 className="text-lg font-semibold">

                    {product.name}

                </h3>

                <p className="text-gray-600 mt-2">

                    ₹{product.price}

                </p>

                <div className="flex items-center gap-2 mt-2">

                    <FaStar className="text-yellow-500" />

                    <span>

                        {product.rating || 0}

                    </span>

                </div>

                <div className="flex justify-between mt-5">

                    <button

                        className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500"

                    >

                        <FaShoppingCart />

                    </button>

                    <button

                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

                    >

                        <FaHeart />

                    </button>

                    <Link

                        to={`/product/${product._id}`}

                        className="bg-black text-white px-4 py-2 rounded-lg"

                    >

                        View

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;