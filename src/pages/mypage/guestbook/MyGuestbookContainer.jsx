import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getHeroContent } from '../heroSection/HeroData';
import HeroRotationComponent from '../heroSection/HeroRotationComponents';
import PageS from '../profile/styles/MyPageWrapper';
import S from './styles/MyGuestbookStyles';
import SearchDropdownComponent from '../../../components/commons/SearchDropdownComponent';

import GuestbookInputComponent from './components/GuestbookInputComponent';
import GuestbookCommentItemComponent from './components/GuestbookCommentItemComponent';
import axiosInstance from '../../../api/axiosInstance';
import PopupComponent from '../../../components/commons/PopupComponent';

const mapGuestbook = (item) => ({
  id: item.id,
  ownerNickname: item.ownerNickname || '',
  author: item.writerNickname || '익명',
  authorId: item.writerMemberId,
  profileImg: item.writerProfileImageUrl || null,
  title: item.guestbookContent?.slice(0, 20) || '',
  content: item.guestbookContent || '',
  createdAt: item.guestbookCreatedAt || '',
  likes: item.likeCount || 0,
  liked: item.isLike === 1,
  replies: (item.replies || []).map((r) => ({
    id: r.id,
    author: r.writerNickname || '익명',
    authorId: r.writerMemberId,
    profileImg: r.writerProfileImageUrl || null,
    content: r.guestbookReplyContent || '',
    createdAt: r.guestbookReplyCreatedAt || '',
    likes: r.likeCount || 0,
    liked: r.isLike === 1,
  })),
});

