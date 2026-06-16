import React from 'react';
import S from '../profile/styles/MyProfileStyle';
import defaultProfile from '../../../components/resources/default-profile.svg';
import eyeIcon from '../../../components/resources/eye.svg';
import likeIcon from '../../../components/resources/like.svg';
import likeFillIcon from '../../../components/resources/like-fill2.svg';
import defaultThumbnail from '../../log/other/otherLog_thumbNail/Group 2956.png';
import { formatRelativeTime } from '../../../utils/relativeTime';

const FailLogPostCardComponent = ({ log = {}, isSelected = false, isEditMode = false, onSelect, onNavigate, onToggleLike }) => {
  const handleClick = () => {
    if (isEditMode) {
      onSelect?.();
    } else {
      onNavigate?.();
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike?.(log);
  };

  return (
    <S.CardWrapper $isSelected={isSelected} $isEditMode={isEditMode} onClick={handleClick}>
      <S.ImageSection>
        <S.Thumbnail
          src={log.thumbnailUrl || defaultThumbnail}
          alt={log.title}
          onError={(e) => { e.currentTarget.src = defaultThumbnail; }}
        />
      </S.ImageSection>

      <S.PostContentSection>
        <S.PostTime>{formatRelativeTime(log.createdAt || log.date) || '방금 전'}</S.PostTime>
        <S.PostTitle>{log.title || '제목 없는 페일로그'}</S.PostTitle>
        <S.PostSummary>{log.content}</S.PostSummary>

        <S.CardFooter>
          <S.AuthorInfo>
            <img src={log.profileImg || defaultProfile} alt="profile" />
            <S.AuthorName>{log.author || '나의 기록'}</S.AuthorName>
          </S.AuthorInfo>
          <S.PostStats>
            <S.StatItem>
              <img src={eyeIcon} alt="조회수" />
              {log.views || 0}
            </S.StatItem>
            <S.StatItem $clickable onClick={handleLikeClick}>
              <img src={log.isLiked ? likeFillIcon : likeIcon} alt="좋아요" />
              {log.likeCount || 0}
            </S.StatItem>
          </S.PostStats>
        </S.CardFooter>
      </S.PostContentSection>
    </S.CardWrapper>
  );
};

export default FailLogPostCardComponent;
