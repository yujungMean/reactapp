import styled, { keyframes } from "styled-components"
import { colorCSS, sizeCSS } from "../../style"
import { flexCenterRow } from "../../../styles/common"

const glow = keyframes`
  0%   { filter: drop-shadow(0 0 3px rgba(171, 71, 255, 0.6)); opacity: 1; }
  50%  { filter: drop-shadow(0 0 10px rgba(2, 125, 240, 1)) drop-shadow(0 0 20px rgba(171, 71, 255, 0.9)); opacity: 0.85; }
  100% { filter: drop-shadow(0 0 3px rgba(171, 71, 255, 0.6)); opacity: 1; }
`

const searchStyle = {}
searchStyle.component = styled.div`
  width: 100%;
  height: 60px;
background: linear-gradient(white, white) padding-box,
            linear-gradient(90deg, ${colorCSS["faillog_blue"]}, ${colorCSS["faillog_purple"]}) border-box;
border: 2px solid transparent;
border-radius: 15px;

display: flex;
justify-content: space-between;
align-items: center;

padding-left: 16px;
padding-right: 12px;
`

searchStyle.contentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`

searchStyle.image1 = styled.img`
  width: 20px;
  height: 20px;
  animation: ${glow} 2.4s ease-in-out infinite;
`

searchStyle.buttonImage = styled.img`
  width: 20px;
  height: 20px;
`

searchStyle.search = styled.input`
  flex: 1;
  min-width: 0;
  height: 32px;
  border: none;
  ${sizeCSS["h7-regular"]}

    &:focus {
    outline: none;
  }
`

searchStyle.searchButton = styled.button`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${colorCSS["faillog_blue"]}, ${colorCSS["faillog_purple"]});
  border: none;
  border-radius: 999px;
  cursor: pointer;
  flex-shrink: 0;

  ${flexCenterRow}
`

export default searchStyle