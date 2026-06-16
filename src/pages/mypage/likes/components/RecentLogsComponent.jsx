import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../styles/RecentLogStyles';
import ProfileS from '../../profile/styles/MyProfileStyle';
import FailLogPostCardComponent from '../../commons/FailLogPostCardComponent';

const RecentLogsComponent = ({ logs = [], onToggleLike }) => {
  const navigate = useNavigate();

  return (
    <S.RecentSection>
      <h2>최근 확인한 <span>페일로그</span></h2>

      {logs && logs.length > 0 ? (
        <ProfileS.PostGrid>
          {logs.slice(0, 3).map((log) => (
            <FailLogPostCardComponent
              key={log.id}
              log={log}
              onNavigate={() => navigate(`/logs/result/${log.id}/detail`)}
              onToggleLike={onToggleLike}
            />
          ))}
        </ProfileS.PostGrid>
      ) : (
        <S.EmptyText>최근 확인한 페일로그 내역이 없습니다.</S.EmptyText>
      )}

    </S.RecentSection>
  );
};

export default RecentLogsComponent;
