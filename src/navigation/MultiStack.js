import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import MultiLevel2Screen from '../screens/MultiLevel2Screen';
import Profile from '../screens/Profile';

// icons
import SvgPages from '../components/icons/Svg.Pages';

const MultiTabBarIcon = ({ focused }) => <SvgPages active={focused} />;
MultiTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Multi Stack
// /////////////////////////////////////////////////////////////////////////////
const MultiStack = createStackNavigator(
  {
    MultiLevel2: MultiLevel2Screen,
    Profile:Profile,

  },
  {
    navigationOptions: {
      tabBarLabel: 'Booking',
      tabBarIcon: MultiTabBarIcon
    }
  }
);

export default MultiStack;
