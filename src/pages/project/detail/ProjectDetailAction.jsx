import S from './ProjectDetailActionStyle';
import aiImage from '../../../components/resources/ai_image.svg';

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
const ProjectDetailAction = ({ actions }) => (
	<S.Section $mt="60px">
		<S.SectionTitleRow>
			<S.SectionTitle>행동 추천 <S.AiIcon src={aiImage} alt="AI" /></S.SectionTitle>
		</S.SectionTitleRow>
		<S.ActionGrid>
			{actions.map((action) => (
				<S.ActionCard key={action.id}>
					<S.ActionDot />
					<S.ActionContent>
						<S.ActionTitle>{action.title}</S.ActionTitle>
						<S.ActionDesc>{action.desc}</S.ActionDesc>
					</S.ActionContent>
				</S.ActionCard>
			))}
		</S.ActionGrid>
	</S.Section>
);

export default ProjectDetailAction;