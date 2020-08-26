import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl ,ActivityIndicator} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Tab, Tabs, ScrollableTab} from 'native-base';
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
import LCard from '../components/latestcard'
import _ from 'lodash';
import ShowScrollers from './Swipercard'
import geohash from "ngeohash";

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
    first:'red',
  second:'steelblue',
      user:'samisami',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:false,
  },
  {
    title: 'باب الكراهية',
    first:'red',
  second:'steelblue',
      user:'ahmed',
      firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
      seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
      firstLock:true,
      secondlock:true,
  },



];
import { LinearGradient } from 'expo-linear-gradient';

const categorydata = [
{
  proimg:'https://i.ibb.co/xgj6jzH/crop-man-sealing-carton-box-with-tape-4498136.jpg',
Businessname:'Pickup & Delivery',
ar:'توصيل وتحميل',
cats:['Pickup & Delivery']
},
{
  proimg:'https://i.ibb.co/Fs0QLHd/adult-blur-business-close-up-239548.jpg',
Businessname:'Education & Teaching',
ar:'تعليم وتدريس',

cats:['Helpers',"Tutor / Teacher","Private language tutor / teacher","Book & Ebook Publishing"]},
{
  proimg:'https://i.ibb.co/VL5cMXH/assorted-blur-close-up-container-1115128.jpg',
Businessname:'Beauty Services',
ar:'خدمات تجميلية',

cats:['Barber',"Beachbody On Demand","Beauty Services","Spa"]},
{
  proimg:'https://i.ibb.co/M5f2LHM/action-auto-automobile-automotive-372810.jpg',
Businessname:'Car Wash',
ar:'غسيل سيارات',

cats:['Car Wash']},
{
  proimg:'https://i.ibb.co/xgbQ5xB/booth-branding-business-buy-264636.jpg',
Businessname:'Grocery Delivery',
ar:'توصيل بقالة',

cats:['Grocery Delivery']},
{
  proimg:'https://i.ibb.co/mGGMN2Y/scrabble-pieces-on-a-plate-2377045.jpg',
Businessname:'Healthcare & Fitness',
ar:'صحة ولياقة',

cats:['Fitness Coach',"Yoga Trainer"]},
{
  proimg:'https://i.ibb.co/rwvjWzb/faceless-person-cleaning-mirror-with-sponge-4239146.jpg',
Businessname:'Cleaning Services',
ar:'خدمات تنظيف',

cats:['Car Wash',"Home Cleaning","Office Cleaning","Party Cleaning"]},
{
  proimg:'https://i.ibb.co/x5yrpMY/Discount-red-sign-board-in-the-store-Bali-island.jpg',
Businessname:'E-commerce & Retail',
ar:'تجارة وتجزئة',

cats:['E-commerce',"Book & Ebook Publishing","Grocery Delivery","Pickup & Delivery"]},
{
  proimg:'https://i.ibb.co/W66cy9F/person-paying-for-food-delivery-with-a-credit-card-4393532.jpg',
Businessname:'Food Delivery',
ar:'توصيل طلبات الطعام',

cats:['Grocery Delivery',"Pickup & Delivery"]},
{
  proimg:'https://i.ibb.co/N2xWDJg/person-holding-screwdriver-3806275.jpg',
Businessname:'Repair & Fixing',
ar:'تصليح وصيانة',

cats:['TV Repairer',"Sofa Repair","Electricians","Computer Repairer","Carpet Repairer","Car repair","Plumber"]},
];
import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Searchall extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      catindex:0,
      setDatePickerVisibility: false,
      myuid:'',
       refreshing: false,
      myusername:'',
      posts:[],
jobsarray:[],
top:[],
sliderarr:[],
latest:[],
businessarray:[],
      Duration:'popular',
      sec:'',
      disabled:false,
      check:false,
      Additional: '-------------',
      spinner:false,
      jobref:false,
      sortingarr:[],
      offerarr:[],
limit:7,
limit1:7,
limit2:7,

