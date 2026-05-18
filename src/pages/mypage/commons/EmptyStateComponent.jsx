import React from 'react';

/**
 * @param {React.ReactNode} title - 공백 화면에 보낼 메인 타이틀 텍스트 (JSX 포함 가능)
 * @param {string} subText - 하단 서브 설명 가이드 문구
 * @param {string} buttonText - 실행 버튼 내부 텍스트
 * @param {function} onButtonClick - 버튼 클릭 시 라우팅 혹은 액션 핸들러
 * @param {object} styles - 외부 스타일 객체 (CommS)
 */
const EmptyStateComponent = ({ title, subText, buttonText, onButtonClick, styles }) => {
  return (
    <styles.EmptyStateWrapper>
      <styles.EmptyTitle>
        {title}
      </styles.EmptyTitle>
      <styles.EmptySubText>
        {subText}
      </styles.EmptySubText>
      {buttonText && onButtonClick && (
        <styles.StartButton onClick={onButtonClick}>
          {buttonText}
        </styles.StartButton>
      )}
    </styles.EmptyStateWrapper>
  );
};

export default EmptyStateComponent;