import styled, { keyframes } from 'styled-components';
import {
	flexBetweenRow,
	flexStartRow,
	flexCenter,
	h4Bold,
	h8Regular,
} from '../../../styles/common';
import theme from '../../../styles/theme';

const glow = keyframes`
    0%   { filter: drop-shadow(0 0 3px rgba(171, 71, 255, 0.6)); opacity: 1; }
    50%  { filter: drop-shadow(0 0 10px rgba(2, 125, 240, 1)) drop-shadow(0 0 20px rgba(171, 71, 255, 0.9)); opacity: 0.85; }
    100% { filter: drop-shadow(0 0 3px rgba(171, 71, 255, 0.6)); opacity: 1; }
`;

const S = {};

S.SearchRow = styled.div`
	${flexBetweenRow}
	align-items: flex-start;
	margin-bottom: 100px;
`;

S.TitleWrap = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 16px;
`;

S.TitleIcon = styled.img`
	width: 36px;
	height: 36px;
	object-fit: contain;
	flex-shrink: 0;
	margin-top: 12px;
`;

S.TitleTextWrap = styled.div`
	display: flex;
	flex-direction: column;
`;

S.CommunityTitle = styled.h3`
	font-size: 45px;
	font-weight: ${theme.FONT_WEIGHT.bold};
	color: ${theme.PALETTE.black};
	line-height: 1.4;
	margin: 0;
`;

S.CommunitySubtitle = styled.p`
	font-size: 20px;
	color: ${theme.TEXT_COLOR.basic};
	margin: 6px 0 0;
`;

S.SearchBoxWrap = styled.div`
	width: 536px;
	height: 60px;
	border-radius: 15px;
	padding: 2px;
	background: linear-gradient(90deg, ${theme.PALETTE.primary.main}, ${theme.PALETTE.third.main});
`;

S.SearchBox = styled.div`
	${flexStartRow}
	width: 100%;
	height: 100%;
	border-radius: 13px;
	background: ${theme.PALETTE.white};
	padding: 0 12px 0 20px;
	gap: 10px;
`;

S.SearchIcon = styled.img`
	width: 20px;
	height: 20px;
	flex-shrink: 0;
	animation: ${glow} 2.4s ease-in-out infinite;
`;

S.SearchInput = styled.input`
	border: none;
	outline: none;
	${h8Regular}
	flex: 1;
	background: transparent;
`;

S.SearchBtn = styled.button`
	${flexCenter}
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: linear-gradient(135deg, ${theme.PALETTE.primary.main}, ${theme.PALETTE.third.main});
`;

S.ArrowIcon = styled.img`
	width: 18px;
	height: 18px;
	filter: brightness(0) invert(1);
`;

export default S;