import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation-stack';
import { ScrollView, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';
import Find from '../screens/Find';
import Startnew from '../screens/Startnew';
import List from '../screens/List';
import Listing from '../screens/Listing';
import New from '../screens/New';
import Talent from '../screens/Talent';
import Globalmap from '../screens/Globalmap';
import Promote from '../screens/Promote';
import BusinessProfile from '../screens/BusinessProfile';
import OfferPage from '../screens/OfferPage';

// screens
import ContactScreen from '../screens/Contact';
import MyDoor from '../screens/MyDoor';
import Share from '../screens/Share';
import Nearby from '../screens/Nearby';
import Userprofile from '../screens/Userprofile';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import Challenge from '../screens/Challenge';
import ChallengeScreen from '../screens/ChallengeScreen';
import Liescreen from '../screens/liescreen';
import Friends from '../screens/Friends';
import Top from '../screens/Top';
import Notification from '../screens/Notification';
import OpenChallenge from '../screens/OpenChallenge';
import Profile from '../screens/Profile';

// icons
import SvgHome from '../components/icons/Svg.Home';

const HomeTabBarIcon = ({ focused }) => <SvgHome active={focused} />;
HomeTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Notification:Notification,
  Challenge:Challenge,
  Top:Top,
  Find:Find,
  Write:Startnew,
  BusinessProfile:BusinessProfile,
  OfferPage:OfferPage,
  List:List,
New:New,
Userprofile:Userprofile,
  OpenChallenge:OpenChallenge,
Liescreen:Liescreen,
MyDoor:MyDoor,
Friends:Friends,
Promote:Promote,
Globalmap:Globalmap,
Talent:Talent,
Listing:Listing,
Profile:Profile,
Nearby:Nearby,
    Share:Share,
    ChallengeScreen:ChallengeScreen,
    Contact:ContactScreen,

  },
  {
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: HomeTabBarIcon,


    }
  }
);

export default HomeStack;
