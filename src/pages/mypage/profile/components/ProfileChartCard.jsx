import React from 'react';
import InfoS from '../styles/InfoManagementStyles';

const ProfileChartCard = ({ percent = 70 }) => {
  const legendItems = [
    { color: '#2563EB', label: '외부요인 (환경/타인)' },
    { color: '#8B5CF6', label: '내부요인 (마인드/지식)' },
  ];

  return (
    <InfoS.InfoCard>
      <InfoS.DonutChartArea>
        <InfoS.CardTitle>성장 성향 분석</InfoS.CardTitle>
        <InfoS.DonutChart>
          <div>
            <strong>{percent}%</strong>
            <span>외부에 영향받는 타입</span>
          </div>
        </InfoS.DonutChart>
        <InfoS.ChartLegend>
          {legendItems.map((item) => (
            <InfoS.LegendItem key={item.label} color={item.color}>
              <span />
              {item.label}
            </InfoS.LegendItem>
          ))}
        </InfoS.ChartLegend>
      </InfoS.DonutChartArea>
    </InfoS.InfoCard>
  );
};

export default ProfileChartCard;
