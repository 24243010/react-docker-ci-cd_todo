import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Simple Counter</h2>
      <div className="counter">
        <button className="round" onClick={() => setCount(count - 1)} aria-label="Decrease">-</button>
        <span className="count">{count}</span>
        <button className="round" onClick={() => setCount(count + 1)} aria-label="Increase">+</button>
      </div>
    </div>
  );
}
