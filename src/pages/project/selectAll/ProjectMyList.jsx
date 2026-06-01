import { useState } from 'react';
import theme from '../../../styles/theme';
import OfficeMaterialIcon from '../project_icon/office-material_227089.svg';
import S from './ProjectMyListStyle';

const getDDay = (endDate) => {
    if (!endDate) return 'D-Day';
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((end - today) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return 'D-Day';
    return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
};

const getAccentColor = (id) => {
    const themeColors = [
        theme.PALETTE.primary.main,
        theme.PALETTE.secondary.main,
        theme.PALETTE.third.main,
        theme.PALETTE.fourth.main,
        theme.PALETTE.fifth.main,
        theme.PALETTE.yellow,
    ];
    if (!id) return theme.PALETTE.third.main;
    return themeColors[id % themeColors.length];
};

// ─────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────
const FolderIcon = () => (
    <img src={OfficeMaterialIcon} alt="folder" width="16" height="16" />
);

const ProjectCard = ({ project, onClick }) => (
    <S.CardWrapper>
        <S.Card onClick={() => onClick?.(project)}>
            <S.AccentBar $color={project.accentColor || getAccentColor(project.id)} />
            <S.CardContent>
                <S.CardTop>
                    <S.OwnerRow>
                        <S.OwnerAvatar>
                            <img
                                src={project.memberProfileImageUrl || '/default-profile.png'}
                                  alt="프로필"
                                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </S.OwnerAvatar>
                        <S.OwnerName>{project.owner || '나의 프로젝트'}</S.OwnerName>
                    </S.OwnerRow>
                    <S.DDay>{getDDay(project.projectEndDate)}</S.DDay>
                </S.CardTop>
                <S.CardTitle>{project.projectTitle}</S.CardTitle>
                <S.TagRow>
                    {(project.checklists || []).map((checklist) => (
                        <S.Tag key={checklist.id}>
                            <FolderIcon />
                            <span className="text">{checklist.checklistTitle}</span>
                        </S.Tag>
                    ))}
                </S.TagRow>
            </S.CardContent>
        </S.Card>
    </S.CardWrapper>
);

// ─────────────────────────────────────────
// MAIN COMPONENT — 로그별 그룹화
// ─────────────────────────────────────────
const ProjectMyList = ({ projects, onCardClick }) => {
    if (!projects || projects.length === 0) {
        return (
            <S.MyProjectsSection>
                <S.EmptyState>
                    아직 생성된 프로젝트가 없습니다. 프로젝트를 생성해보세요!
                </S.EmptyState>
            </S.MyProjectsSection>
        );
    }

    // logId 기준으로 그룹화
    const grouped = projects.reduce((acc, project) => {
        const key = project.logId ?? 'etc';
        if (!acc[key]) {
            acc[key] = {
                logId: project.logId,
                logTitle: project.logTitle || project.visionTitle || '기타 프로젝트',
                projects: [],
            };
        }
        acc[key].projects.push(project);
        return acc;
    }, {});

    const groups = Object.values(grouped);

    return (
        <S.MyProjectsSection>
            {groups.map((group) => (
                <S.LogSection key={group.logId ?? 'etc'}>
                    <S.LogSectionHeader>
                        <S.LogSectionTitle>{group.logTitle}</S.LogSectionTitle>
                        <S.LogSectionCount>{group.projects.length}개</S.LogSectionCount>
                    </S.LogSectionHeader>
                    <S.CardScrollWrapper>
                        <S.CardGrid>
                            {group.projects.map((project) => (
                                <ProjectCard key={project.id} project={project} onClick={onCardClick} />
                            ))}
                        </S.CardGrid>
                    </S.CardScrollWrapper>
                </S.LogSection>
            ))}
        </S.MyProjectsSection>
    );
};

export default ProjectMyList;
