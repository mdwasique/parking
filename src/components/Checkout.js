import React, { useState } from "react";
import axios from "axios";
// import Finalcheckout from "./Finalcheckout";

const Checkout = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [occupiedSlot, setOccupiedSlot] = useState(null);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [occupiedMessage, setOccupiedMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const checkVehicleHandler = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/checkOccupied/${vehicleNumber}`
      );

      setOccupiedSlot(response.data.slotNumber);

      setOccupiedMessage(
        <div style={{ color: "green" }}>
          Vehicle is occupied. Slot number:{" "}
          <strong>A{response.data.slotNumber}</strong>
        </div>
      );
    } catch (error) {
      console.error("Error checking vehicle:", error);

      setOccupiedMessage(
        <div style={{ color: "red" }}>Vehicle not found or not occupied.</div>
      );
    }
  };

  const checkoutHandler = async () => {
    try {
      await axios.post("http://localhost:5002/unoccupySlot", {
        slotNumber: occupiedSlot,
      });

      setCheckoutMessage(
        <div style={{ color: "green" }}>
          Checkout successful. Slot number: <strong>{occupiedSlot}</strong>
        </div>
      );

      setVehicleNumber("");
      setOccupiedSlot(null);

      const { data: updatedSlots } = await axios.get(
        "http://localhost:5002/getSlots"
      );

      setAvailableSlots(updatedSlots);

      console.log("Checkout successful");
    } catch (error) {
      console.error("Error checking out:", error);

      setCheckoutMessage(
        <div style={{ color: "red" }}>Error checking out.</div>
      );
    }
  };

  return (
    <div>
      <div className="child2">
        <h2>Occupied slots</h2>
        <br />
        <br />
        <form className="form">
          <div>
            <label
              className="label"
              htmlFor="vehicleNo"
              style={{ marginBottom: "5px" }}
            >
              Vehicle Number: {""}
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
            <button
              type="button"
              onClick={checkVehicleHandler}
              style={{
                backgroundColor: "lightgreen",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Check Your Vehicle
            </button>

            {occupiedMessage && (
              <div style={{ marginTop: "20px" }}>{occupiedMessage}</div>
            )}

            <br />
            <br />

            {occupiedSlot && (
              <div>
                {/* <button
                  onClick={checkoutHandler}
                  style={{
                    color: "black",
                    backgroundColor: "red",
                    marginTop: "5px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    width: "200px",
                    height: "30px",
                  }}
                >
                  Checkout
                </button> */}
                {/* <Finalcheckout /> */}
              </div>
            )}
          </div>
        </form>

        {checkoutMessage && (
          <div style={{ marginTop: "20px" }}>{checkoutMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
