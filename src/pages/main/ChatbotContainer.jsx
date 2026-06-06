import React, { useState, useRef, useEffect } from 'react';
import botIconSvg from './chatbot_icon/Group 1838.svg';
import sendIconSvg from './chatbot_icon/Group 446.svg';
import S from './ChatbotContainerStyle';
import theme from '../../styles/theme';

const QUICK_REPLIES = ['페일로그란?', '사용방법', '주요 기능 소개'];

const FIXED_ANSWERS = {
    '페일로그란?': `페일로그(FailLog)는 실패를 기록하고 분석하여\n성장의 데이터로 바꿔주는 자기계발 플랫폼입니다.\n\n사람들은 실패 후 반성하지만,\n시간이 지나면 당시의 판단 근거, 제약 상황, 무시했던\n신호들을 잊어버리고 같은 실수를 반복하게 됩니다.\n\n페일로그는 실패의 맥락을 구조화하여 기록하고,\nAI가 패턴을 분석해 객관적인 자기 인식과\n실질적인 개선을 도와줍니다.\n\n지나간 실패들이 모여 성공의 한 패가 됩니다. 🌱`,
    '사용방법': `페일로그는 4단계로 사용합니다.\n\n① 기록\n실패를 구조화된 양식으로 작성하세요.\n카테고리, 비전(목표), 제목을 선택한 뒤\n당시 상황, 선택, 결과를 일기처럼 편하게 적으면 됩니다.\n\n② 분석\n작성한 로그를 AI에게 분석 요청하세요.\n분석 스타일(따뜻하게 / 객관적 / 직설적)을 고른 뒤\n버튼 하나로 AI 리포트를 받을 수 있습니다.\n실패 유형, 내외부 요인 비율, 패턴, 액션플랜 등\n심층 분석 결과를 확인하세요.\n\n③ 프로젝트 생성\nAI 분석 결과를 바탕으로 개선 프로젝트를 만드세요.\n목표 기간을 설정하고 체크리스트를 통해\n매일 실천 여부를 기록할 수 있습니다.\n\n④ 공유 & 성장\n완성된 로그를 커뮤니티에 공유하고\n다른 사람의 실패 경험에서 인사이트를 얻으세요.\n성장 연대기에서 나의 성장 통계도 확인할 수 있습니다.`,
    '주요 기능 소개': `페일로그의 주요 기능을 소개해드릴게요!\n\n📝 페일 로그 작성\n카테고리와 비전을 설정하고, 나의 실패 경험을\n구조화된 템플릿으로 기록합니다.\n임시저장 기능으로 언제든지 이어서 쓸 수 있어요.\n\n🤖 AI 실패 분석 리포트\n작성한 로그를 AI가 심층 분석합니다.\n- 실패 유형 & 원인 분석\n- 내부/외부 요인 비율\n- 반복 패턴 감지 (레이더 차트)\n- 구체적인 액션플랜 제안\n분석 스타일을 따뜻하게·객관적·직설적으로 선택 가능!\n\n📋 개선 프로젝트 & 체크리스트\nAI 분석 결과를 바탕으로 개선 프로젝트를 생성하고,\n체크리스트로 일별 실천 기록을 남겨보세요.\n\n📊 성장 연대기\n완료된 체크리스트 수, 다른 사용자 대비 백분위,\n반복 실천 항목 TOP 3 등 나의 성장 데이터를\n한눈에 볼 수 있어요.\n\n👥 커뮤니티\n다양한 분야의 실패 사례를 읽고 공감하며\n지식과 경험을 함께 나눠요.\n\n💌 방명록\n다른 사용자의 프로필에 방문해 응원 메시지를 남기고,\n서로의 성장을 격려할 수 있어요.\n\n💬 AI 챗봇 (페로)\n페일로그에 대한 궁금한 점이나\n실패 경험 관련 고민을 자유롭게 대화해보세요!`,
};

const getTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const INIT_MESSAGES = [
    {
        id: 1,
        role: 'bot',
        text: '안녕하세요!\n페일로그 AI 챗봇 페로입니다.\n무엇을 도와드릴까요?',
        quickReplies: QUICK_REPLIES,
        time: getTime(),
    },
];

