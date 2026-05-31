import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import S, { colorCSS } from '../../style.js';
import ReplySubmit from './ReplySubmit.jsx';
import Reply from './Reply.jsx';
import { MenuContext } from './MenuContext.js';

// replyList: Reply.jsx EXAMPLE 형식의 댓글 배열
// postId: 게시글 id, loginId: 로그인 유저 id, onReplyAdded: 댓글 등록 후 갱신 콜백
const ReplyContainer = ({ replyList = [], postId, loginId, onReplyAdded }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (text) => {
    if (loginId === 0) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    if (!text.trim()) return;
    const res = await fetch('http://localhost:10000/api/posts/write-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, memberId: loginId, replyContent: text }),
    });
    if (!res.ok) return;
    const json = await res.json();
    if (json.success) onReplyAdded?.();
  };

  return (
    <MenuContext.Provider value={{ openMenuId, setOpenMenuId }}>
    <Wrapper>
      <TitleRow>
        <S.Span size="h7Bold">댓글</S.Span>
        <S.Span size="h7Bold" color="faillog_purple">{replyList.length}</S.Span>
      </TitleRow>

      <ReplySubmitBox>
        <ReplySubmit onSubmit={handleSubmit} />
      </ReplySubmitBox>

      {replyList.length > 0 && (
        <ReplyListArea>
          {replyList.map((item, i) => (
            <Reply key={i} {...item} onReplyAdded={onReplyAdded} />
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
