  
import React, { useState } from "react";


function App() {
  const [inputList, setInputList] = useState([{ MedicineName: "", Duration: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { MedicineName: "", Duration: "" }]);
  };

  return (
    <div className="App">
      <h3><a href="">Prescription</a></h3>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="MedicineName"
              placeholder="Medicine Name"
              value={x.MedicineName}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="Duration"
              placeholder="Duration"
              value={x.Duration}
              onChange={e => handleInputChange(e, i)}
            />
            <select style={{ marginLeft: 20 }} name="Morning dosage" id="dosage"  onChange = { (e) => handleInputChange(e,i)}>
  <option value="select">Morning Dosage</option>
  <option value="morinng - 1">1</option>
  <option value="morinng - 2">2</option>
  <option value="morinng - 3">3</option>

</select>
<select style={{ marginLeft: 20 }} name="Evening dosage" id="dosage"  onChange = { (e) => handleInputChange(e,i,)}>
  <option value="select">Evening Dosage</option>
  <option value="Evening - 1">1</option>
  <option value="Evening - 2">2</option>
  <option value="Evening - 3">3</option>

</select>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button className="ml30" onClick={handleAddClick}>+ Medication</button>}
            </div>
          </div>
        );
      })}
      
      <button>Submit</button>
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default App;
