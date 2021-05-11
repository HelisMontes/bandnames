import React from 'react'

export const BandList = ({band}) => {
  const createRow = (band) => {
    return(
      <tr>
        <td>
          <button className="btn btn-primary">+1</button>
        </td>
        <td>
          <input className="form-control"
            value={band.name}
          />
        </td>
        <td>
          <h3>15</h3>
        </td>
        <td>
          <button className="btn btn-danger">Borrar</button>
        </td>
      </tr>
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
              {createRow(band)}
          </tbody>
       </table>
    </>
  )
}
