import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { WishlistContext } from "../context/WishlistProvider";
import styles from "./MovieDetail.module.css";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState(null);
    const [loadingMovie, setLoadingMovie] = useState(true);
    const [loadingActors, setLoadingActors] = useState(true);
    const [error, setError] = useState(null);
    const { addToWishlist } = useContext(WishlistContext);
    const APIMovie = "https://api.themoviedb.org/3/movie/" + id + "?api_key=1bbd1700bf530ef3d9458ad1071f45ab";
    const APIActors = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=1bbd1700bf530ef3d9458ad1071f45ab";

    const fetchMovie = async () => {
        try {
          const res = await fetch(APIMovie);
          const data = await res.json();
    
          setMovie(data);
          setLoadingMovie(false);
        } catch (error) {
          setLoadingMovie(false);
          setError(error);
        }
    };

    const fetchActors = async () => {
        try {
          const res = await fetch(APIActors);
          const data = await res.json();
    
          setActors(data);
          setLoadingActors(false);
        } catch (error) {
          setLoadingActors(false);
          setError(error);
        }
    };

    useEffect(() => {
        fetchMovie();
        fetchActors();
    }, []);

    if (error != null) {
        console.log(error);
    }

    if (!loadingMovie && !loadingActors && error == null) {
        return (
            <div className={styles.movieDetailContainer}>
                <h3>{movie.original_title}</h3>
                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                <p>{movie.vote_average}/10</p>
                <button onClick={() => addToWishlist(movie)}>Wishlist</button>
                <h4>Description:</h4>
                <p>{movie.overview}</p>
                <p>Release date: {movie.release_date}</p>
                <h4>Actors:</h4>
                <ul>
                {actors.cast.slice(0, 10).map((actor) => 
                    <li>{actor.original_name}</li>
                )}
                </ul>
            </div>
        )
    }
  }

  export default MovieDetail;