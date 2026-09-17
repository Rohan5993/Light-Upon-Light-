import logoLul from "./images/logov2.png";

/** Default chrome mark size (header left, footer). */
export const BRAND_LOGO_WIDTH = 187;
export const BRAND_LOGO_HEIGHT = 80;
export const brandLogoClassName =
  "h-20 w-[187px] max-w-[187px] object-contain object-left bg-transparent";

/** Compact size when the mark sits in the centered scrolled nav. */
export const BRAND_LOGO_CENTER_WIDTH = 130;
export const BRAND_LOGO_CENTER_HEIGHT = 50;
export const brandLogoCenterClassName =
  "h-[50px] w-[130px] max-w-[130px] object-contain object-left bg-transparent";

/** Brand marks only — keep Header/Footer off the full siteImages barrel */
export const brandLogos = {
  logoLul,
  logoLulLight: logoLul,
  logoLulDark: logoLul,
} as const;
