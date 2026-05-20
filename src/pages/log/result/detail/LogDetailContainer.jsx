import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { S } from './LogDetailContainerStyles';

const LogDetailContainer = () => {
  const { liked, likeCount, handleLike, selectedLog } = useOutletContext();

  if (!selectedLog) return null;

  return (
    <S.Container>
      {/* Badges */}
      <S.BadgeRow>
        {selectedLog.badges.map((badge, idx) => (
          <S.Badge key={idx} $color={badge.color} $bg={badge.bg}>
            {badge.label === "분석 완료" && (
              <S.CheckIcon src="/assets/picture/result-icon/check_circle.svg" alt="check circle" />
            )}
            {badge.label}
          </S.Badge>
        ))}
      </S.BadgeRow>

      {/* Title & Date */}
      <S.TitleRow>
        <S.LogTitle>{selectedLog.title}</S.LogTitle>
        <S.Date>{selectedLog.date}</S.Date>
      </S.TitleRow>

      {/* Author & Actions */}
      <S.MetaRow>
        <S.AuthorInfo>
          <S.AuthorName>{selectedLog.author.name}</S.AuthorName>
        </S.AuthorInfo>

        <S.LikeButton onClick={handleLike}>
          <S.HeartIcon>
            <img src={liked ? "/assets/picture/result-icon/heart_active.svg" : "/assets/picture/result-icon/heart_inactive.svg"} alt="heart" />
          </S.HeartIcon>
          <span>{likeCount}</span>
        </S.LikeButton>
      </S.MetaRow>

      {/* Vision */}
      <S.VisionBox>
        <S.VisionLabel>이루고 싶은 비전</S.VisionLabel>
        <S.VisionValue>{selectedLog.vision}</S.VisionValue>
      </S.VisionBox>

      {/* Content */}
      <S.ContentBox>
        <S.ContentText>{selectedLog.content}</S.ContentText>
      </S.ContentBox>
    </S.Container>
  );
};

export default LogDetailContainer;