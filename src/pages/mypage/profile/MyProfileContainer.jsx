import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PageS from './styles/MyPageWrapper';
import InfoS from './styles/InfoManagementStyles';
import CommS from './styles/CommunityStyles';

import ProfileCardComponent from './components/ProfileCardComponent';
import ProfileChartCard from './components/ProfileChartCard';
import ProfileStreakCard from './components/ProfileStreakCard';
import AccountDataComponent from './components/AccountDataComponent';
import MyCommunityContainer from './components/MyCommunityContainer'; // 📌 순수한 커뮤니티 컨테이너
import HeroRotationComponent from '../heroSection/HeroRotationComponents';
import { getHeroContent } from '../heroSection/HeroData';

const MyProfileContainer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mainContent, quickMenus } = getHeroContent(pathname);

  // 회원 정보 상태 관리
  const [memberInfo, setMemberInfo] = useState({
    memberNickname: 'test',
    memberProfileImageUrl: null,
    memberEmail: 'test@example.com',
    memberName: 'test',
    memberPhone: '010-1234-5678',
    memberPhoneVerified: 1,
  });

  // 회원 정보 변경 핸들러들
  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMemberInfo((prev) => ({
        ...prev,
        memberProfileImageUrl: reader.result,
      }));
    };
  };

  const handleNicknameChange = (newNickname) => {
    setMemberInfo((prev) => ({
      ...prev,
      memberNickname: newNickname,
    }));
  };

  const handlePasswordChange = () => {
    navigate('/change-password');
  };

  return (
    <PageS.MainWrapper>
      {/* 히어로 섹션 */}
      <HeroRotationComponent mainContent={mainContent} quickMenus={quickMenus} />

      {/* 내 정보 관리 섹션 */}
      <InfoS.InfoManagementSection>
        <div className="info-header">
          <h2>내 정보 관리</h2>
          <p>내 정보의 수정 및 회원 서비스를 관리할 수 있습니다.</p>
        </div>

        <InfoS.TopCardGrid>
          <ProfileCardComponent
            memberNickname={memberInfo.memberNickname}
            memberProfileImageUrl={memberInfo.memberProfileImageUrl}
            onNicknameChange={handleNicknameChange}
            onImageChange={handleImageChange}
          />
          <ProfileChartCard />
          <ProfileStreakCard />
        </InfoS.TopCardGrid>

        <InfoS.BottomAccountArea>
          <AccountDataComponent
            memberEmail={memberInfo.memberEmail}
            memberName={memberInfo.memberName}
            memberPhone={memberInfo.memberPhone}
            memberPhoneVerified={memberInfo.memberPhoneVerified}
            onPasswordChange={handlePasswordChange}
          />
        </InfoS.BottomAccountArea>
      </InfoS.InfoManagementSection>

      {/* 내 커뮤니티 게시글 관리 섹션 */}
      <CommS.CommunitySection>
        <MyCommunityContainer />
      </CommS.CommunitySection>
    </PageS.MainWrapper>
  );
};

export default MyProfileContainer;