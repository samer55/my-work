import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation-stack';
import { ScrollView, Text, View,Image } from 'react-native';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';
import Find from '../screens/Find';

// screens
import ContactScreen from '../screens/Contact';
import MyDoor from '../screens/MyDoor';
import Share from '../screens/Share';
import Profile from '../screens/Profile';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import NewChallenge from '../screens/NewChallenge';
import Startnew from '../screens/Startnew';
import OfferService from '../screens/OfferService';
import Hire from '../screens/Hire';
import OpenStore from '../screens/OpenStore';
import Specialoffer from '../screens/Specialoffer';
import Mappickers from '../screens/Mappickers';
import Guide from '../screens/guide';
import Completebusiness from '../screens/Completebusiness';
import NewBusiness from '../screens/NewBusiness';

// icons
import SvgPages from '../components/icons/Svg.Pages';

const HomeTabBarIcon = ({ focused }) => <SvgPages active={focused} />;
HomeTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const Challenge = createStackNavigator(
  {
    NewBusiness:NewBusiness,

    NewChallenge: Guide,
    Startnew:Startnew,
    Completebusiness:Completebusiness,
    Mappickers:Mappickers,
    OfferService:OfferService,
    Hire:Hire,
    OpenStore:OpenStore,
    Specialoffer:Specialoffer
  },
  {
    navigationOptions: {
      tabBarLabel: 'Fekra',
      tabBarIcon: ({tintColor}) => (
         <View
           style={{
             position: 'absolute',
             bottom: 2, // space from bottombar
             height: 58,
             width: 58,
             borderRadius: 58,
             borderBottomWidth: 2,
             borderLeftWidth: 2,
             borderRightWidth: 2,
             borderRightColor: 'transparent',
             borderLeftColor: 'transparent',
             borderBottomColor: 'transparent',
             backgroundColor: '#eb144c',
             justifyContent: 'center',
             alignItems: 'center',
           }}>
           <Image
          source={{uri:'https://i.ibb.co/hWCn8sX/business-and-finance.png'}}
             style={{
               width: 30,
               height: 30,
               tintColor: '#ffffff',
               alignContent: 'center',
             }}
           />
         </View>
       ),
    }
  }
);

export default Challenge;
