import { useState } from 'react';
import styled from 'styled-components';
import {
	flexBetweenRow,
	flexStartRow,
	flexCenterRow,
	flexCenter,
	h4Bold,
	h6Bold,
	h7Bold,
	h7Regular,
	h8Bold,
	h8Regular,
	h9Regular,
} from '../../../styles/common';
import theme from '../../../styles/theme';

const ProjectEditModal = ({ onClose, onSubmit, initialData = {} }) => {
	const [projectName, setProjectName] = useState(initialData.projectName || '');
	const [isActive, setIsActive] = useState(initialData.isActive ?? true);
	const [startDate, setStartDate] = useState(initialData.startDate || '');
	const [endDate, setEndDate] = useState(initialData.endDate || '');
	const [showStartCal, setShowStartCal] = useState(false);
	const [showEndCal, setShowEndCal] = useState(false);

	const handleSubmit = () => {
		onSubmit({ projectName, isActive, startDate, endDate });
		onClose();
	};

	// 날짜 포맷 (YYYY-MM-DD → YYYY.MM.DD)
	const formatDisplay = (dateStr) => {
		if (!dateStr) return '';
		return dateStr.replace(/-/g, '.');
	};

	return (
		<S.Overlay onClick={onClose}>
			<S.Modal onClick={(e) => e.stopPropagation()}>
				{/* 헤더 */}
				<S.Header>
					<div>
						<S.ModalTitle>EDIT PROJECT</S.ModalTitle>
						<S.ModalSubtitle>프로젝트를 수정합니다.<br />수정할 내용을 입력해 주세요</S.ModalSubtitle>
					</div>
					<S.CloseBtn onClick={onClose}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M3 3L13 13M13 3L3 13" stroke={theme.GRAYSCALE[7]} strokeWidth="2" strokeLinecap="round" />
						</svg>
					</S.CloseBtn>
				</S.Header>

				{/* 프로젝트 이름 */}
				<S.FieldGroup>
					<S.FieldLabel>프로젝트 이름</S.FieldLabel>
					<S.Input
						type="text"
						placeholder="프로젝트 이름을 입력해주세요."
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>
				</S.FieldGroup>

				{/* 시작일 */}
				<S.FieldGroup>
					<S.FieldLabel>시작일</S.FieldLabel>
					<S.DateInputWrap>
						<S.Input
							type="text"
							placeholder="시작 날짜를 선택해주세요."
							value={formatDisplay(startDate)}
							readOnly
							onClick={() => { setShowStartCal(prev => !prev); setShowEndCal(false); }}
						/>
						<S.CalendarIcon onClick={() => { setShowStartCal(prev => !prev); setShowEndCal(false); }}>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
								<rect x="2" y="3" width="14" height="13" rx="2" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" />
								<path d="M2 7H16" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" />
								<path d="M6 1V4M12 1V4" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" strokeLinecap="round" />
							</svg>
						</S.CalendarIcon>
						{showStartCal && (
							<S.NativeDateInput
								type="date"
								value={startDate}
								onChange={(e) => { setStartDate(e.target.value); setShowStartCal(false); }}
							/>
						)}
					</S.DateInputWrap>
				</S.FieldGroup>

				{/* 종료일 */}
				<S.FieldGroup>
					<S.FieldLabel>종료일</S.FieldLabel>
					<S.DateInputWrap>
						<S.Input
							type="text"
							placeholder="종료 날짜를 선택해주세요."
							value={formatDisplay(endDate)}
							readOnly
							onClick={() => { setShowEndCal(prev => !prev); setShowStartCal(false); }}
						/>
						<S.CalendarIcon onClick={() => { setShowEndCal(prev => !prev); setShowStartCal(false); }}>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
								<rect x="2" y="3" width="14" height="13" rx="2" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" />
								<path d="M2 7H16" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" />
								<path d="M6 1V4M12 1V4" stroke={theme.GRAYSCALE[6]} strokeWidth="1.5" strokeLinecap="round" />
							</svg>
						</S.CalendarIcon>
						{showEndCal && (
							<S.NativeDateInput
								type="date"
								value={endDate}
								onChange={(e) => { setEndDate(e.target.value); setShowEndCal(false); }}
							/>
						)}
					</S.DateInputWrap>
				</S.FieldGroup>

				{/* 활성화 상태 */}
				<S.FieldGroup>
					<S.ActiveToggleRow onClick={() => setIsActive(prev => !prev)}>
						<S.ActiveCheckBox $active={isActive}>
							{isActive && (
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
									<path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</S.ActiveCheckBox>
						<S.ActiveLabel>활성화 상태</S.ActiveLabel>
					</S.ActiveToggleRow>
				</S.FieldGroup>

				{/* 수정하기 버튼 */}
				<S.SubmitBtn onClick={handleSubmit} disabled={!projectName.trim()}>
					수정하기
				</S.SubmitBtn>
			</S.Modal>
		</S.Overlay>
	);
};

// ─────────────────────────────────────────
// STYLED COMPONENTS
// ─────────────────────────────────────────
const S = {};

S.Overlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.4);
	${flexCenter}
	z-index: 200;
`;

S.Modal = styled.div`
	width: 540px;
	background: ${theme.PALETTE.white};
	border-radius: 20px;
	padding: 40px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`;

S.Header = styled.div`
	${flexBetweenRow}
	align-items: flex-start;
`;

S.ModalTitle = styled.h2`
	${h4Bold}
	color: ${theme.PALETTE.black};
	margin-bottom: 6px;
`;

S.ModalSubtitle = styled.p`
	${h9Regular}
	color: ${theme.GRAYSCALE[6]};
	line-height: 1.5;
`;

S.CloseBtn = styled.button`
	width: 32px;
	height: 32px;
	${flexCenter}
	border-radius: 8px;
	border: none;
	background: transparent;
	transition: background 0.15s;
	&:hover { background: ${theme.GRAYSCALE[1]}; }
`;

S.FieldGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

S.FieldLabel = styled.label`
	${h8Bold}
	color: ${theme.PALETTE.black};
`;

S.Input = styled.input`
	width: 100%;
	height: 52px;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 10px;
	padding: 0 16px;
	${h8Regular}
	color: ${theme.PALETTE.black};
	outline: none;
	transition: border-color 0.15s;
	cursor: ${({ readOnly }) => readOnly ? 'pointer' : 'text'};
	&::placeholder { color: ${theme.GRAYSCALE[4]}; }
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.DateInputWrap = styled.div`
	position: relative;
`;

S.CalendarIcon = styled.button`
	position: absolute;
	right: 14px;
	top: 50%;
	transform: translateY(-50%);
	${flexCenter}
	background: none;
	border: none;
	cursor: pointer;
`;

S.NativeDateInput = styled.input`
	position: absolute;
	top: calc(100% + 4px);
	left: 0;
	z-index: 10;
	opacity: 1;
	border: 1px solid ${theme.GRAYSCALE[3]};
	border-radius: 10px;
	padding: 8px 12px;
	background: white;
	${h9Regular}
	outline: none;
	box-shadow: 0 4px 16px rgba(0,0,0,0.1);
	&:focus { border-color: ${theme.PALETTE.third.main}; }
`;

S.ActiveToggleRow = styled.div`
	${flexStartRow}
	gap: 10px;
	cursor: pointer;
	width: fit-content;
`;

S.ActiveCheckBox = styled.div`
	width: 22px;
	height: 22px;
	border-radius: 6px;
	border: 2px solid ${({ $active }) => $active ? theme.PALETTE.third.main : theme.GRAYSCALE[4]};
	background: ${({ $active }) => $active ? theme.PALETTE.third.main : 'transparent'};
	${flexCenter}
	transition: all 0.15s;
`;

S.ActiveLabel = styled.span`
	${h8Regular}
	color: ${theme.PALETTE.black};
`;

S.SubmitBtn = styled.button`
	width: 100%;
	height: 54px;
	border-radius: 12px;
	background: ${({ disabled }) => disabled ? theme.GRAYSCALE[3] : theme.PALETTE.third.main};
	color: white;
	${h7Bold}
	transition: opacity 0.15s;
	&:hover:not(:disabled) { opacity: 0.9; }
	cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`;

export default ProjectEditModal;