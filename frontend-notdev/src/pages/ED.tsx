import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const localStorageEncryption: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [storedData, setStoredData] = useState<string>('');

  const secretKey = 'your-secret-ke'; // Replace with your secret key

  const handleStoreData = () => {
    const encryptedData = CryptoJS.AES.encrypt(inputData, secretKey).toString();
    localStorage.setItem('encryptedData', encryptedData);
    setInputData('');
    alert('Data stored encrypted in local storage!');
  };

  const handleGetData = () => {
    const encryptedData = localStorage.getItem('encryptedData');
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
      setStoredData(decryptedData);
    } else {
      alert('No data found in local storage!');
    }
  };

  return (
    <div className=''>
      <h2>local Storage Encryption Example</h2>
      <label htmlFor="dataInput">Enter Data:</label>
      <input
        type="text"
        id="dataInput"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleStoreData}>Store Data</button>
      <button onClick={handleGetData}>Get Data</button>
      {storedData && <p>Stored Data: {storedData}</p>}
    </div>
  );
};

export default localStorageEncryption;
