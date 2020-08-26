import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View, ScrollView, Animated,Dimensions,StyleSheet,TouchableOpacity,Linking,RefreshControl,Alert } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item ,Left,Right,Body,Title,Icon,Fab,Textarea,Label,List,ListItem} from 'native-base';
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
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import MapView from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import SwipeablePanel from 'rn-swipeable-panel';
import { Input } from 'react-native-elements';

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
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

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
import { ThemeContext } from 'react-navigation';
const HEADER_MAX_HEIGHT = 0;
const HEADER_MIN_HEIGHT = 0;
const PROFILE_IMAGE_MAX_HEIGHT = 0;
const PROFILE_IMAGE_MIN_HEIGHT = 0;
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Offerview extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      userdat:[],
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      active: false,
      swipeablePanelActive: false,

      data:  props.navigation.getParam('data',[]),
reviewsarr:[],
      loading: true,
           region: {
             latitude:32.5534246,
             longitude:35.8610753,
             latitudeDelta: 0.001,
             longitudeDelta: 0.001
           },
show:false,
postStatus:'',
ratingnum:0,
review:'',
           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
      phoneto:0,
      locto:'',
      noteto:'',
      revstat:'',
       offset: 0,
      posts:[],
heart:false,
regions:[],

scrollY: new Animated.Value(0)
,
      Duration:'popular',
      disabled:false,
      check:false,
      Additional: '-------------',
      spinner:false,

    };
    this.currentUserId=''
    this.arrayholder=[]
    this.filt=[]

    this.currentusername=''


  }

  busindata = (querySnapshot) => {
    const boards = [];

    this.setState({
    userdat:querySnapshot.data(),
  })

  }

  componentDidMount() {
    this.setState({spinner:true})
console.log(firebaseApp.auth().currentUser.uid+"sdsdsdsdsdsds");
    firebaseApp.firestore().collection('users').doc(this.state.data.writerId).get()
.then((docSnapshot) => {
if (docSnapshot.exists) {
  firebaseApp.firestore().collection('profiles').doc(this.state.data.writerId).onSnapshot(this.busindata)

} else {
  firebaseApp.firestore().collection('Business').doc(this.state.data.writerId).onSnapshot(this.busindata)
}
});

firebaseApp.firestore().collection('Offers').doc(this.state.data.postuid).collection('review').onSnapshot(this.Jobsupdate)

  }
  Jobsupdate = (querySnapshot) => {
    const boards = [];
    var total = 0;

    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
      total += doc.data().ratingnum;

    });
    var avg = total / this.state.data.ratingno;
  let sort = boards

  this.setState({ reviewsarr: Object.values(sort),avg:avg,spinner:false});
  }


  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  _onRefresh = () => {
   this.setState({refreshing: true,firsts:true});
   this.DisplayPosts()

   firebaseApp
     .database()
     .ref('users/'+firebaseApp.auth().currentUser.uid)

     .once("value")
     .then(snapshot => {

this.setState({balance:snapshot.val().balance})
     });
 }

  onValueChange1(value: string) {
    this.setState({
      Duration: value,
      refreshing:true,
      firsts:true
    });
    this.DisplayPosts(value)
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




  DisplayPosts = (d) => {
    this.setState({refreshing:true})

    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.database().ref(`Posts`).on('value', (snapshot) => {
         var items = [];
         snapshot.forEach((child) => {
           items.push(child.val());
        });

      if(d==="latest"){
          sort = items.sort(function(a, b) {
           // Turn your strings into dates, and then subtract them
           // to get a value that is either negative, positive, or zero.
           return new Date(b.createdAt) - new Date(a.createdAt);

         });
        }
      else   if (d==="popular") { sort = items.sort((a, b) => {
         likeda = a.likedby ? Object.values(a.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         likedb = b.likedby ? Object.values(b.likedby).map((project)=>{
           return project.likedby;
         }) : [];
         laugheda = a.laughedby ? Object.values(a.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadeda = a.sadedby ? Object.values(a.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikeda = a.dislikedby ? Object.values(a.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         laughedb = b.laughedby ? Object.values(b.laughedby).map((project)=>{
           return project.likedby;
         }) : [];
         sadedb= b.sadedby ? Object.values(b.sadedby).map((project)=>{
           return project.likedby;
         }) : [];
         dislikedb = b.dislikedby ? Object.values(b.dislikedby).map((project)=>{
           return project.likedby;
         }) : [];
         let as=likeda +laugheda+sadeda+dislikeda
         let bs =likedb+laughedb+sadedb+dislikedb
         if (as < bs) {
           return 1;
         }
         if (as > bs) {
           return -1;
         }
         return 0;
       })}
console.log(sort +'--------------------------------posts');
this.setState({ check:false,disabled:false,posts: Object.values(sort),spinner:false,refreshing:false,firsts:false},function(){
  this.filt=Object.values(sort)
});

    });
  }




deletess=(data,name)=>{
  var updates = {};
updates[`Posts/${data.postuid}/${name}/${firebaseApp.auth().currentUser.uid.toLowerCase()}`] = null;
return firebaseApp
.database()
.ref()
.update(updates)
}
booking = () => {
  this.setState({
    ploading:true,
    postStatus: this.props.appStore.arabic?'طلب..':'Booking..',
    shows:true,pcolor:'warning'
  })

  const refs = firebaseApp.firestore().collection('Orders').doc()

  const newPostKey = refs.id

if (this.state.phoneto.length >0) {

        const postData = {
          customeruid:firebaseApp.auth().currentUser.uid,
          servicetitle:this.state.data.servicetitle,
          customername:firebaseApp.auth().currentUser.displayName,
          location:this.state.locto,
          price:this.state.data.price,
          note:this.state.noteto,
          priceper:this.state.data.priceper,
          phone:this.state.phoneto,
          Status:'Pending',
          type:'offer',
          orderid:this.state.data.postuid,
          Customerimg:firebaseApp.auth().currentUser.photoURL,
          Cat:"",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          postuid:newPostKey,
          provname:this.state.data.user,
Provideruid:this.state.data.writerId
        }
        let updates = {}
        let updatess = {}

        refs.set(postData)

        .then(() => {

          this.setState({
            postStatus: this.props.appStore.arabic?'تم النشر':'Done, Thank you',
                          title:'',
                          lovemsg:'',
                          hatemsg:'',
show:true,swipeablePanelActive:false
                        })
this.setState({shows:false})
fetch('https://onesignal.com/api/v1/notifications',
 {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': "Basic YWI3MThjYmUtOWU1Zi00MGEwLTkwMDItYzFjZTlkODQzNzk0",
   },
   body: JSON.stringify(
   {
     app_id: "4ab98c66-d9e7-4978-ac18-466ec800dbc3",
     included_segments: ["All"],
     headings: {"en": `${firebaseApp.auth().currentUser.displayName} Order your Offer`,"ar":`${firebaseApp.auth().currentUser.displayName} طلب العرض الخاص بك`},
     android_sound: "fishing",
     data: {"puid": newPostKey, "new_message":true},
     ios_sound: "fishing.caf",
     contents: {"en": `${firebaseApp.auth().currentUser.displayName} Order your Offer:
     ${this.state.data.servicetitle}`,"ar":`${firebaseApp.auth().currentUser.displayName} طلب العرض الخاص بك:
     ${this.state.data.servicetitle}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.data.writerId}],
   })
 })


        })
        .catch(() => {
          this.setState({ postStatus:this.props.appStore.arabic?'هناك شئ خطأ!!': 'Something went wrong!!!',pcolor:'red' })
        })

      .catch(error => {
        console.log(error)
      })


    } else {

      this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء ادخال رقم الهاتف للتواصل':"Please enter Phone number to contact",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
}


}
Submitrating = () => {
  this.setState({
    ploading:true,
    revstat: this.props.appStore.arabic?'تقييم..':'Rating..',
    shows:true,pcolor:'warning'
  })

  const refs = firebaseApp.firestore().collection('Offers').doc(this.state.data.postuid).collection('review').doc()
  const newPostKey = refs.id
if (this.state.review.length >0) {
  if (this.state.ratingnum >0) {

        const postData = {
          reviewerid:firebaseApp.auth().currentUser.uid,
          reviewername:firebaseApp.auth().currentUser.displayName,
          orderid:this.state.data.postuid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          postuid:newPostKey,
          comment:this.state.review,
          ratingnum:this.state.ratingnum
        }
        let updates = {}
        let updatess = {}

        refs.set(postData)

        .then(() => {
          this.setState({
            revstat: this.props.appStore.arabic?'شكرا لك':'Thank you',
                          ratingnum:0,
                          review:''
                        })
          setTimeout(() => {this.setState({
                          revstat: '',

                        })}, 3000)


this.setState({shows:false})
this.inc()

        })
        .catch(() => {
          this.setState({ revstat: 'Something went wrong!!!',pcolor:'red' })
        })

      .catch(error => {
        console.log(error)
      })

    } else {

      this.setState({ploading:false,  revstat: this.props.appStore.arabic?'الرجاء تقييم قبل ارسال رأيك':"Please Rating before you send your comment",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
    }, 3000)
    }
    } else {

      this.setState({ploading:false,  revstat:this.props.appStore.arabic?'الرحاء كتابة رأيك': "Please Write your comment",shows:true ,pcolor:'red'})
    setTimeout(() => {
    this.setState({shows:false})
  }, 3000)
}


}

   openPanel = () => {
       this.setState({ swipeablePanelActive: true });
   };

   closePanel = () => {
       this.setState({ swipeablePanelActive: false });
   };

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
 onBack() {
   this.setState({spinner:true})
   this.displayCategories(this.state.myuid)

     // Back from another screen
   }
   inc=async()=>{

   console.log("dssdssdsdsdsdsdsdss");


   let cityRef = firebaseApp.firestore().collection('Offers').doc(this.state.data.postuid)
                 try {
         await firebaseApp.firestore().runTransaction(async (t) => {
           const doc = await t.get(cityRef);

           // Add one person to the city population.
           // Note: this could be done without a transaction
           //       by updating the population using FieldValue.increment()
           const newPopulation = doc.data().ratingno + 1;
           t.update(cityRef, {ratingno: newPopulation});
         });

         console.log('Transaction success!');
       } catch (e) {
         console.log('Transaction failure:', e);
       }


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
ratingCompleted=(rating)=>{
  this.setState({ratingnum:rating})
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
  const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 70],
    extrapolate: 'clamp'
  });
  const profileImageHeight = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const profileImageMarginTop = this.state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5
    ],
    extrapolate: 'clamp'
  });
  const headerZindex = this.state.scrollY.interpolate({
    inputRange: [0,  0, 120],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp'
  });

  const headerTitleBottom = this.state.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        5 +
        PROFILE_IMAGE_MIN_HEIGHT +
        26
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: 'clamp'
  });
  const {navigation}=this.props
  const business = false
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
        <SCLAlert
                 theme="success"
                 show={this.state.show}
                 title={this.props.appStore.arabic?'تم بنجاح':"Success"}
                 subtitle={this.props.appStore.arabic?'تم ارسال طلبك':"Your order has been sent"}
               >
                 <SCLAlertButton theme="success" onPress={()=>{
               this.setState({show:false})}}>{this.props.appStore.arabic?'تم':'Done'}</SCLAlertButton>

               </SCLAlert>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'whitesmoke',
            height: headerHeight,
            zIndex: headerZindex,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            elevation: headerZindex, //required for android
            alignItems: 'center',
            shadowColor: '#000',
             shadowOpacity: 0.4,
             shadowRadius: 3,
             shadowOffset: {
               height: 1,
               width: 0
             },

          }}
        >
        <View style={{flex:2,justifyContent: 'center',alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>

        <Ionicons name='ios-close-circle' size={40} color="#000000"/>
        </TouchableOpacity>
        </View>

        <View style={{flex:8,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>

        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

        {this.state.data.priceav&&this.state.data.priceav?<Text style={[styles.price]}  numberOfLines={1}>{this.state.data.price} {this.state.data.curr?this.state.data.curr:'$'} /{this.state.data.priceper=='Service'?this.props.appStore.arabic?'خدمة':this.state.data.priceper:this.state.data.priceper=='Month'?this.props.appStore.arabic?'شهر':this.state.data.priceper:this.state.data.priceper=='Week'?this.props.appStore.arabic?'اسبوع':this.state.data.priceper:this.state.data.priceper=='Day'?this.props.appStore.arabic?'يوم':this.state.data.priceper:this.state.data.priceper=='Hour'?this.props.appStore.arabic?'الساعة':this.state.data.priceper:this.state.data.priceper}</Text>
        :<Text style={[styles.price]}  numberOfLines={1}>{this.props.appStore.arabic?'لايوجذ سعر معين':'No Fees'}</Text>
        }
                <Button onPress={this.openPanel} block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 20,alignSelf: 'flex-end',borderRadius: 10}}>
        <Text style={[styles.time,{color:'#fff'}]}>{this.props.appStore.arabic?'تواصل':'Contact Business'}</Text>
        </Button>
        </View>

        </View>
        </Animated.View>
<StatusBar hidden={true} />

<ScrollView style={{flex:1}}   scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}>
          <Spinner
      visible={this.state.spinner}
      textContent={this.props.appStore.arabic?'جاري التحميل..':'Loading...'}
    />
    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:this.state.data.backimg}} >
<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position: 'absolute',top: 20,left: 20,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Ionicons name='ios-close-circle' size={40} color="#000000"/>
</TouchableOpacity>
{firebaseApp.auth().currentUser.uid==(this.state.userdat&&this.state.userdat.writerId)?<TouchableOpacity onPress={()=>{
  Alert.alert(
this.props.appStore.arabic?'هل انت متاكد من حذف هذا العرض':'Are you sure you want to delete this Offer',
  this.props.appStore.arabic?'بالضغط على نعم سيتم حذف العرض نهائيا':'By clicking yes you sure you want to delete this Offer',
  [
    {text: this.props.appStore.arabic?'الغاء':'cancel', onPress: () => console.log('Ask me later pressed')},
    {text: this.props.appStore.arabic?'نعم':'Yes', onPress: ()=>{firebaseApp.firestore().collection('Offers').doc(this.state.data.postuid).delete();
 navigation.goBack()}},
  ],
  { cancelable: false }
)
}} style={{position: 'absolute',padding: 10,top: 20,right: 20,borderWidth: 0.3,justifyContent: 'center',alignItems: 'center',borderRadius: 70/2,backgroundColor: 'white',paddingHorizontal: 2}}>
<Text style={{color: 'red',fontFamily: 'raleway'}}>{this.props.appStore.arabic?'حذف':'Delete'}</Text>
</TouchableOpacity>:null}
    </ImageBackground>

    </TouchableOpacity>
      {this.state.isNavBarHidden?   <View style={{position: 'absolute',top:120,backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
           shadowOpacity: 0.4,
           shadowRadius: 3,
flex:1,
marginBottom:40,
alignSelf: 'center',
           shadowOffset: {
             height: 2,
             width: 0
           },
           //android
           elevation: 5,}}>
           <ScrollView
             contentContainerStyle={[gStyle.contentContainerss,{paddingTop: 10}]}
             style={gStyle.container[theme]}
             refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh}
                   tintColor="#eb144c"
                 />
               }
           >
<Text style={styles.Title}>{this.state.data.servicetitle}</Text>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5}}>
<View style={{flex:1,flexDirection: 'column',alignItems: 'flex-start'}}>

{this.state.data.ratingno>0?<Rating imageSize={20} readonly startingValue={this.state.avg} style={styles.rating} />:<Rating imageSize={20} readonly startingValue={0} style={styles.rating} />}
</View>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
<Button onPress={()=>this.setState({heart:!this.state.heart})} transparent style={{justifyContent: 'center',alignItems: 'center'}}>

<FontAwesome name={this.state.heart?'heart':'heart-o'} size={20} style={{marginRight: 10}} color="red"/>
</Button>
<Button onPress={this.openPanel} block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 20,alignSelf: 'flex-end',borderRadius: 10}}>
<Text style={[styles.time,{color:'#fff'}]}>{this.props.appStore.arabic?'تواصل':'Contact Business'}</Text>
</Button>
</View>
</View>
<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

{this.state.data.priceav&&this.state.data.priceav?<Text style={[styles.price]}  numberOfLines={1}>{this.state.data.price} {this.state.data.curr?this.state.data.curr:'$'} /{this.state.data.priceper=='Service'?this.props.appStore.arabic?'خدمة':this.state.data.priceper:this.state.data.priceper=='Month'?this.props.appStore.arabic?'شهر':this.state.data.priceper:this.state.data.priceper=='Week'?this.props.appStore.arabic?'اسبوع':this.state.data.priceper:this.state.data.priceper=='Day'?this.props.appStore.arabic?'يوم':this.state.data.priceper:this.state.data.priceper=='Hour'?this.props.appStore.arabic?'الساعة':this.state.data.priceper:this.state.data.priceper}</Text>
:<Text style={[styles.price]}  numberOfLines={1}>{this.props.appStore.arabic?'لايوجد سعر معين':'No Fees'}</Text>
}
</View>

</ScrollView>
            </View>:null}
            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop: 100,


        }}>

            <View style={styles.cards}>
            <View style={cstyles.head}>
      <View style={cstyles.profile}>
      <View style={cstyles.pimg}>
  {this.state.userdat.proimg&&this.state.userdat.proimg.length>0?
       <Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:this.state.userdat.proimg&&this.state.userdat.proimg.length>0?this.state.userdat.proimg:'dsfsdf'}} />
       :
       null
  }
  </View>
      <View style={cstyles.names}>
      <View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
      <Text numberOfLines={1} style={cstyles.name}>{this.state.userdat.Businessname&&this.state.userdat.Businessname.length>0?this.state.userdat.Businessname:this.state.userdat.user}</Text>
      <Text style={[styles.time,{color:this.state.userdat.verfied?'green':'red'}]}  numberOfLines={1}>{this.state.userdat.verfied?this.props.appStore.arabic?'موثق':'Verfied':this.props.appStore.arabic?'غير موثق':'Not Verfied'}</Text>

      </View>

      </View>
      </View>
      <View style={cstyles.edit}>
      <Button onPress={this.state.userdat.Businessname?()=>navigation.navigate('BusinessProfile',{carduid:this.state.userdat.postuid,card:true}):()=>navigation.navigate('Userprofile',{id:this.state.userdat.writerId})} bordered style={{borderColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 10,borderRadius: 10}}>
      <Text style={[styles.time,{color:'#eb144c'}]}>{this.props.appStore.arabic?'عرض':'View'}</Text>
      </Button>
      </View>
         </View>
            <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
<View style={{flexDirection: 'row',marginHorizontal: 10}}>
<MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
            <Text style={[styles.type,{color:'black'}]}  numberOfLines={2}>{this.state.data.daily&&this.state.data.daily.map((d)=>{if (d.selected) {
              return `${this.props.appStore.arabic?d.ar:d.day}, `
            }})}</Text>
</View>
<View style={{flexDirection: 'row',marginHorizontal: 10}}>
<MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

            <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.data.time} - {this.state.data.end}</Text>
</View>

            </View>
              </View>
            <View style={styles.cards}>
            <Text style={gStyle.det}>{this.props.appStore.arabic?'الشرح':'Description'}</Text>
              <Text style={gStyle.p}>{this.state.data.About}
          </Text>

              </View>




                  <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1,paddingHorizontal:10,width:Dimensions.get('window').width}}>
                        <Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start'}]}>{this.props.appStore.arabic?'آراء المستخدمين':'Reviews'} ({this.state.data.ratingno})</Text>

<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
<Text style={[gStyle.text[theme], gStyle.Titleleft,{alignSelf: 'flex-start',fontFamily: 'ralewaymedium',fontSize: 15}]}>{this.props.appStore.arabic?'اضف تقييمك':'SUBMIT YOUR RATING'}</Text>
<Rating imageSize={20}   onFinishRating={this.ratingCompleted}
 ratingCount={5}  startingValue={this.state.ratingnum} style={styles.rating} />

</View>
<View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

<Input value={this.state.review} onChangeText={(review)=>this.setState({review})} inputStyle={{backgroundColor: '#ffffff',padding: 10,width: '100%'}} containerStyle={{borderRadius: 12}}
placeholder={this.props.appStore.arabic?'اكتب هنا رأيك بالخدمة':"Write here your rating about service"}
/>
<TouchableOpacity onPress={this.Submitrating}>
<FontAwesome name='save' size={25} style={{marginRight: 5}} color="black"/>
</TouchableOpacity>
</View>
<List>
        {this.state.reviewsarr.length>0&&this.state.reviewsarr.map((d)=>{
          return(<ListItem >

              <Body>
                <Text style={{fontFamily: 'ralewaysemi',fontSize: 15}}>{d.reviewername}</Text>
                <Text style={{fontFamily: 'raleway',marginRight: 10}}>{d.comment}</Text>
              </Body>
              <Right>
              <Rating imageSize={15}   readonly
                startingValue={d.ratingnum} style={styles.rating} />
              </Right>
            </ListItem>)
        })  }
        </List>
                  </View>


              </View>
              </ScrollView>
              {this.state.revstat.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.revstat=='Rating..'?'green':this.state.revstat=='Thank you'?'green':'red'}}>
              <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.revstat}</Text>

              </View>:null}
            {!this.state.swipeablePanelActive  ?<Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active })}>
                <Icon name="chatbubbles"  />
          {this.state.userdat.whats?  <Button onPress={()=>{Linking.openURL(`whatsapp://send?text=${this.state.data.servicetitle}&phone=${this.state.userdat.whats}`)}} style={{ backgroundColor: '#34A34F' }}>
                  <Icon name="logo-whatsapp" />
                </Button>:null}
              { this.state.userdat.phone? <Button onPress={()=>{Linking.openURL(`tel:${this.state.userdat.phone}`)}} style={{ backgroundColor: '#3B5998' }}>
                  <Icon name="phone-call" type="Feather"/>
                </Button>:null}
              {  this.state.userdat.phone?  <Button onPress={()=>{Linking.openURL(`sms:${this.state.userdat.phone}`)}}  style={{ backgroundColor: '#DD5144' }}>
                  <Icon name="sms" type="MaterialIcons"/>
                </Button>:null}
              </Fab>:null}
              <SwipeablePanel
                       fullWidth
                       isActive={this.state.swipeablePanelActive}
                       onClose={this.closePanel}
                       showCloseButton
                       onlyLarge
                       onPressCloseButton={this.closePanel}
                   >
                   {this.state.postStatus.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: this.state.postStatus=='Booking..'?'green':this.state.postStatus=='تم النشر'?'green':'red'}}>
                   <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.postStatus}</Text>

                   </View>:null}
                                      <View style={{flex: 1,justifyContent: 'center',paddingVertical: 30,width:Dimensions.get('window').width,paddingHorizontal: 20,paddingBottom: 30}}>
            <ScrollView>
<Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'تأكيد الطلب':'Booking confirmation'}</Text>


<Form style={{width:'100%' }}>
<Label style={{fontFamily: 'ralewaysemi',marginTop:  10,fontSize: 15,color: '#eb144c'}}>
{this.props.appStore.arabic?'رقم هاتف للتواصل':'Phone number to contact'}:
</Label>
<Input keyboardType = 'numeric' value={this.state.phoneto} onChangeText={(phoneto)=>this.setState({phoneto})} inputStyle={{backgroundColor: '#ffffff',padding: 10,width: '100%'}} containerStyle={{borderRadius: 12}}
  placeholder={"+13235334433"}
/>
<Label style={{fontFamily: 'ralewaysemi',marginTop:  10,fontSize: 15,color: '#eb144c'}}>
{this.props.appStore.arabic?'عنوان الخدمة':'Location of service'}:
</Label>
<Input value={this.state.locto} onChangeText={(locto)=>this.setState({locto})} inputStyle={{backgroundColor: '#ffffff',padding: 10,width: '100%'}} containerStyle={{borderRadius: 12}}
  placeholder={this.props.appStore.arabic?'مثال شارع 343..':"e.g: 245 Streets.."}
/>
<Label style={{fontFamily: 'ralewaysemi',marginTop:  10,fontSize: 15,color: '#eb144c'}}>
{this.props.appStore.arabic?'تفاصيل وملاحظات':'Notes & Details'}
</Label>

            <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.noteto} onChangeText={(noteto)=>this.setState({noteto})} bordered placeholder={this.props.appStore.arabic?'اريد من هذا العرض..':"I need this offer.."} />
          </Form>
          <View style={{borderWidth: 0.5,borderRadius: 9,padding: 15,marginVertical: 10,borderColor: '#000000',justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{fontFamily: 'ralewaysemi',fontSize: 15,color: '#eb144c'}}>{this.props.appStore.arabic?'مراجعة الطلب':'Order Preview'}</Text>
          <View style={{flex:1,flexDirection: 'row'}}>
  <FontAwesome name='dollar' size={15} style={{marginRight: 5}} color="black"/>
          <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.state.data.price} {this.state.data.curr?this.state.data.curr:'$'} /{this.state.data.priceper=='Service'?this.props.appStore.arabic?'خدمة':this.state.data.priceper:this.state.data.priceper=='Month'?this.props.appStore.arabic?'شهر':this.state.data.priceper:this.state.data.priceper=='Week'?this.props.appStore.arabic?'اسبوع':this.state.data.priceper:this.state.data.priceper=='Day'?this.props.appStore.arabic?'يوم':this.state.data.priceper:this.state.data.priceper=='Hour'?this.props.appStore.arabic?'الساعة':this.state.data.priceper:this.state.data.priceper}</Text>
          </View>
          <View style={{flex:1,flexDirection: 'row'}}>
  <MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.props.appStore.arabic?this.state.data.catar:this.state.data.Categories} /{this.state.data.type=='local'?this.props.appStore.arabic?'محلي':'Local':this.state.data.type=='talent'?this.props.appStore.arabic?'مواهب':'Talent':this.state.data.type=='online'?this.props.appStore.arabic?'اونلاين':'Online':this.state.data.type}</Text>
          </View>

          <View style={{flex:1,flexDirection: 'row'}}>
  <MaterialIcons name='location-on' size={15} style={{marginRight: 5}} color="black"/>
  <Text style={{fontFamily: 'ralewaymedium',fontSize: 15}}>{this.state.locto}</Text>
          </View>

          </View>
          <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: 'red'}]}>{this.state.postStatus}</Text>

          <Button onPress={this.booking} block style={{borderRadius: 9,justifyContent: 'center',alignItems: 'center',padding: 20,backgroundColor: '#eb144c'}}>
          <Text style={{fontFamily: 'ralewaymedium',fontSize: 15,color: '#fff'}}>{this.props.appStore.arabic?'تأكيد الطلب':'Confirm Booking'}</Text>

          </Button>
                 </ScrollView>

                 </View>
                 {this.state.postStatus.length>0?<View style={{height: 50,width:Dimensions.get('window').width,backgroundColor: (this.state.postStatus=='Booking..'||this.state.postStatus=='طلب..')?'green':(this.state.postStatus=='تم النشر'||this.state.postStatus=='Done, Thank you')?'green':'red'}}>
                 <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'flex-start',marginHorizontal: 20,fontFamily: 'cairoreg',color: '#FFF'}]}>{this.state.postStatus}</Text>

                 </View>:null}
            </SwipeablePanel>
    </View>
  )}

