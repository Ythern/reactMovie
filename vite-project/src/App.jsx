import { Routes, Route, BrowserRouter, Link } from "react-router";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import WishlistProvider from "./context/WishlistProvider";
import Wishlist from "./components/Wishlist";
import styles from "./App.module.css";


const App = () => {
  return (
    <WishlistProvider>
    <BrowserRouter>
    <Link to={"/"} className={styles.link}>Home </Link>
    <Link to={"/wishlist"} className={styles.link}>Wishlist</Link>
      <Routes>
        <Route path="/" element={<MovieList />}/>
        <Route path="/movie/:id" element={<MovieDetail />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
      </Routes>
    </BrowserRouter>
    </WishlistProvider>
  )
}

export default App