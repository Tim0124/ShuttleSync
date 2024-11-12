import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};
