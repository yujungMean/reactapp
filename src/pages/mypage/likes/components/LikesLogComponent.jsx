import React from 'react';
import CommS from '../../profile/styles/CommunityStyles';
import LikesCardItemComponent from './LikesCardItemComponent';

const LikesLogComponent = ({ filteredLogs = [], onUnlikeOne }) => {
  return (
    <CommS.PostGrid
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      {filteredLogs.map((log) => (
        <LikesCardItemComponent
          key={log.id}
          log={log}
          iconSrc="/assets/picture/mypage-faillog/fail-log-card.png"
          onUnlike={onUnlikeOne}
        />
      ))}
    </CommS.PostGrid>
  );
};

export default LikesLogComponent;
