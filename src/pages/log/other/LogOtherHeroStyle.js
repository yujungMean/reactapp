import styled from 'styled-components';
import theme from '../../../styles/theme';

const S = {};

S.Wrapper = styled.section`
    width: 100%;
    background-color: #f8f9fa;
    padding: 100px 0 0 0;
`;

S.Inner = styled.div`
    max-width: 1320px;  /* 1200px → 1320px */
    margin: 0 auto;
    padding: 0 20px;    /* 0 60px → 0 20px */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    .hero-title {
        font-size: 45px;
        font-weight: ${theme.FONT_WEIGHT.bold};
        color: #1a1a1a;
        margin: 0;
        line-height: 1.2;
        letter-spacing: -1px;
    }

    .btn-text {
        font-size: 20px;
        font-weight: ${theme.FONT_WEIGHT.bold};
        color: ${theme.PALETTE.white};
        line-height: 1;
    }
`;

S.TitleWrap = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

S.GlobeIcon = styled.img`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-top: 8px;
`;

S.TitleTextWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

S.HeroSub = styled.p`
    font-size: 20px;
    color: #555;
    margin: 6px 0 0;
`;

S.StartBtn = styled.button`
    width: 135px;
    height: 45px;
    border-radius: 8px;
    margin-top: 7px;
    flex-shrink: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: linear-gradient(135deg, #027df0, #ab47ff);
    background-size: 200% 100%;
    background-position: 0% 50%;
    transition: background-position 0.4s ease, transform 0.2s ease;
    box-shadow: -10px 25px 30px 0px rgba(0, 0, 0, 0.1);
    color: ${theme.PALETTE.white};
    border: none;

    &:hover {
        background-position: 100% 50%;
        transform: translateY(-5px);
    }
`;

S.ArrowIcon = styled.img`
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
    filter: brightness(0) invert(1);
`;

export default S;