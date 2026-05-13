import React from 'react';
import styled from 'styled-components';
import S, { colorCSS } from '../../style';
import { Link } from 'react-router-dom';

const BeforeAfterPost = ({ prevTitle, prevId, nextTitle, nextId }) => {
  return (
    <Wrapper>
      <Row>
        <S.Span size="h10Regular" color="faillog_gray9">이전글</S.Span>
        {prevId ? (
          <PostLink to={`/community/detail/${prevId}`}>
            <S.Span size="h9Regular" color="faillog-black">{prevTitle}</S.Span>
          </PostLink>
        ) : (
          <S.Span size="h9Regular" color="faillog_gray9">이전글이 없습니다</S.Span>
        )}
      </Row>

      <Divider />

      <Row>
        <S.Span size="h10Regular" color="faillog_gray9">다음글</S.Span>
        {nextId ? (
          <PostLink to={`/community/detail/${nextId}`}>
            <S.Span size="h9Regular" color="faillog-black">{nextTitle}</S.Span>
          </PostLink>
        ) : (
          <S.Span size="h9Regular" color="faillog_gray9">다음글이 없습니다</S.Span>
        )}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1270px;
  margin-top: 37px;
  margin-bottom: 54px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 49px;
  padding-left: 16px;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  &:hover span {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  width: 1270px;
  border: none;
  border-top: 1px solid ${colorCSS["faillog_gray2"]};
  margin: 0;
`;

export default BeforeAfterPost;
