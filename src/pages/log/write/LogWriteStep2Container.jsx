import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import LogAnalyzeModal from './LogAnalyzeModal';
import writingIcon from './write_icon/writing.svg';
import tipIcon from './write_icon/tip.svg';

const LogWriteStep2Container = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    navigate("/logs/new/step1");
  };

  const handleTempSave = () => {
    // 임시저장 로직
    alert("임시저장 되었습니다.");
  };

  const handleAnalyze = () => {
    setIsModalOpen(true);
  };

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Header>
          <S.Title>Write Fail Log</S.Title>
          <S.SubTitle>로그 작성 가이드에 맞게 페일 로그 작성</S.SubTitle>
        </S.Header>
        <S.StepInfo>
          <S.StepBadgeRow>
            <S.StepBadge>Step 2</S.StepBadge>
            <S.StepTitle>목표 달성을 위해 지나온 실패 과정</S.StepTitle>
          </S.StepBadgeRow>
          <S.StepDesc>목표를 달성하기 위한 여정을 일기 작성하듯 편하게 작성해주세요.</S.StepDesc>
        </S.StepInfo>
        <S.ButtonRow>
          <S.PrevButton onClick={handlePrev}>이전</S.PrevButton>
        </S.ButtonRow>

        <S.FormContainer>
          <S.LogHeader>
            <S.Badges>
              <S.BadgeOrange>
                <S.WritingIcon $src={writingIcon} />
                작성 중
              </S.BadgeOrange>
              <S.BadgeBlue>공부/취업</S.BadgeBlue>
            </S.Badges>
            <S.LogTitleRow>
              <S.LogTitle>빅데이터분석기사 자격증 실기 도전기</S.LogTitle>
              <S.Date>2026.04.23</S.Date>
            </S.LogTitleRow>
          </S.LogHeader>

          <S.TextArea
            placeholder={`목표를 이루기 위해서 지금까지 어떤 일이 있었나요?\n\n예시) 기출문제만 계속 풀면서 패턴을 외우면 될 거라 생각했다. 처음 두 달은 순조로웠고, 정답률도 올라가는 것 같아서 자신감이 생겼다.\n그런데 실제 시험 날, 응용 문제들이 생각보다 많이 나왔고 나는 완전히 막혀버렸다. 아는 개념인데 조금만 비틀면 풀지 못했다.\n기출문제만 계속 풀면서 패턴을 외우면 될 거라 생각했다. 처음 두 달은 순조로웠고, 정답률도 올라가는 것 같아서 자신감이 생겼다.\n그런데 실제 시험 날, 응용 문제들이 생각보다 많이 나왔고 나는 완전히 막혀버렸다. 아는 개념인데 조금만 비틀면 풀지 못했다.\n기출문제만 계속 풀면서 패턴을 외우면 될 거라 생각했다. 처음 두 달은 순조로웠고, 정답률도 올라가는 것 같아서 자신감이 생겼다.\n그런데 실제 시험 날, 응용 문제들이 생각보다 많이 나왔고 나는 완전히 막혀버렸다. 아는 개념인데 조금만 비틀면 풀지 못했다.`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <S.TipBox>
            <S.TipTitleRow>
              <S.TipIcon src={tipIcon} alt="tip" />
              <S.TipTitle>작성 팁!!</S.TipTitle>
            </S.TipTitleRow>
            <S.TipDesc>과정 속에서 어떤 결정을 하셨는지 왜 그런 결정을 하셨는지 그때 마음속의 감정들 외부 환경이나 환경 변화들, 지금 돌아보면 어떤 생각이 드시는지 등을 자유롭게 써주시면 됩니다.</S.TipDesc>
          </S.TipBox>

          <S.ButtonContainer>
            <S.TempSaveButton onClick={handleTempSave}>임시저장</S.TempSaveButton>
            <S.AnalyzeButton onClick={handleAnalyze}>분석하기</S.AnalyzeButton>
          </S.ButtonContainer>

        </S.FormContainer>
      </S.ContentWrapper>

      {isModalOpen && <LogAnalyzeModal onClose={() => setIsModalOpen(false)} />}
    </S.Wrapper>
  );
};

