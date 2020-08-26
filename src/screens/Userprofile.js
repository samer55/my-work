import React from 'react';
import { Image, StatusBar,Text,ImageBackground, View,Animated, ScrollView, Dimensions,StyleSheet,ActivityIndicator,TouchableOpacity,Linking,RefreshControl,Share as Shared } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import { Thumbnail,Button,Header,Item,Input ,Left,Right,Body,Title,Icon,Footer, FooterTab} from 'native-base';
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
import {  Tab, Tabs } from 'native-base';
import Services from './Services'
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
const HEADER_MAX_HEIGHT = 0;
const HEADER_MIN_HEIGHT = 0;
const PROFILE_IMAGE_MAX_HEIGHT = 0;
const PROFILE_IMAGE_MIN_HEIGHT = 0;

import moment from 'moment';

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
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,secret:'',
      status:'',
      isDatePickerVisible: false,
      code:'',
      dataArray: [],
      setDatePickerVisibility: false,
      myuid:'',
      createdAt:'',
      loading: false,
           region: {
             latitude:32.5534246,
             longitude:35.8610753,
             latitudeDelta: 0.001,
             longitudeDelta: 0.001
           },
  data:  props.navigation.getParam('id',''),
           isNavBarHidden: true,
           isMapReady: false,
           marginTop: 1,
           userLocation: "",
           regionChangeProgress: false,
       refreshing: false,
      myusername:'',
       offset: 0,
       scrollY: new Animated.Value(0)
,
career:'',
typeofservice:'',
nooflike:[],
country:'',
fav:false,
user:'',
address:'',
bio:'',
position:'',
day:[],
time:'',
end:'',
phone:'',
web:'',
writerId:'',
coverimg:'',
mail:'',
facebook:'',
instagram:'',
twitter:'',
linkedin:'',
accept:false,
youtube:'',
postsarr:[],
      posts:[],
      verfied:false,
heart:false,
      Duration:'popular',
      disabled:false,
      check:false,
      careerar:'',
      Additional: '-------------',
      businessarr:[],
      spinner:false,
      friend:false,
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
    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.firestore().collection('Services').where('writerId','==',this.state.data).onSnapshot(this.byme)

  }
  byme = (querySnapshot) => {
    const boards = [];

    querySnapshot.forEach((doc) => {
      boards.push(doc.data());

    });

  this.setState({dataArray: Object.values(boards)});
}
postfun = (querySnapshot) => {
     const boards = [];

     querySnapshot.forEach((doc) => {
       boards.push(doc.data());

     });

   this.setState({postsarr: Object.values(boards),refreshing:false});
   }
 busfun = (querySnapshot) => {
      const boards = [];

      querySnapshot.forEach((doc) => {
        boards.push(doc.data());

      });

    this.setState({businessarr: Object.values(boards)});
    }
  displaynblog = (d) => {
    this.setState({refreshing:true})

    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.database().ref(`Posts`).orderByChild("writerId").equalTo(uid).once('value').then(snapshot => {
        // console.log(snapshot.val());
         // get children as an array
         console.log("--------");

         var items = [];
         snapshot.forEach((child) => {
           console.log(child.val().writerId);
           items.push(child.val());
        });

    let sort =items



  this.setState({ postsarr: Object.values(sort),spinner:false,refreshing:false});

    });
  }

  displayBusiness = (d) => {
    this.setState({refreshing:true})

    let uid =firebaseApp.auth().currentUser.uid

    firebaseApp.database().ref(`Business`).orderByChild("writerId").equalTo(uid).once('value').then(snapshot => {
        // console.log(snapshot.val());
         // get children as an array
         console.log("--------");

         var items = [];
         snapshot.forEach((child) => {
           console.log(child.val().writerId);
           items.push(child.val());
        });

    let sort =items



  this.setState({ businessarr: Object.values(sort),spinner:false,refreshing:false});

    });
  }


   handleScroll = (event) => {
     var currentOffset = event.nativeEvent.contentOffset.y;
          var direction = currentOffset > this.state.offset ? 'down' : 'up';
      this.state.offset = currentOffset;
     this.setState({ isNavBarHidden:this.state.offset===0?this.state.isNavBarHidden:!this.state.isNavBarHidden});
   };
   onCollectionUpdate = (querySnapshot) => {
     const boards = [];

     this.setState({
       career:querySnapshot.data().career,
       typeofservice:querySnapshot.data().typeofservice,
       country:querySnapshot.data().country,
       user:querySnapshot.data().user,
       address:querySnapshot.data().address,
       bio:querySnapshot.data().bio,
       nooflike:querySnapshot.data().nooflike,
       position:querySnapshot.data().position,
       proimg:querySnapshot.data().proimg,
       day:querySnapshot.data().day,
       time:querySnapshot.data().time,
       createdAt:querySnapshot.data().createdAt,
       end:querySnapshot.data().end,
       phone:querySnapshot.data().phone,
       accept:querySnapshot.data().accept,
       web:querySnapshot.data().web,
       coverimg:querySnapshot.data().coverimg,
       verfied:querySnapshot.data().verfied,
careerar:querySnapshot.data().careerar,
       mail:querySnapshot.data().mail,
       writerId:querySnapshot.data().writerId,
       facebook:querySnapshot.data().facebook,
       instagram:querySnapshot.data().instagram,
       twitter:querySnapshot.data().twitter,
       linkedin:querySnapshot.data().linkedin,
       youtube:querySnapshot.data().youtube,
     })


   }
  DisplayPosts = (d) => {

    firebaseApp.firestore().collection('profiles').doc(this.state.data).onSnapshot(this.onCollectionUpdate)

  }


