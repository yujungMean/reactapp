import styled from 'styled-components';
import theme from '../../styles/theme';

const S = {};

S.Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
    background: linear-gradient(160deg, #eaf3ff 0%, #ffffff 40%, #f5eeff 100%);
`;

S.Inner = styled.div`
    max-width: 1320px;
    width: 100%;
    padding: 100px 60px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

S.TitleSection = styled.div`
    text-align: center;
    margin-bottom: 60px;
    width: 100%;

    .main-menu-title {
        font-size: clamp(40px, 4.2vw, 80px);
        font-weight: ${theme.FONT_WEIGHT.bold};
        color: ${theme.PALETTE.black};
        margin: 0 0 40px 0;
        line-height: 1.2;
        white-space: nowrap;
    }

    .main-menu-subtitle {
        font-size: ${theme.FONT_SIZE.h3_2};
        font-weight: ${theme.FONT_WEIGHT.regular};
        color: ${theme.PALETTE.black};
        margin: 0;
        line-height: 1.6;
        text-align: center;
        width: 100%;
    }
`;

S.GradientText = styled.span`
    background: linear-gradient(90deg, #027df0, #ab47ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

S.CardWrapper = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
`;

S.Card = styled.div`
    width: 200px;
    height: 240px;
    background: ${theme.PALETTE.white};
    border: 1.5px solid ${theme.GRAYSCALE[4]};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    cursor: pointer;
    padding: 24px 16px;
    box-sizing: border-box;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: -10px 25px 30px 0px rgba(0, 0, 0, 0.07);

    &:hover {
        border-color: ${theme.PALETTE.third.main};
        transform: translateY(-10px);
        box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
    }
`;

S.CardIconBox = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ $iconBg }) => $iconBg};

    img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        filter: brightness(0) invert(1);
    }
`;

S.CardLabel = styled.p`
    font-size: ${theme.FONT_SIZE.h6};
    font-weight: ${theme.FONT_WEIGHT.bold};
    color: ${theme.PALETTE.black};
    margin: 0;
    text-align: center;
`;

S.CardDesc = styled.p`
    font-size: ${theme.FONT_SIZE.h8};
    font-weight: ${theme.FONT_WEIGHT.regular};
    color: ${theme.GRAYSCALE[10]};
    margin: 0;
    text-align: center;
    line-height: 1.5;
`;

export default S;