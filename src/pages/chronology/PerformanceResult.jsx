import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import PerformanceResultComponent from './PerformanceResultComponent';

const PerformanceResult = () => {
  const { vision, analysis } = useOutletContext();
  const navigate = useNavigate();

  return (
    <PerformanceResultComponent
      vision={vision}
      analysis={analysis}
      onBack={() => navigate('/chronology')}
    />
  );
};

export default PerformanceResult;
