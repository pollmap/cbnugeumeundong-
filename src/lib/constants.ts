export const SITE_NAME = "금은동";
export const SITE_FULL_NAME = "충북대학교 금융투자 동아리 금은동";
export const SITE_DESCRIPTION =
  "충북대학교 금융투자 동아리 금은동 - Invest in yourself";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "People", href: "/people" },
  { label: "Activity", href: "/activity" },
  {
    label: "Join Us",
    href: "/join-us",
    children: [
      { label: "How to Apply", href: "/join-us/how-to-apply" },
      { label: "Recruitment", href: "/join-us/recruitment" },
    ],
  },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/cbnu_geumeundong/",
  naverCafe: "https://cafe.naver.com/cbnugeumeundong",
};

export const ACTIVITIES = [
  {
    title: "주식 투자 스터디",
    description:
      "기본적 분석과 기술적 분석을 통한 실전 주식 투자 스터디를 진행합니다.",
    icon: "TrendingUp" as const,
  },
  {
    title: "금융 세미나",
    description:
      "금융 시장 트렌드와 경제 이슈에 대한 세미나를 정기적으로 개최합니다.",
    icon: "BookOpen" as const,
  },
  {
    title: "모의 투자 대회",
    description: "학기별 모의 투자 대회를 통해 실전 투자 감각을 키웁니다.",
    icon: "Trophy" as const,
  },
];

export const MEMBERS = [
  { name: "홍길동", role: "회장", generation: "15기", image: null },
  { name: "김철수", role: "부회장", generation: "15기", image: null },
  { name: "이영희", role: "총무", generation: "15기", image: null },
  { name: "박민수", role: "운영진", generation: "15기", image: null },
  { name: "정수진", role: "운영진", generation: "15기", image: null },
  { name: "최준혁", role: "운영진", generation: "15기", image: null },
  { name: "강지원", role: "부원", generation: "16기", image: null },
  { name: "윤서연", role: "부원", generation: "16기", image: null },
];
