import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import S from './RootLayoutStyle';
import ChatbotContainer from '../main/ChatbotContainer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RootLayout = () => {
  const { isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/private/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {}
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    fetch('/private/member/me', { credentials: 'include' })
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.success && json?.data) {
          setUser(json.data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
  }, [setIsAuthenticated, setUser]);

  return (
    <div>
      <ScrollToTop />
      <S.Header>
        <S.HeaderInner>

          <S.LogoLink to="/">
            <S.LogoImg src="/assets\picture\logo.png" alt="FailLog" />
          </S.LogoLink>

          <S.Nav>
            <S.NavLink to="/fail-logs">페일로그</S.NavLink>
            <S.NavLink to="/projects">프로젝트</S.NavLink>
            <S.NavLink to="/chronology">성장연대기</S.NavLink>
            <S.NavLink to="/community">커뮤니티</S.NavLink>
            <S.NavLink to="/my-page/profile">마이페이지</S.NavLink>
          </S.Nav>

          <S.Actions>
            {isAuthenticated ? (
              <S.Btn onClick={handleLogout}>로그아웃</S.Btn>
            ) : (
              <S.Btn as={Link} to="/login">로그인</S.Btn>
            )}
          </S.Actions>

        </S.HeaderInner>
      </S.Header>

      <main>
        <Outlet />
      </main>

      <ChatbotContainer />

      <S.Footer>
        <S.FooterInner>
          <S.FooterLogo>
            <S.FooterLogoFail>Fail</S.FooterLogoFail>
            <S.FooterLogoLog>Log</S.FooterLogoLog>
          </S.FooterLogo>
          <S.FooterNav>
            <S.FooterNavLink to="/terms">이용약관</S.FooterNavLink>
            <S.FooterNavLink to="/privacy">개인정보처리방침</S.FooterNavLink>
            <S.FooterNavLink to="/support">고객센터</S.FooterNavLink>
          </S.FooterNav>
          <S.FooterInfo>
            <p>법인명 : FailLog | 대표자 : 000 | 사업자 등록번호 : 000-00-00000 | 사업 소재지 : 서울 강남구 테헤란로 146</p>
            <p>이메일 : FailLog@FailLog.co.kr | 팩스 : 02-538-0021</p>
          </S.FooterInfo>
          <S.FooterCopy>© 2026 FailLog. All rights reserved.</S.FooterCopy>
        </S.FooterInner>
      </S.Footer>
    </div>
  );
};

export default RootLayout;
