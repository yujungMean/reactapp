import React, { useState } from 'react';
import styled from 'styled-components';

import S, { colorCSS } from '../../style.js';
import ReplySubmit from './ReplySubmit.jsx';
import Reply from './Reply.jsx';
import { MenuContext } from './MenuContext.js';

// replyList: Reply.jsx EXAMPLE 형식의 댓글 배열, onSubmit: 댓글 등록 이벤트
const ReplyContainer = ({ replyList = [], onSubmit }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <MenuContext.Provider value={{ openMenuId, setOpenMenuId }}>
    <Wrapper>
      <TitleRow>
        <S.Span size="h7Bold">댓글</S.Span>
        <S.Span size="h7Bold" color="faillog_purple">{replyList.length}</S.Span>
      </TitleRow>

      <ReplySubmitBox>
        <ReplySubmit onSubmit={onSubmit} />
      </ReplySubmitBox>

      {replyList.length > 0 && (
        <ReplyListArea>
          {replyList.map((item, i) => (
            <Reply key={i} {...item} />
          ))}
        </ReplyListArea>
      )}
    </Wrapper>
    </MenuContext.Provider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 15px;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const ReplySubmitBox = styled.div`
  padding: 17px;
  border: 1px solid ${colorCSS["faillog_gray3"]};
  border-radius: 15px;
`

const ReplyListArea = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`

export default ReplyContainer;
