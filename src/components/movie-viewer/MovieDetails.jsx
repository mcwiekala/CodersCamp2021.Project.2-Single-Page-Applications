import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";
import firebase from "../../firebase-config";
import "./style/MovieDetails.scss";

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);

  const { id } = useParams();

  const db = getFirestore(firebase);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    const firebaseMovies = [];
    querySnapshot.forEach((doc) => {
      firebaseMovies.push({ ...doc.data(), id: doc.id });
    });
    const movieData = firebaseMovies.filter((item) => item.id === id);
    setMovie(movieData[0]);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="movie-details-wrapper">
      <div className="movie-details">
        <div className="movie-details__poster">
          <img src={movie.Poster} alt="" />
        </div>
        <div className="movie-content-wrapper">
          <div className="movie-content__title">
            <h1>{movie.Title}</h1>
            <h4>
              {movie.Genre} | {movie.Rated === "R" ? "18+" : movie.Rated} |{" "}
              {movie.Runtime}
            </h4>
            <p>{movie.Plot}</p>
          </div>
          <div className="movie-facts-wrapper">
            <div className="movie-facts__column">
              <h4> Release Date: </h4>
              <h4 className="movie-facts--description">{movie.Released}</h4>
              <h4> Production:</h4>
              <h4 className="movie-facts--description">
                {movie.Country}, {movie.Year}
              </h4>
              <h4> Cast: </h4>
              <h4 className="movie-facts--description">{movie.Actors}</h4>
              <h4> Awards: </h4>
              <h4 className="movie-facts--description">{movie.Awards}</h4>
            </div>
            <div className="movie-facts__rating">
              <h4>Average rating:</h4>
              <div className="movie-facts__rating--score">
                {movie.imdbRating}
              </div>
              <h4>Votes: </h4>
              <div className="movie-facts__rating--votes">
                {movie.imdbVotes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
