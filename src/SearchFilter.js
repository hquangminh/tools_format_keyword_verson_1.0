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
    </div>
  )
}

export default SearchFilter