const ChatbotContainer = () => {
    const [open, setOpen]         = useState(false);
    const [input, setInput]       = useState('');
    const [focused, setFocused]   = useState(false);
    const [messages, setMessages] = useState(INIT_MESSAGES);
    const [loading, setLoading]   = useState(false);
    const bottomRef               = useRef(null);
    const inputRef                = useRef(null);

    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    const sendMessage = async (text) => {
        const msg = text?.trim() || input.trim();
        if (!msg || loading) return;

        // 유저 메시지 추가
        setMessages(prev => [
            ...prev,
            { id: Date.now(), role: 'user', text: msg, time: getTime() },
        ]);
        setInput('');
        setLoading(true);
        inputRef.current?.focus();

        try {
            if (FIXED_ANSWERS[msg]) {
                setMessages(prev => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        role: 'bot',
                        text: FIXED_ANSWERS[msg],
                        time: getTime(),
                    },
                ]);
                return;
            }

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ aiChatContent: msg }),
            });

            if (!res.ok) throw new Error('서버 오류');

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'bot',
                    text: data.aiChatContent,
                    time: getTime(),
                },
            ]);

        } catch (e) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'bot',
                    text: '죄송합니다. 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
                    time: getTime(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {open && (
                <S.ChatWindow>
                    <S.Header>
                        <S.HeaderTitle>AI Chat</S.HeaderTitle>
                        <S.CloseBtn onClick={() => setOpen(false)} aria-label="닫기">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 1L11 11M11 1L1 11" stroke={theme.PALETTE.black} strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                        </S.CloseBtn>
                    </S.Header>

                    <S.ChatArea>
                        {messages.map((msg) =>
                            msg.role === 'bot' ? (
                                <S.BotRow key={msg.id}>
                                    <S.BotAvatarWrap>
                                        <img src={botIconSvg} alt="페로" width={24} height={24} />
                                    </S.BotAvatarWrap>
                                    <S.BotContent>
                                        <S.BotName>페로</S.BotName>
                                        <S.BotBubble>
                                            {msg.title && (
                                                <S.BotBubbleTitle>{msg.title}</S.BotBubbleTitle>
                                            )}
                                            {msg.text.split('\n').map((line, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {line}{i < arr.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                            {msg.quickReplies && (
                                                <S.QuickReplies>
                                                    {msg.quickReplies.map((q) => (
                                                        <S.QuickReplyBtn key={q} onClick={() => sendMessage(q)}>
                                                            {q}
                                                        </S.QuickReplyBtn>
                                                    ))}
                                                </S.QuickReplies>
                                            )}
                                        </S.BotBubble>
                                        <S.MsgTime>{msg.time}</S.MsgTime>
                                    </S.BotContent>
                                </S.BotRow>
                            ) : (
                                <S.UserRow key={msg.id}>
                                    <S.UserContent>
                                        <S.UserBubble>{msg.text}</S.UserBubble>
                                        <S.MsgTime $right>{msg.time}</S.MsgTime>
                                    </S.UserContent>
                                </S.UserRow>
                            )
                        )}

                        {/* 로딩 중 표시 */}
                        {loading && (
                            <S.BotRow>
                                <S.BotAvatarWrap>
                                    <img src={botIconSvg} alt="페로" width={24} height={24} />
                                </S.BotAvatarWrap>
                                <S.BotContent>
                                    <S.BotName>페로</S.BotName>
                                    <S.BotBubble>답변을 생성 중입니다...</S.BotBubble>
                                </S.BotContent>
                            </S.BotRow>
                        )}

                        <div ref={bottomRef} />
                    </S.ChatArea>

                    <S.InputArea>
                        <S.InputWrap $focused={focused}>
                            <S.InputInner>
                                <S.Input
                                    ref={inputRef}
                                    value={input}
                                    placeholder={loading ? '답변 생성 중...' : '대화를 시작해보세요!'}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    disabled={loading}
                                />
                                <S.SendBtn onClick={() => sendMessage()} aria-label="전송" disabled={loading}>
                                    <img src={sendIconSvg} alt="전송" width={16} height={16} />
                                </S.SendBtn>
                            </S.InputInner>
                        </S.InputWrap>
                    </S.InputArea>
                </S.ChatWindow>
            )}

            <S.Fab onClick={() => setOpen((v) => !v)} aria-label="챗봇 열기">
                <img src={botIconSvg} alt="chatbot" width={32} height={32} />
            </S.Fab>
        </>
    );
};

export default ChatbotContainer;