import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {
  const [band, setBand] = useState('');
  const {socket} = useContext(SocketContext);
  
  const addBand = (event) =>{
    event.preventDefault();
    band.trim().length > 0 
      ? socket.emit('add-banda',{name:band})
      : alert('Campo Vacio');
    setBand('');
  }
  return (
    <>
      <h3>Agregar Band</h3>
      <form onSubmit={addBand}>
        <input
          className="form-control"
          placeholder="Nombre de la banda"
          autoComplete='off'
          value={band}
          onChange={(event) => setBand(event.target.value)}
        />
      </form>
    </>
  )
}
