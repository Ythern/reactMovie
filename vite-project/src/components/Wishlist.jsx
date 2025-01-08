import { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className={styles.wishlistContainer}>
            <h2>Wishlist</h2>
            {wishlist.map((movie) => (
                <div key={movie.id} className={styles.wishlistItem}>
                    <p>{movie.name}</p>
                    <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                    <button onClick={() => removeFromWishlist(movie.id)}>Retirer</button>
                </div>
            ))}
        </div>
    );
  };

  export default Wishlist;