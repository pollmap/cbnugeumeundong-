export const SITE_NAME = "CUFA";
export const SITE_FULL_NAME = "충북대학교 가치투자학회 CUFA";
export const SITE_DESCRIPTION =
  "충북대학교 가치투자학회 CUFA - AI가 바꾸는 투자 리서치";

export const GOOGLE_FORM_URL = "#";

interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Research", href: "/research" },
  { label: "Apply", href: GOOGLE_FORM_URL },
];