lastVisible: null,
lastVisible1: null,
lastVisible2: null,

     loading: false,
     loading1: false,
     loading2: false,
     loading3: false,

      busref:false,
      sortingarr1:[],
      sortingarr2:[],
      sortingarr3:[],
current:'',
latestser:[],
      serref:false,
      refresh:false
    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]

    this.currentusername=''


  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true,firsts:true});
this.componentDidMount() }
  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true,
      firsts:true
    });
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };

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
    var ref = firebaseApp.firestore().collection('slider').onSnapshot(this.sliderget)

console.log("loggs"+this.props.appStore.Myregion.latitude+this.props.appStore.Myregion.longitude);
    const range = this.getGeohashRange(this.props.appStore.Myregion.latitude, this.props.appStore.Myregion.longitude, 100);
this.setState({spinner:true})
    var ref = firebaseApp.firestore().collection('Business').orderBy('nofollowers','desc').limit(this.state.limit).onSnapshot(this.Businessupdate)
    var ref1 = firebaseApp.firestore().collection('Services').where("hash", ">=", range.lower)
      .where("hash", "<=", range.upper).limit(this.state.limit1).onSnapshot(this.Servicesupdate)
  var ref2 = firebaseApp.firestore().collection('Offers').orderBy('ratingno', 'desc').limit(3).onSnapshot(this.Offerupdate)
    var ref3 = firebaseApp.firestore().collection('Jobs').where("hash", ">=", range.lower)
      .where("hash", "<=", range.upper).limit(this.state.limit2).onSnapshot(this.Jobsupdate)

}
Businessupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
console.log("loadddinngggg1");
  this.setState({businessarray: Object.values(boards),sortingarr1:Object.values(boards),loading3:false})

}
sliderget = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  this.setState({sliderarr: Object.values(boards)})

}
Servicesupdate = (querySnapshot) => {
  var boards = [];
  var boards1 = [];

  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  boards1.push(doc.data());
  });
  console.log("loadddinngggg2");
  let sort = boards.sort((a, b) => {

     if (a.ratingno < b.ratingno) {
       return 1;
     }
     if (a.ratingno > b.ratingno) {
       return -1;
     }
     return 0;
   })
   let  lat = boards1.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      var dateA = new Date(a.createdAt.toDate()), dateB = new Date(b.createdAt.toDate());

      return dateB - dateA;;

    });
  this.setState({dataArray:Object.values(sort),latestser:Object.values(lat),sortingarr2:Object.values(sort),loading2:false})

}
Offerupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });

  this.setState({offerarr:boards})

}
Jobsupdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  console.log("loadddinngggg3");

  this.setState({jobsarray: Object.values(boards),sortingarr3:Object.values(boards),loading1:false})
  this.setState({spinner:false,refreshing:false})

}

Businessupdate1 = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  console.log("loadddinngggg1");

  let lastVisible = boards[boards.length - 1].postuid;
  if (_.toArray(boards).length < this.state.limit) {
            console.log("---- TIMELINE POST FINISHED ----");
            this.setState({ isFinished: true,loading3:false })
          }else {
            this.setState({sortingarr1:Object.values(boards),lastVisible:lastVisible,loading3:false })

          }

}

