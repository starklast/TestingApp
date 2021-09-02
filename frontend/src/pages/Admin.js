import React, { useState } from 'react';
import { testService } from '../api/server';
import ViewTest from '../components/ViewTest/';

function Admin() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileData, setFileData] = useState({});

  const readFileData = (file) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data && data.description) {
          setFileData(data);
          setSelectedFile(file);
          setIsSelected(true);
        }
      } catch (error) {
        console.log(error);
        return {};
      }
    };
    reader.readAsText(file);
  };

  const changeHandler = (event) => {
    setIsSelected(false);

    if (
      event.target.files.length === 1 &&
      event.target.files[0].type === 'application/json'
    ) {
      const file = event.target.files[0];
      readFileData(file);
    }
  };

  const handleSubmission = () => {
    try {
      (async () => {
        const res = await testService.addTestFromJSON(fileData);
        console.log(res);
      })();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type='file' name='file' accept='.json' onChange={changeHandler} />

      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>

          <p>Filetype: {selectedFile.type}</p>

          <p>Size in bytes: {selectedFile.size}</p>

          <p>
            {`lastModifiedDate: ${selectedFile.lastModifiedDate.toLocaleDateString()}`}
          </p>

          <ViewTest testData={fileData} />
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}

      <div>
        <button onClick={handleSubmission} disabled={!isSelected}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Admin;
