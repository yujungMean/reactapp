import React from 'react';
import styled from 'styled-components';
import S, { colorCSS } from '../../style';

const ImageCard = ({ src, name }) => {
  
  const handleDownload = () => {
    if (src.startsWith('data:')) {
      // base64 → Blob → object URL → 새 탭
      const [header, base64] = src.split(',');
      const mime = header.match(/:(.*?);/)[1];
      const bytes = atob(base64);
      const arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      const blob = new Blob([arr], { type: mime });
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl, '_blank', 'noopener,noreferrer');
      // setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    } else {
      window.open(src, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card onClick={handleDownload}>
      <ImageWrapper>
        {/* 나중에 크기 불러올 예정 */}
        <Image src={src} alt={name} />
      </ImageWrapper>
      <TextArea>
        <S.Span size="h11Regular" isvisible="true">{name}</S.Span>
      </TextArea>
    </Card>
  );
};

const Card = styled.div`
  width: 144px;
  height: 132px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid ${colorCSS["faillog_gray4"]};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${colorCSS["faillog_purple"]};
  }
`;

const ImageWrapper = styled.div`
  width: 144px;
  height: 96px;
  background-color: ${colorCSS["faillog_gray2"]};
  flex-shrink: 0;

  /* img {
    width: 144px;
    height: 96px;
    object-fit: cover;
    display: block;
  } */
`;

const Image = styled.img`
    width: 144px;
    height: 96px;
    object-fit: cover;
    display: block;
`

const TextArea = styled.div`
  width: 144px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  background-color: #ffffff;
  box-sizing: border-box;

  span {
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${colorCSS["faillog_blue"]};
    text-decoration: underline;
  }
`;

export default ImageCard;
