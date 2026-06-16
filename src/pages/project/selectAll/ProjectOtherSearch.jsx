import { useState } from 'react';
import ArrowUpIcon from '../project_icon/la_arrow-up.svg';
import CommunityIcon from '../project_icon/bank-check_4014667.png';
import GeminiIcon from '../../log/other/otherLog_icon/material-icon-theme_gemini-ai.svg';
import S from './ProjectOtherSearchStyle';

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
const ProjectOtherSearch = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    // ── 검색 실행 ──
    const handleSearch = () => {
        onSearch(keyword.trim());
    };

    // ── 엔터키로 검색 ──
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <S.SearchRow>
            <S.TitleWrap>
                <S.TitleIcon src={CommunityIcon} alt="community icon" />
                <S.TitleTextWrap>
                    <S.CommunityTitle>로거들과 재도전을 공유해보세요.</S.CommunityTitle>
                    <S.CommunitySubtitle>다른 로거들의 프로젝트를 탐색해보세요.</S.CommunitySubtitle>
                </S.TitleTextWrap>
            </S.TitleWrap>
            <S.SearchBoxWrap>
                <S.SearchBox>
                    <S.SearchIcon src={GeminiIcon} alt="search" />
                    <S.SearchInput
                        placeholder="다양한 성장 과정을 탐색해보세요."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <S.SearchBtn onClick={handleSearch}>
                        <S.ArrowIcon src={ArrowUpIcon} alt="search" />
                    </S.SearchBtn>
                </S.SearchBox>
            </S.SearchBoxWrap>
        </S.SearchRow>
    );
};

export default ProjectOtherSearch;