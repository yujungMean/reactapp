import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import S, { boxShadow, colorCSS } from '../../style';
import AiPost from './AiPost';
import aiImage from '../../resources/ai_image.svg';
import {formatRelativeTime} from '../../../../utils/relativeTime'

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.slice(0, 10).replace(/-/g, '.');
};

const AiPostListContainer = ({ memberId, maxHeight }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!memberId) return;
    const fetchAiPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:10000/api/posts/aiPost/main?memberId=${memberId}`, { method: 'POST' });
        if (!res.ok) return;
        const json = await res.json();
        if (!json.success) return;

        setPosts(json.data.map(p => ({
          id: p.id,
          memberId: p.memberId,
          date: formatRelativeTime(p.postCreatedAt),
          category: p.categoryId - 1,
          title: p.postTitle,
          profile: p.memberProfileImageUrl,
          author: p.memberNickname,
          views: p.postReadCount,
          likes: p.likeCount,
          isLiked: p.isLiked,
          comments: p.replyCount,
        })));
      } finally {
        setLoading(false);
      }
    };
    fetchAiPosts();
  }, [memberId]);

  return (
    <Column height={maxHeight}>
    <Wrapper>
      <Header>
        <TitleRow>
          <S.Span size="h7Bold" color="faillog-black">맞춤 게시글</S.Span>
          <img src={aiImage} alt="ai" height={24} />
        </TitleRow>
        <S.Span size="h10Regular" color="faillog_gray9">
          최근 작성 글을 바탕으로, 당신과 유사한 글을 선별했습니다.
        </S.Span>
      </Header>
      {memberId ? (
        loading ? (
          <LoginRequired>
            <S.Span size="h8Regular" color="faillog_gray9">추천 게시글 로드중...</S.Span>
          </LoginRequired>
        ) : posts.length > 0 ? (
          <PostList>
            {posts.map(post => (
              <AiPost
                key={post.id}
                postId={post.id}
                memberId={post.memberId}
                date={post.date}
                category={post.category}
                title={post.title}
                profile={post.profile}
                author={post.author}
                views={post.views}
                likes={post.likes}
                isLiked={post.isLiked}
                comments={post.comments}
              />
            ))}
          </PostList>
        ) : (
          <LoginRequired>
            <S.Span size="h8Regular" color="faillog_gray9">추천 게시글이 없습니다.</S.Span>
          </LoginRequired>
        )
      ) : (
        <LoginRequired>
          <S.Span size="h8Regular" color="faillog_gray9">로그인이 필요한 서비스입니다.</S.Span>
        </LoginRequired>
      )}
    </Wrapper>
    </Column>
  );
};

const Column = styled.div`
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
`;

const Wrapper = styled.div`
  position: sticky;
  top: 24px;
  width: 312px;
  background-color: ${colorCSS["faillog_white"]};
  border-radius: 15px;
  padding: 6px;
  padding-bottom: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${boxShadow["boxBasic"]}
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 7px;
  padding-top: 16px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PostList = styled.div`
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LoginRequired = styled.div`
  display: flex;
  height: 206px;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
`;

export default AiPostListContainer;
