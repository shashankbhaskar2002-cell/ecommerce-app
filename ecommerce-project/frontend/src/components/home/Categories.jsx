import { Link } from "react-router-dom";

const categories = [

    {
        id: 1,
        name: "Mobiles",
        icon: "📱"
    },

    {
        id: 2,
        name: "Electronics",
        icon: "💻"
    },

    {
        id: 3,
        name: "Fashion",
        icon: "👕"
    },

    {
        id: 4,
        name: "Home",
        icon: "🏠"
    },

    {
        id: 5,
        name: "Books",
        icon: "📚"
    },

    {
        id: 6,
        name: "Grocery",
        icon: "🛒"
    }

];

function Categories() {

    return (

        <section className="max-w-7xl mx-auto px-6 py-14">

            <h2 className="text-3xl font-bold mb-8">

                Shop By Categories

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

                {

                    categories.map((category) => (

                        <Link

                            key={category.id}

                            to="/products"

                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center"

                        >

                            <div className="text-5xl">

                                {category.icon}

                            </div>

                            <h3 className="mt-4 font-semibold">

                                {category.name}

                            </h3>

                        </Link>

                    ))

                }

            </div>

        </section>

    );

}

export default Categories;