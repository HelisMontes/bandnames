import React, { useEffect, useState } from 'react'

export const BandList = ({data, votar, deleted, change}) => {
  const [bands, setBands] = useState(data);
  
  useEffect(() => {
    setBands(data)
  }, [data])
  
  const changeNameBand = (event, id) => {
    const newName = event.target.value
    setBands(bands => bands.map( band => {
      band.id === id && (band.name= newName);
      return band
    }));
  }
  const outFocus = (id, name) => {
    change(id, name)
  }
  const createRow = () => {
    return(
      bands.map( band => (
        <tr key={band.id}>
          <td>
            <button 
              className="btn btn-primary"
              onClick={() => votar(band.id)}
            >+1</button>
          </td>
          <td>
            <input className="form-control"
              value={band.name}
              onChange={(event)=>changeNameBand(event, band.id)}
              onBlur={() => {outFocus(band.id, band.name)}}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button 
              className="btn btn-danger"
              onClick={() => deleted(band.id)}
              >Borrar</button>
          </td>
        </tr>
      ))
    )
  }
  return (
    <>
       <table className="table table-stripped">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Votos</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
              {createRow()}
          </tbody>
       </table>
    </>
  )
}
