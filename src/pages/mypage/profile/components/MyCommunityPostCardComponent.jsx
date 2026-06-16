import React from 'react';
import S from '../styles/MyProfileStyle';
import likeFillIcon from '../../../../components/resources/like-fill2.svg';
import postIcon from '../../../../components/resources/post.svg';
import defaultProfile from '../../../../components/resources/default-profile.svg';
import defaultThumbnail from '../../../log/other/otherLog_thumbNail/Group 2956.png';
import getCategoryInfo from '../../../community/GetCategoryInfo';

const MyCommunityPostCardComponent = ({ post, isSelected, isEditMode = false, onSelect, onNavigate, isPageOwner = true }) => {
  const { categoryId, title, content, author, date, likes, comments, imageUrl } = post;
  const { name: categoryName, textColor, bgColor } = getCategoryInfo(categoryId);

  const handleClick = () => {
    if (isPageOwner && isEditMode) {
      onSelect?.();
    } else {
      onNavigate?.();
    }
  };

  return (
    <S.CardWrapper $isSelected={isSelected} $isEditMode={isEditMode} onClick={handleClick}>
      <S.ImageSection>
        <S.Thumbnail src={imageUrl || defaultThumbnail} alt={title} onError={(e) => { e.currentTarget.src = defaultThumbnail; }} />

        <S.TagLabel>
          <S.CategoryBadge $bgcolor={bgColor}>
            <S.Span size="h11Bold" color={textColor}>{categoryName}</S.Span>
          </S.CategoryBadge>
        </S.TagLabel>
      </S.ImageSection>

      <S.PostContentSection>
        <S.PostTime>{date}</S.PostTime>
        <S.PostTitle>{title}</S.PostTitle>
        <S.PostSummary>{content}</S.PostSummary>

        <S.CardFooter>
          <S.AuthorInfo>
            <img src={defaultProfile} alt="profile" />
            <S.AuthorName>{author}</S.AuthorName>
          </S.AuthorInfo>
          <S.PostStats>
            <S.StatItem>
              <img src={likeFillIcon} alt="좋아요" />
              {likes}
            </S.StatItem>
            <S.StatItem>
              <img src={postIcon} alt="댓글" />
              {comments}
            </S.StatItem>
          </S.PostStats>
        </S.CardFooter>
      </S.PostContentSection>
    </S.CardWrapper>
  );
};

export default MyCommunityPostCardComponent;
