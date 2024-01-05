import React, { useEffect, useState } from "react";
import axios from "axios";

const Finalcheckout = () => {
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchOccupiedSlots();
  }, []);

  const fetchOccupiedSlots = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5002/getOccupiedSlots"
      );
      setOccupiedSlots(data);
    } catch (error) {
      console.error("Error fetching occupied slots:", error);
      setErrorMessage("Failed to fetch occupied slots");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5002/unoccupySlot", {
        slotNumber: selectedSlot,
        vehicleNumber: vehicleNumber,
      });

      if (response.data.message) {
        alert("Checkout successful");
        setName("");
        setVehicleNumber("");
        setSelectedSlot("");
        fetchOccupiedSlots(); // Fetch updated slots after checkout
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error("Error during checkout:", error);
        setErrorMessage("Error during checkout");
      }
    }
    const myReload = () => {
      window.location.reload();
    };
    setTimeout(myReload, 3000);
  };

  return (
    <div>
      <div className="child3">
        <h2>Checkout</h2>
        <form onSubmit={submitHandler}>
          <div className="flex_inputs">
            <div>
              <label className="label" htmlFor="name">
                Name: {""}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="vehicleNo">
                Vehicle Number:
              </label>
              <input
                type="text"
                id="vehicleNo"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div>
            <label className="label" htmlFor="slots">
              Select Slot:
            </label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="">Select a slot</option>
              {occupiedSlots.map((slot) => (
                <option key={slot.slotNumber} value={slot.slotNumber}>
                  A{slot.slotNumber}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button className="submit" type="submit">
            Checkout
          </button>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Finalcheckout;
