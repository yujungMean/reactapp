import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProjectCreateModal from './create/ProjectCreateModal';
import ProjectCreateStep1Modal from './create/ProjectCreateStep1Modal';
import ProjectCreateStep2Modal from './create/ProjectCreateStep2Modal';
import ProjectEditModal from './edit/ProjectEditModal';
import useProjectStore from '../../store/projectStore';
import {
	flexBetweenRow,
	flexStartRow,
	flexCenterRow,
	flexCenter,
	h2Bold,
	h3Bold,
	h3_2Bold,
	h4Bold,
	h5Regular,
	h5Bold,
	h6Bold,
	h7Bold,
	h7Regular,
	h8Bold,
	h8Regular,
	h9Bold,
	h9Regular,
	h10Bold,
} from '../../styles/common';
import theme from '../../styles/theme';

// ─────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────
const MOCK_CHECKLIST = [
	{ id: 1, title: '운동복과 물을 자기 전에 미리 준비하기', memo: '아침 실행 전 생각할 요소를 줄여 시작 허들을 낮춥니다.', priority: '높음', status: null },
	{ id: 2, title: '갈등 상황에서 24시간 후 결정하기', memo: '즉각 반응 대신 하루 뒤 다시 생각하는 규칙을 만들어 지킵니다.', priority: '중간', status: null },
	{ id: 3, title: '일을 3개 단위로 나눠서 시간 배분하기', memo: '한 번에 끝마치는 습관을 줄이고 실수를 예방합니다.', priority: '낮음', status: null },
];

const MOCK_ACTIONS = [
	{ id: 1, title: '실패 분석 보기', desc: '밤이 되기 전 준비한 행동을 가장 먼저 체크하세요.', path: '/logs' },
	{ id: 2, title: '실내 대체 계획 추가', desc: '날씨 변수를 위한 실내 계획을 추가해보세요.', path: null },
	{ id: 3, title: '주말 기준 완화', desc: '잠들기 전 완료로 기준을 넓히는 게 좋아요.', path: null },
	{ id: 4, title: '최초 4개 추천이 뜨는걸로 해야 될것 같지 않겠는지', desc: '날씨 변수를 위한 실내 계획을 추가해보세요.', path: null },
];

const MOCK_SUGGESTIONS = [
	{ id: 1, user: '마인드컨트롤러', avatar: '마', text: '아침 루틴에 \'잔을 세수하기\'를 추가해보세요. 잘 해는 대 최고입니다!' },
	{ id: 2, user: '마인드컨트롤러', avatar: '마', text: '아침 루틴에 \'잔을 세수하기\'를 추가해보세요. 잘 해는 대 최고입니다!' },
	{ id: 3, user: '마인드컨트롤러', avatar: '마', text: '아침 루틴에 \'잔을 세수하기\'를 추가해보세요. 잘 해는 대 최고입니다!' },
];

// ─────────────────────────────────────────
// PRIORITY CONFIG
// ─────────────────────────────────────────
const PRIORITY_CONFIG = {
	높음: { label: '우선순위 높음', bg: theme.PALETTE.fourth.light, color: theme.PALETTE.fourth.main },
	중간: { label: '우선순위 중간', bg: theme.PALETTE.primary.light, color: theme.PALETTE.primary.main },
	낮음: { label: '우선순위 낮음', bg: theme.PALETTE.secondary.light, color: theme.PALETTE.secondary.main },
};

// ─────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────
const AiBadge = () => (
	<S.AiBadge>
		<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
			<circle cx="14" cy="14" r="14" fill="url(#ai_grad)" />
			<text x="14" y="19" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">AI</text>
			<defs>
				<linearGradient id="ai_grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
					<stop stopColor={theme.PALETTE.primary.main} />
					<stop offset="1" stopColor={theme.PALETTE.third.main} />
				</linearGradient>
			</defs>
		</svg>
		AI
	</S.AiBadge>
);

