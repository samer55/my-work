import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SvgShare = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return <MaterialIcons name="explore" size={size} color={fill} />;
};

SvgShare.defaultProps = {
  active: false,
  size: 20
};

SvgShare.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgShare;
