import { useState } from 'react';
import ArrowUpIcon from '../project_icon/la_arrow-up.svg';
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
            <S.CommunityTitle>다른 사람들과 성장과정을 공유하고 경험해보세요.</S.CommunityTitle>
            <S.SearchBoxWrap>
                <S.SearchBox>
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