const ChecklistItem = ({ item, onToggle, onStatusChange }) => {
	const [expanded, setExpanded] = useState(false);
	const [memo, setMemo] = useState(item.memo || '');
	const priorityConf = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG['낮음'];

	return (
		<S.CheckItem $status={item.status}>
			<S.CheckItemTop onClick={() => setExpanded(prev => !prev)}>
				<S.CheckLeft>
					<S.CheckCircle $status={item.status} onClick={(e) => { e.stopPropagation(); }}>
						{item.status === 'success' && (
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						)}
						{item.status === 'fail' && (
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
								<path d="M4 4L10 10M10 4L4 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
							</svg>
						)}
					</S.CheckCircle>
					<S.CheckTitle $status={item.status}>{item.title}</S.CheckTitle>
				</S.CheckLeft>
				<S.CheckRight>
					<S.PriorityBadge $bg={priorityConf.bg} $color={priorityConf.color}>
						{priorityConf.label}
					</S.PriorityBadge>
					<S.ChevronIcon $expanded={expanded}>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M3 5L7 9L11 5" stroke={theme.PALETTE.black} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</S.ChevronIcon>
				</S.CheckRight>
			</S.CheckItemTop>

			{expanded && (
				<S.CheckExpanded>
					<S.MemoLabel>한 줄 메모</S.MemoLabel>
					<S.MemoInput
						value={memo}
						onChange={(e) => setMemo(e.target.value)}
						placeholder="아직 작성되지 않았습니다."
					/>
					<S.CheckActions>
						<S.CheckActionsLeft>
							<S.SmallBtn onClick={() => onToggle(item.id, 'delete')}>삭제</S.SmallBtn>
							<S.SmallBtn onClick={() => onToggle(item.id, 'edit')}>수정</S.SmallBtn>
						</S.CheckActionsLeft>
						<S.CheckActionsRight>
							<S.StatusBtn $active={item.status === 'success'} $type="success" onClick={() => onStatusChange(item.id, item.status === 'success' ? null : 'success')}>
								목표 달성
							</S.StatusBtn>
							<S.StatusBtn $active={item.status === 'fail'} $type="fail" onClick={() => onStatusChange(item.id, item.status === 'fail' ? null : 'fail')}>
								목표 실패
							</S.StatusBtn>
						</S.CheckActionsRight>
					</S.CheckActions>
				</S.CheckExpanded>
			)}
		</S.CheckItem>
	);
};

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
const ProjectMain = () => {
	const navigate = useNavigate();
	const { projects, addProject, updateProject, deleteProject } = useProjectStore();
	const [step, setStep] = useState(null);
	const [projectData, setProjectData] = useState({});
	const [editingProject, setEditingProject] = useState(null);
	const [checklist, setChecklist] = useState(MOCK_CHECKLIST);
	const [suggestion, setSuggestion] = useState('');
	const [addedToMyProject, setAddedToMyProject] = useState(false);
	const [showAddedPopup, setShowAddedPopup] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [newItem, setNewItem] = useState({ title: '', memo: '', priority: null });

	const activeProject = projects.find((p) => p.isActive) || projects[0];

	// 프로젝트 생성 플로우
	const handleStep1Next = (data) => { setProjectData(data); setStep('step2'); };
	const handleCreate = (data) => { addProject({ ...projectData, ...data }); setStep(null); setProjectData({}); };

	// 프로젝트 편집
	const handleEditOpen = () => {
		if (activeProject) { setEditingProject(activeProject); setStep('edit'); }
	};
	const handleUpdate = (data) => {
		if (editingProject) {
			updateProject(editingProject.id, { name: data.projectName, startDate: data.startDate, endDate: data.endDate, isActive: data.isActive });
		}
		setStep(null); setEditingProject(null);
	};
	const handleClose = () => { setStep(null); setEditingProject(null); setProjectData({}); };

	// 체크리스트
	const handleCheckToggle = (id, action) => {
		setChecklist(prev => prev.filter(item => action === 'delete' ? item.id !== id : true));
	};
	const handleStatusChange = (id, status) => {
		setChecklist(prev => prev.map(item => item.id === id ? { ...item, status } : item));
	};

	// 새 항목 추가
	const handleAddItem = () => {
		if (!newItem.title.trim()) return;
		setChecklist(prev => [...prev, {
			id: Date.now(),
			title: newItem.title,
			memo: newItem.memo,
			priority: newItem.priority || '낮음',
			status: null,
		}]);
		setNewItem({ title: '', memo: '', priority: null });
		setShowAddModal(false);
	};

	// 내 프로젝트 추가 팝업
	const handleAddToMyProject = () => {
		setShowAddedPopup(true);
		setAddedToMyProject(true);
	};

	// D-Day 계산
	const getDDay = (startDate) => {
		if (!startDate) return 'D-Day';
		const start = new Date(startDate);
		const today = new Date();
		const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
		return diff >= 0 ? `D+${diff}` : `D${diff}`;
	};

	// 프로젝트 진행률 (mock)
	const progressPercent = 68;

	return (
		<S.PageWrapper>
			{/* MODALS */}
			{step === 'select' && <ProjectCreateModal onClose={handleClose} onNext={() => setStep('step1')} />}
			{step === 'step1' && <ProjectCreateStep1Modal onClose={handleClose} onNext={handleStep1Next} />}
			{step === 'step2' && <ProjectCreateStep2Modal onClose={handleClose} onSubmit={handleCreate} projectName={projectData.projectName} isActive={projectData.isActive} />}
			{step === 'edit' && (
				<ProjectEditModal
					onClose={handleClose}
					onSubmit={handleUpdate}
					initialData={editingProject ? {
						projectName: editingProject.name,
						startDate: editingProject.startDate,
						endDate: editingProject.endDate,
						isActive: editingProject.isActive,
					} : {}}
				/>
			)}

			{/* 내 프로젝트 추가 팝업 */}
			{showAddedPopup && (
				<S.AddedPopupOverlay>
					<S.AddedPopup>
						<S.AddedPopupText>내 프로젝트에<br />추가되었습니다.</S.AddedPopupText>
						<S.AddedPopupBtn onClick={() => setShowAddedPopup(false)}>확인</S.AddedPopupBtn>
					</S.AddedPopup>
				</S.AddedPopupOverlay>
			)}

			<S.Inner>
				{/* ── PAGE TITLE ── */}
				<S.PageTop>
					<S.PageTitle>PROJECT</S.PageTitle>
					<S.TopBtnRow>
						{activeProject ? (
							<S.OutlineBtn $danger onClick={() => activeProject && deleteProject?.(activeProject.id)}>
								프로젝트 삭제
							</S.OutlineBtn>
						) : (
							<S.OutlineBtn onClick={handleAddToMyProject}>내 프로젝트 추가</S.OutlineBtn>
						)}
					</S.TopBtnRow>
				</S.PageTop>

				{/* ── VISION ── */}
				<S.Section>
					<S.SectionLabel>VISION</S.SectionLabel>
					<S.VisionText>{activeProject?.vision || '꾸준히 운동해서 미래에도 건강한 몸 유지하기'}</S.VisionText>
				</S.Section>

				{/* ── AI 추천 프로젝트 CARD ── */}
				<S.ProjectCard>
					<S.ProjectCardInner>
						<S.ProjectCardMeta>
							<S.AiRecommendLabel><AiBadge /> AI 추천 프로젝트</S.AiRecommendLabel>
						</S.ProjectCardMeta>
						<S.ProjectName>{activeProject?.name || '20일 아침루틴 만들기'}</S.ProjectName>
						<S.ProjectDateRange>
							{activeProject?.startDate || '2026.03.01'} ~ {activeProject?.endDate || '2027.03.14'}
						</S.ProjectDateRange>
						<S.ProjectGoal>{activeProject?.goal || '목표를 위해 달린다'}</S.ProjectGoal>
						<S.ProgressRow>
							<S.ProgressBar>
								<S.ProgressFill $percent={progressPercent} />
							</S.ProgressBar>
							<S.DDay>{getDDay(activeProject?.startDate)}</S.DDay>
						</S.ProgressRow>
					</S.ProjectCardInner>
					<S.ProjectEditBtn onClick={handleEditOpen}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2Z" stroke={theme.GRAYSCALE[7]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</S.ProjectEditBtn>
				</S.ProjectCard>

				{/* ── 행동 추천 ── */}
				<S.Section $mt="60px">
					<S.SectionTitleRow>
						<S.SectionTitle>행동 추천 <AiBadge /></S.SectionTitle>
					</S.SectionTitleRow>
					<S.ActionGrid>
						{MOCK_ACTIONS.map((action) => (
							<S.ActionCard key={action.id} onClick={() => action.path && navigate(action.path)}>
								<S.ActionDot />
								<S.ActionContent>
									<S.ActionTitle>{action.title}</S.ActionTitle>
									<S.ActionDesc>{action.desc}</S.ActionDesc>
								</S.ActionContent>
							</S.ActionCard>
						))}
					</S.ActionGrid>
				</S.Section>

				{/* ── Checklist ── */}
				<S.Section $mt="60px">
					<S.SectionTitle>Checklist</S.SectionTitle>
					<S.ChecklistSubtitle>AI가 만든 '액션'을 그대로 사용하거나, 내 계획으로 설정할 수 있습니다.</S.ChecklistSubtitle>
					<S.ChecklistList>
						{checklist.map((item) => (
							<ChecklistItem
								key={item.id}
								item={item}
								onToggle={handleCheckToggle}
								onStatusChange={handleStatusChange}
							/>
						))}
					</S.ChecklistList>
					<S.AddItemBtn onClick={() => setShowAddModal(true)}>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M7 1V13M1 7H13" stroke={theme.GRAYSCALE[7]} strokeWidth="1.5" strokeLinecap="round" />
						</svg>
						새 항목 추가
					</S.AddItemBtn>

					{/* ── 새 항목 추가 모달 ── */}
					{showAddModal && (
						<S.ModalOverlay onClick={() => setShowAddModal(false)}>
							<S.AddModal onClick={(e) => e.stopPropagation()}>
								<S.AddModalHeader>
									<S.AddModalTitle>새 항목 추가</S.AddModalTitle>
									<S.AddModalClose onClick={() => setShowAddModal(false)}>✕</S.AddModalClose>
								</S.AddModalHeader>

								<S.AddModalField>
									<S.AddModalLabel>항목 이름</S.AddModalLabel>
									<S.AddModalInput
										placeholder="예) 자기 전 30분 독서하기"
										value={newItem.title}
										onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
									/>
								</S.AddModalField>

								<S.AddModalField>
									<S.AddModalLabel>한 줄 메모</S.AddModalLabel>
									<S.AddModalTextarea
										placeholder="아직 작성되지 않았습니다."
										value={newItem.memo}
										onChange={(e) => setNewItem(prev => ({ ...prev, memo: e.target.value }))}
									/>
								</S.AddModalField>

								<S.AddModalBottom>
									<S.AddModalPriorityRow>
										<S.AddModalPriorityBtns>
											{['높음', '중간', '낮음'].map((p) => (
												<S.PrioritySelectBtn
													key={p}
													$selected={newItem.priority === p}
													$priority={p}
													onClick={() => setNewItem(prev => ({ ...prev, priority: p }))}
												>
													우선순위 {p}
												</S.PrioritySelectBtn>
											))}
										</S.AddModalPriorityBtns>
									</S.AddModalPriorityRow>
									<S.AddModalSubmitBtn onClick={handleAddItem}>추가하기</S.AddModalSubmitBtn>
								</S.AddModalBottom>
							</S.AddModal>
						</S.ModalOverlay>
					)}
				</S.Section>

				{/* ── Suggestion ── */}
				<S.Section $mt="60px" $mb="120px">
					<S.SectionTitle>Suggestion</S.SectionTitle>
					<S.SuggestionBox>
						<S.SuggestionLeft>
							<S.SuggestionIcon>
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
									<path d="M14 4L17 10L24 11L19 16L20.5 23L14 20L7.5 23L9 16L4 11L11 10L14 4Z" fill={theme.PALETTE.third.main} stroke={theme.PALETTE.third.main} strokeWidth="1.5" strokeLinejoin="round" />
								</svg>
							</S.SuggestionIcon>
							<S.SuggestionTextWrap>
								<S.SuggestionPrompt>당신의 체크리스트를<br />공유해주세요.</S.SuggestionPrompt>
								<S.SuggestionDesc>작은 조건과 최대한 성장의 발자들이 됩니다.</S.SuggestionDesc>
							</S.SuggestionTextWrap>
							<S.SuggestionInput
								value={suggestion}
								onChange={(e) => setSuggestion(e.target.value)}
								placeholder="제안을 입력해보세요."
							/>
							<S.SuggestionSubmitBtn>
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
									<path d="M2 12L6.5 7.5M2 2L12 7L6.5 7.5L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								제안 남기기
							</S.SuggestionSubmitBtn>
						</S.SuggestionLeft>
						<S.SuggestionRight>
							{MOCK_SUGGESTIONS.map((s) => (
								<S.SuggestionItem key={s.id}>
									<S.SuggestionAvatar>{s.avatar}</S.SuggestionAvatar>
									<S.SuggestionItemContent>
										<S.SuggestionUser>{s.user}</S.SuggestionUser>
										<S.SuggestionItemText>{s.text}</S.SuggestionItemText>
									</S.SuggestionItemContent>
									<S.AddListBtn>+ 리스트 추가</S.AddListBtn>
								</S.SuggestionItem>
							))}
						</S.SuggestionRight>
					</S.SuggestionBox>
				</S.Section>
			</S.Inner>
		</S.PageWrapper>
	);
};

