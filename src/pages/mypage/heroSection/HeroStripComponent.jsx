import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './styles/HeroStripStyles';
import { heroData } from './HeroData';

const resolveMenuPath = (path, handle) => {
  if (!handle) return path;
  if (path.startsWith('/my-page/')) return path.replace('/my-page/', `/my-page/${handle}/`);
  return path;
};

const HeroStripComponent = ({ mainContent, quickMenus, isPageOwner = true, handle = null, nickname = null }) => {
  const navigate = useNavigate();

  if (!mainContent || !quickMenus) return null;

  // 클릭/현재 페이지 여부와 상관없이 패널 순서는 항상 고정 (남의 페이지에서는 좋아요 카드 제외)
  const panels = isPageOwner ? heroData : heroData.filter((panel) => panel.id !== 'likes');
  const displayName = nickname || handle || '회원';

  // 남의 페이지에서는 패널별 안내 문구를 해당 회원 기준으로 바꿔서 보여줌
  const getText = (panel, field) => {
    if (!isPageOwner && panel.other?.[field]) return panel.other[field](displayName);
    return panel[field];
  };

  return (
    <S.HeroSectionContainer>
      <S.HeroGrid>
        {panels.map((panel) => {
          const resolvedPath = resolveMenuPath(panel.path, handle);
          const isActive = panel.id === mainContent.id;

          return (
            <S.Panel
              key={panel.id}
              $bgColor={panel.bgColor}
              $active={isActive}
              onClick={() => navigate(resolvedPath)}
            >
              <S.TextGroup $active={isActive}>
                <h3>{getText(panel, 'subTitle')}</h3>
                <h2>{getText(panel, 'title')}</h2>
                <p>{getText(panel, 'description')}</p>
              </S.TextGroup>
              {panel.img && (
                <S.IconWrap
                  $active={isActive}
                  $top={panel.icon?.top}
                  $right={panel.icon?.right}
                  $bottom={panel.icon?.bottom}
                  $left={panel.icon?.left}
                  $width={panel.icon?.width}
                  $height={panel.icon?.height}
                >
                  <img src={panel.img} alt={panel.title} />
                </S.IconWrap>
              )}
            </S.Panel>
          );
        })}
      </S.HeroGrid>
    </S.HeroSectionContainer>
  );
};

export default HeroStripComponent;
