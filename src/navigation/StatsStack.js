import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import StatsScreen from '../screens/StatsScreen';
import ContactScreen from '../screens/Contact';
import Find from '../screens/Find';
import Startnew from '../screens/Startnew';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';
import Friends from '../screens/Friends';

// icons
import SvgStats from '../components/icons/Svg.Stats';

const StatsTabBarIcon = ({ focused }) => <SvgStats active={focused} />;
StatsTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Stats Stack
// /////////////////////////////////////////////////////////////////////////////
const StatsStack = createStackNavigator(
  {Notification:Notification,
    Stats: Find,
    Friends:Friends,

    Write:Startnew,
    Profile:Profile,

  },
  {
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: StatsTabBarIcon
    }
  }
);

export default StatsStack;