// ─────────────────────────────────────────
// STYLED COMPONENTS
// ─────────────────────────────────────────
const S = {};

S.PageWrapper = styled.div`
	min-height: 100vh;
	background-color: #F8F9FA;
`;

S.Inner = styled.div`
	max-width: 1320px;
	margin: 0 auto;
	padding: 0 60px;
`;

S.PageTop = styled.div`
	${flexBetweenRow}
	padding-top: 120px;
	padding-bottom: 0;
	margin-bottom: 50px;
`;

S.PageTitle = styled.h1`
	${h2Bold}
	color: ${theme.PALETTE.black};
`;

S.TopBtnRow = styled.div`
	${flexStartRow}
	gap: 12px;
`;

S.OutlineBtn = styled.button`
	${h8Bold}
	height: 40px;
	padding: 0 20px;
	border-radius: 10px;
	border: 1px solid ${({ $danger }) => $danger ? '#FF4D4D' : theme.GRAYSCALE[4]};
	color: ${({ $danger }) => $danger ? '#FF4D4D' : theme.GRAYSCALE[9]};
	background: ${theme.PALETTE.white};
	transition: all 0.15s ease;
	&:hover {
		background: ${({ $danger }) => $danger ? '#FFF0F0' : theme.GRAYSCALE[1]};
	}
`;