componentWillMount(){


}
  componentDidMount() {
    let uid =firebaseApp.auth().currentUser.uid
    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data).get()
.then((docSnapshot) => {
if (docSnapshot.exists) {
this.setState({friend:true})

} else {
this.setState({friend:false})
}
});
  this.DisplayPosts()
  this.displayCategories()
  firebaseApp.firestore().collection('Business').where('writerId','==',this.state.data).onSnapshot(this.busfun)
  firebaseApp.firestore().collection('Posts').where('writerId','==',this.state.data).onSnapshot(this.postfun)

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
    this.setState({ date: moment(date).format('MMM Do YY') });

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
  isInArray=(d, userEmail)=> {
    if (d.length>0) {
      var idx= d.indexOf(userEmail);
      if (idx === -1) {
      return  false
      }else {
      return  true
      }

    }else {
      return false
    }
    }
    onUnlike = (data,d,liked) => {
      let idx =liked.indexOf(firebaseApp.auth().currentUser.uid)
      liked.splice(idx, 1)
      firebaseApp.firestore().collection('Posts').doc(data.postuid).update({nooflike:liked})

      //this.delnotification(data.writerId,data.postuid,data.post)


   };
  onLike = (data,d,liked) => {
    liked.push(firebaseApp.auth().currentUser.uid)
    firebaseApp.firestore().collection('Posts').doc(data.postuid).update({nooflike:liked})
const newPostKey = firebaseApp.database().ref('like').push().key
this.notificationss(data.writerId,data.postuid,data.post)

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
     headings: {"en": `${firebaseApp.auth().currentUser.displayName} Liked your post`,"ar":`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك`},
     android_sound: "fishing",
     data: {"puid": newPostKey, "new_message":true},
     ios_sound: "fishing.caf",
     contents: {"en": `${firebaseApp.auth().currentUser.displayName} Liked your post: ${data.post}`,"ar":`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك: ${data.post}` },
filters: [{"field":"tag","key":"uid","relation":"=","value":data.writerId}],
   })
 })


   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
};
notificationss=(d,notkey,post)=>{
  const newPostKey = firebaseApp.database().ref('like').push().key
  firebaseApp.firestore().collection('notification').doc(d).collection('List').doc().set({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} Liked your post: ${post}`,
      notiar:`${firebaseApp.auth().currentUser.displayName} اعجب بمنشورك: ${post}`,

      postuid:notkey,
      type:'like',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
  })


}
follownot=()=>{
  const newPostKey = firebaseApp.database().ref('like').push().key
  firebaseApp.firestore().collection('notification').doc(this.state.data).collection('List').doc().set({
      username:firebaseApp.auth().currentUser.displayName,
      noti:`${firebaseApp.auth().currentUser.displayName} Started Following you`,
      notiar:`${firebaseApp.auth().currentUser.displayName} قام بمتابعتك`,

      postuid:firebaseApp.auth().currentUser.uid,
      type:'like',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
     updatedAt:firebase.firestore.FieldValue.serverTimestamp(),
  })


}
accepts=async()=>{
this.setState({loading:true})
firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data).set({uid:this.state.data,name:this.state.user,category:this.state.career,type:'user'})

let cityRef = firebaseApp.firestore().collection('profiles').doc(this.state.writerId)
            try {
    await firebaseApp.firestore().runTransaction(async (t) => {
      const doc = await t.get(cityRef);

      // Add one person to the city population.
      // Note: this could be done without a transaction
      //       by updating the population using FieldValue.increment()
      const newPopulation = doc.data().nofollowers?doc.data().nofollowers + 1:1;

      t.update(cityRef, {nofollowers: newPopulation});
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }

  await    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data).get()
  .then((docSnapshot) => {
  if (docSnapshot.exists) {
  this.setState({friend:true,loading:false})

  } else {
  this.setState({friend:false,loading:false})
  }
  });
  this.follownot()

                     fetch('https://onesignal.com/api/v1/notifications',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Basic NWZZmVkNGUtNjNmNC00NGFjLTkwOWUtYTc5NzZhMzg3ZTky",
        },
        body: JSON.stringify(
        {
          app_id: "45117f3a-d813-446a-b656-164bab41bf51",
          included_segments: ["All"],
          headings: {"en": "Follow"},
          android_sound: "fishing",
          data: {"puid": newPostKey, "new_message":true},
          ios_sound: "fishing.caf",
          contents: {"en": firebaseApp.auth().currentUser.displayName +"Started to follow you" },
       filters: [{"field":"tag","key":"uid","relation":"=","value":this.state.data.postuid}],
     })
   })

   .then((responseData) => {
       console.log("Push POST:" + JSON.stringify(responseData));
       responseData.json()
   })
        //this.notifications(this.state.data.postuid)

 }

 fav = () => {
   let  liked = this.state.nooflike ? Object.values(this.state.nooflike) : [];

  liked.push(firebaseApp.auth().currentUser.uid)

   firebaseApp.firestore().collection('profiles').doc(this.state.writerId).update({nooflike:liked})
   this.setState({fav:true})

};
unfav = () => {
  let  liked = this.state.nooflike ? Object.values(this.state.nooflike) : [];

  let idx =liked.indexOf(firebaseApp.auth().currentUser.uid)
  liked.splice(idx, 1)
  firebaseApp.firestore().collection('profiles').doc(this.state.writerId).update({nooflike:liked})

  this.setState({fav:false})

};
 unfollow=async()=>{

   this.setState({loading:true})


   firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data).delete()
   let cityRef = firebaseApp.firestore().collection('profiles').doc(this.state.writerId)
                 try {
         await firebaseApp.firestore().runTransaction(async (t) => {
           const doc = await t.get(cityRef);

           // Add one person to the city population.
           // Note: this could be done without a transaction
           //       by updating the population using FieldValue.increment()
           const newPopulation = doc.data().nofollowers - 1;
           t.update(cityRef, {nofollowers: newPopulation});
         });

         console.log('Transaction success!');
       } catch (e) {
         console.log('Transaction failure:', e);
       }
       await    firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).collection('follows').doc(this.state.data).get()
       .then((docSnapshot) => {
       if (docSnapshot.exists) {
       this.setState({friend:true,loading:false})

       } else {
       this.setState({friend:false,loading:false})
       }
       });

  }

   sharesocial= async () => {

     try {
       const result = await Shared.share({
         message: this.props.appStore.arabic?`
تابعني على تطبيق فكرة
اسمي : ${this.state.user}
اعمل في ${this.state.careerar}

لتحميل التطبيق:
https://play.google.com/store/apps/details?id=com.opentiq.fekra

         `:`
        Follow me in Fekra App
My name is ${this.state.user}
I Work in ${this.state.career}

      To install the app click on the link bellow:
         https://play.google.com/store/apps/details?id=com.opentiq.fekra
`,
       });

       if (result.action === Shared.sharedAction) {
         if (result.activityType) {
           // shared with activity type of result.activityType
         } else {
           // shared
         }
       } else if (result.action === Shared.dismissedAction) {
         // dismissed
       }
     } catch (error) {
       alert(error.message);
     }
   }
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
let datec = this.state.createdAt
  const {navigation}=this.props
  const business = false
  let userEmail = firebaseApp.auth().currentUser.uid;
  let  liked = this.state.nooflike ? Object.values(this.state.nooflike) : [];
  return (
    <ThemeContext.Consumer>
      {theme => (
        <View style={{flex:1}}>
<StatusBar hidden={true} />
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

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

<Button onPress={!this.state.friend?this.accepts:this.unfollow} block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 15,alignSelf: 'flex-end',borderRadius: 10,marginHorizontal: 10}}>
{this.state.loading?<ActivityIndicator color="#fff"/>:<Text style={[styles.time,{color:'#fff'}]}>{this.state.friend?this.props.appStore.arabic?'الغاء المتابعة':'Unfollow':this.props.appStore.arabic?'متابعة':'Follow'}</Text>}
</Button>
</View>

</View>
</Animated.View>
  <ScrollView   scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
            ])} >


    <TouchableOpacity style={styless.slide1} >
    <ImageBackground style={{width: Dimensions.get('window').width,flex:1}} source={{uri:this.state.coverimg.length>0?this.state.coverimg:'https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg'}} >
    <View style={{position: 'absolute',top: 0,height: 50,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width:Dimensions.get('window').width,backgroundColor: 'rgba(0,0,0,0)',paddingHorizontal: 20}}>
    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{justifyContent: 'center',alignItems: 'center',paddingHorizontal: 2,backgroundColor: 'rgba(0,0,0,0.2)',borderRadius: 100/2,paddingHorizontal: 10}}>
    <Ionicons name='ios-close' size={40} color="#fff"/>
    </TouchableOpacity>
    <View style={{flexDirection: 'row',justifyContent: 'space-around',alignSelf: 'center'}}>
    <TouchableOpacity onPress={this.isInArray(liked, userEmail)?this.unfav:this.fav} style={{padding: 7,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0,0,0,0.2)',borderRadius: 100/2,paddingHorizontal: 10,marginRight: 10}}>

    <FontAwesome name={this.isInArray(liked, userEmail)?'heart':'heart-o'} size={20}  color={this.state.heart?'red':'#fff'}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.sharesocial} style={{justifyContent: 'center',alignItems: 'center',padding: 7,backgroundColor: 'rgba(0,0,0,0.2)',borderRadius: 100/2,paddingHorizontal: 10}}>
    <FontAwesome name='share-alt' size={25} color="#fff"/>
    </TouchableOpacity>
    </View>
    </View>
    </ImageBackground>

    </TouchableOpacity>
    <View style={[styles.cards,{position: 'absolute',top:90,marginTop: 0}]}>
    <View style={cstyles.head}>
<View style={[cstyles.profile]}>
<View style={cstyles.pimg}>
<Thumbnail   borderRadius={9} style={{borderRadius: 9,width: '100%'}} source={{uri:this.state.proimg}} />
</View>
<View style={cstyles.names}>
<View style={{flexDirection: 'column',alignItems: 'flex-start'}}>
<Text numberOfLines={2} style={cstyles.name}>{this.state.user}</Text>
<View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width: '100%'}}>
{this.state.verfied?<MaterialIcons name='verified-user' size={15} style={{marginRight: 5}} color="green"/>
:null}<View style={{flexDirection: 'row'}}>
<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>

<Text style={[styles.time,{color:'#000000',fontFamily: 'ralewaysemi',fontSize: 15}]}  numberOfLines={1}>{this.props.appStore.arabic?this.state.careerar:this.state.career}</Text>
</View>
</View>

</View>
</View>
</View>
</View>
    <View style={[cstyles.head]}>
<View style={[cstyles.profile,{flex:1,flexDirection: 'column',justifyContent: 'center',borderRightWidth: 0.5}]}>
{/**/}
<View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
<MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
<Text style={[styles.type,{color:'black',fontFamily: 'raleway'}]}  numberOfLines={3}>{this.state.day.map((d)=>{if (d.selected) {
  return `${this.props.appStore.arabic?d.ar:d.day}, `
}})}</Text>
</View>
<View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5,justifyContent: 'flex-start'}}>
<MaterialIcons name='access-time' size={15} style={{marginRight: 5}} color="black"/>

<Text style={[styles.type,{color:'black',textAlign: 'left',fontFamily: 'raleway'}]}  numberOfLines={1}>{this.state.time} - {this.state.end}</Text>
</View>
{/**/}
</View>
<View style={[cstyles.edit,{flex:1,alignItems: 'center'}]}>
<View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
<MaterialIcons name='today' size={15} style={{marginRight: 5}} color="black"/>
<Text style={[styles.type,{color:'black',fontFamily: 'ralewaysemi'}]}  numberOfLines={3}>{this.props.appStore.arabic?'عضو منذ':'Member since'}</Text>
</View>
<View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>

<Text style={[styles.type,{color:'black',textAlign: 'left',fontFamily: 'raleway'}]}  numberOfLines={1}>{datec?datec.toDate().toString():''}</Text>
</View>
<Button onPress={!this.state.friend?this.accepts:this.unfollow} block style={{backgroundColor: '#eb144c',justifyContent: 'center',alignItems: 'center',padding: 15,alignSelf: 'center',borderRadius: 10}}>
{this.state.loading?<ActivityIndicator color="#fff"/>:<Text style={[styles.time,{color:'#fff'}]}>{this.state.friend?this.props.appStore.arabic?'الغاء المتابعة':'Unfollow':this.props.appStore.arabic?'متابعة':'Follow'}</Text>}
</Button>
</View>
    </View>

      </View>

            {/*start of details*/}
            <View style={{
          flex:1,
          marginTop:140,


        }}>


            <View style={{backgroundColor: 'white',width: Dimensions.get('window').width-20,paddingHorizontal: 20,borderRadius: 9,  shadowColor: '#000',
                 shadowOpacity: 0.4,
                 shadowRadius: 3,
          flex:1,
marginTop: 10,
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
                 <Text style={gStyle.det}>{this.props.appStore.arabic?'تواصل':'Contact'}</Text>

          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',alignSelf: 'flex-start',marginVertical: 5,width: '100%',marginHorizontal: 10}}>

          {business?<MaterialIcons name='business-center' size={15} style={{marginRight: 5}} color="black"/>:<FontAwesome name='map-marker' size={15} style={{marginRight: 5}} color="green"/>}
          {business?<Text style={styles.times}  numberOfLines={1}>dsfsdfdsf</Text>:
          <Text style={styles.time}  numberOfLines={1}>{this.state.address}</Text>
          }

          </View>
          <View style={{flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>

          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <MaterialIcons name='phone' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.phone}</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <FontAwesome name='globe' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.web}</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10,marginVertical: 5}}>
          <Ionicons name='ios-mail' size={15} style={{marginRight: 5}} color="black"/>

          <Text style={[styles.type,{color:'black',textAlign: 'left'}]}  numberOfLines={1}>{this.state.mail}</Text>
          </View>

          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around',alignSelf: 'flex-start',marginVertical: 5,width: '100%'}}>
  {this.state.facebook&&this.state.facebook.length>0? <TouchableOpacity onPress={()=> Linking.openURL(`fb://facewebmodal/f?href=${this.state.facebook}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='facebook-square'  size={20} style={{marginRight: 5}} color="blue"/>

</TouchableOpacity>:null}
        {this.state.instagram&&this.state.instagram.length>0?   <TouchableOpacity onPress={()=> Linking.openURL(`instagram://user?username=${this.state.instagram}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
          <FontAwesome name='instagram' size={20} style={{marginRight: 5}} color="#eb144c"/>
          </TouchableOpacity>:null}
        {this.state.twitter&&this.state.twitter.length>0?      <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.twitter}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>
    <FontAwesome name='twitter' size={20} style={{marginRight: 5}} color="#1DA1F2"/>

          </TouchableOpacity>:null}
            {this.state.linkedin&&this.state.linkedin.length>0?  <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.linkedin}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='linkedin-square' size={20} style={{marginRight: 5}} color="#0e76a8"/>

          </TouchableOpacity>:null}
      {this.state.youtube&&this.state.youtube.length>0?    <TouchableOpacity onPress={()=> Linking.openURL(`${this.state.youtube}`)} style={{backgroundColor: '#fff',flexDirection: 'row',alignItems: 'center'}}>

          <FontAwesome name='youtube' size={20} style={{marginRight: 5}} color="red"/>

          </TouchableOpacity>:null}

          </View>

          </View>

          </ScrollView>

                  </View>
            <View style={styles.cards}>
            <Text style={gStyle.det}>{this.props.appStore.arabic?'حول':'ِAbout'}</Text>
              <Text style={gStyle.p}>{this.state.bio}
          </Text>
          <Text style={gStyle.p}><Text style={[gStyle.p,{fontFamily: 'ralewaysemi',fontSize: 15,marginVertical: 0}]}>{this.state.position}</Text></Text>

              </View>
              <View style={styles.cards}>
              <Text style={[gStyle.det,{
                color:'#eb144c'
              }]}>{this.props.appStore.arabic?'أعمال وخدمات':'Business & Services'}</Text>

              <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
                    <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'خدمات':'Services'}</Text>
                  {/*  <Button transparent style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={[{color:'#eb144c'}]}>View all</Text>
                    </Button>*/}

              </View>
              <ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} dataset={this.state.dataArray} type="service"/>
              </View>
              <View style={{marginVertical: 3,flexDirection: 'column',paddingVertical: 10,flex:1}}>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingRight: 10}}>
                    <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'أعمال':'Business'}</Text>
                    {/*<Button transparent style={{justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={[{color:'#eb144c'}]}>View all</Text>
                    </Button>*/}

              </View>
              <ShowScroller arabic={this.props.appStore.arabic} navigation={this.props.navigation} dataset={this.state.businessarr} type="company" />
              </View>

                </View>



                    <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',paddingHorizontal: 20}}>
                          <Text style={[gStyle.text[theme], gStyle.Titleleft]}>{this.props.appStore.arabic?'منشورات':'Posts'}</Text>


                    </View>

{this.state.postsarr.map((d)=>{
  let userEmail = firebaseApp.auth().currentUser.uid;
  let  liked = d.nooflike ? Object.values(d.nooflike) : [];

  return(
    <Card
navigation={this.props.navigation}
      image={require('../assets/logo.png')}
      pimg={{uri:d.proimg}}
data={d}
arabic={this.props.appStore.arabic}
onLike={this.isInArray(liked, userEmail)?()=>this.onUnlike(d,'likedby',liked):()=>this.onLike(d,'likedby',liked)}
heartname={this.isInArray(liked, userEmail)?'heart':'heart-outline'}
      show={false}
      body={d.post}
name={d.user}

    />
  )
})}

              </View>
</ScrollView>
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
    fontSize: 17,
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
  flex:7,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
},
edit:{
  flex:3,

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
export default Userprofile;
