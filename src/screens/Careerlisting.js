import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl,ActivityIndicator } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Label,CheckBox,List,ListItem} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import Spinner from 'react-native-loading-spinner-overlay';
import { Form,   } from 'native-base';
import Card from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { device} from '../constants';
import {  Picker } from "react-native";
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper'
import ShowScroller from './showscards'
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import { Modalize } from 'react-native-modalize';
import SlCard from '../components/slidescard'
import LCard from '../components/latestcard'
import { LayoutUtil } from './LayoutUtil';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import RNPicker from "rn-modal-picker";
import geohash from "ngeohash";
import { Slider } from 'react-native-elements';
import Globalmap from '../screens/Globalmap';
import Pcard from '../components/Profilescard'
const NORTH_AMERICA = ['CA', 'MX', 'US']

import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
const offers = [
  {
    title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
    user:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
  },
  {
    title: 'بهوايا انت قاعدة معايا عينيكي ليا مرايا',
    description: 'When you subscribe 1 year on openshop apps',
    first:'#800020',
  second:'steelblue',
      user:'samisami',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:false,
  },
  {
    title: 'باب الكراهية',
    first:'#800020',
  second:'steelblue',
      user:'ahmed',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:true,
  },



];
import { LinearGradient } from 'expo-linear-gradient';
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'

const posts = [
  {
    type:'قبل التحدي',
    user:'sameranas',
    NewChallenge:false,
    title:'التحدي',
des:'يجب عليك ان تضيف صورتك وانت صغير',
reply:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
image:'https://previews.123rf.com/images/bogumil/bogumil1306/bogumil130600035/20420629-young-kid-is-going-to-school.jpg',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:false,
love:1,
laugh:0,
sad:0,
dislike:0
  },
  {
    type:'اختار الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'السؤال',
des:'هل بكيت يوما من اجل شخص؟',
reply:'لا لم ابكي يوما',
image:'',
earn:5,
dateadded:20302302033,
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
liegame:false,
thirdlie:'انا شخص بحب الناس',
lie:'first',
love:5,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اختار كذبة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الكذبة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
dateadded:20302302033,
love:5,
liegame:false,
laugh:2,
sad:6,
dislike:3
  },
  {
    type:'اجاب على الصراحة',
    user:'ahmed ahmed',
    NewChallenge:false,
    title:'الصراحة',
des:'انت شخص تحب مالك اكثر من الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
earn:5,
firstno:2,
secondno:1,
thirdno:5,
dateadded:20302302033,
love:1,
laugh:2,
sad:6,
liegame:false,
dislike:3
  },

  {
    type:'اضاف 3 كذبات',
    user:'ahmed ahmed',
    NewChallenge:true,
    title:'الكذبة الاولى',
des:'انا شخص احب الناس',
reply:'لا احب الناس',
image:'',
firstlie:'انا شخص اجتماعي',
secondlie:'انا شخص لطيف',
thirdlie:'انا شخص بحب الناس',
lie:'first',
liegame:true,
earn:5,
firstno:2,
secondno:1,
thirdno:5,

dateadded:20302302033,
love:1,
laugh:2,
sad:6,
dislike:3
  },
];
const categorydata = [
{
  proimg:'https://i.ibb.co/ZHsQFFG/truck.png',
Businessname:'Pickup & Delivery'},
{
  proimg:'https://i.ibb.co/6BQrtJ8/training.png',
Businessname:'Education & Teaching'},
{
  proimg:'https://i.ibb.co/84xwPMc/perfume.png',
Businessname:'Beauty Services'},
{
  proimg:'https://i.ibb.co/Sy80kDK/car.png',
Businessname:'Car Wash'},
{
  proimg:'https://i.ibb.co/mNmRMzs/grocery.png',
Businessname:'Grocery Delivery'},
{
  proimg:'https://i.ibb.co/SB6BMqG/nutrition.png',
Businessname:'Healthcare & Fitness'},
{
  proimg:'https://i.ibb.co/Dp1GzzJ/cleaner.png',
Businessname:'Cleaning Services'},
{
  proimg:'https://i.ibb.co/fkWLXT7/franchise.png',
Businessname:'E-commerce & Retail'},
{
  proimg:'https://i.ibb.co/PmczbTZ/motorcycle.png',
Businessname:'Food Delivery'},
{
  proimg:'https://i.ibb.co/Rvq80MS/electrical-service.png',
Businessname:'Repair & Fixing'},
];
import Modal from 'react-native-modal';

