import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SvgStats = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return (
   <MaterialCommunityIcons name="bell" size={size} color={fill} />
  );
};

SvgStats.defaultProps = {
  active: false,
  size: 20
};

SvgStats.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgStats;
