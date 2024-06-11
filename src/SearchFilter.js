import React from 'react'

const SearchFilter = ({
  includeKeywords,
  handleIncludeKeywordsChange,
  excludeKeywords,
  handleExcludeKeywordsChange,
  minWords,
  setMinWords,
  maxWords,
  setMaxWords,
  intentFilter,
  handleIntentFilterChange,
  colorFilter,
  handleColorFilterChange,
  startKeywords,
  handleStartKeywordsChange,
  endKeywords,
  handleEndKeywordsChange,
  minVol,
  handleMinVolChange,
  maxVol,
  handleMaxVolChange,
  minKD,
  handleMinKDChange,
  maxKD,
  handleMaxKDChange,
  positionKeywords,
  handlePositionKeywordsChange,
  keywordPosition,
  handleKeywordPositionChange,
}) => {
  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <textarea
        value={includeKeywords}
        onChange={(e) => handleIncludeKeywordsChange(e.target.value)}
        placeholder='Enter include keywords, one per line...'
        rows='5'
        style={{ width: '48%', marginRight: '2%' }}
      />
      <textarea
        value={excludeKeywords}
        onChange={(e) => handleExcludeKeywordsChange(e.target.value)}
        placeholder='Enter exclude keywords, one per line...'
        rows='5'
        style={{ width: '48%' }}
      />
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input type='number' value={minWords} onChange={(e) => setMinWords(e.target.value)} placeholder='Min Words' style={{ marginRight: '10px' }} />
        <input type='number' value={maxWords} onChange={(e) => setMaxWords(e.target.value)} placeholder='Max Words' />
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type='text'
          value={intentFilter}
          onChange={(e) => handleIntentFilterChange(e.target.value)}
          placeholder='Intent Filter'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <select value={colorFilter} onChange={(e) => handleColorFilterChange(e.target.value)} style={{ width: '48%' }}>
          <option value=''>Select Color Filter</option>
          <option value='pink'>Price (pink)</option>
          <option value='#33CCFF'>Information (blue sky)</option>
          <option value='#009999'>Review (green)</option>
          <option value='yellow'>Product (yellow)</option>
          <option value='gray'>Local (gray)</option>
          <option value='orange'>Services (orange)</option>
          <option value='#FF9966'>Method (red orange)</option>
          <option value='white'>Topic (white)</option>
        </select>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <textarea
          value={startKeywords}
          onChange={(e) => handleStartKeywordsChange(e.target.value)}
          placeholder='Enter start keywords, one per line...'
          rows='5'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <textarea
          value={endKeywords}
          onChange={(e) => handleEndKeywordsChange(e.target.value)}
          placeholder='Enter end keywords, one per line...'
          rows='5'
          style={{ width: '48%' }}
        />
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type='number'
          value={minVol}
          onChange={(e) => handleMinVolChange(e.target.value)}
          placeholder='Min Vol'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <input type='number' value={maxVol} onChange={(e) => handleMaxVolChange(e.target.value)} placeholder='Max Vol' style={{ width: '48%' }} />
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type='number'
          value={minKD}
          onChange={(e) => handleMinKDChange(e.target.value)}
          placeholder='Min KD'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <input type='number' value={maxKD} onChange={(e) => handleMaxKDChange(e.target.value)} placeholder='Max KD' style={{ width: '48%' }} />
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <textarea
          value={positionKeywords}
          onChange={(e) => handlePositionKeywordsChange(e.target.value)}
          placeholder='Enter position keywords, one per line...'
          rows='5'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <input
          type='number'
          value={keywordPosition}
          onChange={(e) => handleKeywordPositionChange(e.target.value)}
          placeholder='Keyword Position'
          style={{ width: '48%' }}
        />
      </div>
    </div>
  )
}

export default SearchFilter
