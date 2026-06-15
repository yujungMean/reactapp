import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './styles/HeroStripStyles';
import { heroData } from './HeroData';

const resolveMenuPath = (path, handle) => {
  if (!handle) return path;
  if (path.startsWith('/my-page/')) return path.replace('/my-page/', `/my-page/${handle}/`);
  return path;
};

const HeroStripComponent = ({ mainContent, quickMenus, isPageOwner = true, handle = null }) => {
  const navigate = useNavigate();

  if (!mainContent || !quickMenus) return null;

  // 클릭/현재 페이지 여부와 상관없이 패널 순서는 항상 고정
  const panels = heroData;

  return (
    <S.HeroSectionContainer>
      <S.HeroGrid>
        {panels.map((panel) => {
          const isDisabled = !isPageOwner && panel.id === 'likes';
          const resolvedPath = resolveMenuPath(panel.path, handle);
          const isActive = !isDisabled && panel.id === mainContent.id;

          return (
            <S.Panel
              key={panel.id}
              $bgColor={panel.bgColor}
              $disabled={isDisabled}
              $active={isActive}
              onClick={() => !isDisabled && navigate(resolvedPath)}
            >
              <S.TextGroup $active={isActive}>
                <h3>{panel.subTitle}</h3>
                <h2>{panel.title}</h2>
                <p>{panel.description}</p>
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
