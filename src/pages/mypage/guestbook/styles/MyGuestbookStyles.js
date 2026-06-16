import styled from 'styled-components';
import { colorCSS, sizeCSS, gradientText } from '../../../../components/style';

const S = {};

/* ── 섹션 래퍼 ── */
S.GuestbookSection = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 60px 0 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* ── 섹션 헤더 ── */
S.GuestbookHeader = styled.div`
  margin-bottom: 8px;

  h2 {
    ${sizeCSS['h3_2Bold']}
    font-size: 45px;
    font-weight: 800;
    color: #1E293B;
    margin: 0 0 10px 0;
    span {
      ${gradientText}
    }
  }

  p {
    ${sizeCSS['h9-regular']}
    font-size: 20px;
    color: #64748B;
    margin: 0;
  }
`;

/* ── 검색창 래퍼 ── */
S.SearchRowWrapper = styled.div`
  margin: 50px 0;
`;

/* ── 페이지네이션 ── */
S.PaginationWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ── 빈 상태 ── */
S.EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0 60px;
  text-align: center;

  h3 {
    ${sizeCSS['h3Bold']}
    color: ${colorCSS['faillog-black']};
    margin: 0 0 20px;
    span {
      ${gradientText}
    }
  }

  p {
    ${sizeCSS['h4Regular']}
    color: ${colorCSS['faillog_gray10']};
    line-height: 1.8;
    margin: 0 0 40px;
  }

  button {
    padding: 12px 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #027df0, #ab47ff);
    background-size: 200% 200%;
    background-position: 0% 50%;
    transition: background-position 0.6s ease;
    color: ${colorCSS['faillog_white']};
    ${sizeCSS['h8-bold']}
    border: none;
    cursor: pointer;
    box-shadow: -10px 25px 30px 0px rgba(0, 0, 0, 0.07);
    &:hover { background-position: 100% 50%; }
  }
`;

export default S;
