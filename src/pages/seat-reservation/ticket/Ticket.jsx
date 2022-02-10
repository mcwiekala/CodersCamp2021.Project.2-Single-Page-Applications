import React from "react";

// eslint-disable-next-line react/prop-types
function Ticket({ col, row, ticketPrice }) {
  return (
    <div className="ticket">
      <p>
        Miejsce: {row}, {col}
      </p>
      <button type="button" className="normal">
        Ulgowy {ticketPrice[0]}
      </button>
      <button type="button" className="discount">
        Normalny {ticketPrice[1]}
      </button>
    </div>
  );
}

export default Ticket;
