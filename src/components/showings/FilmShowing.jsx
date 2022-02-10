import React, { useEffect, useState } from "react";
import "./film-showings.scss";
import PropTypes from "prop-types";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import firebase from "../../firebase-config";

const db = getFirestore(firebase);

function FilmShowing({ movieId }) {
  const [showings, setShowings] = useState([]);

  const getShowings = async () => {
    const showingsRef = collection(db, "showings");
    const myQuery = query(showingsRef, where("movieId", "==", Number(movieId)));
    const showingsSnapshot = await getDocs(myQuery);

    const firebaseShowings = [];
    showingsSnapshot.forEach((doc) => {
      firebaseShowings.push({ ...doc.data(), id: doc.id });
    });

    const filmsByDayMap = firebaseShowings.reduce((acc, value) => {
      if (!acc[value.date.toDate().toDateString()]) {
        acc[value.date.toDate().toDateString()] = [];
      }

      acc[value.date.toDate().toDateString()].push(value);

      return acc;
    }, {});

    setShowings(filmsByDayMap);
  };

  useEffect(() => {
    getShowings();
  }, []);

  return (
    <div className="film-showings">
      {Object.entries(showings).map(([showingDate, showingList]) => (
        <div>
          <div className="film-showings__date">{showingDate}</div>
          <ul>
            {showingList.map((showing) => (
              <li key={showing.id}>
                <Link to={`/film-showing-registration/${showing.id}`}>
                  {showing.date
                    .toDate()
                    .toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      ;
    </div>
  );
}

FilmShowing.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default FilmShowing;
