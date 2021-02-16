import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import cx from 'classnames';
import customStyleSheet from './customStyleSheet';
import {
  Color,
  Size,
  Weight,
  sizeMap,
  leadingMap,
  weightMap,
  colorMap,
} from './typography';

const propTypes = {
  inline: PropTypes.bool,
  color: PropTypes.oneOf(Object.values(Color)),
  weight: PropTypes.oneOf(Object.values(Weight)),
  size: PropTypes.oneOf(Object.values(Size)),
  textAlign: PropTypes.oneOf('left', 'center', 'right'),
  whiteSpace: PropTypes.oneOf('normal', 'nowrap', 'pre-wrap', 'pre-line', 'pre'),
  children: PropTypes.node.isRequired,

  className: PropTypes.string,

  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  regular: PropTypes.bool,
  small: PropTypes.bool,
  mini: PropTypes.bool,
  micro: PropTypes.bool,

  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  muted: PropTypes.bool,
  inherit: PropTypes.bool,
  inverse: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,

  lightest: PropTypes.bool,
  lighter: PropTypes.bool,
  bolder: PropTypes.bool,
  boldest: PropTypes.bool,

  bold: PropTypes.bool,
  light: PropTypes.bool,

  textLeft: PropTypes.bool,
  textCenter: PropTypes.bool,
  textRight: PropTypes.bool,

  normal: PropTypes.bool,
  nowrap: PropTypes.bool,
  preWrap: PropTypes.bool,
  preLine: PropTypes.bool,
  pre: PropTypes.bool,
};

const defaultProps = {
  color: Color.default,
  weight: Weight.default,
  size: Size.regular,
  textAlign: 'left',
  inline: false,
  whiteSpace: 'normal',

  className: undefined,

  title1: false,
  title2: false,
  title3: false,
  regular: false,
  small: false,
  mini: false,
  micro: false,

  secondary: false,
  disabled: false,
  muted: false,
  inherit: false,
  inverse: false,
  error: false,
  success: false,

  lightest: false,
  lighter: false,
  bolder: false,
  boldest: false,

  bold: false,
  light: false,

  textLeft: false,
  textCenter: false,
  textRight: false,

  normal: false,
  nowrap: false,
  preWrap: false,
  preLine: false,
  pre: false,
};

export function getTypographyStyles() {
  const stylesObject = {};

  const sizes = Object.keys(Size);
  const weights = Object.keys(Weight);
  const colors = Object.keys(Color);

  sizes.forEach((size) => {
    stylesObject[`size_${size}`] = {
      fontSize: sizeMap[size],
    };

    stylesObject[`leading_${size}`] = {
      lineHeight: `${leadingMap[size] / sizeMap[size]}em`,
    };

    weights.forEach((weight) => {
      stylesObject[`weight_${size}_${weight}`] = {
        fontWeight: weightMap[weight][size],
      };
    });
  });

  colors.forEach((color) => {
    stylesObject[`color_${color}`] = {
      color: colorMap[color],
    };
  });

  return stylesObject;
}

export function getPropSize(otherProps) {
  const matchedSizes = Object.values(Size).filter((s) => {
    return !!otherProps[s];
  });
  if (matchedSizes.length > 0) {
    return matchedSizes[0];
  }
  return otherProps.size;
}

function getPropColor(otherProps) {
  const matchedColors = Object.values(Color).filter((c) => {
    return !!otherProps[c];
  });
  if (matchedColors.length > 0) {
    return matchedColors[0];
  }
  return otherProps.color;
}

function getPropWeight(otherProps) {
  if (otherProps.bold) {
    return Weight.boldest;
  }
  if (otherProps.light) {
    return Weight.lightest;
  }
  const matchedWeights = Object.values(Weight).filter((w) => {
    return !!otherProps[w];
  });
  if (matchedWeights.length > 0) {
    return matchedWeights[0];
  }
  return otherProps.weight;
}

function getPropTextAlign(otherProps) {
  if (otherProps.textLeft) {
    return 'left';
  }

  if (otherProps.textRight) {
    return 'right';
  }

  if (otherProps.textCenter) {
    return 'center';
  }
  return otherProps.textAlign;
}

function getWhitespace(otherProps) {
  if (otherProps.normal) return 'normal';
  if (otherProps.nowrap) return 'nowrap';
  if (otherProps.preWrap) return 'preWrap';
  if (otherProps.preLine) return 'preLine';
  if (otherProps.pre) return 'pre';
  return otherProps.whiteSpace;
}

function filteredProps(otherProps) {
  const propTypesKeys = Object.keys(propTypes);
  return Object.keys(otherProps)
    .filter((key) => !propTypesKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = otherProps[key];
      return obj;
    }, {});
}

const styles = customStyleSheet(() => ({
  ...getTypographyStyles(),

  text_align_center: {
    textAlign: 'center',
  },

  text_align_left: {
    textAlign: 'left',
  },

  text_align_right: {
    textAlign: 'right',
  },

  text_align_inherit: {
    textAlign: 'inherit',
  },
  white_space_normal: {
    whiteSpace: 'normal',
  },
  white_space_nowrap: {
    whiteSpace: 'nowrap',
  },
  white_space_preWrap: {
    whiteSpace: 'pre-wrap',
  },
  white_space_preLine: {
    whiteSpace: 'pre-line',
  },
  white_space_pre: {
    whiteSpace: 'pre',
  },
}));

function BaseText({
  inline,
  children,

  className,

  ...otherProps
}) {
  const Tag = inline ? 'span' : 'div';
  const size = getPropSize(otherProps) || Size.regular;
  const color = getPropColor(otherProps) || Color.default;
  const weight = getPropWeight(otherProps) || Weight.default;
  const textAlign = getPropTextAlign(otherProps) || 'inherit';
  const whiteSpace = getWhitespace(otherProps) || 'inherit';
  return (
    <Tag
      className={cx(css(
        styles[`size_${size}`],
        styles[`color_${color}`],
        styles[`weight_${size}_${weight}`],
        styles[`leading_${size}`],
        styles[`text_align_${textAlign}`],
        styles[`white_space_${whiteSpace}`],
      ), className)}
      {...filteredProps(otherProps)}
    >
      {children}
    </Tag>
  );
}

BaseText.propTypes = propTypes;
BaseText.defaultProps = defaultProps;

export default BaseText;
