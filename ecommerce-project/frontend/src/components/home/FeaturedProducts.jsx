import ProductCard from "../product/ProductCard";

import { useProducts } from "../../context/ProductContext";

function FeaturedProducts() {

    const {

        products,

        loading,

        error

    } = useProducts();



    if (loading) {

        return (

            <h2 className="text-center py-10 text-2xl">

                Loading Products...

            </h2>

        );

    }



    if (error) {

        return (

            <h2 className="text-center text-red-500 py-10">

                {error}

            </h2>

        );

    }



    if (products.length === 0) {

        return (

            <h2 className="text-center py-10">

                No Products Found

            </h2>

        );

    }



    return (

        <section className="max-w-7xl mx-auto px-6 py-14">

            <h2 className="text-3xl font-bold mb-8">

                Featured Products

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {

                    products.map((product) => (

                        <ProductCard

                            key={product._id}

                            product={product}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default FeaturedProducts;