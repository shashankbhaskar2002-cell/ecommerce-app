import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import API from "../api/axios";


const WishlistContext = createContext();



export function WishlistProvider({ children }) {


    const [wishlistItems, setWishlistItems] = useState([]);


    const [loading, setLoading] = useState(false);




    const getWishlist = async () => {


        try {


            const { data } = await API.get("/wishlist");


            setWishlistItems(

                data.wishlist?.products || []

            );


        }

        catch (error) {


            console.log(error);

            setWishlistItems([]);


        }


    };





    const wishlistCount = wishlistItems.length;




    useEffect(() => {


        getWishlist();


    }, []);





    return (


        <WishlistContext.Provider


            value={{


                wishlistItems,

                setWishlistItems,

                getWishlist,

                wishlistCount,

                loading,

                setLoading


            }}


        >


            {children}


        </WishlistContext.Provider>


    );


}





export function useWishlist() {


    return useContext(WishlistContext);


}