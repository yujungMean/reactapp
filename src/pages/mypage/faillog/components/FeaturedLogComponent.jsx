import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../styles/MyFailLogStyles';
import defaultProfile from '../../../../components/resources/default-profile.svg';
import eyeIcon from '../../../../components/resources/eye.svg';
import likeFilledIcon from '../../../../components/resources/like-fill2.svg';
import defaultThumbnail from '../../../log/other/otherLog_thumbNail/Group 2956.png';

const FeaturedLogComponent = ({ logs = [], isPageOwner = true, ownerNickname = '' }) => {
  const navigate = useNavigate();
  const [imgBroken, setImgBroken] = useState(false);

  const goToLog = (logId) => {
    navigate(`/logs/result/${logId}/detail`);
  };

  const hasLikedPosts = logs.some(
    (log) => log.isLiked || (log.likeCount || log.likes || 0) > 0,
  );

  if (logs.length === 0 || !hasLikedPosts) return null;

  const featuredLog = [...logs].sort((a, b) => {
    const likeA = a.likeCount || a.likes || 0;
    const likeB = b.likeCount || b.likes || 0;
    if (likeB !== likeA) return likeB - likeA;
    return (b.views || 0) - (a.views || 0);
  })[0];

  return (
    <S.FeaturedWrapper>
      <S.FeaturedContainer onClick={() => goToLog(featuredLog.id)}>
        <S.FeaturedInfoArea>
          <span className="Badge">나의 최고의 실패</span>
          <h3>{featuredLog.title}</h3>
          <p>"{featuredLog.content?.substring(0, 80)}..."</p>

          <div className="Meta">
            <div className="User">
              <img src={featuredLog.profileImg || defaultProfile} alt="profile" />
              {featuredLog.author || (isPageOwner ? '나의 기록' : ownerNickname)}
            </div>
            <div className="Stats">
              <span>
                <img src={eyeIcon} alt="조회수" />
                {featuredLog.views || 0}
              </span>
              <span>
                <img src={likeFilledIcon} alt="좋아요" />
                {featuredLog.likeCount || featuredLog.likes || 0}
              </span>
            </div>
          </div>
        </S.FeaturedInfoArea>

        <S.FeaturedMainImage>
          <img
            className="MainImg"
            src={!imgBroken && featuredLog.thumbnailUrl ? featuredLog.thumbnailUrl : defaultThumbnail}
            alt="featured"
            onError={() => setImgBroken(true)}
          />
        </S.FeaturedMainImage>
      </S.FeaturedContainer>
    </S.FeaturedWrapper>
  );
};

export default FeaturedLogComponent;
