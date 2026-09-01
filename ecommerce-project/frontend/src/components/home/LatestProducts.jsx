import ProductCard from "../product/ProductCard";

const latestProducts = [

    {
        id: 5,
        name: "Dell XPS Laptop",
        price: 125999,
        rating: 4.8,
        image: "https://picsum.photos/300/300?5"
    },

    {
        id: 6,
        name: "Apple Watch Ultra",
        price: 79999,
        rating: 4.9,
        image: "https://picsum.photos/300/300?6"
    },

    {
        id: 7,
        name: "Sony PlayStation 5",
        price: 54999,
        rating: 4.9,
        image: "https://picsum.photos/300/300?7"
    },

    {
        id: 8,
        name: "Canon EOS Camera",
        price: 68999,
        rating: 4.7,
        image: "https://picsum.photos/300/300?8"
    }

];

function LatestProducts() {

    return (

        <section className="max-w-7xl mx-auto px-6 py-14">

            <h2 className="text-3xl font-bold mb-8">

                Latest Products

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {

                    latestProducts.map((product) => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default LatestProducts;