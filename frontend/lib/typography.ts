import color from './color';

export enum Size {
  title1 = 'title1',
  title2 = 'title2',
  title3 = 'title3',
  // large = 'large',
  regular = 'regular',
  small = 'small',
  mini = 'mini',
  micro = 'micro',
}

export enum Color {
  default = 'default',
  secondary = 'secondary',
  disabled = 'disabled',
  muted = 'muted',
  inherit = 'inherit',
  inverse = 'inverse',
  error = 'error',
  success = 'success',
}

export enum Weight {
  lightest = 'lightest',
  lighter = 'lighter',
  default = 'default',
  bolder = 'bolder',
  boldest = 'boldest',
}

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const sizeMap: EnumDictionary<Size, number> = {
  [Size.title1]: 36,
  [Size.title2]: 24,
  [Size.title3]: 18,
  [Size.regular]: 16,
  [Size.small]: 14,
  [Size.mini]: 12,
  [Size.micro]: 10,
};

const WEIGHT_BOLD: number = 600;
const WEIGHT_BOLDEST: number = 700;
const WEIGHT_BOOK: number = 400;
const WEIGHT_LIGHT: number = 300;

export const weightMap: EnumDictionary<Weight, EnumDictionary<Size, Number>> = {
  [Weight.lightest]: {
    [Size.title1]: WEIGHT_LIGHT,
    [Size.title2]: WEIGHT_LIGHT,
    [Size.title3]: WEIGHT_LIGHT,
    [Size.regular]: WEIGHT_LIGHT,
    [Size.small]: WEIGHT_LIGHT,
    [Size.mini]: WEIGHT_LIGHT,
    [Size.micro]: WEIGHT_LIGHT,
  },
  [Weight.lighter]: {
    [Size.title1]: WEIGHT_BOOK,
    [Size.title2]: WEIGHT_BOOK,
    [Size.title3]: WEIGHT_BOOK,
    [Size.regular]: WEIGHT_LIGHT,
    [Size.small]: WEIGHT_LIGHT,
    [Size.mini]: WEIGHT_LIGHT,
    [Size.micro]: WEIGHT_LIGHT,
  },
  [Weight.default]: {
    [Size.title1]: WEIGHT_BOLD,
    [Size.title2]: WEIGHT_BOLD,
    [Size.title3]: WEIGHT_BOLD,
    [Size.regular]: WEIGHT_BOOK,
    [Size.small]: WEIGHT_BOOK,
    [Size.mini]: WEIGHT_BOOK,
    [Size.micro]: WEIGHT_BOOK,
  },
  [Weight.bolder]: {
    [Size.title1]: WEIGHT_BOLD,
    [Size.title2]: WEIGHT_BOLD,
    [Size.title3]: WEIGHT_BOLD,
    [Size.regular]: WEIGHT_BOLD,
    [Size.small]: WEIGHT_BOLD,
    [Size.mini]: WEIGHT_BOLD,
    [Size.micro]: WEIGHT_BOLD,
  },
  [Weight.boldest]: {
    [Size.title1]: WEIGHT_BOLDEST,
    [Size.title2]: WEIGHT_BOLDEST,
    [Size.title3]: WEIGHT_BOLDEST,
    [Size.regular]: WEIGHT_BOLDEST,
    [Size.small]: WEIGHT_BOLDEST,
    [Size.mini]: WEIGHT_BOLDEST,
    [Size.micro]: WEIGHT_BOLDEST,
  },
};

export const leadingMap: EnumDictionary<Size, number> = {
  [Size.title1]: 48,
  [Size.title2]: 34,
  [Size.title3]: 30,
  [Size.regular]: 26,
  [Size.small]: 22,
  [Size.mini]: 18,
  [Size.micro]: 14,
};

export const colorMap: EnumDictionary<Color, string> = {
  [Color.default]: color.primary,
  [Color.secondary]: color.secondary,
  [Color.disabled]: color.disabled,
  [Color.inherit]: 'inherit',
  [Color.inverse]: color.white,
  [Color.muted]: color.foggy,
  [Color.error]: color.error,
  [Color.success]: color.success,
};

export default {
  sizeMap,
  weightMap,
  colorMap,
  leadingMap,
};
