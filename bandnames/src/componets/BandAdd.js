import React, { useState } from 'react'

export const BandAdd = ({addBand:newBand}) => {
  const [band, setBand] = useState('')
  const addBand = (event) =>{
    event.preventDefault();
    band.trim().length > 0 ? newBand(band) : alert('Campo Vacio');
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
