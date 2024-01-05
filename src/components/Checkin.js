import React, { useEffect, useState } from "react";
import axios from "axios";

const Checkin = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  // Function to fetch available slots
  const fetchSlots = async () => {
    try {
      const { data } = await axios.get("http://localhost:5002/getSlots");
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5002/occupySlot", {
        slotNumber: selectedSlot,
        vehicleNumber: vehicleNumber,
      });

      // Fetch updated slots after booking
      await fetchSlots();

      const bookingMessageContent = (
        <div
          style={{
            color: "green",
            fontWeight: "bold",
            marginTop: "5px",
            backgroundColor: "lightgreen",
          }}
        >
          {name}, your slot is Booked. Slot number:{" "}
          <strong>{selectedSlot}</strong>
        </div>
      );

      setName("");
      setSelectedSlot("");
      setVehicleNumber("");
      setBookingMessage(bookingMessageContent);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    const myReload = () => {
      window.location.reload();
    };
    setTimeout(myReload, 2000);
  };

  return (
    <div>
      <div className="child1">
        <h2>Available slots</h2>
        <br />
        <form className="form" onSubmit={submitHandler}>
          <div className="input">
            <label className="label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label" htmlFor="vehicleNo">
              Vehicle Number:
            </label>
            <input
              type="text"
              id="vehicleNo"
              placeholder="Enter your Vehicle number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            />
          </div>
          <div>
            <br />
            <h3>Select a Slot</h3>
            <div className="slotlist-button">
              <select
                name="parkingslots"
                id="parkingslots"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Select a slot</option>
                {slots.map((slot) => (
                  <option key={slot.slotNumber} value={slot.slotNumber}>
                    <h3>A</h3>
                    {slot.slotNumber}
                  </option>
                ))}
              </select>
              <button
                className="submit"
                type="submit"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  marginTop: "5px",
                  backgroundColor: "lightgreen",
                  height: "20px",
                }}
              >
                Book Slot
              </button>
            </div>
          </div>
        </form>

        {bookingMessage && (
          <div style={{ marginTop: "20px" }}>{bookingMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Checkin;
