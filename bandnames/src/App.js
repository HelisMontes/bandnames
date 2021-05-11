import React, { useEffect, useState } from 'react';
import io  from 'socket.io-client';
import { BandAdd } from './componets/BandAdd';
import { BandList } from './componets/BandList';

const connectSocket = () => {
  const socket = io.connect('http://localhost:8080/',{
    transports:['websocket'] 
  });
  return socket;
}

function App() {
  const [socket] = useState(connectSocket());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    });
  }, [socket]);
  
  useEffect(() => {
    socket.on('current-bands', (data) => {
      setBands(data);
    });
  }, [socket]);
  
  const votar = id => socket.emit('votar-banda',{id});
  const deleteBand = id => socket.emit('delete-banda',{id});
  
  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span> 
          }
        </p>
      </div>
      <h1>BandNames</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          BandList
          <BandList 
            data={bands}
            votar={votar}
            deleted={deleteBand}
          />
        </div>
        <div className="col-4">
          BandAdd
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
