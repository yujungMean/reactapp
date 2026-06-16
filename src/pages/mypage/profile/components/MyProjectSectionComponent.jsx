import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';
import ProjectMyList from '../../../project/selectAll/ProjectMyList';
import EmptyStateComponent from '../../commons/EmptyStateComponent';
import S from '../styles/MyProfileStyle';
import CommS from '../styles/CommunityStyles';

const MyProjectSectionComponent = ({ memberId, isPageOwner, memberNickname = '' }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!memberId) return;
    const url = isPageOwner ? '/api/project/list' : `/api/project/member/${memberId}`;
    axiosInstance.get(url)
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setProjects(res.data.data);
        }
      })
      .catch(console.error);
  }, [memberId, isPageOwner]);

  return (
    <CommS.CommunitySection>
      <S.CommunityContainer style={{ marginTop: 0 }}>
        <S.HeaderSection>
          <div>
            {isPageOwner ? (
              <>
                <h3>내 프로젝트</h3>
                <p>진행 중인 프로젝트를 한눈에 확인해보세요.</p>
              </>
            ) : (
              <h3>{memberNickname || '회원'}님의 프로젝트</h3>
            )}
          </div>
        </S.HeaderSection>

        {projects.length === 0 ? (
          <EmptyStateComponent
            title={isPageOwner
              ? <>아직 생성된 프로젝트가 없어요.<br /><span>첫 번째 프로젝트</span>를 시작해볼까요?</>
              : <>{memberNickname || '회원'}님은 아직 프로젝트가 없어요.</>
            }
            subText={isPageOwner ? "페일로그를 분석하여 맞춤 프로젝트를 시작해봐요." : undefined}
            buttonText={isPageOwner ? "프로젝트 시작하기" : undefined}
            onButtonClick={isPageOwner ? () => navigate('/projects') : undefined}
            styles={CommS}
          />
        ) : (
          <ProjectMyList
            projects={projects}
            onCardClick={(project) => navigate(`/projects/${project.id}`)}
          />
        )}
      </S.CommunityContainer>
    </CommS.CommunitySection>
  );
};

export default MyProjectSectionComponent;