const S = {};

S.Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.GRAYSCALE[1]};
`;

S.Header = styled.div`
  text-align: left;
  margin-bottom: 50px;
`;

S.Title = styled.h1`
  font-size: 60px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.SubTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.ContentWrapper = styled.div`
  width: 100%;
  max-width: 872px;
`;

S.StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`;

S.ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

S.StepBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

S.StepBadge = styled.span`
  color: ${({ theme }) => theme.PALETTE.primary.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  white-space: nowrap;
`;

S.StepTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.StepDesc = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.GRAYSCALE[9]};
`;

S.PrevButton = styled.button`
  padding: 10px 28px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  color: ${({ theme }) => theme.GRAYSCALE[9]};
  border: 1px solid ${({ theme }) => theme.GRAYSCALE[4]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.main};
    color: ${({ theme }) => theme.PALETTE.white};
    border-color: ${({ theme }) => theme.PALETTE.primary.main};
  }
`;

S.FormContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.GRAYSCALE[2]};

  &::before {
    content: '';
    position: absolute;
    top: 24px;
    bottom: 24px;
    left: 0px;
    width: 5px;
    background-color: ${({ theme }) => theme.PALETTE.primary.main};
    border-radius: 0 4px 4px 0;
  }
`;

S.LogHeader = styled.div`
  margin-bottom: 20px;
`;

S.LogTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

S.Badges = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

S.BadgeOrange = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 74px;
  height: 24px;
  background-color: ${({ theme }) => theme.PALETTE.fourth.light};
  color: ${({ theme }) => theme.TEXT_COLOR.warning};
  border-radius: 6px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  box-sizing: border-box;
`;

const IconBase = styled.div`
  background-color: currentColor;
  -webkit-mask-image: url(${props => props.$src});
  mask-image: url(${props => props.$src});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
  display: inline-block;
`;

S.WritingIcon = styled(IconBase)`
  width: 14px;
  height: 14px;
`;

S.TipIcon = styled.img`
  width: 15px;
  height: 15px;
`;

S.BadgeBlue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 20px;
  background-color: ${({ theme }) => theme.PALETTE.primary.light};
  color: ${({ theme }) => theme.PALETTE.primary.main};
  border-radius: 6px;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  box-sizing: border-box;
`;

S.Date = styled.span`
  color: ${({ theme }) => theme.GRAYSCALE[5]};
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
`;

S.LogTitle = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.TextArea = styled.textarea`
  width: 100%;
  min-height: 380px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.GRAYSCALE[4]};
  border-radius: 12px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  line-height: 1.6;
  outline: none;
  background-color: ${({ theme }) => theme.PALETTE.white};
  resize: none;
  margin-bottom: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.GRAYSCALE[5]};
  }

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.main};
  }
`;

S.TipBox = styled.div`
  width: 782px;
  min-height: 60px;
  height: auto;
  background-color: ${({ theme }) => theme.PALETTE.primary.light}; 
  padding: 12px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

S.TipTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

S.TipTitle = styled.span`
  color: ${({ theme }) => theme.PALETTE.primary.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  white-space: nowrap;
`;

S.TipDesc = styled.p`
  color: ${({ theme }) => theme.PALETTE.primary.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.h10}; 
  line-height: 1.4;
  margin: 0;
  word-break: keep-all;
  word-wrap: break-word;
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

S.TempSaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 38px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  color: ${({ theme }) => theme.PALETTE.primary.main};
  border: 1px solid ${({ theme }) => theme.PALETTE.primary.main};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.light};
  }
`;

S.AnalyzeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 38px;
  background-color: ${({ theme }) => theme.PALETTE.primary.main};
  color: ${({ theme }) => theme.PALETTE.white};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default LogWriteStep2Container;
