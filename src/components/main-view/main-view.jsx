import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
      headers: { Authorization: `Bearer ${token}`,}
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

console.log("Movie list: " + movies);
  
  
return (
  <BrowserRouter>
  <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
            />
  <Row className="justify-content-md-center">
    <Routes>
      <Route
        path="/signup"
        element={
          <>
          {user ? (
            <Navigate to ="/" />
          ) : (
            <Col md={5}>
              <SignupView />
            </Col>
          )}
        </>
        }
      />
      <Route
        path="/login"
        element={
          <>
          {user ? (
            <Navigate to="/" />
          ) : (
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
            </Col>
          )}
        </>

        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : movies.length === 0 ? (
            <Col>The list is empty!</Col>
          ) : (
            <Col md={8}>
              <MovieView 
              movies={movies}
              />
            </Col>
          )}
        </>
      }
    />
    <Route
      path="/"
        element={
          <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!!</Col>
            ) : (
              <>
                {movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard 
                    movie={movie}           
                    />
                  </Col>
                 ))}
               </>
            )}
          </>
        }
      />
  <Route
    path="/profile"
      element={
        <>
          {!user ? (
            <Navigate to="/login" replace />
          ) : (
            <Col>
              <ProfileView 
                user={user}
                movies={movies}
                setUser={setUser}
              />
            </Col>
          )}
        </>
      }
    />
  </Routes>
  <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
</Row>
</BrowserRouter>
);
};