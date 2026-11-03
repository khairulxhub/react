import { useState } from "react";
import "./Button.css";

function Count() {
  const [num, setNum] = useState(55);

  const handleIncrement = () => {
    setNum(num + 10);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Count: {num}</h2>
      <button className="button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
  
}

export default Count;