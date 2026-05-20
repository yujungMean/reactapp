import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './LogOtherHeroStyle';

const LogOtherHero = () => {
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.Inner>
                <S.TitleWrap>
                    <S.GlobeIcon src="/assets/picture/log-other-icon/internet_2282299.svg" alt="globe" />
                    <h1 className="hero-title">다른 사람의 경험을 만나보세요.</h1>
                </S.TitleWrap>
                <S.StartBtn onClick={() => navigate('/logs/new/step1')}>
                    <span className="btn-text">시작하기</span>
                    <S.ArrowIcon src="/assets/picture/log-other-icon/bitcoin-icons--arrow-up-filled.svg" alt="arrow" />
                </S.StartBtn>
            </S.Inner>
        </S.Wrapper>
    );
};

export default LogOtherHero;