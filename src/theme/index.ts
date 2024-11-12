import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { layout } from './layout';

export const theme = {
  colors,
  typography,
  spacing,
  layout,
};

export type Theme = typeof theme;
