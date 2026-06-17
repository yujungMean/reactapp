import React from 'react';
import S from '../profile/styles/MyProfileStyle';
import defaultProfile from '../../../components/resources/default-profile.svg';
import eyeIcon from '../../../components/resources/eye.svg';
import likeIcon from '../../../components/resources/like.svg';
import likeFillIcon from '../../../components/resources/like-fill2.svg';
import { THUMBNAIL_MAP, DefaultThumb } from '../../log/other/thumbnailMap';
import { formatRelativeTime } from '../../../utils/relativeTime';

const categoryStyleMap = {
  '공부/취업': { textColor: 'faillog_blue',   bgColor: 'faillog_light_blue' },
  '사업/창업': { textColor: 'faillog_purple', bgColor: 'faillog_light_purple' },
  '인간관계':  { textColor: 'faillog-red',    bgColor: 'faillog_light_red' },
  '건강/루틴': { textColor: 'faillog_green',  bgColor: 'faillog_light_green' },
  '기타':      { textColor: 'faillog-black',  bgColor: 'faillog_gray2' },
};

const getCategoryStyle = (category) =>
  categoryStyleMap[category] || { textColor: 'faillog-black', bgColor: 'faillog_gray2' };

export const getMatchedThumbnail = (log) =>
  THUMBNAIL_MAP[log.id] || DefaultThumb;

const FailLogPostCardComponent = ({ log = {}, isSelected = false, isEditMode = false, onSelect, onNavigate, onToggleLike, compact = false }) => {
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

  const thumbnailSrc = log.thumbnailUrl || getMatchedThumbnail(log);
  const catStyle = log.category ? getCategoryStyle(log.category) : null;

  return (
    <S.CardWrapper $isSelected={isSelected} $isEditMode={isEditMode} onClick={handleClick}>
      <S.ImageSection $height={compact ? '130px' : undefined}>
        <S.Thumbnail
          src={thumbnailSrc}
          alt={log.title}
          onError={(e) => { e.currentTarget.src = DefaultThumb; }}
        />
        {catStyle && (
          <S.TagLabel>
            <S.CategoryBadge $bgcolor={catStyle.bgColor}>
              <S.Span size="h11Bold" color={catStyle.textColor}>{log.category}</S.Span>
            </S.CategoryBadge>
          </S.TagLabel>
        )}
      </S.ImageSection>

      <S.PostContentSection>
        <S.PostTime>{formatRelativeTime(log.createdAt || log.date) || '방금 전'}</S.PostTime>
        <S.PostTitle>{log.title || '제목 없는 페일로그'}</S.PostTitle>
        <S.PostSummary>{log.content}</S.PostSummary>

        <S.CardFooter>
          <S.AuthorInfo>
            <S.ProfileRing>
              <img src={log.profileImg || defaultProfile} alt="profile" onError={(e) => { e.currentTarget.src = defaultProfile; }} />
            </S.ProfileRing>
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
