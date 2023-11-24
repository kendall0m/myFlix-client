import {useState} from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
        id: 1, 
        title: "My Neighbor Totoro",
        description: "This acclaimed animated tale by director Hayao Miyazaki follows schoolgirl Satsuke and her younger sister, Mei.",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "1990",
        image: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    },

    { 
        id: 2, 
        title: "Ponyo",
        description: "A goldfish princess encountera a human boy.",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "2009",
        image: "https://m.media-amazon.com/images/M/MV5BOTc3YmM3N2QtODZkMC00ZDE5LThjMTQtYTljN2Y1YTYwYWJkXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_FMjpg_UX1000_.jpg"
    },

    { 
        id: 3, 
        title: "Spirited Away",
        description: "10-year-old Chihiro is whisked away on a fantastical adventure.",
        director: "Hayao Miyazaki",
        genre: "Fantasy",
        year: "2002",
        image: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    }

  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>;
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