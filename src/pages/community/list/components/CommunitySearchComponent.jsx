import React, { useState } from 'react';
import myStyle from '../../styles/CommunitySearchStyle'
import SearchComponent from './SearchComponent';
import CommunitySearchOrderComponent from './CommunitySearchOrderComponent';
import useSearchStore from '../useSearchStore';
import { shallow } from 'zustand/shallow';

const CommunitySearchComponent = () => {
  
  const {setContent, setOrder1, setPage} = useSearchStore();
  const [select, setSelect] = useState(0);
  

  const handleSubmit = (data) => {
    setContent(data)
    setOrder1(select)
    setPage(1)
  }

// '제목', '제목+내용', '내용', '작성자', '댓글'

  const handleOnChangeDropDown = (option) => {
    switch(option) {
      case "제목":
        // select = 0;
        setSelect(0);
        break;
      case "제목+내용":
        setSelect(1);
        break;
      case "내용":
        setSelect(2);
        break;
      case "작성자":
        setSelect(3);
        break;
      case "댓글":
        setSelect(4);
        break;
    }

  }

  return (
    <div>
      <myStyle.component>
        <SearchComponent onSubmit={handleSubmit}></SearchComponent>
        <CommunitySearchOrderComponent onChange={handleOnChangeDropDown}></CommunitySearchOrderComponent>
      </myStyle.component>
    </div>
  );
};

export default CommunitySearchComponent;