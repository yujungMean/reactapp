import styled from 'styled-components';
import { colorCSS, sizeCSS } from '../../../../components/style';
import { flexBetweenRow, flexCenterRow } from '../../../../styles/common';

const S = {};

/* ── 댓글 입력창 (커뮤니티 ReplySubmit 디자인) ── */
S.SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.SubmitTextArea = styled.textarea`
  width: 100%;
  height: 112px;
  padding: 14px 16px;
  background: ${colorCSS['faillog-sector-gray']};
  border: 1px solid ${colorCSS['faillog_gray2']};
  border-radius: 15px;
  resize: none;
  overflow-y: auto;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog-black']};
  box-sizing: border-box;

  &:hover { border: 1px solid ${colorCSS['faillog_purple']}; }

  &::placeholder { color: ${colorCSS['faillog_gray9']}; }

  &:focus { outline: none; }
`;

S.SubmitBottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.SubmitRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.SubmitBtn = styled.button`
  min-width: 100px;
  height: 40px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colorCSS['faillog_purple']};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background: ${colorCSS['faillog_gray4']};
    cursor: not-allowed;
  }
`;

/* ── 댓글 목록 컨테이너 (커뮤니티 ReplyContainer 디자인) ── */
S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

S.ListTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

S.SubmitBox = styled.div`
  padding: 17px;
  border: 1px solid ${colorCSS['faillog_gray4']};
  border-radius: 15px;
`;

S.ListArea = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

/* ── 댓글/답글 아이템 (커뮤니티 Reply 디자인) ── */
S.ItemWrapper = styled.div`
  width: 100%;
  padding: 13px 15px 15px 15px;
  border: 1px solid ${colorCSS['faillog_gray4']};
  border-radius: 15px;
  box-sizing: border-box;
  ${({ $indent }) => $indent && `margin-left: 20px;`}
`;

S.TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

S.AuthorName = styled.span`
  ${sizeCSS['h8-bold']}
  color: ${colorCSS['faillog-black']};
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

S.ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

S.DateText = styled.span`
  ${sizeCSS['h10-regular']}
  color: ${colorCSS['faillog_gray9']};
`;

S.MenuContainer = styled.div`
  position: relative;
`;

S.MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${colorCSS['faillog_gray9']};
  font-size: 16px;
`;

S.Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 80px;
  background: ${colorCSS['faillog_white']};
  border: 1px solid ${colorCSS['faillog_gray4']};
  border-radius: 10px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 100;
`;

S.DropdownItem = styled.div`
  ${flexCenterRow}
  cursor: pointer;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog-black']};
  padding: 4px 0;

  &:hover { color: ${colorCSS['faillog_purple']}; }
`;

S.ContentArea = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

S.ContentText = styled.p`
  margin: 0;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog_gray9']};
  word-break: break-all;
  white-space: pre-wrap;

  ${({ $clamped }) => $clamped && `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

S.InlineToggle = styled.span`
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog_purple']};
  cursor: pointer;
`;

S.ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 5px;
`;

S.LikeGroup = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  ${sizeCSS['h10Bold']}
  color: ${colorCSS['faillog-black']};

  img { width: 16px; height: 16px; }
`;

S.ReplyBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  ${sizeCSS['h10Bold']}
  color: ${colorCSS['faillog-black']};
`;

S.SectionArea = styled.div`
  margin-top: 14px;
`;

S.Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${colorCSS['faillog_gray2']};
`;

S.ChildListArea = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

S.EditTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 12px;
  background: ${colorCSS['faillog_gray1']};
  border: 1px solid ${colorCSS['faillog_gray4']};
  border-radius: 10px;
  resize: none;
  overflow-y: auto;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog-black']};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colorCSS['faillog_purple']};
  }
`;

S.EditActionRow = styled.div`
  ${flexBetweenRow}
  margin-top: 8px;
`;

S.EditBtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

S.CancelEditBtn = styled.button`
  height: 32px;
  padding: 0 14px;
  background: none;
  border: 1px solid ${colorCSS['faillog_gray4']};
  border-radius: 8px;
  cursor: pointer;
  ${sizeCSS['h10Bold']}
`;

S.SaveEditBtn = styled.button`
  height: 32px;
  padding: 0 14px;
  background: ${colorCSS['faillog_purple']};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${sizeCSS['h10Bold']}
  color: ${colorCSS['faillog_white']};
`;

export default S;
