import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import theme from '../../../styles/theme';
import closeIcon from './write_icon/close.svg';
import backIcon from './write_icon/back.svg';
import checkIcon from './write_icon/check.svg';
import styleWarm1Icon from './write_icon/style_warm_1.svg';
import styleWarm2Icon from './write_icon/style_warm_2.svg';
import styleObjectiveIcon from './write_icon/style_objective.svg';
import styleColdIcon from './write_icon/style_cold.svg';

// Mock data
const PAST_LOGS = [
  { id: 1, category: "사업/창업", title: "B 투자사 미팅 거절", date: "2024.03.15 작성" },
  { id: 2, category: "사업/창업", title: "A 투자사 미팅 거절", date: "2023.11.02 작성" },
  { id: 3, category: "사업/창업", title: "C 투자사 미팅 거절", date: "2023.11.02 작성" },
  { id: 4, category: "공부/취업", title: "정보처리기사 실기 불합격", date: "2023.09.10 작성" },
  { id: 5, category: "인간관계", title: "팀 프로젝트 갈등", date: "2023.07.01 작성" },
];

const CATEGORIES = ["사업/창업", "공부/취업", "인간관계", "건강/루틴", "기타"];

const LogAnalyzeModal = ({ onClose }) => {
  const navigate = useNavigate();

  const ANALYSIS_STYLES = [
    {
      id: "warm",
      icon: (
        <S.StyleWarmWrapper>
          <S.StyleWarm1Img src={styleWarm1Icon} alt="warm style" />
          <S.StyleWarm2Img src={styleWarm2Icon} alt="warm overlay" />
        </S.StyleWarmWrapper>
      ),
      title: "따뜻한 위로와 공감",
      desc: "지금은 자책보단 다독임이 필요해요.\n긍정적으로 부드럽게 분석과 방향성을 얻을 수 있습니다.",
      badge: "순한맛",
      badgeColor: theme.PALETTE.secondary.main,
      badgeBg: theme.PALETTE.secondary.light,
    },
    {
      id: "objective",
      icon: <S.StyleObjectiveImg src={styleObjectiveIcon} alt="objective style" />,
      title: "객관적인 원인 분석가",
      desc: "문제의 본질만을 파악해서 분석해요.\n논리적이고 명확한 분석과 방향성을 얻습니다.",
      badge: "약간 매운맛",
      badgeColor: theme.PALETTE.fifth.main,
      badgeBg: theme.PALETTE.fifth.light,
    },
    {
      id: "cold",
      icon: <S.StyleColdImg src={styleColdIcon} alt="cold style" />,
      title: "냉철한 팩트 폭격기",
      desc: "변명없이 한계를 직시해요.\n아프지만 냉철하게 문제점을 분석하고 방향성을 얻습니다.",
      badge: "매운맛",
      badgeColor: theme.PALETTE.fourth.main,
      badgeBg: theme.PALETTE.fourth.light,
    },
  ];

  const [step, setStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState("사업/창업");
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [progress, setProgress] = useState(0);

  const filteredLogs = PAST_LOGS.filter(log => log.category === activeCategory);

  useEffect(() => {
    if (step === 3) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate('/logs/result/my/detail');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && step < 3) onClose();
  };

  const renderStep1 = () => (
    <>
      <S.CloseButtonWrapper>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon src={closeIcon} alt="close" />
        </S.CloseButton>
      </S.CloseButtonWrapper>

      <S.TitleSection>
        <S.ModalTitle>과거의 비슷한 실패 기록</S.ModalTitle>
        <S.ModalSub>선택하시면 더 깊은 패턴을 찾을 수 있어요.</S.ModalSub>
      </S.TitleSection>

      <S.SectionRow>
        <S.SectionLabel>함께 분석할까요?</S.SectionLabel>
        <S.SelectedCount>{selectedLogs.length > 0 ? `${selectedLogs.length}개 선택됨` : ''}</S.SelectedCount>
      </S.SectionRow>

      <S.CategoryTabs>
        {CATEGORIES.map(cat => (
          <S.CategoryTab
            key={cat}
            $active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </S.CategoryTab>
        ))}
      </S.CategoryTabs>

      <S.LogList>
        {filteredLogs.length === 0 ? (
          <S.EmptyList>이 카테고리에는 로그가 없습니다.</S.EmptyList>
        ) : filteredLogs.map(log => {
          const isSelected = selectedLogs.some(l => l.id === log.id);
          return (
            <S.LogItem
              key={log.id}
              $selected={isSelected}
              onClick={() => {
                setSelectedLogs(prev =>
                  prev.some(l => l.id === log.id)
                    ? prev.filter(l => l.id !== log.id)
                    : [...prev, log]
                );
              }}
            >
              <S.LogItemContent>
                <S.LogItemCategory>{log.category}</S.LogItemCategory>
                <S.LogItemTitle>{log.title}</S.LogItemTitle>
                <S.LogItemDate>{log.date}</S.LogItemDate>
              </S.LogItemContent>
              <S.LogRadio $selected={isSelected}>
                {isSelected && (
                  <S.CheckIconImg src={checkIcon} alt="check" />
                )}
              </S.LogRadio>
            </S.LogItem>
          )
        })}
      </S.LogList>

      <S.BottomSection>
        <S.PrimaryButton onClick={() => setStep(2)}>
          {selectedLogs.length > 0 ? `${selectedLogs.length}개의 로그와 함께 분석하기` : '선택 없이 분석하기'}
        </S.PrimaryButton>
        <S.SkipLink onClick={() => setStep(2)}>건너뛰고 이번 로그만 분석 →</S.SkipLink>
      </S.BottomSection>
    </>
  );

  const renderStep2 = () => (
    <>
      <S.HeaderNav>
        <S.BackButton onClick={() => setStep(1)}>
          <S.BackIcon src={backIcon} alt="back" />
        </S.BackButton>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon src={closeIcon} alt="close" />
        </S.CloseButton>
      </S.HeaderNav>

      <S.TitleSection>
        <S.ModalTitle>분석 스타일 설정</S.ModalTitle>
        <S.ModalSub>나에게 필요한 분석 스타일의 온도를 골라주세요.</S.ModalSub>
      </S.TitleSection>

      <S.StyleList>
        {ANALYSIS_STYLES.map(style => (
          <S.StyleCard
            key={style.id}
            $selected={selectedStyle === style.id}
            onClick={() => setSelectedStyle(style.id)}
          >
            <S.StyleIcon>{style.icon}</S.StyleIcon>
            <S.StyleContent>
              <S.StyleTitle>{style.title}</S.StyleTitle>
              <S.StyleDesc>{style.desc}</S.StyleDesc>
            </S.StyleContent>
            <S.StyleBadge $color={style.badgeColor} $bg={style.badgeBg}>
              {style.badge}
            </S.StyleBadge>
          </S.StyleCard>
        ))}
      </S.StyleList>

      <S.BottomSection>
        <S.PrimaryButton
          disabled={!selectedStyle}
          onClick={() => selectedStyle && setStep(3)}
        >
          선택한 스타일로 분석 시작
        </S.PrimaryButton>
      </S.BottomSection>
    </>
  );

  const renderStep3 = () => (
    <S.LoadingWrapper>
      <S.SpinnerRing />
      <S.LoadingTitle>
        입력하신 데이터를 기반으로<br />패턴을 분석하고 있어요
      </S.LoadingTitle>
      <S.LoadingSub>잠시만 기다려주세요...</S.LoadingSub>
      <S.ProgressBarWrapper>
        <S.ProgressBar $progress={progress} />
      </S.ProgressBarWrapper>
    </S.LoadingWrapper>
  );

  const renderStep4 = () => (
    <S.CompleteWrapper>
      <S.CompleteCircle>
        <S.CompleteCheck>✓</S.CompleteCheck>
      </S.CompleteCircle>
      <S.CompleteTitle>
        분석이 완료되어<br />정상 등록되었습니다.
      </S.CompleteTitle>
      <S.CompleteSub>결과 페이지로 이동합니다.</S.CompleteSub>
    </S.CompleteWrapper>
  );

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal $step={step}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </S.Modal>
    </S.Overlay>
  );
};

