import styled from "styled-components"
import { colorCSS, boxShadow } from "../style"
import { flexBetweenRow, flexCenterRow, flexCenterColumn } from "../../../styles/common"

const CARD_W = 420;
const CARD_H = 568;
const FOCUS_H = 648;

const S = {}

S.containerWrap = styled.div`
  height: 1172px;
  background-color: #F1F0F6;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

S.headerWrap = styled.div`
  padding-top: 118px;
  width: 100%;
  ${flexCenterRow}
`

S.header = styled.div`
  width: 1320px;
`

S.headerTestOneDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

S.headerTextTwoDiv = styled.div`
  margin-top: 13px;
`

S.CarouselWrapper = styled.div`
  margin-top: 60px;
  width: 100dvw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${FOCUS_H}px;
  flex-shrink: 0;
  user-select: none;
  cursor: grab;
`

S.Track = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  /* flex-shrink: 0; */
`

/* scale 애니메이션 기준 크기 — 포커스 transform은 JS DOM 조작으로 제어 */
S.CardOuter = styled.div`
  flex: 0 0 ${CARD_W}px;
  height: ${CARD_H}px;
  position: relative;
  cursor: pointer;
`

S.Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${boxShadow["boxBasic"]}
`

/* 부모 높이의 42% — 부모 크기 변화에 자동으로 따라감 */
S.CardImageWrap = styled.div`
  width: 100%;
  height: 44%;
  background: ${colorCSS["faillog_gray4"]};
  flex-shrink: 0;
  overflow: hidden;
`

S.CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
  pointer-events: none;
`

S.CardBody = styled.div`
  flex: 1;
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* overflow: hidden; */
`

S.CardMeta = styled.div`
  ${flexBetweenRow}
`

S.CategoryBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  color: ${colorCSS["faillog_purple"]};
  background-color: ${colorCSS["faillog_light_purple"]};
  padding: 5px 10px;
  border-radius: 100px;
`

S.CategoryWrap = styled.div`
  width: 72px;
  height: 28px;
  border-radius: 15px;

  background-color: ${({bgColor}) => colorCSS[bgColor]};
  ${flexCenterRow}
`

S.CardTitle = styled.div`
  flex-shrink: 0;
`

S.CardContent = styled.div`
  flex: 1;
  overflow: hidden;
`

S.ContentText = styled.span`
  font-size: 20px;
  font-weight: 300;
  line-height: 30px;
  letter-spacing: -0.03em;
  color: #8D8D8D;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: ${({isvisible}) => isvisible ? "visible" : "hidden"};
  text-overflow: ellipsis;
`

S.CardDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${colorCSS["faillog_gray1"]};
  margin: 0;
`

S.CardFooter = styled.div`
  ${flexBetweenRow}
  flex-shrink: 0;
`

S.AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  &:hover span { text-decoration: underline; }
`

S.AvatarWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, #4359FC, #AB47FF);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

S.AuthorAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`

S.Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

S.postInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`

S.StatItem = styled.span`
  font-size: 12px;
  color: ${colorCSS["faillog_black"]};
  display: flex;
  align-items: center;
  gap: 3px;
`

S.PaginationWrap = styled.div`
  margin-top: 36px;
  ${flexCenterRow}
  gap: 15px;
  padding-bottom: 0px;
`

S.PageLine = styled.div`
  width: 396px;
  height: 2px;
  background: linear-gradient(to right, ${colorCSS["faillog-black"]} var(--rate), #E6E6E6 var(--rate));
`

S.PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`

S.NavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${colorCSS["faillog_gray9"]};
  padding: 4px 8px;
  line-height: 1;
  &:hover {
    color: ${colorCSS["faillog-black"]};
  }
`

export default S