Servicesupdate1 = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  let lastVisible = boards[boards.length - 1].postuid;
  if (_.toArray(boards).length < this.state.limit) {
            console.log("---- TIMELINE POST FINISHED ----");
            this.setState({ isFinished: true ,loading2:false })
          }else {
            this.setState({sortingarr2:Object.values(boards),lastVisible1:lastVisible,loading2:false })

          }
}
Offerupdate1 = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  let lastVisible = boards[boards.length - 1].id;

  this.setState({sortingarr: [...this.state.sortingarr, ...Object.values(boards)]})
}
Jobsupdate1 = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  let lastVisible = boards[boards.length - 1].postuid;
  if (_.toArray(boards).length < this.state.limit) {
            console.log("---- TIMELINE POST FINISHED ----");
            this.setState({ isFinished: true ,loading1:false })
          }else {
            this.setState({sortingarr3:Object.values(boards),lastVisible2:lastVisible,loading1:false })

          }
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
      ${item.title.toUpperCase()}   ${item.type.toUpperCase()} ${item.reply.toUpperCase()} ${item.des.toUpperCase()}`;

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

render(){
  let combinedArray1 = [...this.state.businessarray, ...this.state.dataArray, ...this.state.jobsarray]
  let combinedArray0 = [...this.state.sortingarr1, ...this.state.sortingarr2, ...this.state.sortingarr3]

  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
<StatusBar hidden={true} />

    <ScrollView
      contentContainerStyle={gStyle.contentContainerss}
      style={gStyle.container[theme]}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            tintColor="#eb144c"
          />
        }
    >
    <Spinner
             visible={this.state.spinner}
             textContent={this.props.appStore.arabic?'جاري التحميل..':'Loading...'}
textStyle={{color: '#fff'}}
           />
    <Swiper style={styles.wrapper} showsPagination={false} autoplay height={200}>
    {this.state.sliderarr.map((d)=>{
      return(
        <TouchableOpacity style={styless.slide1} onPress={()=>navigation.navigate(d.nav)}>
             <Image style={{width: Dimensions.get('window').width,flex:1}} source={{uri:this.props.appStore.arabic?d.uriar:d.uri}} />

             </TouchableOpacity>
      )
    })

}
         </Swiper>
         <Item onPress={()=>navigation.navigate('Searchscreens')} style={{position: 'absolute',top:170,backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
           shadowOpacity: 0.4,
           shadowRadius: 3,

           shadowOffset: {
             height: 2,
             width: 0
           },
           //android
           elevation: 5,}}>
              <Icon name="ios-search" />
              <Input onPress={()=>navigation.navigate('Searchscreens')} editable={false} placeholder={this.props.appStore.arabic?"ابحث..":'Search..'} onChangeText={text => this.searchFilterFunction(text)} />
            </Item>
    <View style={{paddingLeft: 10,paddingTop: 10,flex:1}}>
{/*cards start*/}
<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>

{
[{name:"Users Career",value:'Users Career',arabic:'اشخاص حسب المهن',img:'https://i.ibb.co/QF8q2Mh/man.png'},{name:"Jobs",arabic:'وظائف',value:"Jobs",img:'https://i.ibb.co/sKGYSwd/businessman.png'},{name:"Company & Business",arabic:'شركات واعمال',value:'Business',img:'https://i.ibb.co/F8JsnxF/company.png'},{name:"Services",value:'Services',arabic:'خدمات',img:'https://i.ibb.co/TvZ1kN7/shift.png'},{name:"Offers",arabic:'عروض',value:'Offers',img:'https://i.ibb.co/6FxyBz3/hot-sale.png'}].map((category, index) => {
    return (
      <Button bordered={true} onPress={category.name=='Users Career'?()=>navigation.navigate('Career',{arabic:this.props.appStore.arabic}):()=>navigation.navigate('Listings',{dataname:category.value})}  style={{borderRadius: 12,justifyContent: 'center',alignItems: 'center',padding: 10,marginHorizontal: 10,marginTop: 30,borderColor: '#dddddd'}}>
<Image style={{height: 30,width: 30,resizeMode: 'contain',marginHorizontal: 5}} source={{uri:category.img}} />
      <Text style={{color:'black',fontFamily: 'ralewaymedium'}}>{this.props.appStore.arabic?category.arabic:category.name}</Text>
      </Button>   )
  })
}
</ScrollView>


<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}} >
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'اشهر الخدمات':'Popular Services'}</Text>
      <Button transparent style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Listings',{dataname:'Services',titles:'ratingno'})}>
      <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
      </Button>

</View>
<ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} dataset={this.state.dataArray} serref={this.state.serref} type="service"/>
</View>
<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}} onPress={()=>navigation.navigate('Listings',{dataname:'Services',sec:'local'})}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'اشهر الاقسام المحلية':'Popular Local Categories'}</Text>
      <TouchableOpacity  style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Categories',{arabic:this.props.appStore.arabic})}>
      <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
      </TouchableOpacity>

</View>

    <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} ar={this.props.appStore.arabic} dataset={categorydata} type="cate"/>


</View>

<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}} >
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'مقترح لك':'Recommended by us'} <Text style={{fontSize: 12}}>({this.props.appStore.arabic?'اعلانات':'Ads'}) </Text> </Text>


</View>
{combinedArray0.slice(4).map((item)=>{
  if (item.active) {
    return       <LCard navigation={navigation}
        pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
image={item.Businessname?item.proimg:item.servicetitle?item.backimg:item.proimg}
data={item}
arabic={this.props.appStore.arabic}
nav={item.Businessname?"BusinessProfile":item.servicetitle?"OfferPage":"Job"}
        show={false}
        datast={item}
name={item.Businessname?item.Businessname:item.servicetitle?item.servicetitle:item.Htitle}
type={item.Categories}/>
  }

})}
</View>
<Swiper  containerStyle={{alignSelf: 'center'}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={false} autoplay height={150}>
<TouchableOpacity style={[styles.slide1],{height: 150,marginVertical: 10,alignSelf: 'center',borderRadius: 16}} onPress={()=>navigation.navigate('NewBusiness')}>
 <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover',borderRadius: 12,alignSelf: 'center'}} source={{uri:'https://i.ibb.co/RpPPfsf/blank-business-composition-computer-373076.jpg'}} >
<LinearGradient
   colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.1)']}
   style={{  alignItems: 'center',   width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

 <Text
   style={{
     backgroundColor: 'transparent',
     fontSize: 17,
     color: '#fff',

     fontWeight: '600',

     alignSelf: 'center',textAlign: 'center',
     fontFamily: 'ralewaysemi'
   }}>
  {this.props.appStore.arabic?'انشر خدمتك, مشروعك, ابحث عن موظفين':'Start Service, Business, Find employee'}
 </Text>
 <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white',borderRadius: 10}}>
 <Text
   style={{
     backgroundColor: 'transparent',
     fontSize: 15,
     color: '#fff',

     fontWeight: '500',

     alignSelf: 'center',textAlign: 'center',
     fontFamily: 'ralewaysemi'
   }}>
  {this.props.appStore.arabic?'ابدأ عملك الخاص':'Start Your Business'}
 </Text>
 </View>
 </LinearGradient>
</ImageBackground>
 </TouchableOpacity>

       <TouchableOpacity onPress={()=>navigation.navigate('Career',{arabic:this.props.appStore.arabic})} style={[styles.slide2]}>
       <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/0JrRQP4/pexels-karolina-grabowska-4021775.jpg'}} >
<LinearGradient
         colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.1)']}
         style={{  alignItems: 'center', width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 17,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكتشف مهن حول العالم':'Discover Career around the world'}
       </Text>
       <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 15,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'معلم, دكاترة, رجال اعمال..':'Teachers, Doctors, entrepreneurs..etc'}
       </Text>
       </View>
       </LinearGradient>
</ImageBackground>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('Share',{arabic:this.props.appStore.arabic})} style={[styles.slide3]}>
       <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover'}} source={{uri:'https://i.ibb.co/ft0SvxS/customers-sharing-references-earning-money-74855-5231.jpg'}} >
<LinearGradient
         colors={['rgba(208,2,27,70)','rgba(0,0,0,0.1)']}
         style={{  alignItems: 'center',  width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 17,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'شارك واكسب':'Share & Earn'}
       </Text>
       <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 15,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'احصل على اعلان مجاني عند مشاركتك التطبيق':'Get Free Ads when you share this app'}
       </Text>
       </View>
       </LinearGradient>
</ImageBackground>
       </TouchableOpacity>

     </Swiper>

<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'اشهر الاعمال':'Top Business'}</Text>
      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Listings',{dataname:'Business',sec:'All'})}>
      <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
      </TouchableOpacity>

</View>
<ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} busref={this.state.busref} dataset={this.state.businessarray} type="company"/>
</View>
<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'وظائف':'Jobs'}</Text>
      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Listings',{dataname:'Jobs'})}>
      <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
      </TouchableOpacity>

</View>
<ShowScroller arabic={this.props.appStore.arabic}   navigation={this.props.navigation} refresh={()=>this.setState({refresh:true})} jobref={this.state.jobref} dataset={this.state.jobsarray} type="Jobs"/>
</View>


<View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
      <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'مهارات خاصة':'Special Skills'}</Text>
      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Listings',{dataname:'Services',special:true,sec:'Special'})}>
      <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
      </TouchableOpacity>

</View>

<ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} serref={this.state.serref} dataset={this.state.dataArray} type="special"/>
</View>
<Swiper  containerStyle={{alignSelf: 'center'}} bounces={true} scrollEnabled style={[styles.wrapper]} showsPagination={false} autoplay height={150}>
       <TouchableOpacity style={[styles.slide1]} onPress={()=>navigation.navigate('Listings',{dataname:'Business'})}>
       <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover'}} source={require('../business1.jpg')} >
<LinearGradient
         colors={['rgba(74,144,226,43)','rgba(0,0,0,0.1)']}
         style={{  alignItems: 'center',   width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 17,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكتشف شركات واعمال قريبة منك':'Discover nearby business'}
       </Text>
       <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white',borderRadius: 10}}>
       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 15,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكتشف اكثر':'Discover more'}
       </Text>
       </View>
       </LinearGradient>
</ImageBackground>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('Listings',{dataname:'Business',arrrofcat:['Supermarket','Auto Market','Auto Parts Market',
     'Building Materials Market','Cattle Market','Clothes Market','Discount Supermarket','Hypermarket','Baby Clothing Store']})} style={[styles.slide2]}>
       <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover'}} source={require('../stores.jpg')} >
<LinearGradient
         colors={['rgba(144,164,174,70)','rgba(0,0,0,0.1)']}
         style={{  alignItems: 'center', width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 17,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكتشف متاجر واسواق قريبة منك':'Discover nearby Stores & markets'}
       </Text>
       <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 15,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكثشف اكثر':'Discover more'}
       </Text>
       </View>
       </LinearGradient>
</ImageBackground>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>navigation.navigate('Listings',{dataname:'Jobs',sec:'Special'})} style={[styles.slide3]}>
       <ImageBackground style={{width: Dimensions.get('window').width-30,flex:1,resizeMode: 'cover'}} source={require('../talent.jpg')} >
<LinearGradient
         colors={['rgba(208,2,27,70)','rgba(0,0,0,0.1)']}
         style={{  alignItems: 'center',  width: Dimensions.get('window').width-30,height: '100%',justifyContent: 'center'}}>

       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 17,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'هل انت موهوب':'Are you Talented person'}
       </Text>
       <View style={{borderRadius: 5,padding: 15, marginVertical: 10,justifyContent: 'center',alignItems: 'center',borderWidth: 1,borderColor: 'white'}}>
       <Text
         style={{
           backgroundColor: 'transparent',
           fontSize: 15,
           color: '#fff',

           fontWeight: '500',

           alignSelf: 'center',textAlign: 'center',
           fontFamily: 'ralewaysemi'
         }}>
        {this.props.appStore.arabic?'اكتشف وظائف مناسبة لك':'Discover Jobs for you'}
       </Text>
       </View>
       </LinearGradient>
</ImageBackground>
       </TouchableOpacity>

     </Swiper>
     <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
     <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
           <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'اشهر العروض':'Popular offers'}</Text>
           <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} onPress={()=>navigation.navigate('Listings',{dataname:'Offers'})}>
           <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
           </TouchableOpacity>

     </View>
     {this.state.offerarr.map((item)=>{
       return      <LCard navigation={navigation}
               pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
         image={item.proimg}
               show={false}
               datast={item}
         name={item.servicetitle}
         arabic={this.props.appStore.arabic}
       price={item.price}
       nav="Offerview"
   data={item}
       per={item.priceper}
       offer={true}
       av={item.priceav}/>
     })}
     <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} dataset={this.state.offerarr}  type="local service"/>
     </View>

    {/* <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
     <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
           <Text style={[gStyle.text[theme], gStyle.Titleleft]}>Online Products</Text>
           <Button transparent style={{justifyContent: 'center',alignItems: 'center'}}>
               <Text style={[{color:'#eb144c'}]}>View all</Text>
           </Button>

     </View>
     <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} dataset={[{name:'Special men T-shirt',type:"Clothing & Fasion",image:'https://asda.scene7.com/is/image/Asda/5057983042621?hei=686&wid=516&qlt=85&fmt=pjpg&resmode=sharp&op_usm=1.1,0.5,0,0&defaultimage=default_details_George_rd',price:'12JD',store:'Loolet Stores'},{name:'Home sofa black',type:"Furniture",image:'https://cdn.shopify.com/s/files/1/0254/3062/2285/products/black600x600_30df6a78-3645-4ee6-9277-59e1787818c3.jpg?v=1571839897',store:"naseh Furniture"}]} type="Produc" cats="Product"/>
     </View>*/}
  {/*   <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
     <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
           <Text style={[gStyle.text[theme], gStyle.Titleleft]}>Local</Text>
           <Button transparent style={{justifyContent: 'center',alignItems: 'center'}}>
               <Text style={[{color:'#eb144c'}]}>View all</Text>
           </Button>

     </View>
     <ShowScroller arabic={this.props.appStore.arabic}  navigation={this.props.navigation} busref={this.state.busref} dataset={this.state.businessarray} type="local" />
     </View>*/}
     <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
     <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
           <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'احدث الخدمات':'Latest Services'} </Text>
           <Button transparent style={{justifyContent: 'center',alignItems: 'center'}}  onPress={()=>navigation.navigate('Listings',{dataname:'Services',titles:'createdAt'})}>
               <Text style={[{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض المزيد':'View all'}</Text>
           </Button>

     </View>
     <ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} dataset={this.state.latestser} serref={this.state.serref} type="service"/>
     </View>
     <View style={{marginVertical: 3,paddingVertical: 10,flex:1}}>
     <Tabs  renderTabBar={()=> <ScrollableTab />} style={{marginBottom: 10}} tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
     <Tab heading={this.props.appStore.arabic?'جميع الاعمال':"All Business"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>


      <ShowScroller arabic={this.props.appStore.arabic}   navigation={this.props.navigation} dataset={combinedArray0} type="latest" />

      </Tab>
      <Tab heading={this.props.appStore.arabic?'وظائف':"Jobs"}  textStyle={{color:'black',fontFamily: 'ralewaysemi'}}  tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
<View style={{flex:1,justifyContent: 'flex-start'}}>

      <ShowScroller arabic={this.props.appStore.arabic}    navigation={this.props.navigation} dataset={this.state.sortingarr3} type="latest" />
</View>
      </Tab>
      <Tab heading={this.props.appStore.arabic?'خدمات':"Services"}  textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
      <ShowScroller arabic={this.props.appStore.arabic}   navigation={this.props.navigation} dataset={this.state.sortingarr2} type="latest" />
      </Tab>
      <Tab heading={this.props.appStore.arabic?'اعمال':"Business"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
      <ShowScroller arabic={this.props.appStore.arabic}    navigation={this.props.navigation} dataset={this.state.sortingarr1} type="latest" />

      </Tab>
    </Tabs>

     </View>
{/*cards end*/}

    </View>
    </ScrollView>
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
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex:1,
    width: Dimensions.get('window').width-30,

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
export default Searchall;
