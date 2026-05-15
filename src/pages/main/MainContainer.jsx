import React from 'react';
import MainMenuContainer from './MainMenuContainer';
import IntroContainer from './IntroContainer';
import ChatbotContainer from './ChatbotContainer';
import useAuthStore from '../../store/authStore';

const MainContainer = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <>
            {isAuthenticated ? <MainMenuContainer /> : <IntroContainer />}
        </>
    );
};

export default MainContainer;