import "./App.css";
import Search from "./components/Search.js";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";


const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2I0NmYzZTljNGEyZTE5MGUyOWFjZGU2Nzk1Y2FiOSIsIm5iZiI6MTc1MzI5ODk2Mi43MDMsInN1YiI6IjY4ODEzODEyZTRhZmQwOWFlYzcyZDk5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jlh_aZQH0lEBhdDz93rHgusEKQbn0YT7JiPrUpS0iAA";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
     const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies:${error}`);
      setErrorMessage("Error fetching movies.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
 

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img
            className="w-full max-w-[1100px] h-auto object-cover m-auto border border-[2px] rounded-lg border-orange-700 sm:block hidden sm:mb-[6rem] mb-[2rem]"
            src="https://blacknerdproblems.com/wp-content/uploads/2022/01/CBMP1-1.jpg"
            alt="banner"
          />
          <h1 className="lg:text-[48px] md:text-[34px] sm:text-[28px] text-[24px]">
            Find{" "}
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#C53030] bg-clip-text text-transparent">
              Movies
            </span>{" "}
            You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="justify-center m-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;