import SwipeablePanel from 'rn-swipeable-panel';
import { ThemeContext } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Careerlisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      swipeablePanelActive: false,
title:props.navigation.getParam('titles','createdAt'),
      code:'',
      dataArray: [],
      dataProvider: new DataProvider((r1, r2) => {
       return r1 !== r2;
     }),
     layoutProvider: LayoutUtil.getLayoutProvider(2),
     images: [],
     Online: [
  {
    id: 1,
    name: "Graphic & Design"
  },
  {
    id: 2,
    name: "Digital Marketing"
  },
  {
    id: 3,
    name: "Writing & Translation"
  },
  {
    id: 4,
    name: "Video & Animation"
  },
  {
    id: 5,
    name: "Music & Audio"
  },
  {
    id: 6,
    name: "Programming & Tech"
  },
  {
    id: 7,
    name: "Business"
  },
  {
    id: 8,
    name: "Lifestyle"
  },
  {
    id: 9,
    name: "Gaming"
  },
  {
    id: 10,
    name: "E-commerce"
  },
  {
    id: 11,
    name: "Book & Ebook Publishing"
  },
  {
    id: 12,
    name: "PodCasting"
  },
  {
    id: 13,
    name: "Potical Campaigns"
  },
  {
    id: 14,
    name: "Influencers"
  }
],
     dataSource: [
  {
    id: 1,
    name: "Baby sitting"
  },
  {
    id: 2,
    name: "Barber"
  },
  {
    id: 3,
    name: "Beachbody On Demand"
  },
  {
    id: 4,
    name: "Beauty Services"
  },
  {
    id: 5,
    name: "Car repair"
  },
  {
    id: 6,
    name: "Car Wash"
  },
  {
    id: 7,
    name: "Carpenter"
  },
  {
    id: 8,
    name: "Carpet Repairer"
  },
  {
    id: 9,
    name: "DJ"
  },
  {
    id: 10,
    name: "Computer Repairer"
  },
  {
    id: 11,
    name: "Catering"
  },
  {
    id: 12,
    name: "Doctors"
  },
  {
    id: 13,
    name: "Dog Grooming"
  },
  {
    id: 14,
    name: "Dog Walking"
  },
  {
    id: 15,
    name: "Electricians"
  },
  {
    id: 16,
    name: "firebase Fighters"
  },
  {
    id: 17,
    name: "Fitness Coach"
  },
  {
    id: 18,
    name: "Helpers"
  },
  {
    id: 19,
    name: "Home Cleaning"
  },
  {
    id: 20,
    name: "Home Painting"
  },
  {
    id: 21,
    name: "Insurance Agent"
  },
  {
    id: 22,
    name: "Interior Decorator"
  },
  {
    id: 23,
    name: "Lawn Care"
  },
  {
    id: 24,
    name: "Lawn Mowing"
  },
  {
    id: 25,
    name: "Lawyers"
  },
  {
    id: 26,
    name: "Lock Smith"
  },
  {
    id: 27,
    name: "Maids"
  },
  {
    id: 28,
    name: "Massage"
  },
  {
    id: 29,
    name: "Mechanic"
  },
  {
    id: 30,
    name: "Mobile Technician"
  },
  {
    id: 31,
    name: "Office Cleaning"
  },
  {
    id: 32,
    name: "Party Cleaning"
  },
  {
    id: 33,
    name: "Pest Control"
  },
  {
    id:34,
    name: "Physiotharaphy Services"
  },
  {
    id: 35,
    name: "Tutor / Teacher"
  },
  {
    id: 36,
    name: "Psychologists"
  },
  {
    id: 37,
    name: "Road Assistance"
  },
  {
    id: 38,
    name: "Security Guard"
  },
  {
    id: 39,
    name: "Snow Plows"
  },
  {
    id: 40,
    name: "Sofa Repair"
  },
  {
    id: 41,
    name: "Spa"
  },
  {
    id: 42,
    name: "Tour Guide"
  },
  {
    id: 43,
    name: "Tow Truck"
  },
  {
    id: 44,
    name: "Translator"
  },
  {
    id: 45,
    name: "Travel Agent"
  },
  {
    id: 46,
    name: "Private language tutor / teacher"
  },
  {
    id: 47,
    name: "TV Repairer"
  },
  {
    id: 48,
    name: "Vet"
  },
  {
    id: 49,
    name: "Workers"
  },
  {
    id: 50,
    name: "Yoga Trainer"
  },
  {
    id: 51,
    name: "Developer"
  }
  ,
  {
    id: 52,
    name: "Design"
  },

  {
    id:53,
    name: "Pickup & Delivery"
  },
  {
    id:54,
    name: "Grocery Delivery"
  },
  {
    id:55,
    name: "Plumber"
  },
  {
    id: 56,
    name: "other"
  }


],
placeHolderText: "Select Service you offer",
selectedText: "",
     count: 0,
     viewType: 0,
      setDatePickerVisibility: false,
      myuid:'',
      pops:[],
      listedsection: ["local","online","Special"],
      idin:  props.navigation.getParam('id',[]),
      sec:  props.navigation.getParam('sec','All'),
      spec:  props.navigation.getParam('special',false),
      Career:  props.navigation.getParam('career',''),
      cca2:  props.navigation.getParam('cca2',''),
      Careerar:  props.navigation.getParam('careerar',''),

      head:  props.navigation.getParam('head',''),
      idins:  props.navigation.getParam('ids',0),
      tit:  props.navigation.getParam('title',''),
      namedata:  props.navigation.getParam('dataname',''),
