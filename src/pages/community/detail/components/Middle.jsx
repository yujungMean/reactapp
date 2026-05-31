import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import like from '../../resources/like.svg'
import likeFill2 from '../../resources/like-fill2.svg'
import menuIcon from '../../resources/menuIcon.svg'

import S, { colorCSS, hoverBorder } from '../../style.js'
import { flexCenterRow } from '../../../../styles/common.js';
import { useReportContext } from './ReportContext.js';
import PopupComponent from '../../../../components/commons/PopupComponent';

// 게시글 상세 중앙(목록으로, 좋아요버튼, 메뉴버튼)
// isOwner: 본인 게시글 여부, likeCount: 좋아요 수, isLiked: 좋아요 선택 여부
// loginId: 로그인 유저 id, postId, postAuthor, postProfileImg, postContent: 신고 팝업용 게시글 정보
const Middle = ({ loginId, isOwner = false, likeCount = 0, isLiked = false, memberId, postId, postAuthor, postProfileImg, postContent }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const navigate = useNavigate();
  const { openReport } = useReportContext();

  const handleDeleteConfirm = async () => {
    setDeletePopupOpen(false);
    const res = await fetch(`http://localhost:10000/api/posts/delete/${postId}`, {
      method: 'DELETE',
    });
    if (!res.ok) return;
    const json = await res.json();
    if (json.success) navigate('/community');
  };

  const handleLike = async () => {
    if (loginId === 0) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    const url = liked
      ? 'http://localhost:10000/api/posts/cancel-like'
      : 'http://localhost:10000/api/posts/apply-like';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId : loginId, postId }),
    });

    if (!res.ok) return;
    const json = await res.json();
    if (json.success) {
      setLiked(json.data.isLiked === 1);
      setCount(json.data.likeCount);
    }
  };

  return (
    <>
    <PopupComponent
      isOpen={deletePopupOpen}
      message="게시글을 삭제하시겠습니까?"
      onConfirm={handleDeleteConfirm}
      onCancel={() => setDeletePopupOpen(false)}
    />
    <Wrapper>
      <ListBtn onClick={() => navigate('/community')}>
        <S.Span size="h10Bold">목록으로</S.Span>
      </ListBtn>

      <RightGroup>
        <LikeBtn onClick={handleLike}>
          <LikeIcon src={liked ? likeFill2 : like} alt="좋아요" />
          <S.Span size="h9Bold">{count}</S.Span>
        </LikeBtn>

        <MenuContainer>
          <MenuBtn onClick={() => setMenuOpen(prev => !prev)}>
            <img src={menuIcon} width={20} height={20} alt="메뉴" />
          </MenuBtn>

          {menuOpen && (
            <Dropdown>
              {isOwner ? (
                <>
                  <DropdownItem onClick={() => {
                      setMenuOpen(false)
                      navigate(`/community/edit/${postId}`)
                    }}>
                    <S.Span size="h7Regular">수정하기</S.Span>
                  </DropdownItem>
                  <DropdownItem onClick={() => { setMenuOpen(false); setDeletePopupOpen(true); }}>
                    <S.Span size="h7Regular">삭제하기</S.Span>
                  </DropdownItem>
                </>
              ) : (
                  <DropdownItem onClick={() => { openReport('게시글', postId, postProfileImg, postAuthor, postContent); setMenuOpen(false); }}>
                    <S.Span size="h7Regular">신고하기</S.Span>
                  </DropdownItem>
              )}
            </Dropdown>
          )}
        </MenuContainer>
      </RightGroup>
    </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 1270px;
  padding-top: 26px;
  padding-bottom: 31px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ListBtn = styled.button`
  width: 84px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colorCSS["faillog_gray4"]};
  border-radius: 10px;
  background: ${colorCSS["faillog_white"]};
  cursor: pointer;

  ${hoverBorder}
`

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const LikeBtn = styled.button`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid ${colorCSS["faillog_gray4"]};
  border-radius: 10px;
  background: ${colorCSS["faillog_white"]};
  cursor: pointer;

  ${hoverBorder}
`

const LikeIcon = styled.img`
  width: 16px;
  height: 16px;
`

const MenuContainer = styled.div`
  position: relative;
`

const MenuBtn = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colorCSS["faillog_gray4"]};
  border-radius: 8px;
  background: ${colorCSS["faillog_white"]};
  cursor: pointer;

  ${hoverBorder}
`

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  width: 100px;
  background: ${colorCSS["faillog_white"]};
  border: 1px solid ${colorCSS["faillog_gray4"]};
  border-radius: 15px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 100;
`

const DropdownItem = styled.div`
  ${flexCenterRow}
  cursor: pointer;

    &:hover span {
    color: ${colorCSS["faillog_purple"]};
  }
`

export default Middle;
