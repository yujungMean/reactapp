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
  ownerNickname = '',
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
        placeholder={isPageOwner ? '내 페일로그를 검색해볼까요?' : `${ownerNickname}님의 페일로그를 검색해볼까요?`}
      />

      {filteredLogs.length === 0 ? (
        <EmptyStateComponent
          title={isPageOwner
            ? <>검색하신 페일로그가 없어요.<br/><strong>다른 키워드</strong>로 찾아볼까요?</>
            : <>{ownerNickname ? `${ownerNickname}님에 대한 ` : ''}검색 결과가 없어요.</>
          }
          subText={isPageOwner ? "실패를 외면하지 않고 기록할 때, 당신의 강력한 성장 데이터가 됩니다." : undefined}
          buttonText={isPageOwner ? "피드 보러가기" : undefined}
          onButtonClick={isPageOwner ? () => navigate('/fail-logs') : undefined}
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