arrrofcat: props.navigation.getParam('arrrofcat',[]),
       refreshing: false,
      myusername:'',
      mapvis:false,
      posts:[],
      done:false,
used:false,
value:10,
used1:false,
      Duration:'popular',
      ref:false,
      disabled:false,
      catindex:0,
      load:false,
      check:false,
      datamore:[],
      lastid:null,
      limit1:1,
      isFinished:false,momentum:false,loading:false,
      Additional: '-------------',
      spinner:false,
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]
    this.pops=[]

    this.currentusername=''

  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true,firsts:true});
   let d=this.state.title
   var ds=this.state.used
   var d1=this.state.used1


 }
  onValueChange1(value: string) {
    this.setState({
      title: value,


    });
    let d=value
    var ds=this.state.used
    var d1=this.state.used1
  }

  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };
  displayCategories = (d) => {
    this.setState({refreshing:true})

    console.log("------------uid home ------ "+firebaseApp.auth().currentUser.uid);
    let uid =firebaseApp.auth().currentUser.uid
    console.log("------------uid uid ------ "+uid);
const refs =`Doors/${uid}`
    var ref = firebaseApp.database().ref(refs);//Here assuming 'Users' as main table of contents

    firebaseApp.database().ref(`Doors/${uid}`).once('value').then(snapshot => {
        // console.log(snapshot.val());
console.log('lalallaal-----'+snapshot.val());
         // get children as an array
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

    let sort =items

if (this.state.Duration=='date') {
   sort = items.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);

  });

} else if(this.state.Duration=='open'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==false||word.secondlock ==false);

}else if(this.state.Duration=='close'){
  sort = items.sort(function(a, b) {
   // Turn your strings into dates, and then subtract them
   // to get a value that is either negative, positive, or zero.
   return new Date(b.createdAt) - new Date(a.createdAt);

 });
   sort = items.filter(word => word.firstLock==true&word.secondlock ==true);

}else {
 sort =items
}


