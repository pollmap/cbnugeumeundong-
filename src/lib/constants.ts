export const SITE_NAME = "CUFA";
export const SITE_FULL_NAME = "충북대학교 금융분석학회 CUFA";
export const SITE_DESCRIPTION =
  "충북대학교 금융분석학회 CUFA - AI 기반 금융 분석";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Activity", href: "/activity" },
  { label: "Research", href: "/research" },
  {
    label: "Join Us",
    href: "/join-us",
    children: [
      { label: "How to Apply", href: "/join-us/how-to-apply" },
      { label: "Recruitment", href: "/join-us/recruitment" },
    ],
  },
];

export const ACTIVITIES = [
  {
    title: "AI 리서치 워크스테이션",
    description:
      "NEXUS 플랫폼 위에서 AI가 데이터 수집부터 밸류에이션 초벌까지 보조합니다. 가정을 직접 수정하고 검증하는 독자적 분석을 수행합니다.",
    icon: "TrendingUp" as const,
  },
  {
    title: "투자심의 세션",
    description:
      "5주간 준비한 종목을 15분 스톡피치로 발표하고, AI 반론과 크로스 리뷰를 거쳐 편입/편출을 결정합니다.",
    icon: "BookOpen" as const,
  },
  {
    title: "100만원 실전 펀드",
    description:
      "실제 자금을 운용하며 킬조건 기반 리스크 관리와 투자 판단 저널을 통해 실전 투자 역량을 키웁니다.",
    icon: "Trophy" as const,
  },
];
