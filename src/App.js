import React, { useState } from 'react';
import logo from './logo.svg';
import store from './ethereum/store';
import './App.css';

function App() {
  const [storeClass, setStore] = useState(new store());
  const [privKey, setPrivKey] = useState('');
  const [addressFrom, setAddressFrom] = useState('');
  const [newValue, setNewValue] = useState('');


  const getValue = async () => {
    const value = await storeClass.getValue();
    console.log("Message received: ", value);
    setNewValue(value);
  }

  const setValue = async (e) => {
    e.preventDefault();
    const receipt = await storeClass.setValue(addressFrom, privKey)
    console.log(receipt);
  }

  return (
    <>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div> */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 70 }}>
        <p style={{ fontWeight: '600', fontSize: 20, lineHeight: 0 }}>Get value</p>
        <p style={{ lineHeight: 0 }}>Gets a value from a smart contract state</p>

        <div style={{ marginTop: 25 }}>
          <button onClick={getValue} type="submit" className="loginButton btn btn-lg col-md-6 col-md-offset-3 col-xs-12" style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, borderRadius: 12 }}>Get Value</button>
        </div>
        <p style={{ fontSize: 30, fontWeight: '600' }}>{newValue}</p>
      </div>
      <form className="row" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 70, paddingBottom: 50 }}>
        <div className="form-group" style={{ position: 'relative' }}>
          <input onChange={(e) => setAddressFrom(e.target.value)} placeholder=" " id="username" className="form-control" name="username" />
          <div className="floater"></div>
        </div>

        <div className="form-group" style={{ position: 'relative', marginTop: 30 }}>
          <input onChange={(e) => setPrivKey(e.target.value)} placeholder=" " id="password" className="form-control" name="password" />
          <div className="floater"></div>
        </div>

        <div style={{ marginTop: 40 }}>
          <button onClick={setValue} className="loginButton btn btn-lg col-md-6 col-md-offset-3 col-xs-12" style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, borderRadius: 12 }}>Set value in blockchain</button>
        </div>
      </form>
    </>
  );
}

export default App;
