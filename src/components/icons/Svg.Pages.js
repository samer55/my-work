import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';

const SvgPages = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return <Image source={{uri:'https://i.ibb.co/hWCn8sX/business-and-finance.png'}} style={{width:size+5,height: size+5,resizeMode: 'contain'}}  />;
};

SvgPages.defaultProps = {
  active: false,
  size: 20
};

SvgPages.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgPages;