S.Section = styled.div`
	margin-top: ${({ $mt }) => $mt || '0'};
	margin-bottom: ${({ $mb }) => $mb || '0'};
`;

S.SectionLabel = styled.p`
	${h3_2Bold}
	color: ${theme.PALETTE.black};
	margin-bottom: 10px;
`;

S.SectionTitle = styled.h2`
	${h4Bold}
	color: ${theme.PALETTE.black};
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
`;

S.SectionTitleRow = styled.div`
	${flexBetweenRow}
	margin-bottom: 24px;
`;

S.VisionText = styled.p`
	${h7Bold}
	color: ${theme.PALETTE.primary.main};
	margin-bottom: 50px;
`;

S.AiBadge = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: 11px;
	font-weight: 700;
	color: ${theme.PALETTE.primary.main};
`;

/* ── Project Card ── */
S.ProjectCard = styled.div`
	position: relative;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 16px;
	padding: 28px 40px 28px 32px;
	background: ${theme.PALETTE.white};
	box-shadow: 0 4px 20px rgba(0,0,0,0.05);
	display: flex;
	flex-direction: column;
`;

S.ProjectCardInner = styled.div``;

S.ProjectCardMeta = styled.div`
	${flexBetweenRow}
	margin-bottom: 16px;
`;

S.AiRecommendLabel = styled.span`
	${flexStartRow}
	gap: 6px;
	${h7Bold}
	color: ${theme.PALETTE.black};
