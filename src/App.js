import React, { useState } from 'react'
import FileUpload from './FileUpload'
import SearchFilter from './SearchFilter'
import DataTable from './DataTable'
import * as XLSX from 'xlsx'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [includeKeywords, setIncludeKeywords] = useState('')
  const [excludeKeywords, setExcludeKeywords] = useState('')
  const [minWords, setMinWords] = useState('')
  const [maxWords, setMaxWords] = useState('')
  const [intentFilter, setIntentFilter] = useState('')
  const [colorFilter, setColorFilter] = useState('')
  const [startKeywords, setStartKeywords] = useState('')
  const [endKeywords, setEndKeywords] = useState('')
  const [minVol, setMinVol] = useState('')
  const [maxVol, setMaxVol] = useState('')
  const [minKD, setMinKD] = useState('')
  const [maxKD, setMaxKD] = useState('')
  const [positionKeywords, setPositionKeywords] = useState('')
  const [keywordPosition, setKeywordPosition] = useState('')

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

  const handleStartKeywordsChange = (keywordsStr) => {
    setStartKeywords(keywordsStr)
  }

  const handleEndKeywordsChange = (keywordsStr) => {
    setEndKeywords(keywordsStr)
  }

  const handleMinVolChange = (vol) => {
    setMinVol(vol)
  }

  const handleMaxVolChange = (vol) => {
    setMaxVol(vol)
  }

  const handleMinKDChange = (kd) => {
    setMinKD(kd)
  }

  const handleMaxKDChange = (kd) => {
    setMaxKD(kd)
  }

  const handlePositionKeywordsChange = (keywordsStr) => {
    setPositionKeywords(keywordsStr)
  }

  const handleKeywordPositionChange = (position) => {
    setKeywordPosition(position)
  }

  const handleFilterDuplicates = () => {
    const uniqueKeywords = Array.from(
      new Set(
        includeKeywords
          .split('\n')
          .map((k) => k.trim())
          .filter((k) => k)
      )
    )
    setIncludeKeywords(uniqueKeywords.join('\n'))

    const uniqueData = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse)
    setData(uniqueData)
  }

  const includeKeywordArray = includeKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)
  const excludeKeywordArray = excludeKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)
  const startKeywordArray = startKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)
  const endKeywordArray = endKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)
  const positionKeywordArray = positionKeywords
    .split('\n')
    .map((k) => k.trim())
    .filter((k) => k)

  const getColorForIntent = (intent) => {
    switch (intent) {
      case 'i':
        return '#33CCFF' // information
      case 're':
        return '#009999' // review
      case 'pr':
        return 'pink' // price
      case 'sp':
        return 'yellow' // product
      case 'l':
        return 'gray' // local
      case 'dv':
        return 'orange' // services
      case 'pp':
        return '#FF9966' //phương pháp - lộ trình
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

    const matchesStartKeywords =
      startKeywordArray.length === 0 ||
      startKeywordArray.some((keyword) => Object.values(row).some((val) => String(val).toLowerCase().includes(keyword.toLowerCase())))

    const matchesEndKeywords =
      endKeywordArray.length === 0 ||
      endKeywordArray.some((keyword) => Object.values(row).some((val) => String(val).toLowerCase().includes(keyword.toLowerCase())))

    const matchesVolRange = (minVol === '' || row['Vol'] >= parseFloat(minVol)) && (maxVol === '' || row['Vol'] <= parseFloat(maxVol))

    const matchesKDRange = (minKD === '' || row['KD'] >= parseFloat(minKD)) && (maxKD === '' || row['KD'] <= parseFloat(maxKD))

    const matchesPositionKeywords =
      positionKeywordArray.length === 0 ||
      positionKeywordArray.some((keyword) => {
        return Object.values(row).some((val) => {
          const lowerVal = String(val).toLowerCase()
          const keywordIndex = lowerVal.indexOf(keyword.toLowerCase())
          if (keywordIndex !== -1) {
            const words = lowerVal.substring(0, keywordIndex).trim().split(/\s+/)
            return words.length + 1 === parseInt(keywordPosition, 10)
          }
          return false
        })
      })

    if (
      !matchesIncludeKeywords ||
      matchesExcludeKeywords ||
      !matchesIntentFilter ||
      !matchesColorFilter ||
      !matchesStartKeywords ||
      !matchesEndKeywords ||
      !matchesVolRange ||
      !matchesKDRange ||
      !matchesPositionKeywords
    ) {
      return false
    }

    const countWords = (str) => {
      const trimmedStr = str.trim()
      if (trimmedStr === '') {
        return 0
      }
      return trimmedStr.split(/\s+/).length
    }

    const meetsWordCountCriteria = Object.values(row).some((val) => {
      const wordCount = countWords(String(val))
      return (minWords === '' || wordCount >= parseInt(minWords, 10)) && (maxWords === '' || wordCount <= parseInt(maxWords, 10))
    })

    return meetsWordCountCriteria
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

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <h1>Excel Filter App</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FileUpload setData={setData} />
        <button className='filter_button' onClick={handleFilterDuplicates} style={{ marginLeft: '20px' }}>
          Filter Duplicates
        </button>
      </div>
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
                startKeywords={startKeywords}
                handleStartKeywordsChange={handleStartKeywordsChange}
                endKeywords={endKeywords}
                handleEndKeywordsChange={handleEndKeywordsChange}
                minVol={minVol}
                handleMinVolChange={handleMinVolChange}
                maxVol={maxVol}
                handleMaxVolChange={handleMaxVolChange}
                minKD={minKD}
                handleMinKDChange={handleMinKDChange}
                maxKD={maxKD}
                handleMaxKDChange={handleMaxKDChange}
                positionKeywords={positionKeywords}
                handlePositionKeywordsChange={handlePositionKeywordsChange}
                keywordPosition={keywordPosition}
                handleKeywordPositionChange={handleKeywordPositionChange}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {Object.keys(groupedData).map((group) => (
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
        </>
      )}
    </div>
  )
}

export default App
