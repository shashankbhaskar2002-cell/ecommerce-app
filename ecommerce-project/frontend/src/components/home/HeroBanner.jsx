import { Link } from "react-router-dom";

function HeroBanner() {

    return (

        <section className="bg-gradient-to-r from-yellow-300 to-orange-400">

            <div className="max-w-7xl mx-auto px-6 py-24">

                <div className="max-w-2xl">

                    <h1 className="text-5xl font-bold text-gray-900">

                        Big Sale

                        <br />

                        Up To 70% OFF

                    </h1>

                    <p className="mt-6 text-lg text-gray-800">

                        Discover thousands of products at amazing prices.

                        Shop today and enjoy fast delivery.

                    </p>

                    <Link

                        to="/products"

                        className="inline-block mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"

                    >

                        Shop Now

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default HeroBanner;