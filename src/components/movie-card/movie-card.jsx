//Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import React from "react";
import "./movie-card.scss";
import { Link } from "react-router-dom";


//the movieCard function component
export const MovieCard = ({ movie, user, token }) => {


//Add favorite movie
  const addFave = (id) => {

    fetch(`https://kendallsmovies-85beffe7056c.herokuapp.com/users/${user.Username}/movies/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Could not add favorite.");
        }
    }).then((user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            //setIsFavorite(true);
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
};

// Remove Favorite Movie
const removeFave = (id) => {

    fetch(`https://kendallsmovies-85beffe7056c.herokuapp.com/users/${user.Username}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Failed to remove from favorites.")
        }
    }).then((user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            //setIsFavorite(false);
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
};

    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Directed by {movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Open</Button>
          </Link>
        <Button variant="secondary" onClick= {addFave(movie.id)}> Add to fave</Button>
        <Button variant="secondary" onClick= {removeFave(movie.id)}> Remove from fave</Button>
      </Card.Body>
    </Card>
  );
};
        
    
//Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string,        
  }).isRequired
};