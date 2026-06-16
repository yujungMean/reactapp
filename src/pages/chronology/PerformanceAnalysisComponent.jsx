import React from 'react';
import S from './styles/PerformanceAnalysisStyle';
import chronologyIcon from './chronology_icon.png';

const PerformanceAnalysisComponent = ({ vision, analysis, progress, completedSteps, loadingSteps }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.HeaderLeft>
          <S.TitleIcon src={chronologyIcon} alt="chronology icon" />
          <S.TitleTextWrap>
            <S.PageTitle>TIME LINE</S.PageTitle>
            <S.PageSubtitle>목표에 도달하기까지 실패와 성장의 흐름을 한눈에 확인하세요.</S.PageSubtitle>
          </S.TitleTextWrap>
        </S.HeaderLeft>
      </S.Header>

      <S.VisionCard>
        <S.VisionLabel>VISION</S.VisionLabel>
        <S.VisionTitle>{vision.title}</S.VisionTitle>
      </S.VisionCard>

      <S.AnalysisBox>
        <S.AnalysisTitle>
          <S.Nickname>{analysis.nickname}</S.Nickname> 님의 목표 달성률 분석 중...
        </S.AnalysisTitle>

        <S.GaugeSection>
          <S.GaugeLabel>
            <span>분석 진행률</span>
            <S.GaugePercent>{progress}%</S.GaugePercent>
          </S.GaugeLabel>
          <S.GaugeTrack>
            <S.GaugeFill style={{ width: `${progress}%` }} />
          </S.GaugeTrack>
        </S.GaugeSection>

        <S.StepList>
          {loadingSteps.map((step, i) => (
            <S.StepItem key={i} $done={completedSteps.includes(i)}>
              <S.StepIcon $done={completedSteps.includes(i)}>
                {completedSteps.includes(i) ? '✓' : <S.Spinner />}
              </S.StepIcon>
              <S.StepText $done={completedSteps.includes(i)}>{step}</S.StepText>
            </S.StepItem>
          ))}
        </S.StepList>
      </S.AnalysisBox>
    </S.Wrapper>
  );
};

export default PerformanceAnalysisComponent;
