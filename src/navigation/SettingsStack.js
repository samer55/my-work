import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import SettingsScreen from '../screens/SettingsScreen';
import Secure from '../screens/Secure';
import Share from '../screens/Share';
import EditPro from '../screens/EditPro';
import Contactus from '../screens/Contactus';
import Uprofile from '../screens/Uprofile';
import Mybusiness from '../screens/Mybusiness';
import Dashboard from '../screens/Dashboard';
import Myorders from '../screens/Myorders';
import Mypost from '../screens/Mypost';
import Myfav from '../screens/Myfav';
import Language from '../screens/Language';
import OfferService from '../screens/OfferService';

import Job from '../screens/Job';

// icons
import SvgCog from '../components/icons/Svg.Cog';

const SettingsTabBarIcon = ({ focused }) => <SvgCog active={focused} />;
SettingsTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};
import List from '../screens/List';
import Orderdet from '../screens/Orderdet';
import Startnew from '../screens/Startnew';
import OfferPage from '../screens/OfferPage';
import Promote from '../screens/Promote';
import Mappickers from '../screens/Mappickers';

// Settings Stack
// /////////////////////////////////////////////////////////////////////////////
const SettingsStack = createStackNavigator(
  {
    Uprofile:Uprofile,
    Settings: SettingsScreen,
    Secure:Secure,
    List:List,
    Startnew:Startnew,
    Mappickers:Mappickers,
OfferService:OfferService,
    Promote:Promote,

    Dashboard:Dashboard,
Mybusiness:Mybusiness,
    Share:Share,
    OfferPage:OfferPage,
Job:Job,
    Myfav:Myfav,
    Orderdet:Orderdet,
    Language:Language,
    Contactus:Contactus,
    EditPro:EditPro,
Myorders:Myorders,
Mypost:Mypost
  },
  {
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: SettingsTabBarIcon
    }
  }
);

export default SettingsStack;
