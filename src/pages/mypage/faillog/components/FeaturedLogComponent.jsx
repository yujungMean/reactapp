import React from 'react';
import S from '../styles/MyFailLogStyles';

/**
 * @param {Array} logs - 부모(Container)에게서 전달받은 전체 페일로그 리스트 (allLogs)
 */
const FeaturedLogComponent = ({ logs = [] }) => {
  
  // 실제 데이터 중 최신 혹은 상위 3개만 추출하여 연동
  const displayLogs = logs.slice(0, 3);
  const hasLogs = displayLogs.length > 0;

  return (
    /* 🎯 교정 포인트: 에러를 유발하던 S.FeaturedWrapperBlock 대신 
          일반 div 태그에 정렬 스타일을 주어 안전하게 독립 구역을 선언합니다. */
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 60px' }}>
      <S.SectionHeader>
        <h2>나의 <span>페일로그</span></h2>
      </S.SectionHeader>

      <S.FeaturedContainer>
        {/* 리스트 영역 */}
        <S.FeaturedListArea>
          <div className="TitleBox">
            <h3>당신의 가장 빛났던 실패 이야기</h3>
            <p>User님의 페일 로그 및 게시글 중<br/>제일 관심이 많았던 게시글이 표시됩니다.</p>
          </div>

          {hasLogs ? (
            displayLogs.map((log, idx) => (
              <S.FeaturedItem key={log.id || idx}>
                <h4>{log.title}</h4>
                <div className="Meta">
                  <div className="User">
                    <div style={{ width: '20px', height: '20px', background: '#6366f1', borderRadius: '50%' }} />
                    필기마스터
                  </div>
                  <div className="Stats">
                    <span>👁️ {log.views || 45}</span>
                    <span>❤️ {log.likes || 35}</span>
                  </div>
                </div>
              </S.FeaturedItem>
            ))
          ) : (
            <p style={{ padding: '20px', color: '#94A3B8' }}>등록된 페일로그가 없습니다.</p>
          )}
        </S.FeaturedListArea>

        {/* 이미지 영역 */}
        <S.FeaturedMainImage>
          <img 
            className="MainImg" 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
            alt="featured" 
          />
          <div className="BlackOverlay">
            <p>
              {hasLogs 
                ? `“${displayLogs[0].content.substring(0, 70)}...”`
                : `“공부를 거듭할수록 기존 학습법의 한계가 분명해졌고, 그 순간 ‘더 나은 방법을 찾아야 한다’는 문제의식이 생겼습니다”`
              }
            </p>
            <div className="AuthorInfo">
              <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }} />
              필기마스터
            </div>
          </div>
        </S.FeaturedMainImage>
      </S.FeaturedContainer>
    </div>
  );
};

export default FeaturedLogComponent;