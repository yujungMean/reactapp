import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PageS from './styles/MyPageWrapper'; 
import InfoS from './styles/InfoManagementStyles'; 
import CommS from './styles/CommunityStyles'; 

import mainImg from '../heroSection/resources/fail-logs.png';
import mylogImg from '../heroSection/resources/my-fail-log.png';
import likesImg from '../heroSection/resources/likes.png';
import guestbookImg from '../heroSection/resources/guestbook.png';

import ProfileCardComponent from './components/ProfileCardComponent';
import AccountDataComponent from './components/AccountDataComponent';
import MyCommunityContainer from './components/MyCommunityContainer';
import HeroRotationComponent from '../heroSection/HeroRotationComponents';

const MyProfileContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 회원 정보 상태 (이미지 상태를 여기에 통합하면 관리가 편합니다)
  const [memberInfo, setMemberInfo] = useState({
    memberNickname: 'test',
    memberProfileImageUrl: null, 
    memberEmail: 'test@example.com',
    memberName: 'test',
    memberPhone: '010-1234-5678',
    memberPhoneVerified: 1 
  });

  // 2. 이미지 변경 핸들러 (const 추가 및 중복 제거)
  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMemberInfo(prev => ({
        ...prev,
        memberProfileImageUrl: reader.result // 미리보기 데이터를 상태에 저장
      }));
    };
  };

  // 3. 닉네임 변경 핸들러
  const handleNicknameChange = (newNickname) => {
    setMemberInfo(prev => ({
      ...prev,
      memberNickname: newNickname
    }));
    console.log("닉네임 변경 완료:", newNickname);
  };

  const handlePasswordChange = () => {
    navigate('/change-password'); // 실제 경로로 수정 필요
  };

  // 4. 히어로 섹션 데이터 (동일)
  const heroData = [
    { id: "fail-logs", path: "/fail-logs", subTitle: "페일로그를 작성해보고 싶다면", title: "페일로그 바로가기", description: "실패를 기록하고 성장의 발판으로 삼으세요.", bgColor: "#E8EBFD", img: mainImg },
    { id: "my-fail-log", path: "/my-page/fail-logs", subTitle: "내가 작성한 로그를 보고 싶다면", title: "마이 페일로그", description: "내가 작성한 로그를 볼 수 있어요.", bgColor: "#F0F3FF", img: mylogImg },
    { id: "likes", path: "/my-page/likes", subTitle: "참고하고 싶은 게시글을 모아둔", title: "좋아요 한 페일로그", description: "좋아요 한 게시글을 모아 볼 수 있어요.", bgColor: "#EBF8FF", img: likesImg },
    { id: "guestbook", path: "/my-page/guestbook", subTitle: "다른 사람들과 소통하는", title: "페일로그 방명록", description: "내게 남긴 말을 확인해보세요.", bgColor: "#EEF2FF", img: guestbookImg }
  ];

  const mainContent = heroData.find(item => item.path === location.pathname) || heroData[0];
  const quickMenus = heroData.filter(item => item.id !== mainContent.id);

  return (
    <PageS.MainWrapper>
      <HeroRotationComponent 
        mainContent={mainContent} 
        quickMenus={quickMenus} 
      />

     <InfoS.InfoManagementSection>
      <div className="info-header">
        <h2>내 정보 관리</h2>
        <p>내 정보의 수정 및 회원 서비스를 관리할 수 있습니다.</p>
      </div>
      {/* 윗줄: 3개 그리드 (기획안 반영) */}
      <InfoS.TopCardGrid>
        <ProfileCardComponent 
          memberNickname={memberInfo.memberNickname}
          memberProfileImageUrl={memberInfo.memberProfileImageUrl}
          onNicknameChange={handleNicknameChange}
          onImageChange={handleImageChange}
        />
        {/* 아직 컴포넌트가 없으니 임시로 InfoS.ProfileCard를 사용하여 자리를 잡습니다 */}
        <InfoS.ProfileCard><div>차트 카드 (준비 중)</div></InfoS.ProfileCard>
        <InfoS.ProfileCard><div>활동량 카드 (준비 중)</div></InfoS.ProfileCard>
      </InfoS.TopCardGrid>

      {/* 아랫줄: 1개 긴 카드 */}
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
      <CommS.CommunitySection>
        <MyCommunityContainer />
      </CommS.CommunitySection>
    </PageS.MainWrapper>
  );
};

export default MyProfileContainer;