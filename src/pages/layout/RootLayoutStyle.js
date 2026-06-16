import styled from 'styled-components';
import { Link } from 'react-router-dom';

const S = {};

// ── Header ──────────────────────────────────────────────────

S.Header = styled.header`
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

S.HeaderInner = styled.div`
  max-width: 1320px;
  width: 100%;
  padding: 0 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

S.LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

S.LogoImg = styled.img`
  height: 100px;
  width: auto;
`;

S.Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 60px;
`;

S.NavLink = styled(Link)`
  font-size: 18px;
  font-weight: 700;
  color: #333333;
  text-decoration: none;
  transition: color 0.18s;

  &:hover {
    background: linear-gradient(135deg, #027df0, #ab47ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

S.Actions = styled.div`
  display: flex;
  align-items: center;
`;

S.Btn = styled.button`
  width: 88px;
  height: 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(135deg, #027df0, #ab47ff);
  background-size: 200% 100%;
  background-position: 0% 50%;
  transition: background-position 0.6s ease;

  &:hover {
    background-position: 100% 50%;
  }
`;

// ── Footer ──────────────────────────────────────────────────

S.Footer = styled.footer`
  width: 100%;
  height: 300px;
  background-color: #1a2150;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0 240px;
`;

S.FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.FooterLogo = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

S.FooterLogoFail = styled.span`
  color: #ffffff;
`;

S.FooterLogoLog = styled.span`
  color: #f53102;
`;

S.FooterNav = styled.div`
  display: flex;
  gap: 28px;
  font-size: 14px;
  font-weight: 400;
`;

S.FooterNavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

S.FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.6;

  p {
    margin: 0;
  }
`;

S.FooterCopy = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
`;

export default S;