`;

S.ProjectDateRange = styled.span`
	${h10Bold}
	color: ${theme.GRAYSCALE[10]};
	display: block;
	margin-bottom: 20px;
`;

S.ProjectName = styled.h3`
	${h5Bold}
	color: ${theme.PALETTE.black};
	margin-bottom: 20px;
`;

S.ProjectGoal = styled.p`
	${h8Regular}
	color: ${theme.GRAYSCALE[10]};
	margin-bottom: 16px;
`;

S.ProgressRow = styled.div`
	${flexBetweenRow}
	gap: 16px;
`;

S.ProgressBar = styled.div`
	flex: 1;
	height: 10px;
	background: ${theme.GRAYSCALE[2]};
	border-radius: 5px;
	overflow: hidden;
`;

S.ProgressFill = styled.div`
	height: 100%;
	width: ${({ $percent }) => $percent}%;
	background: linear-gradient(90deg, ${theme.PALETTE.primary.main}, ${theme.PALETTE.third.main});
	border-radius: 5px;
`;

S.DDay = styled.span`
	${h6Bold}
	color: ${theme.PALETTE.black};
	white-space: nowrap;
`;

S.ProjectEditBtn = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 32px;
	height: 32px;
	border-radius: 8px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	background: ${theme.PALETTE.white};
	${flexCenter}
	transition: all 0.15s;
	&:hover { background: ${theme.GRAYSCALE[1]}; }
`;

