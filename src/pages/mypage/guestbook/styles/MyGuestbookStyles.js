import styled from 'styled-components';
import { colorCSS, sizeCSS } from '../../../../components/style';

const S = {};

S.GuestbookSection = styled.section`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 0 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

S.InputCard = styled.div`
  width: 100%;
  max-width: 980px;
  border-radius: 18px;
  padding: 28px;
  background: ${colorCSS['faillog_white']};
  border: 1px solid ${colorCSS['faillog_gray2']};
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

S.CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 220px;
  border-radius: 18px;
  border: 1px solid ${colorCSS['faillog_gray2']};
  padding: 22px 24px;
  ${sizeCSS['h8-regular']}
  color: ${colorCSS['faillog_black']};
  background: ${colorCSS['faillog_white']};
  resize: vertical;
  outline: none;

  &::placeholder {
    color: ${colorCSS['faillog_gray8']};
  }

  &:focus {
    border-color: ${colorCSS['faillog_blue']};
    box-shadow: 0 0 0 4px rgba(2, 125, 240, 0.12);
  }
`;

S.InputFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.SubmitButton = styled.button`
  border: none;
  outline: none;
  background: ${colorCSS['faillog_purple']};
  color: ${colorCSS['faillog_white']};
  font-weight: 700;
  font-size: 14px;
  border-radius: 999px;
  height: 36px;
  min-width: 88px;
  padding: 0 22px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${colorCSS['faillog_purple']};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${colorCSS['faillog_light_purple']};
    color: ${colorCSS['faillog_purple']};
    cursor: not-allowed;
    transform: none;
  }
`;

S.SearchBar = styled.div`
  width: 100%;
  max-width: 430px;
  background: ${colorCSS['faillog_white']};
  border: 1px solid ${colorCSS['faillog_gray2']};
  border-radius: 16px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

S.SmallSearchInput = styled.input`
  width: 198px;
  height: 34px;
  border-radius: 14px;
  border: 1px solid ${colorCSS['faillog_gray2']};
  padding: 0 14px;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog_black']};
  outline: none;
  background: ${colorCSS['faillog_sector-gray']};

  &::placeholder {
    color: ${colorCSS['faillog_gray8']};
  }

  &:focus {
    border-color: ${colorCSS['faillog_blue']};
  }
`;

S.CommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

S.CommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

S.CommentCard = styled.article`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: flex-start;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid ${colorCSS['faillog_gray2']};
  background: ${colorCSS['faillog_white']};
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);

  @media (max-width: 760px) {
    grid-template-columns: 54px 1fr;
  }
`;

S.Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #eef2ff;
  color: #4338ca;
  font-weight: 800;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

S.CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.CommentMeta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

S.CommentAuthor = styled.p`
  margin: 0;
  ${sizeCSS['h8-bold']}
  color: ${colorCSS['faillog_black']};
`;

S.CommentTitle = styled.p`
  margin: 4px 0 0;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog_gray9']};
`;

S.CommentTime = styled.span`
  ${sizeCSS['h10-regular']}
  color: ${colorCSS['faillog_gray8']};
`;

S.CommentText = styled.p`
  margin: 0;
  ${sizeCSS['h9-regular']}
  color: ${colorCSS['faillog_gray10']};
  line-height: 1.8;
`;

S.CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

S.ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

S.Reaction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  border: none;
  background: transparent;
  color: ${({ liked }) => (liked ? '#ef4444' : '#6b7280')};
  cursor: pointer;
  padding: 0;

  span:first-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ liked }) => (liked ? 'rgba(239, 68, 68, 0.16)' : 'rgba(248, 113, 113, 0.12)')};
    color: #ef4444;
  }
`;

S.ReplyAction = styled.button`
  border: none;
  background: transparent;
  color: ${colorCSS['faillog_blue']};
  ${sizeCSS['h10-bold']}
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

S.CommentMenu = styled.button`
  border: none;
  background: transparent;
  color: ${colorCSS['faillog_gray9']};
  font-size: 18px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  align-self: flex-start;

  &:hover {
    background: ${colorCSS['faillog_gray1']};
  }
`;

S.MenuDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 22px;
  width: 150px;
  border-radius: 18px;
  background: ${colorCSS['faillog_white']};
  border: 1px solid ${colorCSS['faillog_gray2']};
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  padding: 8px 0;
  z-index: 10;
`;

S.MenuItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px 16px;
  text-align: left;
  color: ${colorCSS['faillog_gray10']};
  ${sizeCSS['h10-regular']}
  cursor: pointer;

  &:hover {
    background: ${colorCSS['faillog_sector-gray']};
  }
`;

S.ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 56px;

  @media (max-width: 760px) {
    padding-left: 0;
  }
`;

S.ReplyCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  background: ${colorCSS['faillog_sector-gray']};
  border: 1px solid ${colorCSS['faillog_gray2']};

  @media (max-width: 760px) {
    grid-template-columns: 44px 1fr;
  }
`;

S.ReplyAvatar = styled(S.Avatar)`
  width: 44px;
  height: 44px;
  font-size: 16px;
`;

S.ReplyBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.ReplyInputCard = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 18px;
  background: ${colorCSS['faillog_white']};
  border: 1px solid ${colorCSS['faillog_gray2']};
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: 56px;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

S.ReplyTextarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: 18px;
  border: 1px solid ${colorCSS['faillog_gray2']};
  padding: 16px 18px;
  ${sizeCSS['h9-regular']}
  line-height: 1.7;
  color: ${colorCSS['faillog_black']};
  outline: none;
  resize: vertical;
  background: ${colorCSS['faillog_sector-gray']};

  &::placeholder {
    color: ${colorCSS['faillog_gray8']};
  }

  &:focus {
    border-color: ${colorCSS['faillog_blue']};
  }
`;

S.ReplyFooter = styled(S.InputFooter)``;

export default S;
