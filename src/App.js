import "./App.css";
import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState();

  const handlenum1change = (e) => {
    setNum1(e.target.value);
  };

  const handlenum2change = (e) => {
    setNum2(e.target.value);
  };

  const Displayresult = () => {
    const resultvalue = parseFloat(num1) + parseFloat(num2);
    setResult(resultvalue);
    setNum1("");
    setNum2("");
  };

  return (
    <div className="App">
      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={handlenum1change}
      />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={handlenum2change}
      />
      <button className="btn" onClick={Displayresult}>
        Display Result
      </button>
      <input type="text" placeholder="Result" value={result} readOnly />
    </div>
  );
}

export default App;
