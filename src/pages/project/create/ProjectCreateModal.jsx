import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from '../../../api/axiosInstance';
import { 
    flexCenter, 
    flexBetweenRow, 
    flexStartRow, 
    h4Bold, 
    h8Regular, 
    h8Bold, 
    h9Regular, 
    h9Bold, 
    h11Regular 
} from '../../../styles/common';
import theme from '../../../styles/theme';
import CheckIconSrc from './create_icon/check-small.svg';

const CATEGORIES = ['전체', '사업/창업', '공부/취업', '인간관계', '건강/루틴', '기타'];

const ProjectCreateModal = ({ onClose, onCreated }) => {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    // ── 내 로그 목록 불러오기 ──
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setIsFetching(true);
                const response = await axios.get('/api/logs/my-list');
                setLogs(response.data.data || []);
            } catch (err) {
                setError('로그 목록을 불러오는데 실패했습니다.');
            } finally {
                setIsFetching(false);
            }
        };
        fetchLogs();
    }, []);

    // ── 카테고리 필터링 ──
    const filteredLogs = selectedCategory === '전체'
        ? logs
        : logs.filter((log) => log.categoryName === selectedCategory);

    // ── 프로젝트 생성 ──
    const handleSubmit = async () => {
        if (!selectedLogId) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post('/api/project/create', {
                logId: selectedLogId,
            });

            if (response.data.success) {
                onCreated(response.data.data);
                onClose();
            }
        } catch (err) {
            const msg = err.response?.data?.message;
            if (msg?.includes('분석 결과가 없습니다')) {
                setError('선택한 로그의 분석 결과가 없습니다. 먼저 로그 분석을 완료해주세요.');
            } else {
                setError('프로젝트 생성에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.Overlay>
            <S.ModalWrap>
                <S.CloseBtn onClick={onClose} disabled={isLoading}>✕</S.CloseBtn>

                <S.TitleRow>
                    <S.Title>어떤 페일로그의 프로젝트를 생성할 계획인가요?</S.Title>
                </S.TitleRow>

                {/* 카테고리 필터 */}
                <S.CategoryRow>
                    {CATEGORIES.map((cat) => (
                        <S.CategoryChip
                            key={cat}
                            $active={selectedCategory === cat}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </S.CategoryChip>
                    ))}
                </S.CategoryRow>

                {/* 로그 목록 */}
                <S.LogList>
                    {isFetching ? (
                        <S.EmptyText>로그 목록을 불러오는 중...</S.EmptyText>
                    ) : filteredLogs.length === 0 ? (
                        <S.EmptyText>해당 카테고리의 페일로그가 없습니다.</S.EmptyText>
                    ) : (
                        filteredLogs.map((log) => (
                            <S.LogCard
                                key={log.id}
                                $active={selectedLogId === log.id}
                                onClick={() => setSelectedLogId(log.id)}
                            >
                                <div>
                                    <S.LogCategory>{log.categoryName}</S.LogCategory>
                                    <S.LogTitle>
                                        <strong>{log.logTitle}</strong> - {log.visionTitle}
                                    </S.LogTitle>
                                    <S.LogDate>{log.logCreatedAt} 작성</S.LogDate>
                                </div>
                                <S.RadioCircle $active={selectedLogId === log.id}>
                                    {selectedLogId === log.id && (
                                        <S.CheckIcon src={CheckIconSrc} alt="check" />
                                    )}
                                </S.RadioCircle>
                            </S.LogCard>
                        ))
                    )}
                </S.LogList>

                {/* 에러 메시지 */}
                {error && <S.ErrorText>{error}</S.ErrorText>}

                {/* 생성 버튼 */}
                <S.SubmitBtn
                    onClick={handleSubmit}
                    disabled={!selectedLogId || isLoading}
                >
                    {isLoading ? (
                        <>
                            <S.Spinner />
                            AI가 프로젝트를 생성 중입니다...
                        </>
                    ) : (
                        '이 로그의 프로젝트 생성하기'
                    )}
                </S.SubmitBtn>
            </S.ModalWrap>
        </S.Overlay>
    );
};

// ── Styled Components ──
const S = {};

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

S.Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    ${flexCenter}
`;

S.ModalWrap = styled.div`
    width: 520px;
    max-height: 80vh;
    overflow-y: auto;
    background: ${theme.PALETTE.white};
    border-radius: 15px;
    padding: 40px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

S.CloseBtn = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 20px;
    color: ${theme.GRAYSCALE[7]};
    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

S.TitleRow = styled.div`
    margin-bottom: 24px;
`;

S.Title = styled.h2`
    ${h4Bold}
    color: ${theme.PALETTE.black};
`;

S.CategoryRow = styled.div`
    ${flexStartRow}
    gap: 8px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${theme.GRAYSCALE[3]};
    flex-wrap: wrap;
`;

S.CategoryChip = styled.button`
    padding: 8px 16px;
    border-radius: 10px;
    ${h9Bold}
    background: ${({ $active }) => ($active ? theme.PALETTE.third.main : theme.PALETTE.white)};
    color: ${({ $active }) => ($active ? theme.PALETTE.white : theme.GRAYSCALE[9])};
    border: 1px solid ${({ $active }) => ($active ? theme.PALETTE.third.main : theme.GRAYSCALE[4])};
`;

S.LogList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
    min-height: 80px;
`;

S.LogCard = styled.div`
    ${flexBetweenRow}
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid ${({ $active }) => ($active ? theme.PALETTE.third.main : theme.GRAYSCALE[4])};
    background: ${theme.PALETTE.white};
    transition: border-color 0.15s;

    &:hover {
        border-color: ${theme.PALETTE.third.main};
    }
`;

S.LogCategory = styled.span`
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    ${h11Regular}
    background: ${theme.PALETTE.third.light};
    color: ${theme.PALETTE.third.main};
    margin-bottom: 8px;
`;

S.LogTitle = styled.p`
    ${h8Regular}
    color: ${theme.GRAYSCALE[9]};
    margin-bottom: 8px;

    strong {
        ${h8Bold}
        color: ${theme.PALETTE.black};
    }
`;

S.LogDate = styled.p`
    ${h9Regular}
    color: ${theme.GRAYSCALE[7]};
`;

S.RadioCircle = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
    ${flexCenter}
    border: 1px solid ${({ $active }) => ($active ? theme.PALETTE.third.main : theme.GRAYSCALE[4])};
    background-color: ${({ $active }) => ($active ? theme.PALETTE.third.main : theme.PALETTE.white)};
    transition: all 0.15s;
`;

S.CheckIcon = styled.img`
    width: 14px;
    height: 14px;
    filter: brightness(0) invert(1);
`;

S.EmptyText = styled.p`
    ${h9Regular}
    color: ${theme.GRAYSCALE[6]};
    text-align: center;
    padding: 24px 0;
`;

S.ErrorText = styled.p`
    ${h9Regular}
    color: ${theme.PALETTE.error ?? '#ef4444'};
    text-align: center;
    margin-bottom: 12px;
`;

S.SubmitBtn = styled.button`
    width: 100%;
    height: 52px;
    border-radius: 10px;
    background: ${({ disabled }) => (disabled ? theme.GRAYSCALE[4] : theme.PALETTE.third.main)};
    color: ${theme.PALETTE.white};
    ${h8Bold}
    ${flexCenter}
    gap: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background 0.15s;

    &:hover:not(:disabled) {
        background: #9333ea;
    }
`;

S.Spinner = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;

export default ProjectCreateModal;