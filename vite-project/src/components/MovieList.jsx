import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./MovieList.module.css"

const MovieList = () => {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://api.themoviedb.org/3/movie/popular?api_key=1bbd1700bf530ef3d9458ad1071f45ab";

    const fetchMovies = async () => {
        try {
          const res = await fetch(API);
          const data = await res.json();
    
          setMovies(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    if (!loading && error == null) {
    const searchData = movies.results.filter((movie) =>
        movie.original_title.toLowerCase().includes(search.toLowerCase())
    );

        return (
            <div className={styles.movieListContainer}>
  <input
    type="text"
    className={styles.searchInput}
    placeholder="Search a movie"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  {searchData.length === 0 && search && (
    <div className={styles.noResults}>
      <p>No movie found</p>
    </div>
  )}

  <div className={styles.movieContainer}>
    {(search ? searchData : movies.results).map((movie) => (
      <div key={movie.id} className={styles.movieCard}>
        <h3>{movie.original_title}</h3>
        <Link to={"/movie/" + movie.id}>
          <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.original_title} />
        </Link>
        <p>{movie.vote_average}/10</p>
      </div>
    ))}
  </div>
</div>
    )
}
    }

export default MovieList