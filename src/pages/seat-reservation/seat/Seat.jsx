import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-cycle
import { ReservationContext } from "../SeatReservation";

// eslint-disable-next-line react/prop-types
export default function Seat({ row, col, taken }) {
  // const [coords, setCoords] = useState();
  // console.log(typeof taken);
  const { coords, setCoords } = useContext(ReservationContext);
  let chosen = false;
  if (coords && coords.row === row && coords.col === col) {
    chosen = true;
  } else {
    chosen = false;
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (taken === false) {
          setCoords({ col, row });
        }
      }}
      className="seat"
      style={{
        backgroundColor: `${taken ? "#444" : `${chosen ? "orange" : "green"}`}`,
      }}
    >
      {row}, {col}, {taken.toString()}, {chosen.toString()}
    </button>
  );
}

Seat.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  taken: PropTypes.bool,
};

Seat.defaultProps = {
  taken: false,
};