/* ─── Animations ─── */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const progressAnim = keyframes`
  from { opacity: 0.6; }
  to { opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

/* ─── Styled Components ─── */
const S = {};

S.Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;
`;

S.Modal = styled.div`
  width: 648px;
  height: 799px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 20px;
  padding: 40px 50px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.GRAYSCALE[4]};
`;

S.HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

S.ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

S.CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

S.CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -10px;
`;

S.BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: ${({ theme }) => theme.GRAYSCALE[5]};
  cursor: pointer;
  padding: 4px;
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { color: ${({ theme }) => theme.TEXT_COLOR.basic}; }
`;

S.CloseIcon = styled.img`
  width: 14px;
  height: 14px;
`;

S.BackIcon = styled.img`
  width: 12px;
  height: 12px;
`;

S.CheckIconImg = styled.img`
  width: 14px;
  height: 14px;
`;

S.StyleWarmWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

S.StyleWarm1Img = styled.img`
  width: 40px;
  height: 40px;
`;

S.StyleWarm2Img = styled.img`
  position: absolute;
  right: -8px;
  bottom: 2px;
  width: 20px;
  height: 18px;
`;

S.StyleObjectiveImg = styled.img`
  width: 40px;
  height: 40px;
`;

S.StyleColdImg = styled.img`
  width: 40px;
  height: 40px;
`;

