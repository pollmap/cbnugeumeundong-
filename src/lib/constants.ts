export const SITE_NAME = "CUFA";
export const SITE_FULL_NAME = "충북대학교 가치투자학회 CUFA";
export const SITE_DESCRIPTION =
  "충북대학교 가치투자학회 CUFA - AI가 바꾸는 투자 리서치";

export const APPLY_URL = "/apply";
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfRVJG7Nn4suH4p6ivstJGd8xuEFfbGLWddotvK6TcjWo8_yQ/viewform";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  comingSoon?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Main", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Learning", href: "https://cufa-wiki.vercel.app/", external: true },
  { label: "NEXUS", href: "https://cufa-nexus.vercel.app/", external: true },
];
