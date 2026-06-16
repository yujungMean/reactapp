import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../../profile/styles/MyProfileStyle';
import FailLogPostCardComponent from '../../commons/FailLogPostCardComponent';

const LikesLogComponent = ({ filteredLogs = [], isEditMode = false, selectedIds = [], onSelectOne, onToggleLike }) => {
  const navigate = useNavigate();

  return (
    <S.PostGrid>
      {filteredLogs.map((log) => (
        <FailLogPostCardComponent
          key={log.id}
          log={log}
          isSelected={isEditMode && selectedIds.includes(log.id)}
          isEditMode={isEditMode}
          onSelect={() => onSelectOne?.(log.id)}
          onNavigate={() => navigate(`/logs/result/${log.id}/detail`)}
          onToggleLike={onToggleLike}
        />
      ))}
    </S.PostGrid>
  );
};

export default LikesLogComponent;
