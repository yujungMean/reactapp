import React from 'react';
import styled from 'styled-components';

import S, { colorCSS } from '../../style.js';
import ReplySubmit from './ReplySubmit.jsx';
import Rereply from './Rereply.jsx';

// replyCount: 댓글 수, onSubmit: 댓글 등록 이벤트
const ReplyContainer = ({ replyCount = 0, onSubmit }) => {
  return (
    <Wrapper>
      <TitleRow>
        <S.Span size="h7Bold">댓글</S.Span>
        <S.Span size="h7Bold" color="faillog_purple">{replyCount}</S.Span>
      </TitleRow>

      <ReplySubmitBox>
        <ReplySubmit onSubmit={onSubmit} />
      </ReplySubmitBox>

      {/* <Rereply></Rereply> */}
    </Wrapper>
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

export default ReplyContainer;
