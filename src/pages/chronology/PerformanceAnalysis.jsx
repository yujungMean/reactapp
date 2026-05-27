import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import PerformanceAnalysisComponent from './PerformanceAnalysisComponent';
import useAuthStore from '../../store/authStore';

const LOADING_STEPS = [
  '지각 변별 분석 중',
  '유추비교 처리 중',
  '비교추론 계산 중',
  '패턴 학습 완료',
  '성과 데이터 집계 중',
  '랭크 산출 완료',
];

const TOTAL_DURATION = 10000;

const MAX_WAIT = 90000;

const PerformanceAnalysis = () => {
  const { vision, analysis } = useOutletContext();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const nickname = user?.memberNickname || analysis.nickname;

  const [progress, setProgress]             = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [animationDone, setAnimationDone]   = useState(false);

  // 애니메이션 완료 + AI 피드백 준비 모두 되면 result로 이동
  useEffect(() => {
    if (animationDone && analysis.aiFeedback) {
      navigate('../result');
    }
  }, [animationDone, analysis.aiFeedback, navigate]);

  useEffect(() => {
    const startTime = Date.now();
    let lastProgress = 0;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio   = Math.min(elapsed / TOTAL_DURATION, 1);
      const base    = Math.floor(ratio * 100);
      const jitter  = Math.floor(Math.random() * 8) - 3;
      const next    = Math.min(100, Math.max(lastProgress, base + jitter));
      lastProgress  = next;
      setProgress(next);
      if (ratio >= 1) { clearInterval(progressInterval); setProgress(100); }
    }, 200);

    const stepInterval = TOTAL_DURATION / (LOADING_STEPS.length + 1);
    const stepTimers = LOADING_STEPS.map((_, i) =>
      setTimeout(() => setCompletedSteps((prev) => [...prev, i]), stepInterval * (i + 1))
    );

    // 최소 애니메이션 완료 후 AI 대기 시작
    const animDoneTimer = setTimeout(() => setAnimationDone(true), TOTAL_DURATION + 400);

    // AI가 끝나지 않아도 최대 90초 후 강제 이동
    const maxWaitTimer = setTimeout(() => navigate('../result'), MAX_WAIT);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(animDoneTimer);
      clearTimeout(maxWaitTimer);
    };
  }, [navigate]);

  return (
    <PerformanceAnalysisComponent
      vision={vision}
      analysis={{ ...analysis, nickname }}
      progress={progress}
      completedSteps={completedSteps}
      loadingSteps={LOADING_STEPS}
    />
  );
};

export default PerformanceAnalysis;
