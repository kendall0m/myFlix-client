import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
        id: 1, 
        title: "My Neighbor Totoro",
        description: "",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "",
        image: ""
    },

    { 
        id: 2, 
        title: "Ponyo",
        description: "",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "",
        image: ""
    },

    { 
        id: 3, 
        title: "Spirited Away",
        description: "",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "",
        image: ""
    }

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
        }}/>
      ))}
    </div>
  );
};