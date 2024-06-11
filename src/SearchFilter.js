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
  startKeyword,
  handleStartKeywordChange,
  endKeyword,
  handleEndKeywordChange,
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
          <option value='#FF9966'>Method ( red orange)</option>
          <option value='white'>Topic (white)</option>
        </select>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type='text'
          value={startKeyword}
          onChange={(e) => handleStartKeywordChange(e.target.value)}
          placeholder='Start Keyword'
          style={{ width: '48%', marginRight: '2%' }}
        />
        <input
          type='text'
          value={endKeyword}
          onChange={(e) => handleEndKeywordChange(e.target.value)}
          placeholder='End Keyword'
          style={{ width: '48%' }}
        />
      </div>
    </div>
  )
}

export default SearchFilter
