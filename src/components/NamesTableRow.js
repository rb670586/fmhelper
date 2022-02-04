// Import deps
import React from 'react'

export default function NamesTableRow(props) {
    return (
        <tr className="table-row">
            <td className="table-item">
                {props.position}
            </td>

            <td className="table-item">
                {props.d[0]}
            </td>

            <td className="table-item">
                {props.d[1]}
            </td>

            <td className="table-item">
                {props.d[2]}
            </td>

            <td className="table-item">
                {props.d[3]}
            </td>

            <td className="table-item">
                <button
                    className="btn btn-remove"
                >
                    Remove book
                </button>
            </td>
        </tr>
    )
}