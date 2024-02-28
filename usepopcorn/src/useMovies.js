import { useEffect, useState } from "react";

const KEY = "477d5e75";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.(); // run if exist
      const controller = new AbortController(); // browser api

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            // handle offline case
            throw new Error("Something went wrong during fetching of movies");

          const data = await res.json();
          if (data.Response === "False") {
            // handle condition for null data
            throw new Error("movie not found");
          }
          setMovies(data.Search);
          // console.log(data.Search);
        } catch (err) {
          console.log(err);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //   handleCloseMovie();

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
