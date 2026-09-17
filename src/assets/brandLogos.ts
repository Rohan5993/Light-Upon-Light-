import logoLul from "./images/logolul.png";

/** Fixed chrome mark size — use everywhere (header, footer, scrolled nav). */
export const BRAND_LOGO_WIDTH = 187;
export const BRAND_LOGO_HEIGHT = 80;
export const brandLogoClassName =
  "h-20 w-[187px] max-w-[187px] object-contain object-left bg-transparent";

/** Brand marks only — keep Header/Footer off the full siteImages barrel */
export const brandLogos = {
  logoLul,
  logoLulLight: logoLul,
  logoLulDark: logoLul,
} as const;
