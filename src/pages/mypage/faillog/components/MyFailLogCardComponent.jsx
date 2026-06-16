import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../../profile/styles/MyProfileStyle';
import FailLogPostCardComponent from '../../commons/FailLogPostCardComponent';

const MyFailLogCardComponent = ({ filteredLogs, selectedDeleteIds = [], isEditMode = false, onSelectOneLog, onToggleLike }) => {
  const navigate = useNavigate();

  return (
    <S.PostGrid>
      {filteredLogs.map((log) => {
        const isSelected = isEditMode && selectedDeleteIds.includes(log.id);

        return (
          <FailLogPostCardComponent
            key={log.id}
            log={log}
            isSelected={isSelected}
            isEditMode={isEditMode}
            onSelect={() => onSelectOneLog?.(log.id)}
            onNavigate={() => navigate(`/logs/result/${log.id}/detail`)}
            onToggleLike={onToggleLike}
          />
        );
      })}
    </S.PostGrid>
  );
};

export default MyFailLogCardComponent;
