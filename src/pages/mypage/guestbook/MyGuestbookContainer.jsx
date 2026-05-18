import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getHeroContent } from '../heroSection/HeroData';
import HeroRotationComponent from '../heroSection/HeroRotationComponents';
import PageS from '../profile/styles/MyPageWrapper';
import S from './styles/MyGuestbookStyles';
import SearchDropdownComponent from '../../../components/commons/SearchDropdownComponent';
import useAuthStore from '../../../store/authStore';

const initialComments = [
  {
    id: 1,
    author: '해맑이',
    title: '정말 공감됩니다',
    content: '진짜 공감됩니다. 저도 집에서는 잘 되는데 시험장만 가면 아는 것도 막히더라고요.',
    createdAt: '3분 전',
    likes: 3,
    liked: false,
    replies: [
      {
        id: 11,
        author: '해맑이',
        content: '저도 완전히 같았어요. 환경 적응이 생각보다 훨씬 중요하더라고요.',
        createdAt: '3분 전',
        likes: 0,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    author: '페일러',
    title: '다음 줄이 언제 넘어가나 했어요',
    content: '그리고 댓글에는 글자가 여기까지 커집니다. 어디까지 커지는지 확인해본 결과 줄을 줄 줄 알았는데 너무 넓은 범위까지 갑니다.',
    createdAt: '10분 전',
    likes: 1,
    liked: false,
    replies: [],
  },
  {
    id: 3,
    author: '소담',
    title: '응원합니다',
    content: '항상 응원하고 있어요. 다음 번에는 더 좋은 결과가 있기를 바랍니다.',
    createdAt: '1시간 전',
    likes: 2,
    liked: false,
    replies: [],
  },
  {
    id: 4,
    author: '나무',
    title: '다음 도전도 화이팅',
    content: '글 잘 읽었습니다. 다음 도전도 화이팅입니다!',
    createdAt: '2시간 전',
    likes: 0,
    liked: false,
    replies: [],
  },
  {
    id: 5,
    author: '봄날',
    title: '공부하다 힘들 때 읽기 좋아요',
    content: '이런 글이 있어서 다시 마음을 다잡게 되네요. 감사합니다.',
    createdAt: '5시간 전',
    likes: 4,
    liked: false,
    replies: [],
  },
];

const MyGuestbookContainer = () => {
  const { pathname } = useLocation();
  const { mainContent, quickMenus } = getHeroContent(pathname);
  const currentUser = useAuthStore((state) => state.user?.nickname || state.user?.name || '익명');

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTextMap, setReplyTextMap] = useState({});
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [searchType, setSearchType] = useState('제목+내용');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const sentinelRef = useRef(null);

  const filteredComments = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return comments;

    return comments.filter((comment) => {
      const title = comment.title.toLowerCase();
      const content = comment.content.toLowerCase();
      const author = comment.author.toLowerCase();
      const replyTexts = comment.replies.map((reply) => reply.content.toLowerCase()).join(' ');

      if (searchType === '제목') {
        return title.includes(keyword);
      }
      if (searchType === '내용') {
        return content.includes(keyword);
      }
      if (searchType === '제목+내용') {
        return `${title} ${content}`.includes(keyword);
      }
      if (searchType === '작성자') {
        return author.includes(keyword);
      }
      if (searchType === '댓글') {
        return content.includes(keyword) || replyTexts.includes(keyword);
      }
      return false;
    });
  }, [comments, searchKeyword, searchType]);

  const visibleComments = useMemo(() => filteredComments.slice(0, visibleCount), [filteredComments, visibleCount]);

  useEffect(() => {
    setVisibleCount(4);
  }, [searchKeyword, searchType]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredComments.length) {
          setVisibleCount((prev) => Math.min(prev + 4, filteredComments.length));
        }
      },
      { rootMargin: '200px' }
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

    const nextComment = {
      id: Date.now(),
      author: currentUser,
      title: '새로운 방명록',
      content: trimmed,
      createdAt: '방금 전',
      likes: 0,
      liked: false,
      replies: [],
    };

    setComments((prev) => [nextComment, ...prev]);
    setNewComment('');
    setVisibleCount((prev) => Math.min(prev + 1, filteredComments.length + 1));
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

    const newReply = {
      id: Date.now(),
      author: currentUser,
      content: replyText,
      createdAt: '방금 전',
      likes: 0,
      liked: false,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
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
          return {
            ...comment,
            liked,
            likes: comment.likes + (liked ? 1 : -1),
          };
        }

        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === replyId
              ? {
                  ...reply,
                  liked: !reply.liked,
                  likes: reply.likes + (reply.liked ? -1 : 1),
                }
              : reply
          ),
        };
      })
    );
  };

  const handleMoreMenuToggle = (commentId, event) => {
    event.stopPropagation();
    setActiveMenuId((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <PageS.MainWrapper>
      <HeroRotationComponent mainContent={mainContent} quickMenus={quickMenus} />

      <S.GuestbookSection>
        <S.InputCard>
          <S.CommentTextarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="인사를 남겨볼까요?"
          />

          <S.InputFooter>
            <div />
            <S.SubmitButton onClick={handleSubmit} disabled={!newComment.trim()}>
              확인
            </S.SubmitButton>
          </S.InputFooter>
        </S.InputCard>

        <S.SearchBar>
          <SearchDropdownComponent defaultValue={searchType} onChange={setSearchType} />
          <S.SmallSearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력하세요."
          />
        </S.SearchBar>

        <S.CommentList>
          {visibleComments.map((comment) => (
            <S.CommentBlock key={comment.id}>
              <S.CommentCard>
                <S.Avatar>{comment.author.slice(0, 1).toUpperCase()}</S.Avatar>
                <S.CommentBody>
                  <S.CommentMeta>
                    <div>
                      <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                      <S.CommentTitle>{comment.title}</S.CommentTitle>
                    </div>
                    <S.CommentTime>{comment.createdAt}</S.CommentTime>
                  </S.CommentMeta>
                  <S.CommentText>{comment.content}</S.CommentText>
                  <S.CommentFooter>
                    <S.ActionGroup>
                      <S.Reaction liked={comment.liked} type="button" onClick={() => handleToggleLike(comment.id)}>
                        <span>❤️</span>
                        <span>{comment.likes}</span>
                      </S.Reaction>
                      <S.ReplyAction type="button" onClick={() => handleReplyToggle(comment.id)}>
                        답글
                      </S.ReplyAction>
                    </S.ActionGroup>
                    <span>{comment.replies.length}개의 답글</span>
                  </S.CommentFooter>
                </S.CommentBody>
                <S.CommentMenu type="button" aria-label="옵션" onClick={(event) => handleMoreMenuToggle(comment.id, event)}>
                  ···
                </S.CommentMenu>
                {activeMenuId === comment.id && (
                  <S.MenuDropdown onClick={(event) => event.stopPropagation()}>
                    <S.MenuItem type="button">수정하기</S.MenuItem>
                    <S.MenuItem type="button">삭제하기</S.MenuItem>
                    <S.MenuItem type="button">신고하기</S.MenuItem>
                  </S.MenuDropdown>
                )}
              </S.CommentCard>

              {comment.replies.length > 0 && (
                <S.ReplyList>
                  {comment.replies.map((reply) => (
                    <S.ReplyCard key={reply.id}>
                      <S.ReplyAvatar>{reply.author.slice(0, 1).toUpperCase()}</S.ReplyAvatar>
                      <S.ReplyBody>
                        <S.CommentMeta>
                          <div>
                            <S.CommentAuthor>{reply.author}</S.CommentAuthor>
                          </div>
                          <S.CommentTime>{reply.createdAt}</S.CommentTime>
                        </S.CommentMeta>
                        <S.CommentText>{reply.content}</S.CommentText>
                        <S.CommentFooter>
                          <S.ActionGroup>
                            <S.Reaction liked={reply.liked} type="button" onClick={() => handleToggleLike(comment.id, reply.id)}>
                              <span>❤️</span>
                              <span>{reply.likes}</span>
                            </S.Reaction>
                            <S.ReplyAction type="button" onClick={() => handleReplyToggle(comment.id)}>
                              답글
                            </S.ReplyAction>
                          </S.ActionGroup>
                        </S.CommentFooter>
                      </S.ReplyBody>
                    </S.ReplyCard>
                  ))}
                </S.ReplyList>
              )}

              {replyOpenId === comment.id && (
                <S.ReplyInputCard>
                  <S.ReplyTextarea
                    value={replyTextMap[comment.id] || ''}
                    onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    placeholder="답글을 남겨볼까요?"
                  />
                  <S.ReplyFooter>
                    <div />
                    <S.SubmitButton type="button" onClick={() => handleReplySubmit(comment.id)} disabled={!replyTextMap[comment.id]?.trim()}>
                      확인
                    </S.SubmitButton>
                  </S.ReplyFooter>
                </S.ReplyInputCard>
              )}
            </S.CommentBlock>
          ))}
        </S.CommentList>

        <div ref={sentinelRef} />
      </S.GuestbookSection>
    </PageS.MainWrapper>
  );
};

export default MyGuestbookContainer;
