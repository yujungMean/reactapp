import React from 'react';
import S from '../profile/styles/MyProfileStyle';
import defaultProfile from '../../../components/resources/default-profile.svg';
import eyeIcon from '../../../components/resources/eye.svg';
import likeIcon from '../../../components/resources/like.svg';
import likeFillIcon from '../../../components/resources/like-fill2.svg';
import defaultThumbnail from '../../log/other/otherLog_thumbNail/Group 2956.png';
import { formatRelativeTime } from '../../../utils/relativeTime';

import th_aws         from '../../log/other/otherLog_thumbNail/AWS 1.png';
import th_algo        from '../../log/other/otherLog_thumbNail/algorithm_solve 1.png';
import th_capital     from '../../log/other/otherLog_thumbNail/capital down 1.png';
import th_contact_ban from '../../log/other/otherLog_thumbNail/contact_ban 1.png';
import th_convenience from '../../log/other/otherLog_thumbNail/convenience store 1.png';
import th_diet        from '../../log/other/otherLog_thumbNail/diet_chicken 1.png';
import th_freelancer  from '../../log/other/otherLog_thumbNail/free_lancer 1.png';
import th_friend      from '../../log/other/otherLog_thumbNail/friend_contact 1.png';
import th_friend_money from '../../log/other/otherLog_thumbNail/friend_money 1.png';
import th_github      from '../../log/other/otherLog_thumbNail/gitHub_grass 1.png';
import th_graduate    from '../../log/other/otherLog_thumbNail/graduate_school 1.png';
import th_insta       from '../../log/other/otherLog_thumbNail/insta_follow.png';
import th_marathon    from '../../log/other/otherLog_thumbNail/marathon complete 1.png';
import th_millim      from '../../log/other/otherLog_thumbNail/millim_king 1.png';
import th_mindset     from '../../log/other/otherLog_thumbNail/mind_set.png';
import th_alarm       from '../../log/other/otherLog_thumbNail/mornig_alram 1.png';
import th_phone       from '../../log/other/otherLog_thumbNail/night_phone.jpg';
import th_opinion     from '../../log/other/otherLog_thumbNail/opinion discuss 1.png';
import th_portfolio   from '../../log/other/otherLog_thumbNail/portfolio.jpg';
import th_react       from '../../log/other/otherLog_thumbNail/react.png';
import th_read        from '../../log/other/otherLog_thumbNail/read_crew_alone 1.png';
import th_side        from '../../log/other/otherLog_thumbNail/side_project 1.png';
import th_toeic       from '../../log/other/otherLog_thumbNail/toic_900 1.png';
import th_diary       from '../../log/other/otherLog_thumbNail/write_diary 1.png';
import th_youtube     from '../../log/other/otherLog_thumbNail/youtube 1.png';

const categoryStyleMap = {
  '공부/취업': { textColor: 'faillog_blue',   bgColor: 'faillog_light_blue' },
  '사업/창업': { textColor: 'faillog_purple', bgColor: 'faillog_light_purple' },
  '인간관계':  { textColor: 'faillog-red',    bgColor: 'faillog_light_red' },
  '건강/루틴': { textColor: 'faillog_green',  bgColor: 'faillog_light_green' },
  '기타':      { textColor: 'faillog-black',  bgColor: 'faillog_gray2' },
};

const getCategoryStyle = (category) =>
  categoryStyleMap[category] || { textColor: 'faillog-black', bgColor: 'faillog_gray2' };

// 카테고리별 기본 풀 (키워드 미매칭 시 fallback)
const categoryPool = {
  '공부': [th_algo, th_toeic, th_graduate, th_read, th_portfolio],
  '취업': [th_portfolio, th_algo, th_side, th_react, th_aws],
  '사업': [th_side, th_freelancer, th_capital, th_millim],
  '창업': [th_side, th_freelancer, th_capital],
  '인간관계': [th_friend, th_contact_ban, th_friend_money, th_opinion],
  '건강': [th_marathon, th_diet, th_alarm, th_phone, th_mindset],
  '루틴': [th_diary, th_alarm, th_phone, th_mindset, th_marathon],
  '기타': [th_mindset, th_diary, th_read, th_millim],
};

const allPool = [
  th_aws, th_algo, th_capital, th_contact_ban, th_convenience,
  th_diet, th_freelancer, th_friend, th_friend_money, th_github,
  th_graduate, th_insta, th_marathon, th_millim, th_mindset,
  th_alarm, th_phone, th_opinion, th_portfolio, th_react,
  th_read, th_side, th_toeic, th_diary, th_youtube,
];

/**
 * 로그의 제목·비전·카테고리 키워드로 어울리는 썸네일을 반환.
 * thumbnailUrl이 있으면 그쪽이 우선(호출 전에 체크).
 */
