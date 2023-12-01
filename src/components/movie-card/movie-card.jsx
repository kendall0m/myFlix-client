//Here you import the PropTypes library
import PropTypes from "prop-types";
//the movieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };

//Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string,        
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};