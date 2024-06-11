import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

const FileUpload = ({ setData }) => {
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet)
          setData(jsonData)
          setError('')
          setFileName(file.name)
        } catch (err) {
          setError('Failed to read file. Please make sure it is a valid Excel file.')
          setData([])
          setFileName('')
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      setError('Please upload a valid Excel file.')
      setData([])
      setFileName('')
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFile} accept='.xlsx' />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fileName && <p className='upload_file_button'>Uploaded file: {fileName}</p>}
    </div>
  )
}

export default FileUpload