const getMatchedThumbnail = (log) => {
  const text = `${log.title} ${log.content}`.toLowerCase();

  // ── Tech / Development ──────────────────────────────
  if (/aws|ec2|s3|클라우드|cloud|인프라|서버리스/.test(text)) return th_aws;
  if (/react|리액트|프론트엔드|프론트/.test(text))             return th_react;
  if (/github|깃허브|잔디|커밋|commit|기여|contribution/.test(text)) return th_github;
  if (/사이드.?프로젝트|side.?project|토이.?프로젝트|사이드프/.test(text)) return th_side;
  if (/포트폴리오|portfolio|이력서/.test(text))               return th_portfolio;
  if (/알고리즘|algorithm|코딩|개발|프로그래밍|개발자|버그|디버그|코드/.test(text)) return th_algo;

  // ── Study / Language / Certification ─────────────────
  if (/토익|toeic|영어|영단어|어학|외국어|오픽|토플/.test(text)) return th_toeic;
  if (/대학원|석사|박사|대학원생/.test(text))                  return th_graduate;
  if (/독서|책을 읽|책읽|리딩|reading|독서모임/.test(text))   return th_read;
  if (/일기|기록 습관|글쓰기|노트|저널/.test(text))           return th_diary;

  // ── Finance ──────────────────────────────────────────
  if (/친구.*돈|돈.*빌려|빌려달|빚/.test(text))               return th_friend_money;
  if (/투자|주식|자본|손실|재테크|금융|수익|자산/.test(text))  return th_capital;

  // ── Social Media / SNS ───────────────────────────────
  if (/유튜브|youtube|유튜버|영상 제작|크리에이터/.test(text)) return th_youtube;
  if (/인스타|instagram|팔로워|sns|소셜 미디어/.test(text))   return th_insta;

  // ── Relationships ─────────────────────────────────────
  if (/연락.*두절|두절|차단|절교/.test(text))                  return th_contact_ban;
  if (/의견.*충돌|충돌|갈등|토론|회의|팀 프로젝트/.test(text)) return th_opinion;
  if (/친구|인간관계|연락|우정/.test(text))                   return th_friend;

  // ── Health / Routine ─────────────────────────────────
  if (/다이어트|식단|체중|살이|먹방|닭가슴|칼로리/.test(text)) return th_diet;
  if (/마라톤|달리기|러닝|운동|헬스|체력/.test(text))          return th_marathon;
  if (/기상|아침 루틴|알람|일찍 일어|수면 패턴/.test(text))   return th_alarm;
  if (/핸드폰|스마트폰|폰 중독|새벽|야간|밤새/.test(text))    return th_phone;
  if (/명상|마음챙김|멘탈|심리|자기계발|숙고/.test(text))      return th_mindset;
  if (/루틴|습관|꾸준|일상/.test(text))                       return th_diary;

  // ── Work ─────────────────────────────────────────────
  if (/편의점|알바|아르바이트|파트타임/.test(text))            return th_convenience;
  if (/프리랜서|freelancer|재택근무/.test(text))              return th_freelancer;
  if (/밀린|미루기|지연|못 했/.test(text))                    return th_millim;

  // ── 카테고리 기반 fallback ────────────────────────────
  const cat = log.category || '';
  for (const [key, pool] of Object.entries(categoryPool)) {
    if (cat.includes(key)) {
      return pool[(log.id || 0) % pool.length];
    }
  }

  // ── 최종 id 기반 fallback ─────────────────────────────
  return allPool[((log.id || 0) % allPool.length + allPool.length) % allPool.length];
};

const FailLogPostCardComponent = ({ log = {}, isSelected = false, isEditMode = false, onSelect, onNavigate, onToggleLike, compact = false }) => {
  const handleClick = () => {
    if (isEditMode) {
      onSelect?.();
    } else {
      onNavigate?.();
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike?.(log);
  };

  const thumbnailSrc = log.thumbnailUrl || getMatchedThumbnail(log);
  const catStyle = log.category ? getCategoryStyle(log.category) : null;

  return (
    <S.CardWrapper $isSelected={isSelected} $isEditMode={isEditMode} onClick={handleClick}>
      <S.ImageSection $height={compact ? '130px' : undefined}>
        <S.Thumbnail
          src={thumbnailSrc}
          alt={log.title}
          onError={(e) => { e.currentTarget.src = defaultThumbnail; }}
        />
        {catStyle && (
          <S.TagLabel>
            <S.CategoryBadge $bgcolor={catStyle.bgColor}>
              <S.Span size="h11Bold" color={catStyle.textColor}>{log.category}</S.Span>
            </S.CategoryBadge>
          </S.TagLabel>
        )}
      </S.ImageSection>

      <S.PostContentSection>
        <S.PostTime>{formatRelativeTime(log.createdAt || log.date) || '방금 전'}</S.PostTime>
        <S.PostTitle>{log.title || '제목 없는 페일로그'}</S.PostTitle>
        <S.PostSummary>{log.content}</S.PostSummary>

        <S.CardFooter>
          <S.AuthorInfo>
            <img src={log.profileImg || defaultProfile} alt="profile" />
            <S.AuthorName>{log.author || '나의 기록'}</S.AuthorName>
          </S.AuthorInfo>
          <S.PostStats>
            <S.StatItem>
              <img src={eyeIcon} alt="조회수" />
              {log.views || 0}
            </S.StatItem>
            <S.StatItem $clickable onClick={handleLikeClick}>
              <img src={log.isLiked ? likeFillIcon : likeIcon} alt="좋아요" />
              {log.likeCount || 0}
            </S.StatItem>
          </S.PostStats>
        </S.CardFooter>
      </S.PostContentSection>
    </S.CardWrapper>
  );
};

export default FailLogPostCardComponent;
