/* App.js */

import "./App.css";
import Checkin from "./components/Checkin";
import Checkout from "./components/Checkout";
import Finalcheckout from "./components/Finalcheckout";

function App() {
  return (
    <div className="App">
      <br />
      <strong>
        <h1>Parking Slot</h1>
      </strong>
      <br />
      <div className="parent">
        <Checkin />
        <Checkout />
        <Finalcheckout />
      </div>
    </div>
  );
}

export default App;
