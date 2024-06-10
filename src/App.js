import React, { useState } from 'react'
import FileUpload from './FileUpload'
import SearchFilter from './SearchFilter'
import DataTable from './DataTable'
import * as XLSX from 'xlsx'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const App = () => {
  const [data, setData] = useState([])
  const [includeKeywords, setIncludeKeywords] = useState('')
  const [excludeKeywords, setExcludeKeywords] = useState('')
  const [minWords, setMinWords] = useState('')
  const [maxWords, setMaxWords] = useState('')
  const [intentFilter, setIntentFilter] = useState('')
  const [colorFilter, setColorFilter] = useState('')
  const [copied, setCopied] = useState(false)

  const handleIncludeKeywordsChange = (keywordsStr) => {
    setIncludeKeywords(keywordsStr)
  }

  const handleExcludeKeywordsChange = (keywordsStr) => {
    setExcludeKeywords(keywordsStr)
  }

  const handleIntentFilterChange = (intent) => {
    setIntentFilter(intent)
  }

  const handleColorFilterChange = (color) => {
    setColorFilter(color)
  }

  const includeKeywordArray = includeKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)
  const excludeKeywordArray = excludeKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)

  const getColorForIntent = (intent) => {
    switch (intent) {
      case 'i':
        return 'blue' // information
      case 're':
        return 'red' // review
      case 'pr':
        return 'pink' // price
      case 'sp':
        return 'yellow' // product
      case 'l':
        return 'gray' // local
      case 'dv':
        return 'orange' // services
      default:
        return 'white' // topic
    }
  }

  const filteredData = data.filter((row) => {
    const matchesIncludeKeywords =
      includeKeywordArray.length === 0 ||
      includeKeywordArray.some((keyword) => Object.values(row).some((val) => String(val).toLowerCase().includes(keyword.toLowerCase())))

    const matchesExcludeKeywords = excludeKeywordArray.some((keyword) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(keyword.toLowerCase()))
    )

    const matchesIntentFilter = intentFilter === '' || (row.Intent && row.Intent.toLowerCase().includes(intentFilter.toLowerCase()))
    const matchesColorFilter = colorFilter === '' || getColorForIntent(row.Intent) === colorFilter

    if (!matchesIncludeKeywords || matchesExcludeKeywords || !matchesIntentFilter || !matchesColorFilter) {
      return false
    }

    const totalWordCount = Object.values(row).reduce((count, val) => {
      return count + String(val).trim().split(/\s+/).length
    }, 0)

    const matchesWordCount =
      (minWords === '' || totalWordCount >= parseInt(minWords, 10)) && (maxWords === '' || totalWordCount <= parseInt(maxWords, 10))

    return matchesWordCount
  })

  const groupedData =
    includeKeywordArray.length > 0
      ? includeKeywordArray.reduce((acc, keyword) => {
          const keyData = filteredData.filter((row) => Object.values(row).some((val) => String(val).toLowerCase().includes(keyword.toLowerCase())))
          if (keyData.length > 0) {
            acc[keyword] = keyData
          }
          return acc
        }, {})
      : { 'Filtered Data': filteredData }

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AllData')
    Object.keys(groupedData).forEach((group) => {
      const groupSheet = XLSX.utils.json_to_sheet(groupedData[group])
      XLSX.utils.book_append_sheet(workbook, groupSheet, group)
    })
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    const fileName = `filtered_data_${formattedDate}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  const copyData = () => {
    const headers = Object.keys(filteredData[0] || {}).join('\t')
    const rows = filteredData.map((row) => Object.values(row).join('\t')).join('\n')
    return `${headers}\n${rows}`
  }

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <h1>Excel Filter App</h1>
      <FileUpload setData={setData} />
      {data.length > 0 && (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <h2>All Data</h2>
              <DataTable data={data} getColorForIntent={getColorForIntent} />
            </div>
            <div style={{ flex: '3' }}>
              <SearchFilter
                includeKeywords={includeKeywords}
                handleIncludeKeywordsChange={handleIncludeKeywordsChange}
                excludeKeywords={excludeKeywords}
                handleExcludeKeywordsChange={handleExcludeKeywordsChange}
                minWords={minWords}
                setMinWords={setMinWords}
                maxWords={maxWords}
                setMaxWords={setMaxWords}
                intentFilter={intentFilter}
                handleIntentFilterChange={handleIntentFilterChange}
                colorFilter={colorFilter}
                handleColorFilterChange={handleColorFilterChange}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {Object.keys(groupedData).map((group, index) => (
                  <div key={group} style={{ flex: '1 1 20%', margin: '10px' }}>
                    <h2>{group}</h2>
                    <DataTable data={groupedData[group]} getColorForIntent={getColorForIntent} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={downloadExcel} style={{ marginTop: '20px' }}>
            Download All Data
          </button>
          <CopyToClipboard text={copyData()} onCopy={() => setCopied(true)}>
            <button style={{ marginTop: '20px' }}>Copy to Clipboard</button>
          </CopyToClipboard>
          {copied && <p>Data copied to clipboard!</p>}
        </>
      )}
    </div>
  )
}

export default App
