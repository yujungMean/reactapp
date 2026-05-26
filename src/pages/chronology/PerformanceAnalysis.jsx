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

const PerformanceAnalysis = () => {
  const { vision, analysis } = useOutletContext();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const nickname = user?.memberNickname || analysis.nickname;

  const [progress, setProgress]           = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

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

    const doneTimer = setTimeout(() => navigate('../result'), TOTAL_DURATION + 400);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(doneTimer);
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
