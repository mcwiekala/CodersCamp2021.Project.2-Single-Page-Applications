import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieBrowser from "./MovieBrowser";
import MovieDetails from "./MovieDetails";
import SeatReservation from "../../pages/seat-reservation/SeatReservation";

export default function MoviesView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieBrowser />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