S.TitleSection = styled.div`
  margin-bottom: 40px;
`;

S.ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.ModalSub = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  color: ${({ theme }) => theme.GRAYSCALE[6]};
`;

S.SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

S.SectionLabel = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.SelectedCount = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
  color: ${({ theme }) => theme.PALETTE.third.main};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

S.CategoryTabs = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.GRAYSCALE[2]};
`;

S.CategoryTab = styled.button`
  padding: 8px 20px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  cursor: pointer;
  border: 1px solid ${({ $active }) => $active ? theme.PALETTE.third.main : theme.GRAYSCALE[3]};
  background-color: ${({ $active }) => $active ? theme.PALETTE.third.main : theme.PALETTE.white};
  color: ${({ $active }) => $active ? theme.PALETTE.white : theme.TEXT_COLOR.basic};
  font-weight: ${({ $active }) => $active ? theme.FONT_WEIGHT.bold : theme.FONT_WEIGHT.regular};
  transition: all 0.2s;
`;

S.LogList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.GRAYSCALE[3]};
    border-radius: 10px;
  }
`;

S.EmptyList = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.GRAYSCALE[5]};
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  padding: 30px 0;
`;

S.LogItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-radius: 12px;
  border: 1.5px solid ${({ $selected }) => $selected ? theme.PALETTE.third.main : theme.GRAYSCALE[3]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

S.LogItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

S.LogItemCategory = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.PALETTE.third.light};
  color: ${({ theme }) => theme.PALETTE.third.main};
  font-size: ${({ theme }) => theme.FONT_SIZE.h11};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  padding: 4px 10px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 4px;
`;

S.LogItemTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.LogItemDate = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
  color: ${({ theme }) => theme.GRAYSCALE[5]};
`;

S.LogRadio = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => $selected ? theme.PALETTE.third.main : theme.GRAYSCALE[3]};
  background-color: ${({ $selected }) => $selected ? theme.PALETTE.third.main : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.2s;
`;

S.BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: auto;
`;

S.PrimaryButton = styled.button`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.PALETTE.third.main};
  color: ${({ theme }) => theme.PALETTE.white};
  border: none;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #9E35C0;
  }
`;

S.SkipLink = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  color: ${({ theme }) => theme.GRAYSCALE[6]};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: ${({ theme }) => theme.TEXT_COLOR.basic}; }
`;

/* ─── Step 2 ─── */
S.StyleList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.GRAYSCALE[3]};
    border-radius: 10px;
  }
`;

S.StyleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 135px;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1.5px solid ${({ $selected }) => $selected ? theme.PALETTE.third.main : theme.GRAYSCALE[2]};
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({ $selected }) => $selected ? '#FDF6FF' : theme.PALETTE.white};
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
  &:hover { border-color: ${({ theme }) => theme.PALETTE.third.light}; }
`;

S.StyleIcon = styled.div`
  font-size: 28px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.StyleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

S.StyleTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
`;

S.StyleDesc = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
  color: ${({ theme }) => theme.GRAYSCALE[6]};
  line-height: 1.5;
  white-space: pre-line;
`;

S.StyleBadge = styled.span`
  position: absolute;
  top: 36px;
  right: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h11};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ $color }) => $color};
  background-color: ${({ $bg }) => $bg};
  padding: 4px 8px;
  border-radius: 4px;
`;

/* ─── Step 3 (Loading) ─── */
S.LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
  padding: 20px 0;
`;

S.SpinnerRing = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.PALETTE.third.light};
  border-top-color: ${({ theme }) => theme.PALETTE.third.main};
  animation: ${spin} 1s linear infinite;
`;

S.LoadingTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
  text-align: center;
  line-height: 1.5;
`;

S.LoadingSub = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
  color: ${({ theme }) => theme.GRAYSCALE[5]};
`;

S.ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.GRAYSCALE[1]};
  border-radius: 99px;
  overflow: hidden;
  margin-top: 8px;
  animation: ${progressAnim} 0.5s ease;
`;

S.ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.PALETTE.third.light}, ${({ theme }) => theme.PALETTE.third.main});
  border-radius: 99px;
  transition: width 0.08s linear;
`;

/* ─── Step 4 (Complete) ─── */
S.CompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 16px;
  padding: 20px 0;
  animation: ${fadeIn} 0.4s ease;
`;

S.CompleteCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.PALETTE.third.light};
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.CompleteCheck = styled.span`
  font-size: 32px;
  color: ${({ theme }) => theme.PALETTE.third.main};
  font-weight: bold;
`;

S.CompleteTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.TEXT_COLOR.basic};
  text-align: center;
  line-height: 1.5;
`;

S.CompleteSub = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h10};
  color: ${({ theme }) => theme.GRAYSCALE[5]};
`;

export default LogAnalyzeModal;