</ThemeContext.Consumer>
  )
}

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
  map: {
    width:Dimensions.get('window').width-30,
    height: 200
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: "red"
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
  Title:{
    fontFamily: 'ralewaysemi',
    fontSize: 21,
    textAlign: 'left'
  },
  time:{
    fontFamily: 'ralewaymedium',
    fontSize: 12,
    color:'green',
    textAlign: 'left',
    marginHorizontal: 2
  },
  times:{
    fontFamily: 'ralewaymedium',
    fontSize: 12,
    color:'black',
    marginHorizontal: 2
  },
  price:{
    fontFamily: 'ralewaysemi',
    fontSize: 15,
    color:'black',
marginRight: 5
  },
  type:{
    fontFamily: 'raleway',
    fontSize: 12,
    color:'#eb144c',
    textAlign: 'left',
  },
  cards:{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 3,
  paddingVertical: 20,
  flex:1,
  marginTop: 20,
  alignSelf: 'center',
    shadowOffset: {
      height: 1,
      width: 0
    },


    alignItems: 'center',
    justifyContent: 'flex-start',
    //android
    elevation: 2},
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
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width/2

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
const cstyles = StyleSheet.create({
head:{
  flex:1,
  flexDirection: 'row',
},
profile:{
  flex:8,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:2,

  justifyContent: 'center',
  alignItems: 'center'
},
edits:{
  flex:2,

  justifyContent: 'center',
  alignItems: 'flex-end'
},
pimg:{
  flex:3,


},
footericon:{
  flex:8,

  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'row'
},
iconname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',

  alignItems: 'center'
},
likesname:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'flex-start',

  alignItems: 'center'
},
names:{
  flex:8,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
padding: 10,
  flexDirection: 'column'
},
body:{
  paddingVertical: 20,
  flex:1,

},
likes:{
  color:'red',
  marginHorizontal: 10
},
comment:{
  color:'black',
    marginHorizontal: 10
},
name:{
  fontFamily: 'ralewaysemi',
  marginVertical: 2
},
time:{
  fontFamily: 'ralewaymedium',
  fontSize: 12
},
image:{
  width: '100%',
  height: 200,
  resizeMode: 'contain',
  flex:1,
  borderRadius: 40,
  marginTop: 10
}
});
export default Offerview;
