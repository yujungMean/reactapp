import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from "./styles/DraftLogsComponentStyle";
import FailLogPostCardComponent from '../../commons/FailLogPostCardComponent';

const DraftLogsComponent = ({
  draftLogs = [],
  isEditMode = false,
  onToggleEditMode,
  selectedIds = [],
  onSelectOne,
  onSelectAll,
  onDelete,
}) => {
  const navigate = useNavigate();

  if (!draftLogs || draftLogs.length === 0) return null;

  const isAllSelected = draftLogs.length > 0 && selectedIds.length === draftLogs.length;
  const hasSelected = selectedIds.length > 0;

  return (
    <S.DraftSection>
      <S.DraftHeader>
        <h2>아직 <span>작성 중인 페일로그</span>가 있어요.</h2>
        <S.EditModeBar>
          {isEditMode && (
            <S.EditModeGroup>
              <S.ToggleWrapper>
                <input
                  type="checkbox"
                  id="draft-select-all"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                />
                <S.ToggleLabel htmlFor="draft-select-all">전체 선택</S.ToggleLabel>
              </S.ToggleWrapper>
              <S.DeleteButton onClick={onDelete} disabled={!hasSelected}>
                삭제
              </S.DeleteButton>
            </S.EditModeGroup>
          )}
          <S.ToggleWrapper>
            <input
              type="checkbox"
              id="draft-edit-mode"
              checked={isEditMode}
              onChange={onToggleEditMode}
            />
            <S.ToggleLabel htmlFor="draft-edit-mode">삭제 모드</S.ToggleLabel>
          </S.ToggleWrapper>
        </S.EditModeBar>
      </S.DraftHeader>

      <S.DraftGrid>
        {draftLogs.map((log) => (
          <S.DraftCardWrapper key={log.id}>
            <S.StatusBadge>작성중</S.StatusBadge>
            <FailLogPostCardComponent
              log={log}
              isSelected={isEditMode && selectedIds.includes(log.id)}
              isEditMode={isEditMode}
              onSelect={() => onSelectOne?.(log.id)}
              onNavigate={() => navigate(`/logs/new/step1/${log.id}`)}
              compact
            />
          </S.DraftCardWrapper>
        ))}
      </S.DraftGrid>
    </S.DraftSection>
  );
};

export default DraftLogsComponent;
