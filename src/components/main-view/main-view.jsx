import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://kendallsmovies-85beffe7056c.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Year: movie.Year,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

return (
  <Row className="justify-content-md-center">
    {!user ? (
      <Col md={5}>
        <LoginView onLoggedIn={(user) => setUser(user)} />
        or
        <SignupView />
      </Col>
    ) : selectedMovie ? (
      <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView
        style={{ border: "1px solid green" }}
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie (null)}
      />
      </Col>
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        {movies.map((movie) => (
          <Col className="mb-5" key = {movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </>
    )}
    
  </Row>
);
};
