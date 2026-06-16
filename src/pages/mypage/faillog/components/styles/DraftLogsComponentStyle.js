import styled from "styled-components";
import { sizeCSS, colorCSS, gradientText } from "../../../../../components/style";

const S = {};

S.DraftSection = styled.section`
  padding: 78px 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

S.DraftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h2 {
    ${sizeCSS["h3_2Bold"]}
    font-size: 45px;
    font-weight: 800;
    color: #1E293B;
    span {
      ${gradientText}
    }
  }
`;

S.EditModeBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

S.EditModeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

S.ToggleLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  white-space: nowrap;
`;

S.DeleteButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.disabled ? '#CBD5E1' : '#fff'};
  background: ${(props) => props.disabled ? '#F1F5F9' : colorCSS['faillog-red']};
  border: none;
  border-radius: 8px;
  padding: 7px 18px;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #C0392B;
  }
`;

S.DraftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

S.DraftCardWrapper = styled.div`
  position: relative;
`;

S.StatusBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background: #FFF0F0;
  color: ${colorCSS["faillog-red"]};
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  pointer-events: none;
`;

export default S;