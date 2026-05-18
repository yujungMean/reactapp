import React from 'react';
import SearchbarComponent from '../../../components/commons/SearchbarComponent';
import SearchDropdownComponent from '../../../components/commons/SearchDropdownComponent';

const LogSearchComponent = ({ currentOption, onOptionChange, onSearchSubmit, styles }) => {
  return (
    <styles.SearchControlBlock 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        width: '100%'
      }}
    >
      {/* 📌 드롭다운: 피그마 규격 전달 (내부 방어코드가 있어서 안전함) */}
      <styles.DropdownWrapper style={{ width: '160px', flexShrink: 0 }}>
        <SearchDropdownComponent 
          defaultValue={currentOption} 
          onChange={onOptionChange} 
          style={{ 
            width: '160px', 
            height: '48px',
            borderRadius: '9999px'
          }}
        />
      </styles.DropdownWrapper>
      
      {/* 📌 서치바: 피그마 규격 강제 매핑 */}
      <styles.SearchbarWrapper style={{ width: '648px', flexShrink: 0 }}>
        <SearchbarComponent 
          placeholder="내 페일로그 검색..." 
          onSubmit={onSearchSubmit}
          style={{
            width: '100%',
            height: '60px',
            borderRadius: '9999px'
          }}
        />
      </styles.SearchbarWrapper>
    </styles.SearchControlBlock>
  );
};

export default LogSearchComponent;