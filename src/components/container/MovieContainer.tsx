import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import MovieHero from "./MovieHero";
import MovieList from "./MovieList";
import { fetchMovies } from "../../store/slices/movie/movieSlice";
import MoviesListLoader from "../feedback/MoviesListLoader";
import Error from "../feedback/Error";

type MovieContainerProps = {
  isHome: boolean;
};

const MovieContainer: React.FC<MovieContainerProps> = ({ isHome }) => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.items);
  const status = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
    if (status === "loading") {
      // fetch the movies from redux
      dispatch(fetchMovies(10));
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <MoviesListLoader isHome={isHome} />;
  }

  if (status === "failed") {
    return <Error />;
  }

  return (
    <main className="w-full flex flex-col gap-20 overflow-hidden">
      {
        // Only render the Hero when on landing page
        isHome && movies.length > 0 && <MovieHero movies={movies} />
      }
      {movies.length > 0 && <MovieList movies={movies} isHome={isHome} />}
    </main>
  );
};

export default MovieContainer;
