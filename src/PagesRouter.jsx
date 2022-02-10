import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieBrowser from "./components/movie-viewer/MovieBrowser";
import MovieDetails from "./components/movie-viewer/MovieDetails";
import SeatReservation from "./pages/seat-reservation/SeatReservation";

export default function PagesRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieBrowser />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/film-showing-registration/:showingId"
          element={<SeatReservation />}
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}
