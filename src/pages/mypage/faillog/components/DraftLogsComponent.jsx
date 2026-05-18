import React from 'react';
import { useNavigate } from 'react-router-dom'; 
// ✂️ 사용하지 않는 styled 임포트 제거하여 번들 최적화
import S from "./styles/DraftLogsComponentStyle";
import failLogIcon from '../resources/fail-log-card.png'; 

const DraftLogsComponent = ({ draftLogs = [] }) => {
  const navigate = useNavigate(); 

  // 💡 방어 코드: 작성 중인 로그가 아예 없을 경우 섹션 자체를 노출하지 않거나 
  // 다른 피드백을 주고 싶다면 여기서 조건부 리턴을 제어할 수 있습니다.
  if (!draftLogs || draftLogs.length === 0) {
    return null; // 혹은 빈 상태를 나타내는 가벼운 가이드 마크업
  }

  return (
    <S.DraftSection>
      <h2>아직 <span>작성 중인 페일로그</span>가 있어요.</h2>
      
      <S.DraftGrid>
        {draftLogs.map((log) => (
          <S.DraftCard 
            key={log.id} 
            bgColor={log.color}
            onClick={() => navigate(`/logs/new/step1/${log.id}`)}
          >
            {/* 🔥 [레이어 3] 이미지보다 위층에 배치되어야 하는 텍스트 및 태그 콘텐츠 */}
            <div className="ContentGroup">
              <div className="CardHeader">
                <h3>{log.title || "제목 없는 페일로그"}</h3>
                <p>{log.content || "내용이 없습니다."}</p>
              </div>

              <div className="CardFooter">
                <div className="InfoText">
                  {/* log.progress가 없을 경우를 대비해 0 기본값 처리 */}
                  <div>진행도 : {log.progress ?? 0}%</div>
                  <div>마지막 수정 : {log.date || "방금 전"}</div>
                </div>
                <div className="StatusTag">미완성</div>
              </div>
            </div>

            {/* 📥 [레이어 1] 글자 밑으로 완벽히 깔리는 우하단 고정 이미지 배경 박스 */}
            <div className="CardImage">
              {/* 데코레이션 성격의 배경 이미지이므로 alt를 비워두어 대안 텍스트 중복 리딩 방지 */}
              <img src={failLogIcon} alt="" />
            </div>
          </S.DraftCard>
        ))}
      </S.DraftGrid>
    </S.DraftSection>
  );
};

export default DraftLogsComponent;