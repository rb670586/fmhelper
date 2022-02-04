// Import deps
import React from 'react'

// Import components
import NamesTableRow from './TeamTableRow'

// Import styles
import './../styles/namestable.css'

// Create Names Table component
export default function TeamTable(props) {

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item">First</th>

          <th className="table-head-item">Last</th>

          <th className="table-head-item">Nat</th>

          <th className="table-head-item">Position</th>

          <th className="table-head-item">Age</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {props.data.length > 0 ? (
          props.data.map((d, idx) => (
            <NamesTableRow
              key={d[0]}
              d={d}
            // position={idx + 1}

            />
          )
          )
        ) : (
          <tr className="table-row">
            <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no names to show</td>
          </tr>
        )
        }
      </tbody>
    </table>
  )
}