/* ── Action Grid ── */
S.ActionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px 40px;
`;

S.ActionCard = styled.div`
	${flexStartRow}
	align-items: flex-start;
	gap: 12px;
	padding: 24px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 12px;
	background: ${theme.PALETTE.white};
	cursor: pointer;
	transition: all 0.15s;
	&:hover { border-color: ${theme.PALETTE.third.main}; background: #faf5ff; }
`;

S.ActionDot = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${theme.PALETTE.third.main};
	flex-shrink: 0;
	margin-top: 4px;
`;

S.ActionContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

S.ActionTitle = styled.p`
	${h7Bold}
	color: ${theme.PALETTE.black};
`;

S.ActionDesc = styled.p`
	${h8Regular}
	color: ${theme.GRAYSCALE[10]};
`;

/* ── Checklist ── */
S.ChecklistSubtitle = styled.p`
	${h8Regular}
	color: ${theme.GRAYSCALE[10]};
	margin-bottom: 20px;
`;

S.ChecklistList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

S.CheckItem = styled.div`
	border: 1px solid ${({ $status }) =>
		$status === 'success' ? theme.PALETTE.secondary.main :
		$status === 'fail' ? theme.PALETTE.fourth.main :
		theme.GRAYSCALE[3]};
	border-radius: 12px;
	background: ${({ $status }) =>
		$status === 'success' ? theme.PALETTE.secondary.light :
		$status === 'fail' ? theme.PALETTE.fourth.light :
		theme.PALETTE.white};
	overflow: hidden;
	transition: all 0.2s;
`;

S.CheckItemTop = styled.div`
	${flexBetweenRow}
	padding: 18px 20px;
	min-height: 100px;
	cursor: pointer;
`;

S.CheckLeft = styled.div`
	${flexStartRow}
	gap: 30px;
	flex: 1;
`;

S.CheckRight = styled.div`
	${flexStartRow}
	gap: 12px;
`;

S.CheckCircle = styled.div`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	border: 2px solid ${({ $status }) =>
		$status === 'success' ? theme.PALETTE.secondary.main :
		$status === 'fail' ? theme.PALETTE.fourth.main :
		theme.GRAYSCALE[4]};
	background: ${({ $status }) =>
		$status === 'success' ? theme.PALETTE.secondary.main :
		$status === 'fail' ? theme.PALETTE.fourth.main :
		'transparent'};
	${flexCenter}
	flex-shrink: 0;
	transition: all 0.2s;
`;

S.CheckTitle = styled.span`
	${h7Bold}
	color: ${({ $status }) => $status ? theme.GRAYSCALE[7] : theme.PALETTE.black};
	text-decoration: ${({ $status }) => $status === 'success' ? 'line-through' : 'none'};
`;

S.PriorityBadge = styled.span`
	${h9Bold}
	padding: 4px 10px;
	border-radius: 20px;
	background: ${({ $bg }) => $bg};
	color: ${({ $color }) => $color};
	white-space: nowrap;
`;

S.ChevronIcon = styled.span`
	display: flex;
	transform: rotate(${({ $expanded }) => $expanded ? '180deg' : '0deg'});
	transition: transform 0.2s;
`;

S.CheckExpanded = styled.div`
	padding: 0 20px 16px 56px;
	border-top: 1px solid ${theme.GRAYSCALE[2]};
`;

S.MemoLabel = styled.p`
	${h8Regular}
	color: ${theme.PALETTE.black};
	margin: 12px 0 8px;
`;

S.MemoInput = styled.textarea`
	width: 100%;
	height: 56px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 8px;
	padding: 10px 12px;
	${h8Regular}
	font-family: 'pretendard', sans-serif;
	color: ${theme.PALETTE.black};
	resize: none;
	outline: none;
	margin-bottom: 12px;
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.CheckActions = styled.div`
	${flexBetweenRow}
`;

S.CheckActionsLeft = styled.div`
	${flexStartRow}
	gap: 8px;
`;

S.CheckActionsRight = styled.div`
	${flexStartRow}
	gap: 8px;
`;

S.SmallBtn = styled.button`
	${h9Regular}
	padding: 4px 12px;
	border-radius: 6px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	color: ${theme.GRAYSCALE[10]};
	background: ${theme.PALETTE.white};
	&:hover { background: ${theme.GRAYSCALE[1]}; }
`;

S.StatusBtn = styled.button`
	${h9Bold}
	padding: 4px 12px;
	border-radius: 6px;
	border: 1px solid ${({ $type }) => $type === 'success' ? theme.PALETTE.secondary.main : theme.PALETTE.fourth.main};
	color: ${({ $type, $active }) => $active ? 'white' : ($type === 'success' ? theme.PALETTE.secondary.main : theme.PALETTE.fourth.main)};
	background: ${({ $type, $active }) => !$active ? 'white' : ($type === 'success' ? theme.PALETTE.secondary.main : theme.PALETTE.fourth.main)};
	transition: all 0.15s;
`;

S.AddItemBtn = styled.button`
	${flexCenterRow}
	gap: 8px;
	width: 100%;
	height: 52px;
	margin-top: 10px;
	border: 1px solid ${theme.GRAYSCALE[4]};
	border-radius: 12px;
	${h8Regular}
	color: ${theme.PALETTE.black};
	background: ${theme.PALETTE.white};
	transition: all 0.15s;
	&:hover { border-color: ${theme.PALETTE.third.main}; color: ${theme.PALETTE.third.main}; }
`;

/* ── Suggestion ── */
S.SuggestionBox = styled.div`
	display: grid;
	grid-template-columns: 360px 1fr;
	gap: 24px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 16px;
	overflow: hidden;
`;

S.SuggestionLeft = styled.div`
	padding: 28px 24px;
	border-right: 1px solid ${theme.GRAYSCALE[2]};
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

S.SuggestionIcon = styled.div`
	width: 40px;
	height: 40px;
	${flexCenter}
`;

S.SuggestionTextWrap = styled.div``;

S.SuggestionPrompt = styled.p`
	${h7Bold}
	color: ${theme.PALETTE.black};
	margin-bottom: 4px;
`;

S.SuggestionDesc = styled.p`
	${h9Regular}
	color: ${theme.GRAYSCALE[6]};
`;

S.SuggestionInput = styled.textarea`
	width: 100%;
	height: 80px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 8px;
	padding: 12px;
	${h9Regular}
	resize: none;
	outline: none;
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.SuggestionSubmitBtn = styled.button`
	${flexCenterRow}
	gap: 6px;
	height: 44px;
	border-radius: 10px;
	background: ${theme.PALETTE.third.main};
	color: white;
	${h8Bold}
	transition: opacity 0.15s;
	&:hover { opacity: 0.85; }
`;

S.SuggestionRight = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	gap: 12px;
`;

S.SuggestionItem = styled.div`
	${flexBetweenRow}
	gap: 12px;
	padding: 16px;
	border: 1px solid ${theme.GRAYSCALE[2]};
	border-radius: 12px;
	background: ${theme.GRAYSCALE[0]};
`;

S.SuggestionAvatar = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background: ${theme.PALETTE.third.light || '#EDE0FF'};
	color: ${theme.PALETTE.third.main};
	${flexCenter}
	font-size: 13px;
	font-weight: 700;
	flex-shrink: 0;
`;

S.SuggestionItemContent = styled.div`
	flex: 1;
`;

S.SuggestionUser = styled.p`
	${h9Bold}
	color: ${theme.GRAYSCALE[8]};
	margin-bottom: 2px;
`;

S.SuggestionItemText = styled.p`
	${h9Regular}
	color: ${theme.GRAYSCALE[7]};
`;

S.AddListBtn = styled.button`
	${h9Bold}
	padding: 6px 12px;
	border-radius: 8px;
	border: 1px solid ${theme.PALETTE.third.main};
	color: ${theme.PALETTE.third.main};
	background: white;
	white-space: nowrap;
	transition: all 0.15s;
	&:hover { background: ${theme.PALETTE.third.main}; color: white; }
`;

/* ── 새 항목 추가 모달 ── */
S.ModalOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	${flexCenter}
	z-index: 200;
`;

S.AddModal = styled.div`
	width: 900px;
	background: ${theme.PALETTE.white};
	border-radius: 16px;
	padding: 40px 48px;
	display: flex;
	flex-direction: column;
	gap: 28px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

S.AddModalHeader = styled.div`
	${flexBetweenRow}
`;

S.AddModalTitle = styled.h3`
	${h7Bold}
	color: ${theme.PALETTE.black};
`;

S.AddModalClose = styled.button`
	${h7Bold}
	color: ${theme.GRAYSCALE[7]};
	background: none;
	border: none;
	cursor: pointer;
	font-size: 20px;
	&:hover { color: ${theme.PALETTE.black}; }
`;

S.AddModalField = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

S.AddModalLabel = styled.label`
	${h8Regular}
	color: ${theme.PALETTE.black};
`;

S.AddModalInput = styled.input`
	width: 100%;
	height: 56px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 10px;
	padding: 0 16px;
	${h8Regular}
	color: ${theme.PALETTE.black};
	font-family: 'pretendard', sans-serif;
	outline: none;
	&::placeholder { color: ${theme.GRAYSCALE[5]}; }
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.AddModalTextarea = styled.textarea`
	width: 100%;
	height: 80px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 10px;
	padding: 16px;
	${h8Regular}
	color: ${theme.PALETTE.black};
	font-family: 'pretendard', sans-serif;
	resize: none;
	outline: none;
	&::placeholder { color: ${theme.GRAYSCALE[5]}; }
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.AddModalBottom = styled.div`
	${flexBetweenRow}
	align-items: center;
`;

S.AddModalPriorityRow = styled.div`
	${flexStartRow}
	gap: 16px;
`;

S.AddModalPriorityBtns = styled.div`
	${flexStartRow}
	gap: 8px;
`;

S.PrioritySelectBtn = styled.button`
	${h8Bold}
	padding: 6px 16px;
	border-radius: 20px;
	border: 1px solid ${({ $selected, $priority }) =>
		$selected
			? $priority === '높음' ? theme.PALETTE.fourth.main
			: $priority === '중간' ? theme.PALETTE.primary.main
			: theme.PALETTE.secondary.main
			: theme.GRAYSCALE[4]};
	background: ${({ $selected, $priority }) =>
		$selected
			? $priority === '높음' ? theme.PALETTE.fourth.light
			: $priority === '중간' ? theme.PALETTE.primary.light
			: theme.PALETTE.secondary.light
			: theme.PALETTE.white};
	color: ${({ $selected, $priority }) =>
		$selected
			? $priority === '높음' ? theme.PALETTE.fourth.main
			: $priority === '중간' ? theme.PALETTE.primary.main
			: theme.PALETTE.secondary.main
			: theme.GRAYSCALE[7]};
	cursor: pointer;
	transition: all 0.15s;
`;

S.AddModalSubmitBtn = styled.button`
	${h8Bold}
	width: 88px;
	height: 36px;
	border-radius: 10px;
	border: 1px solid ${theme.GRAYSCALE[4]};
	background: ${theme.PALETTE.white};
	color: ${theme.PALETTE.black};
	transition: all 0.15s;
	&:hover { border-color: ${theme.PALETTE.third.main}; color: ${theme.PALETTE.third.main}; }
`;

/* ── Added Popup ── */
S.AddedPopupOverlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 100;
	pointer-events: none;
	${flexCenter}
`;

S.AddedPopup = styled.div`
	pointer-events: all;
	background: white;
	border: 1.5px solid ${theme.PALETTE.third.main};
	border-radius: 16px;
	padding: 28px 40px;
	text-align: center;
	box-shadow: 0 8px 32px rgba(171, 71, 255, 0.12);
`;

S.AddedPopupText = styled.p`
	${h7Regular}
	color: ${theme.PALETTE.black};
	margin-bottom: 20px;
	line-height: 1.6;
`;

S.AddedPopupBtn = styled.button`
	${h8Bold}
	padding: 8px 28px;
	border-radius: 20px;
	border: 1px solid ${theme.GRAYSCALE[4]};
	background: white;
	color: ${theme.PALETTE.black};
	&:hover { background: ${theme.GRAYSCALE[1]}; }
`;

export default ProjectMain;