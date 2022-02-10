const reservations = [
    {
        userId: 1,
        seat: { row: 3, column: 9},
        pickupCode: 100,
        status: "ACTIVE"
    }, 
    {
        userId: 129,
        seat: { row: 8, column: 10},
        pickupCode: 101,
        status: "ACTIVE"
    },
    {
        userId: 82,
        seat: { row: 1, column: 2},
        pickupCode: 102,
        status: "ACTIVE"
    }
]

const showings = [
  {
    date: "date",
    movieId: 0,
    reservationId: [100, 101, 102, 103, 104]
  },
  {
    date: "date",
    movieId: 0,
    reservationId: [200, 201, 202, 203, 204]
  },
]

export { showings, reservations }
