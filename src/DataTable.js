import React from 'react'

const DataTable = ({ data }) => {
  if (!data.length) return <p>No data available</p>

  const headers = Object.keys(data[0])

  return (
    <table border='1' style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
