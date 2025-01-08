import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

    const addToWishlist = (movie) => {
        if (!wishlist.find((item) => item.id === movie.id)) {
            setWishlist([...wishlist, movie]);
        }
    }

    const removeFromWishlist = (movieId) => {
        const newWishlist = wishlist.filter((item) => item.id !== movieId);
        setWishlist(newWishlist);
    }

    useEffect(() => {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist'));
        console.log(localWishlist);
        if (localWishlist) {
            setWishlist(localWishlist);
        } 
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist])


    return (
        <WishlistContext.Provider value ={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
  };

  export default WishlistProvider;