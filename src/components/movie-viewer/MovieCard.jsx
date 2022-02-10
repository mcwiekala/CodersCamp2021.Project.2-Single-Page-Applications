import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style/Movie.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FilmShowing from "../showings/FilmShowing";

export default function Movie({
  id,
  title,
  genre,
  plot,
  poster,
  rated,
  runtime,
  rating,
  votes,
}) {
  const [logged, setLogged] = useState();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setLogged(user);
  });

  return (
    <div className="movie-wrapper">
      <div className="movie__poster">
        <Link to={`/movie/${id}`}>
          <img src={poster} alt="" />
        </Link>
      </div>
      <div className="movie-details">
        <h1>{title}</h1>
        <h4>
          {genre} | {rated === "R" ? "18+" : rated} | {runtime}
        </h4>
        <p>{plot}</p>

        {logged && <FilmShowing movieId={id} />}
      </div>
      <div className="movie-report">
        <div className="movie-report__rating">{rating}</div>
        <h4>Average rating</h4>
        <div className="movie-report__votes">{votes}</div>
        <h4>Votes</h4>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  genre: PropTypes.string,
  plot: PropTypes.string,
  poster: PropTypes.string,
  rated: PropTypes.string,
  runtime: PropTypes.string,
  rating: PropTypes.string,
  votes: PropTypes.string,
};

Movie.defaultProps = {
  title: "Movie title",
  genre: "Genre",
  plot: "Movie plot",
  poster: "",
  rated: "Movie Rating",
  runtime: "Movie runtime",
  rating: "Movie score",
  votes: "Votes count",
};
