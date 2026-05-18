import React from 'react';
import InfoS from '../styles/InfoManagementStyles';

const ProfileStreakCard = () => {
  const stats = [
    { label: '작성 글 수', value: 45 },
    { label: '작성 로그 수', value: 104 },
    { label: '오늘 방문자 수', value: 71 },
  ];

  return (
    <InfoS.InfoCard>
      <InfoS.StreakHeader>
        <h3>5일째 불타는 중!🔥</h3>
        <p>작은 기록이 쌓일수록 더 단단해집니다.</p>
      </InfoS.StreakHeader>
      <InfoS.StreakGrid>
        {stats.map((stat) => (
          <InfoS.StreakStat key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </InfoS.StreakStat>
        ))}
      </InfoS.StreakGrid>
    </InfoS.InfoCard>
  );
};

export default ProfileStreakCard;
