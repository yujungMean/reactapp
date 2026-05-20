import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommS from '../../profile/styles/CommunityStyles';
import MyFailCardItemComponent from '../../commons/MyFailCardItemComponent';

const MyFailLogCardComponent = ({ filteredLogs, selectedDeleteIds = [] }) => {
  const navigate = useNavigate();

  return (
    <CommS.PostGrid
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'flex-start',
        width: '100%'
      }}
    >
      {filteredLogs.map((log, index) => {
        const isSelected = selectedDeleteIds.includes(log.id);

        return (
          <MyFailCardItemComponent
            key={log.id}
            log={log}
            index={index}
            iconSrc="/assets/picture/mypage-faillog/fail-log-card.png"
            isSelected={isSelected}
            onClick={() => navigate(`/logs/view/${log.id}`)}
          />
        );
      })}
    </CommS.PostGrid>
  );
};

export default MyFailLogCardComponent;