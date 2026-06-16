import React from 'react';
import CommS from '../../profile/styles/CommunityStyles';
import LogS from '../../faillog/styles/MyFailLogStyles';

import LogSearchComponent from '../../commons/LogSearchComponent';
import EmptyStateComponent from '../../commons/EmptyStateComponent';
import PagenationComponent from '../../../../components/commons/PagenationComponent';
import PostControlBarComponent from '../../commons/ControlBarComponent';
import LikesLogComponent from './LikesLogComponent';

const LikesLogListSectionComponent = ({
  searchOption,
  setSearchOption,
  handleSearchSubmit,
  filteredLogs,
  pagedLogs,
  currentPage,
  totalPages,
  handlePageChange,
  navigate,
  isPageOwner = true,
  isEditMode = false,
  onToggleEditMode,
  selectedIds = [],
  onSelectOne,
  onSelectAll,
  onDelete,
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
          title={<>검색 결과가 없네요.<br /><strong>다른 키워드로 찾아볼까요?</strong></>}
          subText="실패를 외면하지 않고 기록할 때, 당신의 강력한 성장 데이터가 됩니다."
          buttonText="피드 보러가기"
          onButtonClick={() => navigate('/feed')}
          styles={CommS}
        />
      ) : (
        <>
          {isPageOwner && (
            <LogS.EditModeBar>
              {isEditMode && (
                <PostControlBarComponent
                  isAllChecked={selectedIds.length === filteredLogs.length && filteredLogs.length > 0}
                  onSelectAll={onSelectAll}
                  onDelete={onDelete}
                  selectedCount={selectedIds.length}
                  totalCount={filteredLogs.length}
                  showRestore={false}
                />
              )}
              <LogS.TrashToggleWrapper>
                <input
                  type="checkbox"
                  id="likes-edit-toggle"
                  checked={isEditMode}
                  onChange={onToggleEditMode}
                />
                <LogS.TrashToggleLabel htmlFor="likes-edit-toggle">
                  삭제 모드
                </LogS.TrashToggleLabel>
              </LogS.TrashToggleWrapper>
            </LogS.EditModeBar>
          )}

          <LikesLogComponent
            filteredLogs={pagedLogs}
            isEditMode={isEditMode}
            selectedIds={selectedIds}
            onSelectOne={onSelectOne}
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

export default LikesLogListSectionComponent;