const MyGuestbookContainer = ({ isPageOwner = true }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userId } = useParams();
  const { mainContent, quickMenus } = getHeroContent(pathname);

  const [loggedInMemberId, setLoggedInMemberId] = useState(null);
  const [loggedInNickname, setLoggedInNickname] = useState('익명');
  const [ownerMemberId, setOwnerMemberId] = useState(null);
  const [ownerNickname, setOwnerNickname] = useState('');

  const [authChecked, setAuthChecked] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTextMap, setReplyTextMap] = useState({});
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [searchType, setSearchType] = useState('제목+내용');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const sentinelRef = useRef(null);

  // 로그인 유저 정보 + ownerMemberId 결정
  useEffect(() => {
    axiosInstance.get('/private/member/me')
      .then((res) => {
        if (res.data?.success) {
          const d = res.data.data;
          setLoggedInMemberId(d.id);
          setLoggedInNickname(d.memberNickname || '익명');
          if (isPageOwner) {
            setOwnerMemberId(d.id);
          }
        }
      })
      .catch(console.error)
      .finally(() => setAuthChecked(true));
  }, [isPageOwner]);

  // ownerMemberId가 결정되면 방명록 목록 로드
  useEffect(() => {
    const ownerId = isPageOwner ? ownerMemberId : (userId ? Number(userId) : null);
    if (!ownerId) return;
    axiosInstance.get('/api/guestbook/list', { params: { ownerMemberId: ownerId } })
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map(mapGuestbook);
          setComments(mapped);
          if (!isPageOwner && mapped.length > 0 && mapped[0].ownerNickname) {
            setOwnerNickname(mapped[0].ownerNickname);
          }
        }
      })
      .catch(console.error);
  }, [ownerMemberId, isPageOwner, userId]);

  const filteredComments = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return comments;

    return comments.filter((comment) => {
      const title = comment.title.toLowerCase();
      const content = comment.content.toLowerCase();
      const author = comment.author.toLowerCase();
      const replyTexts = comment.replies.map((r) => r.content.toLowerCase()).join(' ');

      if (searchType === '제목') return title.includes(keyword);
      if (searchType === '내용') return content.includes(keyword);
      if (searchType === '제목+내용') return `${title} ${content}`.includes(keyword);
      if (searchType === '작성자') return author.includes(keyword);
      if (searchType === '댓글') return content.includes(keyword) || replyTexts.includes(keyword);
      return false;
    });
  }, [comments, searchKeyword, searchType]);

  const visibleComments = useMemo(
    () => filteredComments.slice(0, visibleCount),
    [filteredComments, visibleCount],
  );

  useEffect(() => { setVisibleCount(4); }, [searchKeyword, searchType]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredComments.length) {
          setVisibleCount((prev) => Math.min(prev + 4, filteredComments.length));
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filteredComments.length, visibleCount]);

  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    if (authChecked && !loggedInMemberId) {
      setLoginPopup(true);
      return;
    }
    if (!loggedInMemberId) return;
    const ownerId = isPageOwner ? ownerMemberId : (userId ? Number(userId) : null);
    if (!ownerId) return;
    axiosInstance.post('/api/guestbook/write', { ownerMemberId: ownerId, guestbookContent: trimmed, writerMemberId: loggedInMemberId })
      .then(() => {
        return axiosInstance.get('/api/guestbook/list', { params: { ownerMemberId: ownerId } });
      })
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) setComments(res.data.data.map(mapGuestbook));
      })
      .catch(console.error);
    setNewComment('');
    setVisibleCount((prev) => prev + 1);
  };

  const handleReplyToggle = (commentId) => {
    setReplyOpenId((prev) => (prev === commentId ? null : commentId));
  };

  const handleReplyChange = (commentId, value) => {
    setReplyTextMap((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = (commentId) => {
    const replyText = (replyTextMap[commentId] || '').trim();
    if (!replyText) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  author: loggedInNickname,
                  authorId: loggedInMemberId,
                  content: replyText,
                  createdAt: '방금 전',
                  likes: 0,
                  liked: false,
                },
              ],
            }
          : c,
      ),
    );
    setReplyTextMap((prev) => ({ ...prev, [commentId]: '' }));
    setReplyOpenId(null);
  };

  const handleToggleLike = (commentId, replyId = null) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== commentId) return comment;
        if (replyId == null) {
          const liked = !comment.liked;
          return { ...comment, liked, likes: comment.likes + (liked ? 1 : -1) };
        }
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, liked: !reply.liked, likes: reply.likes + (reply.liked ? -1 : 1) }
              : reply,
          ),
        };
      }),
    );
  };

  const handleMoreMenuToggle = (commentId, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === commentId ? null : commentId));
  };

  const handleCloseMenu = () => setActiveMenuId(null);

  const handleEditComment = (commentId, newContent) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const ownerId = isPageOwner ? ownerMemberId : (userId ? Number(userId) : null);
    axiosInstance.put('/api/guestbook/update', { id: commentId, ownerMemberId: ownerId, guestbookContent: newContent, writerMemberId: comment.authorId })
      .then(() => {
        setComments((prev) => prev.map((c) => c.id === commentId ? { ...c, content: newContent } : c));
      })
      .catch(console.error);
  };

  const handleDeleteComment = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const ownerId = isPageOwner ? ownerMemberId : (userId ? Number(userId) : null);
    axiosInstance.delete('/api/guestbook/delete', { data: { id: commentId, ownerMemberId: ownerId, writerMemberId: comment.authorId } })
      .then(() => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      })
      .catch(console.error);
  };

  const handleEditReply = (commentId, replyId, newContent) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: c.replies.map((r) => r.id === replyId ? { ...r, content: newContent } : r) }
          : c,
      ),
    );
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
          : c,
      ),
    );
  };

  return (
    <PageS.MainWrapper>
      <PopupComponent
        isOpen={loginPopup}
        message="방명록은 로그인 된 사용자만 이용하실 수 있습니다."
        onConfirm={() => setLoginPopup(false)}
      />
      <HeroRotationComponent mainContent={mainContent} quickMenus={quickMenus} isPageOwner={isPageOwner} userId={userId} />

      <S.GuestbookSection>
        <S.GuestbookHeader>
          <h2><span>페일로그</span> 방명록</h2>
          <p>{isPageOwner ? '다른 사람들이 남긴 방명록을 통해 소통해보세요.' : `${ownerNickname || userId}님의 방명록입니다.`}</p>
        </S.GuestbookHeader>

        <GuestbookInputComponent
          value={newComment}
          onChange={setNewComment}
          onSubmit={handleSubmit}
        />

        <S.SearchBar>
          <SearchDropdownComponent defaultValue={searchType} onChange={setSearchType} />
          <S.SmallSearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요."
          />
        </S.SearchBar>

        {filteredComments.length === 0 ? (
          <S.EmptyState>
            <h3>아직 작성된 방명록이 없어요.<br /><span>페일로그</span>의 커뮤니티를 이용해볼까요?</h3>
            <p>실패를 외면하지 않고 기록할 때,<br />당신의 강력한 성장 데이터가 됩니다.</p>
            <button type="button" onClick={() => navigate('/community')}>시작하기</button>
          </S.EmptyState>
        ) : (
          <S.CommentList>
            {visibleComments.map((comment) => (
              <GuestbookCommentItemComponent
                key={comment.id}
                comment={comment}
                currentUser={loggedInNickname}
                isPageOwner={isPageOwner}
                onLike={handleToggleLike}
                onReplyToggle={handleReplyToggle}
                replyOpen={replyOpenId === comment.id}
                replyText={replyTextMap[comment.id] || ''}
                onReplyChange={handleReplyChange}
                onReplySubmit={handleReplySubmit}
                activeMenuId={activeMenuId}
                onMenuToggle={handleMoreMenuToggle}
                onCloseMenu={handleCloseMenu}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                onEditReply={handleEditReply}
                onDeleteReply={handleDeleteReply}
              />
            ))}
            <div ref={sentinelRef} />
          </S.CommentList>
        )}
      </S.GuestbookSection>
    </PageS.MainWrapper>
  );
};

export default MyGuestbookContainer;
