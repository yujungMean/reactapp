import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './MainMenuContainerStyle';
import { BlinkCursor } from './IntroContainerStyle';

import iconFaillog from './main_icon/file_1324039.svg';
import iconProject from './main_icon/routine_4088138.svg';
import iconChronology from './main_icon/graph_1357731.svg';
import iconCommunity from './main_icon/feedback_2512312.svg';
import iconMypage from './main_icon/crm_304575.svg';

const CARDS = [
    {
        label: '페일로그',
        desc: '모두의 기록들을\n한눈에 모아보기',
        path: '/fail-logs',
        icon: iconFaillog,
        iconBg: 'linear-gradient(135deg, #F53102, #FF34C5)',
    },
    {
        label: '프로젝트',
        desc: '재도전을 위한\n행동 계획하기',
        path: '/projects',
        icon: iconProject,
        iconBg: 'linear-gradient(135deg, #FF34C5, #F5EE03)',
    },
    {
        label: '성장 연대기',
        desc: '자신의 발전 과정을\n확인하기',
        path: '/chronology',
        icon: iconChronology,
        iconBg: 'linear-gradient(135deg, #F5EE03, #00B53F)',
    },
    {
        label: '커뮤니티',
        desc: '다른 사람들과\n소통하기',
        path: '/community',
        icon: iconCommunity,
        iconBg: 'linear-gradient(135deg, #00B53F, #027DF0)',
    },
    {
        label: '마이페이지',
        desc: '내 정보\n관리하기',
        path: '/my-page/profile',
        icon: iconMypage,
        iconBg: 'linear-gradient(135deg, #027DF0, #9333EA)',
    },
];

const SUB_LINE1 = '실패를 기록하고, 나만의 성공 데이터를 만들어 보세요.';
const SUB_LINE2 = '무엇을 도전했나요?';

const TypewriterSubtitle = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        let t;

        const start = (initialDelay) => {
            let i = 0;
            setText1('');
            setText2('');
            setPhase(0);

            const typeLine1 = () => {
                if (i < SUB_LINE1.length) {
                    i++;
                    setText1(SUB_LINE1.slice(0, i));
                    t = setTimeout(typeLine1, 55);
                } else {
                    i = 0;
                    setPhase(1);
                    t = setTimeout(typeLine2, 350);
                }
            };

            const typeLine2 = () => {
                if (i < SUB_LINE2.length) {
                    i++;
                    setText2(SUB_LINE2.slice(0, i));
                    t = setTimeout(typeLine2, 55);
                } else {
                    setPhase(2);
                    t = setTimeout(() => start(0), 3000);
                }
            };

            t = setTimeout(typeLine1, initialDelay);
        };

        start(600);
        return () => clearTimeout(t);
    }, []);

    return (
        <p className="main-menu-subtitle">
            {text1}{phase === 0 && <BlinkCursor />}
            {text1 && <br />}
            {text2}{phase === 1 && <BlinkCursor />}
        </p>
    );
};

const MainMenuContainer = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.Inner>
                <S.TitleSection>
                    <h1 className="main-menu-title">실패가 성장의 자산이 되는 공간, <S.GradientText>FailLog</S.GradientText></h1>
                    <TypewriterSubtitle />
                </S.TitleSection>

                <S.CardWrapper>
                    {CARDS.map((card) => (
                        <S.Card
                            key={card.label}
                            onClick={() => navigate(card.path)}
                        >
                            <S.CardIconBox $iconBg={card.iconBg}>
                                <img src={card.icon} alt={card.label} />
                            </S.CardIconBox>
                            <S.CardLabel>{card.label}</S.CardLabel>
                            <S.CardDesc>
                                {card.desc.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < card.desc.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </S.CardDesc>
                        </S.Card>
                    ))}
                </S.CardWrapper>
            </S.Inner>
        </S.Container>
    );
};

export default MainMenuContainer;