export const MOCK_VISION = {
  id: 1,
  title: '9급 공무원 합격하기',
};

export const MOCK_PROJECTS = [
  { id: 1, title: '9급공무원 합격하기', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 2, title: '건강하게 살기', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 3, title: '성공적인 삶 살기', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 4, title: '보디빌딩 대회 준비', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 5, title: '밥 먹기', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 6, title: '하하', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
  { id: 7, title: '진짜웃겨', startDate: '2026.03.01', endDate: '2027.03.14', dDay: 70 },
];

export const MOCK_TIMELINE = [
  {
    id: 1,
    year: '2026',
    month: '1월',
    projectTitle: '1번 프로젝트',
    description: '인강 시청 50% 단축 & 단원별 기출 풀이 병행해서 하기를 노력. 두번째 줄까지 표시 될거에요',
    bullets: ['실패 분석 보기', '실내 대체계획 추가', '주말 기준 완화', '뭐든 행동 추천'],
    aiSuggestions: [
      { title: '구체적인 목표 수립하기', desc: 'SMART 기준에 맞는 구체적이고 측정 가능한 목표를 설정합니다.' },
      { title: '목표 달성을 위한 계획 수립', desc: '일일, 주간, 월간 계획을 세우고 목표에 도달하기 위한 단계를 설정합니다.' },
      { title: '학습 진행 상황 주기적으로 체크', desc: '주기적인 진행 상황 점검을 통해 목표 달성 여부를 파악하고 조정합니다.' },
      { title: '지인이나 전문가와 상담하기', desc: '주변 지인이나 전문가와의 대화를 통해 목표 달성에 대한 조언을 얻습니다.' },
    ],
    images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop'],
  },
  {
    id: 2,
    year: '2026',
    month: '2월',
    projectTitle: '2번 프로젝트',
    description: '인강 시청 50% 단축 & 단원별 기출 풀이 병행해서 하기를 노력. 두번째 줄까지 표시 될거에요',
    bullets: ['실패 분석 보기', '실내 대체계획 추가', '주말 기준 완화', '뭐든 행동 추천'],
    aiSuggestions: [],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'],
  },
  {
    id: 3,
    year: '2025',
    month: '5월',
    projectTitle: '3번 프로젝트',
    description: '인강 시청 50% 단축 & 단원별 기출 풀이 병행해서 하기를 노력. 두번째 줄까지 표시 될거에요',
    bullets: ['실패 분석 보기', '실내 대체계획 추가', '주말 기준 완화', '뭐든 행동 추천'],
    aiSuggestions: [],
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=250&fit=crop'],
  },
];

export const MOCK_ANALYSIS = {
  nickname: '빨강이',
  percentile: 1.7,
  totalChecklists: 176,
  avgUserChecklists: 104,
  top3Checklists: [
    { text: '운동복과 물을 자기 전에 미리 준비하기', count: 15 },
    { text: '갈등 상황에서 24시간 후 결정하기', count: 7 },
    { text: '일을 3개 단위로 나눠서 시간 배분하기', count: 5 },
  ],
  avgDays: 197,
  projectCount: 15,
};

export const formatDate = (d) => (d ? d.replace(/-/g, '.') : '');

export const calcDDay = (start) => {
  if (!start) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(start).getTime()) / 86400000));
};
