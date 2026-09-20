export type BaseThemeMode = 'sandalwood' | 'parchment';

export type VedicThemeId =
  | 'surya'
  | 'omkar'
  | 'agni'
  | 'suvarna'
  | 'tulsi'
  | 'neelkanth'
  | 'brahma'
  | 'chandan'
  | 'rudra'
  | 'ganga'
  | 'moksha';

export interface VedicTheme {
  id: VedicThemeId;
  nameEn: string;
  nameHi: string;
  sanskritName: string;
  symbol: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
  rgb: string;
  patternType: string;
  patternNameEn: string;
  patternNameHi: string;
  patternSvg: string;
  patternSize: string;
  patternOpacityDark: number;
  patternOpacityLight: number;
  vibeEn: string;
  vibeHi: string;
  shlokaQuote: string;
  vedicElement: string;
}
