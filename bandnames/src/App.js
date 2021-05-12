import React, { useEffect, useState } from 'react';
import { BandAdd } from './componets/BandAdd';
import { BandList } from './componets/BandList';
import { useSocket } from './hooks/useSocket';

function App() {
  const [bands, setBands] = useState([]);
  const {socket, online} = useSocket('http://localhost:8080/');

  useEffect(() => {
    socket.on('current-bands', (data) => {
      setBands(data);
    });
  }, [socket]);

  const votar = id => socket.emit('votar-banda',{id});
  const deleteBand = id => socket.emit('delete-banda',{id});
  const changeNameBand = (id, newName) => socket.emit('change-banda',{id, newName});
  const addBand = (name) => socket.emit('add-banda',{name});
  
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
            change={changeNameBand}
          />
        </div>
        <div className="col-4">
          BandAdd
          <BandAdd 
            addBand={addBand}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
