import styled from "styled-components";
// 📌 프로젝트 구조에 맞는 공통 디자인 시스템 경로 확인
import { sizeCSS, colorCSS, gradientText } from "../../../../components/style";

const S = {};

// ==========================================
// ── 0. 공통 및 제목 스타일 ──
// ==========================================
S.SectionHeader = styled.div`
  margin: 60px 0 30px 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 45px;
    font-weight: 800;
    color: #1e293b;

    span {
      ${gradientText}
    }
  }

  p {
    font-size: 20px;
    color: #64748b;
    margin-top: 10px;
  }
`;

// ==========================================
// ── 2. 강조된 페일로그 (FeaturedSection) 영역 ──
// ==========================================
S.FeaturedContainer = styled.section`
  display: flex;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 80px;
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  height: 380px;

  &:hover {
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

S.FeaturedMainImage = styled.div`
  flex: 0.9;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    height: 280px;
  }
`;

S.FeaturedInfoArea = styled.div`
  flex: 1.1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .Badge {
    align-self: flex-start;
    font-size: 13px;
    font-weight: 700;
    color: #6366f1;
    background: #eef2ff;
    border-radius: 999px;
    padding: 6px 14px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 28px;
    font-weight: 800;
    color: #1E293B;
    margin: 0 0 16px 0;
    line-height: 1.4;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 16px;
    color: #64748B;
    line-height: 1.7;
    font-weight: 400;
    margin: 0 0 30px 0;
    word-break: keep-all;
  }

  .Meta {
    display: flex;
    align-items: center;
    gap: 15px;

    .User {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #475569;
      img { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }
    }
    .Stats {
      display: flex;
      gap: 12px;
      font-size: 14px;
      color: #94a3b8;
      margin-left: auto;
      span { display: flex; align-items: center; gap: 4px; }
      img { width: 16px; height: 16px; }
    }
  }

  @media (max-width: 1024px) {
    padding: 30px;
  }
`;

// ==========================================
// ── 3. 완료된 페일로그 (LogSection) 영역 ──
// ==========================================
S.LogSection = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;               /* 🎯 너비 기준점 명시 */
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;

  h3 {
    font-size: 32px;
    font-weight: 800;
    color: #1E293B;
    margin: 0 0 12px 0;
  }
  .sub-desc {
    font-size: 16px;
    color: #64748B;
    margin: 0 0 24px 0;
    line-height: 1.7;
    font-weight: 400;
    max-width: 760px;
  }
`;

/* 🎯 레이어 오버레이 + 프롭스 동적 컬러 가이드가 통합된 마이 페일카드 */
S.MyFailCard = styled.div`
  width: 258px;
  height: 336px;
  background: ${(props) => props.bgColor || colorCSS["faillog_gray8"]};
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid transparent; 
  transition: border-color 0.25s ease, transform 0.2s ease, background-color 0.25s ease;

  /* 🔥 [레이어 2] 암전 필름 오버레이 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(25, 34, 49, 0.45); 
    z-index: 2; 
    transition: opacity 0.25s ease;
  }

  /* ✨ 마우스 호버 인터랙션 */
  &:hover {
    border-color: ${colorCSS["faillog_purple"]}; 
    transform: translateY(-4px);
    background-color: ${colorCSS["faillog_white"]} !important; 
    
    &::before {
      opacity: 0; 
    }
    
    /* 호버 시 텍스트 컬러를 공통 규격인 faillog-black(#333333)으로 반전 및 선명도 복구 */
    h4, .TimeText, .AuthorArea span {
      color: ${colorCSS["faillog-black"]} !important;
      opacity: 1 !important;
    }

    .CardMainImage img {
      filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.08));
    }
  }
`;

S.MyFailContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  /* 🔥 [레이어 3] 최상단 콘텐츠 격리 레이어 그룹 */
  .ContentGroup {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    height: 100%;
    pointer-events: none;
    
    * {
      pointer-events: auto;
    }
  }

  /* 제목: 원래 크기(16px, Bold)에 맞는 "h8-bold" 매핑 + 외부 주입 텍스트 컬러 적용 */
  h4 {
    ${sizeCSS["h8-bold"]}
    color: ${(props) => props.textColor || "#FFFFFF"}; 
    margin: 0 0 8px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;
  }

  /* 작성자 영역 */
  .AuthorArea {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: auto;
    
    .ProfileIcon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* 닉네임: 원래 크기(12px, Regular)에 맞는 "h10-regular" 매핑 + 외부 주입 텍스트 컬러 적용 */
    span {
      ${sizeCSS["h10-regular"]}
      color: ${(props) => props.textColor || "#FFFFFF"};
      opacity: 0.8;
      font-weight: 500;
      transition: color 0.2s ease;
    }
  }

  /* 🔥 [레이어 1] 배경 내부 이미지 센터링 박스 */
  .CardMainImage {
    position: absolute;
    left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
    z-index: 1; 
    width: 110px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    img { 
      width: 100%; 
      height: 100%; 
      object-fit: contain; 
      filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15));
      transition: filter 0.25s ease;
    }
  }

  /* 하단 푸터 영역 */
  .CardFooter {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    /* 작성일자: 가독성을 만족하는 "h9-regular" 매핑 + 외부 주입 텍스트 컬러 적용 */
    .TimeText { 
      ${sizeCSS["h9-regular"]}
      color: ${(props) => props.textColor || "#FFFFFF"}; 
      opacity: 0.8; 
      transition: color 0.2s ease;
    }
  }
`;

// ==========================================
// ── 4. 검색 및 필터 컨트롤 블록 라인 ──
// ==========================================
S.SearchControlBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 🎯 중앙 정렬이 아닌 왼쪽 시작 정렬로 변경 */
  gap: 12px;
  width: 100%;             
  max-width: 1160px; /* 카드 전체가 차지하는 폭과 동일하게 설정 */
  margin: 0 0 24px 0; /* 🎯 가운데 정렬(auto)을 풀고 왼쪽 정렬로 고정 */
  flex-wrap: wrap;

`;

S.DropdownWrapper = styled.div`
  width: 160px;
  flex-shrink: 0;

  & > div {
    height: 44px;
    display: flex;
    align-items: center;
  }
`;

S.SearchbarWrapper = styled.div`
  flex: 1;
  height: 44px;
  display: flex;
  align-items: center;

  form, input {
    height: 44px !important;
    box-sizing: border-box;
  }
`;

S.FeaturedWrapper = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto 60px;
`;

S.TrashSeparator = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 100px auto 40px;
  border-top: 1px dashed #CBD5E1;
  padding-top: 60px;
`;

S.PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.ControlBarAbsolute = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
`;

S.EditModeBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

S.EditModeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.TrashToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

S.TrashToggleLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
`;

S.TrashEmpty = styled.div`
  text-align: center;
  padding: 80px 0;
  color: #94A3B8;

  p {
    font-size: 16px;
    font-weight: 500;
  }
`;

S.TrashCardWrapper = styled.div`
  position: relative;
`;

S.TrashPaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default S;