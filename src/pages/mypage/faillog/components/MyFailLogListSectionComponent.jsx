import React from 'react';
import CommS from '../../profile/styles/CommunityStyles';
import LogS from '../styles/MyFailLogStyles';

import LogSearchComponent from '../../commons/LogSearchComponent';
import EmptyStateComponent from '../../commons/EmptyStateComponent';
import PagenationComponent from '../../../../components/commons/PagenationComponent';
import PostControlBarComponent from '../../commons/ControlBarComponent';

import MyFailLogCardComponent from './MyFailLogCardComponent';

const MyFailLogListSectionComponent = ({
  searchOption,
  setSearchOption,
  handleSearchSubmit,
  filteredLogs,
  pagedLogs,
  currentPage,
  totalPages,
  handlePageChange,
  navigate,
  selectedDeleteIds = [],
  onSelectOneLog,
  onSelectAllLogs,
  onDeleteLogs,
  isPageOwner = true,
  isEditMode = false,
  onToggleEditMode,
  onToggleLike,
}) => {
  return (
    <LogS.LogSection>
      <LogSearchComponent
        currentOption={searchOption}
        onOptionChange={setSearchOption}
        onSearchSubmit={handleSearchSubmit}
        styles={LogS}
        options={['제목', '제목+내용', '내용']}
      />

      {filteredLogs.length === 0 ? (
        <EmptyStateComponent
          title={<>아직 기록된 실패가 없네요.<br/><strong>첫 번째 페일로그</strong>를 적어볼까요?</>}
          subText="실패를 외면하지 않고 기록할 때, 당신의 강력한 성장 데이터가 됩니다."
          buttonText="시작하기"
          onButtonClick={() => navigate('/fail-logs')}
          styles={CommS}
        />
      ) : (
        <>
          {isPageOwner && (
            <LogS.EditModeBar>
              {isEditMode && (
                <PostControlBarComponent
                  isAllChecked={selectedDeleteIds.length === filteredLogs.length && filteredLogs.length > 0}
                  onSelectAll={onSelectAllLogs}
                  onDelete={onDeleteLogs}
                  selectedCount={selectedDeleteIds.length}
                  totalCount={filteredLogs.length}
                  showRestore={false}
                />
              )}
              <LogS.TrashToggleWrapper>
                <input
                  type="checkbox"
                  id="fail-log-edit-toggle"
                  checked={isEditMode}
                  onChange={onToggleEditMode}
                />
                <LogS.TrashToggleLabel htmlFor="fail-log-edit-toggle">
                  삭제 모드
                </LogS.TrashToggleLabel>
              </LogS.TrashToggleWrapper>
            </LogS.EditModeBar>
          )}

          <MyFailLogCardComponent
            filteredLogs={pagedLogs}
            selectedDeleteIds={selectedDeleteIds}
            isEditMode={isEditMode}
            onSelectOneLog={onSelectOneLog}
            onToggleLike={onToggleLike}
          />

          <LogS.PaginationWrapper>
            <PagenationComponent
              minPage={1}
              maxPage={totalPages}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </LogS.PaginationWrapper>
        </>
      )}
    </LogS.LogSection>
  );
};

export default MyFailLogListSectionComponent;