this.setState({ dataArray: Object.values(sort),spinner:false,refreshing:false},function(){this.arrayholder=Object.values(sort)});

    });
console.log(this.state.dataArray);
  }

  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
  };
  reset = () => {
      this.setState({ swipeablePanelActive: false,
        title:'high',
        selectedText: "",
        value:10,
              sec:'All'
 });
 this.filterfun()
  };

  DisplayPosts = (d,ds,d1) => {

  }
   getGeohashRange = (
    latitude: number,
    longitude: number,
    distance: number, // miles
  ) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
      lower,
      upper
    };
  };



  componentDidMount() {
    this.setState({ref:true})
    var ref2 = firebaseApp.firestore().collection('profiles').where('country','==',this.state.cca2).where('career','==',this.state.Career).limit(this.state.limit1).onSnapshot(this.resent)


  }
  loadmore = ()=>{
    this.setState({loading:true})
    this.setState({isFinished:false,momentum:false})

    var ref2 = firebaseApp.firestore().collection('profiles').where('country','==',this.state.cca2).where('career','==',this.state.Career).orderBy('writerId').startAfter(this.state.lastid).limit(this.state.limit1).onSnapshot(this.resentmore)

  }

  filterfun = ()=>{

  //  let sort = this.state.title=="createdAt"?"createdAt":this.state.title=="price"&&this.state.namedata=="Services"?"price":this.state.title=="hprice"&&this.state.namedata=="Services"?"price":this.state.title=="hprice"&&this.state.namedata=="Jobs"?"hprice":
  //  this.state.title=="price"&&this.state.namedata=="Jobs"?"hprice":this.state.title=="Oldest"?"createdAt":this.state.title=="ratingno"?"ratingno":"createdAt"
  //  let sotingac = this.state.title=="createdAt"?"desc":this.state.title=="price"&&this.state.namedata=="Services"?"asc":this.state.title=="hprice"&&this.state.namedata=="Services"?"desc":this.state.title=="hprice"&&this.state.namedata=="Jobs"?"desc":
    //this.state.title=="price"&&this.state.namedata=="Jobs"?"asc":this.state.title=="Oldest"?"asc":this.state.title=="ratingno"?"desc":"desc"
    this.setState({ref:true,done:false,isFinished:false,momentum:false,loading:false})
    var ref2 = firebaseApp.firestore().collection('profiles').where('country','==',this.state.cca2).where('career','==',this.state.Career).limit(this.state.limit1).onSnapshot(this.resent)

this.setState({swipeablePanelActive:false})
  }
  Servicesupdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      if (this.state.sec=='All'||this.state.sec==doc.data().typeofservice) {
        boards.push(doc.data());

      }
    });
  console.log("loadddinngggg1");
    this.setState({pops:Object.values(boards)})

  }
  resent = (querySnapshot) => {
    const boards = [];
    if (!querySnapshot.empty) {
      this.setState({lastid:querySnapshot.docs[querySnapshot.docs.length-1]})

    }else {
      this.setState({done:true})
    }
    querySnapshot.forEach((doc) => {

      if (this.state.sec=='All'||this.state.sec==doc.data().typeofservice) {
        if (this.state.selectedText.length>0) {
          if (doc.data().Categories==this.state.selectedText) {
            boards.push(doc.data());

          }
}else {
  if (this.state.arrrofcat.length>0) {
if (this.state.arrrofcat.includes(doc.data().Categories)) {
  boards.push(doc.data());

}
}else if (doc.data().special==this.state.spec) {


  boards.push(doc.data());

}else {
    boards.push(doc.data());
}
}
      }
        });
        let sort =boards
        if (this.state.title=='createdAt') {
        let  sort = boards.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           var dateA = new Date(a.createdAt.toDate()), dateB = new Date(b.createdAt.toDate());

           return dateB - dateA;
         });
       }else if (this.state.title=='price'&&this.state.namedata=='Services') {
          let  sort = boards.sort((a, b) => {

            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          })
       }
       else if (this.state.title=='hprice'&&this.state.namedata=='Services') {
          let  sort = boards.sort((a, b) => {

            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          })
       }
       else if (this.state.title=='price'&&this.state.namedata=='Jobs') {
          let  sort = boards.sort((a, b) => {

            if (a.hprice < b.hprice) {
              return -1;
            }
            if (a.hprice > b.hprice) {
              return 1;
            }
            return 0;
          })
       }
       else if (this.state.title=='hprice'&&this.state.namedata=='Jobs') {
          let  sort = boards.sort((a, b) => {

            if (a.hprice < b.hprice) {
              return 1;
            }
            if (a.hprice > b.hprice) {
              return -1;
            }
            return 0;
          })
       } else if (this.state.title=='Oldest') {
         let  sort = boards.sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            var dateA = new Date(a.createdAt.toDate()), dateB = new Date(b.createdAt.toDate());

            return dateA - dateB;

          });
        }
        else if (this.state.title=='ratingno') {
          let  sort = boards.sort((a, b) => {

            if (a.nofollowers < b.nofollowers) {
              return 1;
            }
            if (a.nofollowers > b.nofollowers) {
              return -1;
            }
            return 0;
          })
         }else {
        sort =boards
       }
  console.log("loadddinngggg1");
    this.setState({dataProvider: this.state.dataProvider.cloneWithRows(sort),datamore:sort,ref:false,load:false})

  }
  resentmore = (querySnapshot) => {
    const boards = this.state.datamore;
    if (!querySnapshot.empty) {
      this.setState({lastid:querySnapshot.docs[querySnapshot.docs.length-1]})

    }else {
      this.setState({done:true})
    }
    querySnapshot.forEach((doc) => {

      if (this.state.sec=='All'||this.state.sec==doc.data().typeofservice) {
        if (this.state.selectedText.length>0) {
          if (doc.data().Categories==this.state.selectedText) {
            boards.push(doc.data());

          }
}else {
  if (this.state.arrrofcat.length>0) {
if (this.state.arrrofcat.includes(doc.data().Categories)) {
  boards.push(doc.data());

}
}else if (doc.data().special==this.state.spec) {


  boards.push(doc.data());

}else {
    boards.push(doc.data());
}
}
      }
        });
        let sort =boards
        if (this.state.title=='createdAt') {
        let  sort = boards.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           var dateA = new Date(a.createdAt.toDate()), dateB = new Date(b.createdAt.toDate());

           return dateB - dateA;
         });
       }else if (this.state.title=='price'&&this.state.namedata=='Services') {
          let  sort = boards.sort((a, b) => {

            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          })
       }
       else if (this.state.title=='hprice'&&this.state.namedata=='Services') {
          let  sort = boards.sort((a, b) => {

            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          })
       }
       else if (this.state.title=='price'&&this.state.namedata=='Jobs') {
          let  sort = boards.sort((a, b) => {

            if (a.hprice < b.hprice) {
              return -1;
            }
            if (a.hprice > b.hprice) {
              return 1;
            }
            return 0;
          })
       }
       else if (this.state.title=='hprice'&&this.state.namedata=='Jobs') {
          let  sort = boards.sort((a, b) => {

            if (a.hprice < b.hprice) {
              return 1;
            }
            if (a.hprice > b.hprice) {
              return -1;
            }
            return 0;
          })
       } else if (this.state.title=='Oldest') {
         let  sort = boards.sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            var dateA = new Date(a.createdAt.toDate()), dateB = new Date(b.createdAt.toDate());

            return dateA - dateB;

          });
        }
        else if (this.state.title=='ratingno') {
          let  sort = boards.sort((a, b) => {

            if (a.nofollowers < b.nofollowers) {
              return 1;
            }
            if (a.nofollowers > b.nofollowers) {
              return -1;
            }
            return 0;
          })
         }else {
        sort =boards
       }
  console.log("loadddinngggg1");
    this.setState({dataProvider: this.state.dataProvider.cloneWithRows(sort),datamore:sort,ref:false,load:false})
    this.setState({loading:false})
    this.setState({isFinished:true,momentum:true})

  }

  componentWillUnmount() {

 }
deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}
 incs=(data)=>{

if (this.state.check!=true) {
   this.setState({check:true})
  firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              console.log('existsssss');
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) - 1;
              })
this.deletess(data,'likesuser')



            }
            else{
              firebaseApp.database().ref(`Posts/${data.postuid}/love`).transaction(function(currentClicks) {
              // If node/clicks has never been set, currentRank will be `null`.
              return (currentClicks || 0) + 1;
              })
              let updates = {}
              firebaseApp.database().ref(`Posts/${data.postuid}/likesuser`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

            }
          })
}




 }
 laugh=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'laughusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/laugh`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/laughusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 sad=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
this.deletess(data,'sadusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/sad`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/sadusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 dis=(data)=>{
   if (this.state.check!=true) {
      this.setState({check:true})
   firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).once('value')
           .then((snapshot) => {
             if (snapshot.val()) {
               console.log('existsssss');
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) - 1;
               })
 this.deletess(data,'disusers')



             }
             else{
               firebaseApp.database().ref(`Posts/${data.postuid}/dislike`).transaction(function(currentClicks) {
               // If node/clicks has never been set, currentRank will be `null`.
               return (currentClicks || 0) + 1;
               })
               let updates = {}
               firebaseApp.database().ref(`Posts/${data.postuid}/disusers`).child(firebaseApp.auth().currentUser.uid.toLowerCase()).set(firebaseApp.auth().currentUser.displayName)

             }
           })
}
 }
 used =()=>{
   this.setState({used:!this.state.used});
   this.setState({refreshing:true})
   var ds=!this.state.used
   var d='latest'
   var d1 = this.state.used1

 }
 used1 =()=>{
   this.setState({used1:!this.state.used1});
   this.setState({refreshing:true})
   var ds=this.state.used
   var d='latest'
   var d1 = !this.state.used1
 }
 onBack() {
   this.setState({spinner:true})
   this.displayCategories(this.state.myuid)

     // Back from another screen
   }

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
header:null
  });
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };
  searchFilterFunction = text => {
    const newData = this.filt.filter(item => {
      const itemData = `${item.user.toUpperCase()}
      ${item.title.toUpperCase()}   ${item.typeofservice.toUpperCase()} ${item.about.toUpperCase()} ${item.hsection.toUpperCase()}`;

       const textData = text.toUpperCase();

       return itemData.indexOf(textData) > -1;
    });

    this.setState({ posts: newData });
  };
  onLike = (data,d) => {
    const newPostKey = firebaseApp.database().ref('posts').push().key

  firebaseApp.database().ref().child('Posts').child(data.postuid).child(d).push({
    likedby: firebaseApp.auth().currentUser.email
  })
  fetch('https://onesignal.com/api/v1/notifications',
   {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': "Basic NmIxNTQ4OWEtMzgzZi00YjI5LWFjM2EtYzdmNjYyYTUxNmZl",
     },
     body: JSON.stringify(
     {
       app_id: "092f9c3e-c1c4-4952-abdc-4dcd497ceddb",
       included_segments: ["All"],
       headings: {"en": "شخص ما قام بفتح بالتفاعل على منشورك"},
       android_sound: "fishing",
       data: {"puid": newPostKey, "new_message":true},
       ios_sound: "fishing.caf",
       contents: {"en": `شخص ما تفاعل ب ${d=='likedby'?'اعجبني':d=='sadedby'?'احزنني':d=='laughedby'?'اضحكني':d=='dislikedby'?'لم يعجبني':'لاشئ'}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
     })
   })

   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
  this.notification(data.writerId,data.postuid)
};
notification=(d,notkey)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key

  firebaseApp.database().ref(`notification/${d}/${newPostKey}`).update({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`شخص ما قام بالتفاعل على منشورك`,
      postuid:notkey,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt: new Date().getTime()+(60*60*48*1000),
      notuid:newPostKey
  });

}
 onUnlike = (data,d) => {
  let ref = firebaseApp.database().ref('Posts').child(data.postuid).child(d);
    ref.orderByChild('likedby').equalTo(firebaseApp.auth().currentUser.email).once('value', snapshot => {
      let updates = {};
      snapshot.forEach(child => updates[child.key] = null);
      ref.update(updates);
  });
};
_selectedValue(index, item) {
this.setState({ selectedText: item.name });
}
render(){

  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1,width:Dimensions.get('window').width}}>
<StatusBar hidden={true} />
<Header searchBar rounded style={{backgroundColor: 'white'}}>

<Left>
<TouchableOpacity onPress={()=>navigation.goBack()}>

  <Icon name="arrow-back" />
  </TouchableOpacity>

</Left>
<Body >
<Text style={[gStyle.text[theme], gStyle.Titleleft,{paddingHorizontal: 10,fontSize: 15}]} numberOfLines={1}>{this.props.appStore.arabic?this.state.Careerar:this.state.Career}</Text>

         </Body>
         <Right>
        <Item>
          <TouchableOpacity onPress={this.openPanel}>
          <Icon name="sliders" type="FontAwesome" />

</TouchableOpacity>
        </Item>
      </Right>
      </Header>



  {!this.state.ref?  <RecyclerListView
                  style={{ flex: 1 }}
                  contentContainerStyle={{ margin: 3 }}
                  dataProvider={this.state.dataProvider}
                  renderFooter={this.renderFooter}

                  onEndReachedThreshold={0.1}

      onMomentumScrollBegin = {() => {this.state.momentum = false;}}
      onEndReached={() => {
              if (this.state.done==false&& !this.state.momentum) {
              this.loadmore()
              }}}

                  layoutProvider={this.state.layoutProvider}
                  rowRenderer={(type, item) => {
        //We have only one view type so not checks are needed here

          if (this.state.namedata=='') {
              return(
                <Pcard navigation={navigation}
                  pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
            image={item.proimg}
                  show={false}
arabic={this.props.appStore.arabic}
                  nav={item.Businessname?"BusinessProfile":item.servicetitle?"OfferPage":"Job"}
                  data={item}

                  datast={item}
            name={item.Businessname}
            type={item.Categories}/>
              )


          }else if (this.state.namedata=='Services') {

            return(
              <LCard navigation={navigation}
                pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
          image={item.backimg}
                show={false}
                data={item}
                datast={item}
          type={item.career}/>
            )

              }
              else if (this.state.namedata=='Jobs') {

                return(
                  <LCard navigation={navigation}
                    pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
              image={item.backimg}
                    show={false}
                    nav={"Job"}
                    data={item}
                    jobs={true}
                    mprice={item.mprice}

                    price={item.hprice}
                    per={item.pperiod}

                    datast={item}
              name={item.Htitle}
              type={item.Categories}/>
                )

                  }
                  else if (this.state.namedata=='Offers') {

                    return(
                      <LCard navigation={navigation}
                             pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
                       image={item.proimg}
                             show={false}
                             datast={item}
                       name={item.servicetitle}
                     price={item.price}
                     nav="Offerview"

                 data={item}
                     per={item.priceper}
                     offer={true}
                     av={item.priceav}/>
                    )

                      }
          return null
      }}
                />
:<ActivityIndicator color="#eb144c" />}
    <SwipeablePanel
             fullWidth
             isActive={this.state.swipeablePanelActive}
             onClose={this.closePanel}
             showCloseButton
             onPressCloseButton={this.closePanel}
         >
         <View style={{flex: 1,justifyContent: 'center',paddingVertical: 30,width:Dimensions.get('window').width,paddingHorizontal: 20,paddingBottom: 30}}>
<ScrollView>
         <Label style={{fontFamily: 'ralewaysemi'}}>
{this.props.appStore.arabic?'ترتيب حسب':'Sort by'}
         </Label>
         <Picker
         selectedValue={this.state.title}
         onValueChange={this.onValueChange1.bind(this)}

        style={{ height: 50, width: '100%',textAlign: 'right',alignSelf: 'center',alignItems: 'center',justifyContent: 'flex-end',color:'#eb144c',fontFamily: 'ralewaymedium'}}


       >
       <Picker.Item label={this.props.appStore.arabic?'الاحدث':"Latest"} value="createdAt" />

       <Picker.Item label={this.props.appStore.arabic?'الاشهر':"Popular"} value="ratingno" />

       </Picker>


        <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
 {this.props.appStore.arabic?'الدولة':'Country'}
        </Label>
        <View style={{justifyContent: 'space-around',alignItems: 'center',paddingHorizontal: 20,marginVertical: 15,flexDirection: 'row',borderWidth: 0.5,paddingVertical: 15,marginHorizontal: 10}}>

        <View style={{flex:1,flexDirection: 'row',alignItems: 'center'}}>
        <CountryPicker
                countryList={NORTH_AMERICA}
                onSelect={(value) => {
                  this.setState({ cca2: value.name})

                }}
  placeholder={this.props.appStore.arabic?'حدد الدولة':'Select Country'}
                translation="eng"
              />
                              </View>
                              <Text style={{fontFamily: 'ralewaymedium',color: '#eb144c'}}>{this.state.cca2}</Text>
                              </View>
                        <Button onPress={this.filterfun} block style={{borderRadius: 9,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: '#eb144c',marginVertical: 10,marginTop: 20}}>
                        <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#fff'}}>{this.props.appStore.arabic?'فلترة النتائج':'Apply Filter'}</Text>

                        </Button>
                        <Button onPress={this.reset} bordered style={{borderRadius: 9,justifyContent: 'center',alignItems: 'center',padding: 20,borderColor: '#eb144c',marginVertical: 5}}>
                        <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#eb144c'}}>{this.props.appStore.arabic?'اعادة الفلترة':'Reset Filter'}</Text>

                        </Button>
       </ScrollView>
       </View>
 </SwipeablePanel>
 <Modal isVisible={this.state.mapvis}>
    <Globalmap close={()=>this.setState({mapvis:false})}/>
  </Modal>
    </View>
  )}

</ThemeContext.Consumer>
  )
}
renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading&&!this.state.isFinished) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };
};


/*
// shoutout @notbrent: https://snack.expo.io/H105kxsG7
const shouldShowBackButton = stackRouteNavigation => {
  const parent = stackRouteNavigation.dangerouslyGetParent();
  return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
};

SettingsScreen.navigationOptions = ({ navigation }) => ({

headerLeft: !shouldShowBackButton(navigation) ? (
  <View style={{ flex: 1 }}>
    <Text>left</Text>
  </View>
) : null,
*/
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3"
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 21,
    elevation:3,
    paddingRight: 25,
    marginRight: 12,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,
    width: Dimensions.get('window').width,

  },
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: Dimensions.get('window').width,
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center'
  },
  item: {
      width: Dimensions.get('window').width * 0.25,
      height: 100,margin: 10,
      borderWidth: 1,
      borderColor: "lightgray",
      alignItems: 'center',
      justifyContent: 'center'
  },
  itemIcon: {
      width: 50,
      height: 50,
      resizeMode: 'cover'
  },
  itemTitle: {
      marginTop: 16,textAlign: 'center'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width-30,

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width-30,

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
const styless = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',

    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default Careerlisting;
