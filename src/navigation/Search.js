import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation-stack';
import { ScrollView, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';
import Find from '../screens/Find';
import Profile from '../screens/Profile';
import OfferPage from '../screens/OfferPage';
import BusinessProfile from '../screens/BusinessProfile';
import List from '../screens/List';
import Listing from '../screens/Listing';
import OfferService from '../screens/OfferService';
import Newoffer from '../screens/Newoffer';
import Searchscreens from '../screens/Searchscreens';
import Offerview from '../screens/Offerview';
import Career from '../screens/Career';

// screens
import ContactScreen from '../screens/Contact';
import MyDoor from '../screens/MyDoor';
import Share from '../screens/Share';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import Challenge from '../screens/Challenge';
import ChallengeScreen from '../screens/ChallengeScreen';
import Liescreen from '../screens/liescreen';
import Friends from '../screens/Friends';
import Searchall from '../screens/Searchall';
import Job from '../screens/Job';
import Productpage from '../screens/Productpage';
import Nearby from '../screens/Nearby';
import Categories from '../screens/Categories';
import Careerlisting from '../screens/Careerlisting';

// icons
import SvgHome from '../components/icons/Svg.Home';
import SvgShare from '../components/icons/Svg.Search';

const HomeTabBarIcon = ({ focused }) => <SvgShare active={focused} />;
HomeTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};
import Userprofile from '../screens/Userprofile';

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const HomeStack = createStackNavigator(
  {
    Searchall:Searchall,
    Home: HomeScreen,
  Challenge:Challenge,
  Productpage:Productpage,
  Job:Job,
  List:List,
Liescreen:Liescreen,
MyDoor:MyDoor,
Userprofile:Userprofile,
Listings:Listing,
Nearby:Nearby,
Friends:Friends,
OfferPage:OfferPage,
    Profile:Profile,
    Searchscreens:Searchscreens,
    Categories:Categories,
BusinessProfile:BusinessProfile,
    Product:Product,
    Share:Share,
    ChallengeScreen:ChallengeScreen,
    Contact:ContactScreen,
    Career:Career,
    Careerlisting:Careerlisting,

    Offerview:Offerview,
    OfferService:OfferService,
Newoffer:Newoffer
  },
  {
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: HomeTabBarIcon
    }
  }
);

export default HomeStack;
