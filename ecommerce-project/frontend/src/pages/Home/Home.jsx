import HeroBanner from "../../components/home/HeroBanner";
import Categories from "../../components/home/Categories";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import LatestProducts from "../../components/home/LatestProducts";

function Home() {

    return (

        <main className="bg-gray-100 min-h-screen">

            <HeroBanner />

            <Categories />

            <FeaturedProducts />

            <LatestProducts />

        </main>

    );

}

export default Home;