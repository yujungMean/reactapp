import React from 'react';

const OthersInfoHeaderComponent = ({ memberNickname }) => {
  return (
    <div className="info-header">
      <h2>{memberNickname || '회원'}의 페이지입니다.</h2>
    </div>
  );
};

export default OthersInfoHeaderComponent;
