import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import S from './LogOtherListStyle';
import { goToMemberProfile } from '../../../utils/profileNavigation';
import { formatRelativeTime } from '../../../utils/relativeTime';

import viewIcon from './otherLog_icon/hugeicons--view.svg';
import heartIcon from './otherLog_icon/ph--heart-light.svg';

import { THUMBNAIL_MAP, DefaultThumb } from './thumbnailMap';

const CATEGORY_VARIANT = {
    '인간관계': 'pink',
    '공부/취업': 'blue',
    '기타': 'gray',
    '사업/창업': 'purple',
    '건강/루틴': 'green',
};

const getCategoryVariant = (categoryName) => CATEGORY_VARIANT[categoryName] || 'gray';

const LogOtherList = ({ keyword, category, sort }) => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const SIZE = 9;

    // keyword, category, sort 바뀌면 목록 초기화
    useEffect(() => {
        setLogs([]);
        setPage(0);
        setHasMore(true);
    }, [keyword, category, sort]);

    // page, keyword, category, sort 바뀔 때마다 데이터 불러오기
    useEffect(() => {
        const fetchLogs = async () => {
            if (!hasMore) return;

            setLoading(true);
            try {
                let url;

                if (keyword) {
                    url = `http://localhost:10000/api/logs/search?keyword=${keyword}&page=${page}&size=${SIZE}&sort=${encodeURIComponent(sort)}`;
                } else if (category && category !== '전체') {
                    url = `http://localhost:10000/api/logs/category?category=${encodeURIComponent(category)}&page=${page}&size=${SIZE}&sort=${encodeURIComponent(sort)}`;
                } else {
                    url = `http://localhost:10000/api/logs?page=${page}&size=${SIZE}&sort=${encodeURIComponent(sort)}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                const newLogs = data.data;

                if (newLogs.length < SIZE) setHasMore(false);
                
                // 페이지가 0이면 덮어쓰기, 아니면 이어붙이기 (useEffect 경쟁 상태 방지)
                if (page === 0) {
                    setLogs(newLogs);
                } else {
                    setLogs((prev) => {
                        // 중복 제거 방어로직 추가
                        const existingIds = new Set(prev.map(log => log.id));
                        const filteredNewLogs = newLogs.filter(log => !existingIds.has(log.id));
                        return [...prev, ...filteredNewLogs];
                    });
                }
            } catch (err) {
                console.error('로그 목록 조회 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [page, keyword, category, sort, hasMore]);

    // 스크롤 이벤트
    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div>
            <S.ListWrapper>
                <S.CardGrid>
                    {logs.map((log) => (
                        <Link to={`/logs/result/${log.id}/detail`} key={log.id} style={{ textDecoration: 'none' }}>
                            <S.Card>
                                <S.CardBody>
                                    <S.CardTop>
                                        <S.Category $variant={getCategoryVariant(log.categoryName)}>
                                            {log.categoryName}
                                        </S.Category>
                                        <S.Date>{formatRelativeTime(log.logCreatedAt)}</S.Date>
                                    </S.CardTop>

                                    <S.Title>{log.logTitle}</S.Title>
                                    <S.Vision>{log.visionTitle}</S.Vision>

                                    <S.CardBottom>
                                        <S.Profile onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToMemberProfile(navigate, log.memberId); }} style={{ cursor: 'pointer' }}>
                                            <S.AvatarWrap>
                                                <S.Avatar
                                                    src={log.memberProfileImageUrl || '/assets/picture/default-profile.png'}
                                                    alt={log.memberNickname}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/picture/default-profile.png'; }}
                                                />
                                            </S.AvatarWrap>
                                            <S.Nickname>{log.memberNickname}</S.Nickname>
                                        </S.Profile>
                                        <S.Stats>
                                            <S.Stat>
                                                <img src={viewIcon} alt="views" width="16" height="16" />
                                                {log.readCount}
                                            </S.Stat>
                                            <S.Stat>
                                                <img src={heartIcon} alt="likes" width="16" height="16" />
                                                {log.likeCount}
                                            </S.Stat>
                                        </S.Stats>
                                    </S.CardBottom>
                                </S.CardBody>

                                <S.ThumbnailWrap>
                                    <S.Thumbnail
                                        src={log.thumbnailUrl || THUMBNAIL_MAP[log.id] || DefaultThumb}
                                        alt={log.logTitle}
                                    />
                                </S.ThumbnailWrap>
                            </S.Card>
                        </Link>
                    ))}
                </S.CardGrid>

                {loading && <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>}
                {!hasMore && (
                    <S.EndMessage>
                        <S.EndLine />
                        <S.EndText>모든 로그를 불러왔습니다.</S.EndText>
                        <S.EndLine />
                    </S.EndMessage>
                )}
            </S.ListWrapper>
        </div>
    );
};

export default LogOtherList;