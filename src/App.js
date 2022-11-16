import React, { useState } from "react";
import SingleTitle from "./components/SingleTitle";

function App() {
  const [textFile, setTextFile] = useState("");
  const textTitles = textFile.split(",");
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setTextFile(reader.result);
    };
  };
  console.log(textFile);
  console.log(textTitles);
  textTitles.map((t) => console.log(t));
  return (
    <React.Fragment>
      <div>
        <h1> Upload your file here</h1>
        <input type="file" onChange={handleFileUpload}></input>
      </div>

      <SingleTitle titles={textTitles} />
    </React.Fragment>
  );
}

export default App;
