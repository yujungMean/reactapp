import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileS from '../../profile/styles/MyProfileStyle';
import FailLogPostCardComponent from '../../commons/FailLogPostCardComponent';
import S from '../styles/MyFailLogStyles';
import PostControlBarComponent from '../../commons/ControlBarComponent';
import PagenationComponent from '../../../../components/commons/PagenationComponent';

const PAGE_SIZE = 9;

const TrashComponent = ({
  trashedLogs = [],
  isTrashEditMode,
  onToggleEditMode,
  selectedTrashIds = [],
  onSelectOneTrash,
  onSelectAllTrash,
  onRestoreSelected,
  onDeleteForeverSelected,
  onToggleLike,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(trashedLogs.length / PAGE_SIZE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const pagedLogs = trashedLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <S.SectionHeader>
        <h2><span>페일로그 </span>휴지통</h2>

        <S.EditModeGroup>
          {isTrashEditMode && (
            <PostControlBarComponent
              isAllChecked={selectedTrashIds.length === trashedLogs.length && trashedLogs.length > 0}
              onSelectAll={onSelectAllTrash}
              selectedCount={selectedTrashIds.length}
              totalCount={trashedLogs.length}
              showRestore={true}
              onRestore={onRestoreSelected}
              onDelete={onDeleteForeverSelected}
            />
          )}
          <S.TrashToggleWrapper>
            <input
              type="checkbox"
              id="trash-edit-toggle"
              checked={isTrashEditMode}
              onChange={onToggleEditMode}
            />
            <S.TrashToggleLabel htmlFor="trash-edit-toggle">
              휴지통 관리 모드 켜기
            </S.TrashToggleLabel>
          </S.TrashToggleWrapper>
        </S.EditModeGroup>
      </S.SectionHeader>

      {trashedLogs.length === 0 ? (
        <S.TrashEmpty>
          <p>휴지통이 비어 있습니다.</p>
        </S.TrashEmpty>
      ) : (
        <>
          <ProfileS.PostGrid style={{ marginTop: '30px' }}>
            {pagedLogs.map((log) => {
              const isSelected = isTrashEditMode && selectedTrashIds.includes(log.id);
              return (
                <S.TrashCardWrapper key={log.id}>
                  <FailLogPostCardComponent
                    log={log}
                    isSelected={isSelected}
                    isEditMode={isTrashEditMode}
                    onSelect={() => onSelectOneTrash?.(log.id)}
                    onNavigate={() => navigate(`/logs/result/${log.id}/detail`)}
                    onToggleLike={onToggleLike}
                  />
                </S.TrashCardWrapper>
              );
            })}
          </ProfileS.PostGrid>

          <S.TrashPaginationWrapper>
            <PagenationComponent minPage={1} maxPage={totalPages} page={currentPage} onPageChange={setCurrentPage} />
          </S.TrashPaginationWrapper>
        </>
      )}
    </>
  );
};

export default TrashComponent;
