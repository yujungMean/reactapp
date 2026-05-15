import React from 'react';
import styled from 'styled-components';
import chatbotIcon from './intro_icon/chatbot_10541415.svg';

const ChatbotContainer = () => {
    return (
        <S.ChatbotFab aria-label="챗봇 열기">
            <S.ChatbotFabIcon src={chatbotIcon} alt="chatbot" />
        </S.ChatbotFab>
    );
};

const S = {};

S.ChatbotFab = styled.button`
    position: fixed;
    bottom: 36px;
    right: 36px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #027df0, #ab47ff);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(2, 125, 240, 0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    z-index: 200;

    &:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 28px rgba(2, 125, 240, 0.45);
    }
`;

S.ChatbotFabIcon = styled.img`
    width: 32px;
    height: 32px;
    filter: invert(1);
`;

export default ChatbotContainer;