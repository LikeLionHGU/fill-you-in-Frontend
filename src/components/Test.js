import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="optionsInput">Type or choose an option:</label>
      <input
        type="text"
        id="optionsInput"
        value={inputValue}
        onChange={handleInputChange}
      />
      <select
        id="optionsSelect"
        value={selectedOption}
        onChange={handleSelectChange}
        size={5}
      >
        {options
          .filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default App;
