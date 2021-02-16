export const core = {
  black: '#000000',
  white: '#FFFFFF',

  dark: '#222222',
  hof: '#595959',
  foggy: '#767676',

  brand: '#006272',
};

export const grayGradient = {
  primary: core.dark,
  secondary: core.hof,
  placeholder: core.foggy,
  disabled: '#DDDDDD',
  line: '#EEEEEE',
  background: '#F8F8F8',
};

export const status = {
  success: '#14A956',
  warning: '#EF9E00',
  error: '#F53B3B',
};

export default {
  ...core,
  ...grayGradient,
  ...status,
};
