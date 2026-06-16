import styled, { css } from "styled-components";

const S = {};

// 1. 최상위 섹션 (가로형 얇은 띠)
S.HeroSectionContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 0;
  box-sizing: border-box;
`;

// 2. 메인 그리드 (아코디언처럼 펼쳐지는 패널 4개)
S.HeroGrid = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 240px;

  @media (max-width: 850px) {
    flex-direction: column;
    height: auto;
  }
`;

// 3. 패널
// 패널 순서는 항상 고정이며, $active(현재 페이지)인 패널은 기본적으로 넓게 펼쳐진 상태(flex: 2.6)를 유지한다.
// 나머지 패널은 flex: 1이며, 호버 시에만 넓어진다.
S.Panel = styled.div`
  flex: ${props => props.$active ? 2.6 : 1};
  height: 100%;
  background-color: ${props => props.$bgColor || "#E8EBFD"};
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: flex 0.4s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    flex: 2.6;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 850px) {
    height: 120px;

    &:hover {
      flex: 1;
    }
  }
`;

// 4. 텍스트 영역
S.TextGroup = styled.div`
  position: relative;
  z-index: 2;
  max-width: 70%;
  transform: translateY(-50px);

  & > * {
    margin: 0;
    white-space: normal;
    word-break: keep-all;
  }

  h3, p {
    opacity: 0;
    max-height: 0;
    transition: opacity 0.3s ease, max-height 0.3s ease;
  }

  h3 { font-size: 14px; font-weight: 400; color: #5D5FEF; line-height: 1.4; }
  h2 { font-size: 24px; font-weight: 800; color: #2D3494; line-height: 1.3; }
  p { font-size: 13px; font-weight: 400; color: #4B5563; line-height: 1.4; }

  ${S.Panel}:hover & {
    h3 { opacity: 1; max-height: 24px; }
    h2 { margin-top: 6px; }
    p { opacity: 1; max-height: 40px; margin-top: 6px; }
  }

  ${props => props.$active && css`
    h3 { opacity: 1; max-height: 24px; }
    h2 { margin-top: 6px; }
    p { opacity: 1; max-height: 40px; margin-top: 6px; }
  `}
`;

// 5. 아이콘 (더 크고 시원하게, 이미지별 위치/크기 커스텀 가능)
S.IconWrap = styled.div`
  position: absolute;
  top: ${props => props.$top ?? 'auto'};
  right: ${props => props.$right ?? '0px'};
  bottom: ${props => props.$bottom ?? '0px'};
  left: ${props => props.$left ?? 'auto'};
  width: ${props => props.$width ?? '160px'};
  height: ${props => props.$height ?? '160px'};
  z-index: 1;
  transition: transform 0.4s ease, opacity 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${S.Panel}:hover & {
    transform: scale(1.08) translate(-8px, -8px);
  }

  ${props => props.$active && css`
    transform: scale(1.08) translate(-8px, -8px);
  `}
`;

export default S;
