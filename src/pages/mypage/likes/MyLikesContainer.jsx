import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PageS from '../profile/styles/MyPageWrapper';

import HeroRotationComponent from '../heroSection/HeroStripComponent';
import RecentLogsComponent from './components/RecentLogsComponent';
import LikesLogListSectionComponent from './components/LikesLogListSectionComponent';

import { getHeroContent } from '../heroSection/HeroData';
import useSearchStore from '../../../components/useSearchStore';
import EmptyStateComponent from '../commons/EmptyStateComponent';
import CommS from '../profile/styles/CommunityStyles';
import FailS from '../faillog/styles/MyFailLogStyles';
import axiosInstance from '../../../api/axiosInstance';

const CARDS_PER_ROW = 3;
const ROWS_PER_PAGE = 3;
const PAGE_SIZE = CARDS_PER_ROW * ROWS_PER_PAGE;

const MyLikesContainer = ({ isPageOwner = true }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handle } = useParams();
  const { mainContent, quickMenus } = getHeroContent(pathname);
  const { content, setContent, setPage } = useSearchStore();

  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentViewedLogs') || '[]');
    setRecentLogs(stored);

    const staleEntries = stored.filter((entry) => !entry.thumbnailUrl);
    if (staleEntries.length === 0) return;

    Promise.all(
      staleEntries.map((entry) =>
        axiosInstance.get(`/api/logs/analyze/${entry.id}`)
          .then((res) => {
            if (!res.data?.success || !res.data.data?.logInfo) return entry;
            const info = res.data.data.logInfo;
            return {
              ...entry,
              thumbnailUrl: info.logThumbnailUrl || null,
              category: info.categoryName || entry.category || '',
              likeCount: info.likeCount ?? entry.likeCount,
              isLiked: info.isLiked ?? entry.isLiked ?? false,
            };
          })
          .catch(() => entry)
      )
    ).then((refreshed) => {
      const freshMap = Object.fromEntries(refreshed.map((e) => [e.id, e]));
      setRecentLogs((prev) => {
        const next = prev.map((e) => freshMap[e.id] || e);
        localStorage.setItem('recentViewedLogs', JSON.stringify(next));
        return next;
      });
    });
  }, []);
  const [ownerNickname, setOwnerNickname] = useState('');
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    if (!isPageOwner) return;
    axiosInstance.get('/api/logs/liked-list')
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setAllLogs(res.data.data.map((item) => ({
            id: item.id,
            title: item.logTitle || '',
            content: item.visionTitle || '',
            category: item.categoryName || '',
            author: item.memberNickname || '',
            profileImg: item.memberProfileImageUrl || null,
            createdAt: item.logCreatedAt || '',
            date: item.logCreatedAt || '',
            thumbnailUrl: item.thumbnailUrl || null,
            likeCount: item.likeCount || 0,
            isLiked: true,
            views: item.readCount || 0,
            progress: item.logProgress || 0,
            logStatus: item.logStatus,
          })));
        }
      })
      .catch(console.error);
  }, [isPageOwner]);

  useEffect(() => {
    if (isPageOwner || !handle) return;
    axiosInstance.get(`/api/members/handle/${handle}`)
      .then((res) => {
        if (res.data?.success) setOwnerNickname(res.data.data.memberNickname || '');
      })
      .catch(console.error);
  }, [isPageOwner, handle]);

  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchOption, setSearchOption] = useState('제목+내용');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    let filtered = allLogs;
    if (content) {
      const keyword = content.toLowerCase().trim();
      filtered = allLogs.filter((log) => {
        if (searchOption === '제목') return log.title.toLowerCase().includes(keyword);
        if (searchOption === '내용') return log.content.toLowerCase().includes(keyword);
        return log.title.toLowerCase().includes(keyword) || log.content.toLowerCase().includes(keyword);
      });
    }
    setFilteredLogs(filtered);
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE) || 1);
  }, [allLogs, content, searchOption]);

  const pagedLogs = filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearchSubmit = (val) => {
    setContent(val);
    setCurrentPage(1);
    setPage(1);
  };

  const handleToggleRecentLike = (log) => {
    axiosInstance.post(`/api/logs/${log.id}/like`).catch(console.error);

    const updater = (item) => {
      if (item.id !== log.id) return item;
      const nextLiked = !item.isLiked;
      return {
        ...item,
        isLiked: nextLiked,
        likeCount: nextLiked ? (item.likeCount || 0) + 1 : Math.max(0, (item.likeCount || 0) - 1),
      };
    };

    setRecentLogs((prev) => prev.map(updater));

    const wasLiked = log.isLiked;
    if (wasLiked) {
      // 좋아요 해제 → 좋아요 목록에서 제거
      setAllLogs((prev) => prev.filter((item) => item.id !== log.id));
    } else {
      // 좋아요 추가 → 좋아요 목록에 없으면 추가
      setAllLogs((prev) => {
        if (prev.some((item) => item.id === log.id)) {
          return prev.map(updater);
        }
        return [{ ...log, isLiked: true, likeCount: (log.likeCount || 0) + 1 }, ...prev];
      });
    }
  };

  const handleUnlikeOne = (id) => {
    axiosInstance.post(`/api/logs/${id}/like`).catch(console.error);
    setAllLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const handleToggleEditMode = (e) => {
    const isChecked = e.target.checked;
    setIsEditMode(isChecked);
    if (!isChecked) setSelectedIds([]);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(pagedLogs.map((log) => log.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach((id) => handleUnlikeOne(id));
    setSelectedIds([]);
    setIsEditMode(false);
  };

  const hasNoCards = allLogs.length === 0;

  return (
    <PageS.MainWrapper>
      <HeroRotationComponent mainContent={mainContent} quickMenus={quickMenus} isPageOwner={isPageOwner} handle={handle} nickname={ownerNickname} />

      <FailS.SectionHeader>
        <div>
          <h2>{isPageOwner ? '나의' : `${ownerNickname}님의`} <span>페이버릿 페일로그</span></h2>
          {isPageOwner && <p>마음에 든 페일로그들을 한 곳에서 모아 볼 수 있어요.</p>}
        </div>
      </FailS.SectionHeader>

      {hasNoCards ? (
        <EmptyStateComponent
          title={isPageOwner
            ? <>아직 마음에 든 페일로그가 없네요.<br /><span>다른 로거들의 페일로그</span>를 살펴볼까요?</>
            : <>아직 <span>{ownerNickname}</span>님의 페일로그가 없어요.</>
          }
          subText="실패를 외면하지 않고 기록할 때, 당신의 강력한 성장 데이터가 됩니다."
          buttonText={isPageOwner ? "피드 보러가기" : undefined}
          onButtonClick={isPageOwner ? () => navigate('/fail-logs') : undefined}
          styles={CommS}
        />
      ) : (
        <LikesLogListSectionComponent
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          handleSearchSubmit={handleSearchSubmit}
          filteredLogs={filteredLogs}
          pagedLogs={pagedLogs}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(page) => setCurrentPage(page)}
          navigate={navigate}
          isPageOwner={isPageOwner}
          ownerNickname={ownerNickname}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          selectedIds={selectedIds}
          onSelectOne={handleSelectOne}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onToggleLike={(log) => handleUnlikeOne(log.id)}
        />
      )}

      <RecentLogsComponent logs={recentLogs} onToggleLike={handleToggleRecentLike} />
    </PageS.MainWrapper>
  );
};

export default MyLikesContainer;
