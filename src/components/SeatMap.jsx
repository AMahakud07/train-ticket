import React, { useState, useEffect } from 'react';
import './SeatMap.css'; 

const Seat = ({ seatNumber, selected }) => (
  <div className={`seat ${selected ? 'selected' : ''}`}>{seatNumber}</div>
);

const SeatMap = () => {
  const totalSeats = 80;
  const seatNumbers = Array.from({ length: totalSeats }, (_, index) => index + 1);

  const [bookingCount, setBookingCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    setSelectedSeats(storedSeats);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const handleBookingCountChange = (e) => {
    const count = parseInt(e.target.value);
    setBookingCount(count);
  };

  const handleBookSeats = () => {
    if (bookingCount > 7) {
      setModalOpen(true);
    } else {
      const remainingSeats = seatNumbers.filter(
        (seatNumber) => !selectedSeats.includes(seatNumber)
      );
      const seatsToBook = remainingSeats.slice(0, bookingCount);
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, ...seatsToBook]);
    }
  };

  return (
    <div>
      <div className="booking-form">
        <label htmlFor="bookingCount">Number of Seats:</label>
        <input
          type="number"
          id="bookingCount"
          value={bookingCount}
          onChange={handleBookingCountChange}
        />
        <button onClick={handleBookSeats}>Book Seats</button>
      </div>
      <div className="seat-map">
      <div className="row">
        {seatNumbers.map((seatNumber) => (
          <Seat
            key={seatNumber}
            seatNumber={seatNumber}
            selected={selectedSeats.includes(seatNumber)}
          />
        ))}
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cannot book seats</h3>
            <p>You cannot book more than 7 seats.</p>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;


