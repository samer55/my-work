import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,ImageBackground,TouchableHighlight,PixelRatio,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea} from 'native-base';
import RNPicker from "rn-modal-picker";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

const { width } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
const headerImage = __DEV__ ? 'rabbitDev' : 'rabbitProd';
import Carousel from '../components/carousel';
import Avatar from '../components/avatar/Avatar';
import Team from '../components/teamimage';
import Feature from '../components/feature';
import Membership from '../components/Membership';
import Gallery from '../components/Gallery';
import Door from '../components/Door';
import FeaturedTile from '../components/tile/FeaturedTile';
import ClassCarousel from '../components/ClassCarousel';
import { Input } from 'react-native-elements';

import { Button,Header,Item,Icon,Label,Title } from 'native-base';
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
const NORTH_AMERICA = ['CA', 'MX', 'US']

var itemsservice = [
  //name key is must.It is to show the text in front
  { id: 1, name: 'angellist' },
  { id: 2, name: 'codepen' },
  { id: 3, name: 'envelope' },
  { id: 4, name: 'etsy' },
  { id: 5, name: 'facebook' },
  { id: 6, name: 'foursquare' },
  { id: 7, name: 'github-alt' },
  { id: 8, name: 'github' },
  { id: 9, name: 'gitlab' },
  { id: 10, name: 'instagram' },
];
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import NavigationBack from '../components/NavigationBack';
const colors = [

'red',
'steelblue',
'yellow',
'purple',
'black'
];
const weekdays = [


];
async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref(firebaseApp.auth().currentUser.uid)
    .child(firebaseApp.auth().currentUser.uid);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
async function uploadImageAsync1(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebaseApp
    .storage()
    .ref()
    .child(firebaseApp.auth().currentUser.uid);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

import { MaterialCommunityIcons } from '@expo/vector-icons';
const daily = [

  {day:'Saturday',selected:false},
  {day:'Sunday',selected:false},
  {day:'Monday',selected:false},
  {day:'Tuesday',selected:true},
  {day:'Wednesday',selected:false},
  {day:'Thursday',selected:false},
  {day:'Friday',selected:false},


];
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class extends React.Component {

  constructor(props) {
    super(props);
  const  cca2 = 'United State'
   const  callingCode = '1'
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
        cca2:'Jordan',
      callingCode:'1',
page:1,
game:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        coverimg:'',
        uploadingcover:false,
        typeofservice:'local',
        hatemsg:'',
        profileimg:firebaseApp.auth().currentUser.photoURL,
         serverData: [],
        lie:'',
        daily:[

          {day:'Saturday',selected:false,ar:'سبت'},
          {day:'Sunday',selected:false,ar:'احد'},
          {day:'Monday',selected:false,ar:'اثنين'},
          {day:'Tuesday',selected:true,ar:'ثلاثاء'},
          {day:'Wednesday',selected:false,ar:'اربعاء'},
          {day:'Thursday',selected:false,ar:'خميس'},
          {day:'Friday',selected:false,ar:'جمعة'},


        ],
        Online: [
     {
       id: 1,
       name: "Graphic & Design"
       ,ar:'التصميم الجرافيكي'
     },
     {
       id: 2,
       name: "Digital Marketing"
       ,ar:'تسويق الكتروني'
     },
     {
       id: 3,
       name: "Writing & Translation"
       ,ar:'ترجمة وكتابة'
     },
     {
       id: 4,
       name: "Video & Animation"
       ,ar:'فيديو وانيميشن'
     },
     {
       id: 5,
       name: "Music & Audio"
       ,ar:'الموسيقى والصوت'
     },
     {
       id: 6,
       name: "Programming & Tech"
       ,ar:'برمجة وتقنية'
     },
     {
       id: 7,
       name: "Business"
       ,ar:'اعمال'
     },
     {
       id: 8,
       name: "Lifestyle"
       ,ar:'أسلوب الحياة'
     },
     {
       id: 9,
       name: "Gaming"
       ,ar:'العاب'
     },
     {
       id: 10,
       name: "E-commerce"
       ,ar:'تجارة الكترونية'
     },
     {
       id: 11,
       name: "Book & Ebook Publishing"
       ,ar:'نشر الكتب '
     },
     {
       id: 12,
       name: "PodCasting"
       ,ar:'بودكاستينغ'
     },
     {
       id: 13,
       name: "Potical Campaigns"
       ,ar:'الحملات السياسية'
     },
     {
       id: 14,
       name: "Influencers"
       ,ar:'المؤثرون'
     }
    ],
   dataSource: [
{
  id: 1,
  name: "Baby sitting"
  ,ar:'جليس اطفال'
},
{
  id: 2,
  name: "Barber",ar:'حلاق'
},
{
  id: 3,
  name: "Beachbody On Demand",ar:'تهيئة الجسم على الشاطئ'
},
{
  id: 4,
  name: "Beauty Services",ar:'خدمات تجميلية'
},
{
  id: 5,
  name: "Car repair",ar:'اصلاح السيارات'
},
{
  id: 6,
  name: "Car Wash",ar:'غسيل السيارات'
},
{
  id: 7,
  name: "Carpenter",ar:'النجار'
},
{
  id: 8,
  name: "Carpet Repairer",ar:'تصليح السجاد'
},
{
  id: 9,
  name: "DJ",ar:'DJ'
},
{
  id: 10,
  name: "Computer Repairer",ar:'مصلح كمبيوتر'
},
{
  id: 11,
  name: "Catering",ar:'تقديم الطعام'
},
{
  id: 12,
  name: "Doctors",ar:'طبيب'
},
{
  id: 13,
  name: "Dog Grooming",ar:'تهذيب الكلاب'
},
{
  id: 14,
  name: "Dog Walking",ar:'المشي مع الكلاب'
},
{
  id: 15,
  name: "Electricians",ar:'كهربائي'
},
{
  id: 16,
  name: "firebase Fighters",ar:'اطفاء الحريق'
},
{
  id: 17,
  name: "Fitness Coach",ar:'مدرب اللياقة البدنيةي'
},
{
  id: 18,
  name: "Helpers",ar:'مساعد'
},
{
  id: 19,
  name: "Home Cleaning",ar:'تنظيف المنزل'
},
{
  id: 20,
  name: "Home Painting",ar:'دهان المنزل'
},
{
  id: 21,
  name: "Insurance Agent",ar:'عامل تأمين'
},
{
  id: 22,
  name: "Interior Decorator",ar:'مهندس ديكور'
},
{
  id: 23,
  name: "Lawn Care",ar:'رعاية الحديقة'
},
{
  id: 24,
  name: "Lawn Mowing",ar:'القص في الحديقة'
},
{
  id: 25,
  name: "Lawyers",ar:'محامي'
},
{
  id: 26,
  name: "Lock Smith",ar:'صانع ومصلح الأقفال'
},
{
  id: 27,
  name: "Maids",ar:'الخادمات'
},
{
  id: 28,
  name: "Massage",ar:'مساج'
},
{
  id: 29,
  name: "Mechanic",ar:'ميكانيكي'
},
{
  id: 30,
  name: "Mobile Technician",ar:'تقني هاتف'
},
{
  id: 31,
  name: "Office Cleaning",ar:'تنظيف المكاتب'
},
{
  id: 32,
  name: "Party Cleaning",ar:'تنظيف الحفلة'
},
{
  id: 33,
  name: "Pest Control",ar:'مكافحة الحشرات'
},
{
  id:34,
  name: "Physiotharaphy Services",ar:'خدمات العلاج الطبيعي'
},
{
  id: 35,
  name: "Tutor / Teacher",ar:'مدرب / مدرس / تدريس او تعليم'
},
{
  id: 36,
  name: "Psychologists",ar:'عالم نفسي'
},
{
  id: 37,
  name: "Road Assistance",ar:'المساعدة على الطرق'
},
{
  id: 38,
  name: "Security Guard",ar:'حارس أمن'
},
{
  id: 39,
  name: "Snow Plows",ar:'الثلوج المحاريث'
},
{
  id: 40,
  name: "Sofa Repair",ar:'إصلاح الأريكة'
},
{
  id: 41,
  name: "Spa",ar:'منتجع صحي / spa'
},
{
  id: 42,
  name: "Tour Guide",ar:'مرشد سياحي'
},
{
  id: 43,
  name: "Tow Truck",ar:'سحب الشاحنة'
},
{
  id: 44,
  name: "Translator",ar:'مترجم'
},
{
  id: 45,
  name: "Travel Agent",ar:'وكيل سفر'
},
{
  id: 46,
  name: "Private language tutor / teacher",ar:'مدرس / مدرس لغة خاص'
},
{
  id: 47,
  name: "TV Repairer",ar:'مصلح تلفزيون'
},
{
  id: 48,
  name: "Vet",ar:'دكتور بيطري'
},
{
  id: 49,
  name: "Workers",ar:'عامل'
},
{
  id: 50,
  name: "Yoga Trainer",ar:'مدرب يوجا'
},
{
  id: 51,
  name: "Developer",ar:'مبرمج'
}
,
{
  id: 52,
  name: "Design",ar:'مصمم'
},

{
  id:53,
  name: "Pickup & Delivery",ar:'تحميل وتوصيل'
},
{
  id:54,
  name: "Grocery Delivery",ar:'توصيل بقالة'
},
{
  id:55,
  name: "Plumber",ar:'سباك'
},
{
  id: 56,
  name: "other",ar:'اخرى'
}


],
   placeHolderText: "Select your career",
   selectedText: "",
        title:'',
postStatus:null,
career:'',
address:'',
about:'',
dateor:'',
verfied:false,
position:'',
        color1:'steelblue',
        color:'red',
        commentsRef:'',
        time:'',
        whats:'',
firstlie:'',
secondlie:'',
phone:'',
web:'',
Completed:false,
mail:'',
facebook:'',
instagram:'',
twitter:'',
linkedin:'',
careerar:'',
youtube:'',
accept:false,
nofollowers:0,
Available:0,
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];

    this.setState({
      career:querySnapshot.data().career,
      careerar:querySnapshot.data().careerar,

      typeofservice:querySnapshot.data().typeofservice,
      cca2:querySnapshot.data().country,
      user:querySnapshot.data().user,
      address:querySnapshot.data().address,
      about:querySnapshot.data().bio,
      nooflike:querySnapshot.data().nooflike,
      verfied:querySnapshot.data().verfied,
      coverimg:querySnapshot.data().coverimg,
      position:querySnapshot.data().position,
      daily:querySnapshot.data().day,
      time:querySnapshot.data().time,
      createdAt:querySnapshot.data().createdAt,
      end:querySnapshot.data().end,
      whats:querySnapshot.data().whats,
nofollowers:querySnapshot.data().nofollowers,
      phone:querySnapshot.data().phone,
      accept:querySnapshot.data().accept,
      dateor:querySnapshot.data().dateor,
      web:querySnapshot.data().web,
      Completed:querySnapshot.data().Completed,
      Available:querySnapshot.data().Available,
      mail:querySnapshot.data().mail,
      writerId:querySnapshot.data().writerId,
      facebook:querySnapshot.data().facebook,
      instagram:querySnapshot.data().instagram,
      twitter:querySnapshot.data().twitter,
      linkedin:querySnapshot.data().linkedin,
      youtube:querySnapshot.data().youtube,
    })


  }
  componentDidMount() {

  firebaseApp.firestore().collection('profiles').doc(firebaseApp.auth().currentUser.uid).get()
  .then((docSnapshot) => {
  if (docSnapshot.exists) {
this.onCollectionUpdate(docSnapshot)
  } else {
  }
  });



  }
  _selectedValue(index, item) {
  this.setState({ career: item.name,careerar:item.ar });
}
_pickImage = async () => {
   let pickerResult = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3],
   });
   this._handleImagePicked(pickerResult);

 };
_handleImagePicked = async pickerResult => {
   try {
     this.setState({uploading:true})

   this.setState({status:'جاري تحميل الصورة',refreshing:true,uploading:false})
     if (!pickerResult.cancelled) {
         this.setState({profileimg:await uploadImageAsync(pickerResult.uri),uploading:false})
     }else {
       this.setState({uploading:false})

     }

   } catch (e) {
     console.log(e);
     this.setState({status:'حدث خظأ اثناء تحميل الصورة',refreshing:false,uploading:false})

   } finally {
     this.setState({uploading:false,refreshing:false})
     this.setState({status:''})


   }
 };
 _pickcover= async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this._handleImagePicked1(pickerResult);

  };
 _handleImagePicked1 = async pickerResult => {
   this.setState({uploadingcover:true})

    try {
      this.setState({uploadingcover:true})

    this.setState({status:'Image Loading..',refreshing:true,uploadingcover:false})
      if (!pickerResult.cancelled) {
          this.setState({coverimg:await uploadImageAsync1(pickerResult.uri),uploadingcover:false})
      }

    } catch (e) {
      console.log(e);
      this.setState({status:'حدث خظأ اثناء تحميل الصورة',refreshing:false})

    } finally {
      this.setState({uploadingcover:false,refreshing:false})
      this.setState({status:''})


    }
  };

  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
  header:null
  });
send=()=>{
  Alert.alert(
  'هل تريد من صديقك معرفة اسمك؟',
  'عند الارسال بسرية لا يستطيع صديقك معرفة هويتك',
  [
    {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
    {text: 'ارسل بسرية', onPress:this.createsecret, style: 'cancel'},
    {text: 'ارسال', onPress: this.create},
  ],
  { cancelable: false }
)
}
  onValueChange1(value: string) {
    this.setState({
      title: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      lie: value,
    });
  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'اكمال ...':'Completing ...',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    const newPostKey = firebaseApp.database().ref('door').push().key

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName
          let d =this.state.Available
          let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')

  if (this.state.career.length >0) {



          const postData = {
            writerId:uid,
            career:this.state.career,
            careerar:this.state.careerar,
            typeofservice:this.state.typeofservice,
            country:this.state.cca2,
            user:username,
          address:this.state.address,
          bio:this.state.about,
          position:this.state.position,
day:this.state.daily,
nofollowers:0,
time:this.state.time,
end:end,
dateor:this.state.dateor,
phone:this.state.phone,
Available:this.state.Available,
proimg:this.state.profileimg,
coverimg:this.state.coverimg,
web:this.state.web,
mail:this.state.mail,
whats:this.state.whats,
facebook:this.state.facebook,
instagram:this.state.instagram,
twitter:this.state.twitter,
linkedin:this.state.linkedin,
youtube:this.state.youtube,
          accept:false,
          verfied:false,
          Completed:true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:uid,

          }
          let updates = {}
          let updatess = {}

          updates['profiles/' + uid] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.firestore().collection('profiles').doc(uid).set(postData)
          .then(() => {

            this.setState({
                            postStatus:'Done, thank you',
                            title:'',
                            lovemsg:'',
                            spinner:false,

                            hatemsg:'',

                          })
  this.setState({shows:false})
  firebaseApp.auth().currentUser.updateProfile({photoURL:this.state.profileimg})
firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).update({proimg:this.state.profileimg})

  this.props.prof?null:  this.props.navigation.navigate('map')


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong',pcolor:'red',
            spinner:false })
          })

        .catch(error => {
          console.log(error)
        })




  } else {

    this.setState({ploading:false,  postStatus: 'Please select your current career',shows:true ,pcolor:'red',
    spinner:false})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }
  editprofile = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'اكمال ...':'Completing ...',
      shows:true,pcolor:'warning'
    })

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName
          let d =this.state.Available
          let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')

  if (this.state.career.length >0) {



          const postData = {
            writerId:uid,
            career:this.state.career,
            careerar:this.state.careerar,
            typeofservice:this.state.typeofservice,
            country:this.state.cca2,
            user:username,
          address:this.state.address,
          bio:this.state.about,
          position:this.state.position,
day:this.state.daily,
time:this.state.time,
end:end,
nofollowers:this.state.nofollowers,

dateor:this.state.dateor,
phone:this.state.phone,
verfied:this.state.verfied,
whats:this.state.whats?this.state.whats:'',

Available:this.state.Available,
proimg:this.state.profileimg,
web:this.state.web,
mail:this.state.mail,
coverimg:this.state.coverimg,
facebook:this.state.facebook,
instagram:this.state.instagram,
twitter:this.state.twitter,
linkedin:this.state.linkedin,
youtube:this.state.youtube,
          accept:this.state.accept,
          Completed:true,
            createdAt: this.state.createdAt,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:uid,

          }
          let updates = {}
          let updatess = {}

          updates['profiles/' + uid] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.firestore().collection('profiles').doc(uid).update(postData)
          .then(() => {

            this.setState({
                            postStatus:this.props.appStore.arabic?'تم, شكرا لك':'Done, thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
  firebaseApp.auth().currentUser.updateProfile({photoURL:this.state.profileimg})
firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).update({proimg:this.state.profileimg})

  this.props.prof?null:  this.props.navigation.navigate('Guide')


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })




  } else {

    this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء اختيار مهنتك ':'Please select your current career',shows:true ,pcolor:'red'})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({time:Moment(date).locale('en').format('hh:mm A'),dateor:date})
    this.hideDateTimePicker();
  };
   inc=()=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) - 2;
  })


  }
     onSelectColor(color) {
       this.setState({ color });
     }
     onSelectColor1(color1) {
       this.setState({ color1 });
     }
  render() {

    const {navigation}=this.props
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>

          <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>

          </Left>
                   <Body>
                     <Title style={gStyle.text[theme]}>{this.props.appStore.arabic?'اكمال ملف الشخصي':'Complete Profile'}</Title>
                   </Body>
                   <Right>

                   </Right>
        </Header>
{   this.state.postStatus?     <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 15,color: 'red'}]}>{this.state.postStatus}</Text>
:null}
      <ScrollView
      contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
      style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={'Loading...'}
             textStyle={{color:'#fff'}}
           />

           {this.state.page==1?this.AddTitle(theme):null}
           {this.state.page==2?this.catmore(theme):null}
           {this.state.page==3?this.AddChallenge(theme):null}
           {this.state.page==4?this.Addtruthques(theme):null}
           {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
           {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
           {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
           {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}

           <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21,color: 'red'}]}>{this.state.postStatus}</Text>






      </ScrollView>
      {!this.state.secret? <View
          style={{

            alignSelf: 'flex-end',
      padding: 10,marginBottom: 5,
      borderTopWidth: 0.3,borderColor: '#eb144c',
marginTop: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',

          }}
        >
        <Button

          bordered
          danger
          disabled={this.state.page==1?true:false}
          onPress={()=>this.setState({page:--this.state.page})}

          style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5}}
        >
          <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'رجوع':'Before'}</Text>
        </Button>
        <Button
          block

      onPress={this.state.page==4?this.state.Completed?this.editprofile:this.create:()=>{this.setState({page:++this.state.page})}}
          style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c"}}
        >
          <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==4?this.state.Completed?this.props.appStore.arabic?'تعديل':'Edit':this.props.appStore.arabic?'بدأ':'Start':this.props.appStore.arabic?'التالي':'Next'}</Text>
        </Button>
      {!this.props.prof?  <Button
          block
light
      onPress={()=>{
        this.props.prof?this.props.navigation.navigate('Home'):  this.props.navigation.navigate('map')
      }}
          style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5}}
        >
          <Text style={[gStyle.button,gStyle.text['light']]}>{this.props.appStore.arabic?'تخطي':'Skip'}</Text>
        </Button>:null}
      </View>:null}
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }
  createsecret = () => {
    this.setState({
      ploading:true,
      postStatus: 'جاري الارسال..',
      shows:true,pcolor:'warning'
    })
    const newPostKey = firebaseApp.database().ref('door').push().key

          const uid = this.state.myuid
          const username = this.state.username
const userid =this.state.data.userId

  if (this.state.title.length !=='null') {
    if (this.state.lovemsg.length >0||this.state.hatemsg.length >0||(this.state.title=='lie'&&this.state.firstlie.length>0&&this.state.secondlie.length>0&&this.state.thirdlie.length>0&&this.state.lie.length >0&&this.state.lie.length>0)) {

          const postData = {
            writerId:uid,
            title:this.state.title,
            user:'مجهول',
          firstdoor:this.state.lovemsg,
          seconddoor:this.state.hatemsg,
          firstLock:true,
          secondlock:true,
          accept:false,
          lie:this.state.lie,
          firstlie:this.state.firstlie,
          secondlie:this.state.secondlie,
          thirdlie:this.state.thirdlie,
          onedoor:this.state.title ==='truth'||this.state.title=='challenge'?true:false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          updates['Doors/' + userid+'/'+newPostKey] = postData

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

          firebaseApp.database().ref().update(updates)
          .then(() => {
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
                 headings: {"en": "هناك من ارسل لك باب سري"},
                 android_sound: "fishing",
                 data: {"puid": newPostKey, "new_message":true},
                 ios_sound: "fishing.caf",
                 contents: {"en": "شخص ما ارسل لك باب سري افتح الباب لتقرأ ما بداخله" },
        filters: [{"field":"tag","key":"uid","relation":"=","value":userid}],
               })
             })
             .then((response) => response.json())
             .then((responseData) => {
                 console.log("Push POST:" + JSON.stringify(responseData));
                 responseData.json()
             })
            this.setState({
                            postStatus: 'تم شكرا لك.',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false})
  alert('تم ارسال رسالتك')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })




    } else {

        this.setState({ploading:false,  postStatus: 'الرجاء عدم ترك ايا حقل فارغ',shows:true ,pcolor:'red'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: 'الرجاء اختيار عنوان',shows:true ,pcolor:'red'})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }

this.inc()

  }

AddTitle = (theme) => {
return (
  <View style={{flex:1,marginVertical: 10,marginBottom: 10}}>
  <TouchableOpacity style={{width: Dimensions.get('window').width,flex:1,height: 100}}  onPress={this._pickcover}>

  <ImageBackground style={{width: Dimensions.get('window').width,flex:1,height: 100}} source={{uri:this.state.coverimg.length>0?this.state.coverimg:'https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg'}} >
{this.state.uploadingcover?<ActivityIndicator />:null}
  </ImageBackground>
  </TouchableOpacity>

  {this.state.uploading?<ActivityIndicator />:   <TouchableOpacity onPress={this._pickImage} style={{alignItems: 'center',justifyContent: 'center',marginVertical: 10,position: 'absolute',top: 70,alignSelf: 'center',marginBottom: 30}}>
     <Thumbnail large source={this.state.profileimg?{uri:this.state.profileimg}:require('../assets/users.png')} style={{alignSelf: 'auto'}}/>
     <Text style={{color:'#d0021b'}}>{this.props.appStore.arabic?'تعديل الصورة الشخصية':'ُEdit Profile picture'}</Text>
     </TouchableOpacity>}
<View style={{flex:1,marginVertical: 40}}/>
          </View>
)
}
catmore= ()=>{
  return (<View style={{flex:1}}>
  <Item picker style={{marginVertical:10,alignSelf:'center',alignItems:'center' }} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d)=>this.setState({typeofservice:d})}

  >
  <Picker.Item label={this.props.appStore.arabic?'مهنة محلية':"Local Career"} value="local" />

  <Picker.Item label={this.props.appStore.arabic?'مهنة اونلاين':"Online Career"} value="online" />
  <Picker.Item label={this.props.appStore.arabic?'مهنة خاصة':"Special Career"} value="Special" />

  </Picker>
  </Item>
{this.state.typeofservice=='local'?  <RNPicker
           dataSource={this.state.dataSource}
           dummyDataSource={this.state.dataSource}

           defaultValue={false}
           pickerTitle={"Career Picker"}
           showSearchBar={true}
           arabic={this.props.appStore.arabic}
           disablePicker={false}
           changeAnimation={"none"}
           searchBarPlaceHolder={"Search....."}
           showPickerTitle={true}
           pickerStyle={Styles.pickerStyle}
           arabichold={"اختار مهنتك"}
           itemSeparatorStyle={Styles.itemSeparatorStyle}
           pickerItemTextStyle={Styles.listTextViewStyle}
           selectedLabel={this.state.career}
           placeHolderLabel={this.state.placeHolderText}
           selectLabelTextStyle={Styles.selectLabelTextStyle}
           placeHolderTextStyle={Styles.placeHolderTextStyle}
           dropDownImageStyle={Styles.dropDownImageStyle}
           selectedValue={(index, item) => this._selectedValue(index, item)}
         />:this.state.typeofservice=='online'?
         <RNPicker
                  dataSource={this.state.Online}
                  dummyDataSource={this.state.Online}

                  defaultValue={false}
                  pickerTitle={"Career Picker"}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Search....."}
                  showPickerTitle={true}
                  arabic={this.props.appStore.arabic}
arabichold={"اختار مهنتك"}
                  pickerStyle={Styles.pickerStyle}
                  itemSeparatorStyle={Styles.itemSeparatorStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.career}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />:<Form style={{width:width}}>
                <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
                  placeholder={this.props.appStore.arabic?'ادخل مهنتك مثال: رجل اعمال..':"enter your career e.g: entrepreneurs"} value={this.state.career} onChangeText={(career)=>this.setState({career,careerar:career})}
                />
                </Form>}
                <View style={{justifyContent: 'space-around',alignItems: 'center',paddingHorizontal: 20,marginVertical: 15,flexDirection: 'row',borderWidth: 0.5,paddingVertical: 15,marginHorizontal: 10}}>
<View style={{flex:1,flexDirection: 'row',alignItems: 'center'}}>
                <CountryPicker
                        countryList={NORTH_AMERICA}
                        onSelect={(value) => {
                          this.setState({ cca2: value.name, callingCode: value.callingCode })
                        }}
                        placeholder={this.props.appStore.arabic?'حدد الدولة':'Select Country'}
                        translation="eng"
                      />
                      <Icon name="ios-arrow-down" size={15} style={{marginLeft: 10}}/>
                      </View>
                      <Text style={{fontFamily: 'ralewaymedium',color: '#eb144c'}}>{this.state.cca2}</Text>
                      </View>
                      </View>

)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>


              <Item picker style={{marginVertical:10}} >
              <Picker

             style={{ height: 50, width: width-20,marginVertical: 10}}
             selectedValue={this.state.title}
             onValueChange={this.onValueChange1.bind(this)}

            >

            <Picker.Item label="I Don't Work at any place yet" value="don't work" />
            <Picker.Item label="I own/work at company" value="own" />

            </Picker>
              </Item>

              </View>
)
}
onUpdateItem = (i,d) => {
  this.setState({
    daily: this.state.daily.map(el => (el.day === i ? {...el, selected:!d} : el))
  });
 };

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10,paddingVertical: 20,marginTop: 20}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'عنوان منزلك(اختياري)':'Where do you live(optional)'}
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}} value={this.state.address} onChangeText={(address)=>this.setState({address})}
    placeholder={this.props.appStore.arabic?'مثال: الاردن شارع الثلاثين':"e.g : Usa, 432 streets"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'اخبرنا اكثر عنك':'Tell us more about you'}
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.about} onChangeText={(about)=>this.setState({about})} bordered placeholder={this.props.appStore.arabic?'انا موظف اعمل في..':"I am 23 years old and..." }/>
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'مكانتك الوظيفية':'Job position'}
</Label>
<Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]}  value={this.state.position} onChangeText={(position)=>this.setState({position})} bordered placeholder={
this.props.appStore.arabic?`
رئيس شركة..
مصمم في شركة..
`:`Ceo at [name of company]
Developer at opentiq..  `} />
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'الايام المتاحة':'Days Available'}
</Label>

<View style={{alignItems: 'center',marginVertical: 10}}>
<ScrollView horizontal={true}>
{this.state.daily.map((item)=>{
  return(
  <TouchableOpacity onPress={()=>this.onUpdateItem(item.day,item.selected)} style={{marginHorizontal: 20,flex:1,padding: 20,borderRadius: 12,backgroundColor:item.selected?'#eb144c':'#fff',borderColor:'#eb144c',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{color:item.selected?'#fff':'#eb144c'}}>{this.props.appStore.arabic?item.ar:item.day}</Text>
  </TouchableOpacity>)
})}
</ScrollView>
</View>
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'الوقت المتاح':'Time Available'}
</Label>
<View style={{padding: 20}}>
<Button



block
  onPress={this.showDateTimePicker}

  style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,width: '100%',backgroundColor:'#eb144c'}}
>
<Text style={[gStyle.button,{color:'#fff'}]}>{this.state.time.length>0?this.state.time:this.props.appStore.arabic?'اختر الوقت المتاح فيه':'Pick time Available'}</Text>
</Button>
</View>
<DateTimePicker
mode="time"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Item picker style={{marginVertical:10}} >
        <Picker

       style={{ height: 50, width: width,marginVertical: 10}}
       selectedValue={this.state.Available}
       onValueChange={(Available)=>this.setState({Available})}

      >
      <Picker.Item label={this.props.appStore.arabic?'متاح 24 ساعة':"24 hours available"} value={0} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل ساعتين باليوم':"Working 2 hours/day"} value={2} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل 3 ساعات باليوم':"Working 3 hours/day"} value={3} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 4 ساعات باليوم':"Working 4 hours/day"} value={4} />

      <Picker.Item label={this.props.appStore.arabic?'تعمل 5 ساعات باليوم':"Working 5 hours/day"} value={5} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 6 ساعات باليوم':"Working 6 hours/day"} value={6} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 7 ساعات باليوم':"Working 7 hours/day"} value={7} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 8 ساعات باليوم':"Working 8 hours/day"} value={8} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 9 ساعات باليوم':"Working 9 hours/day"} value={9} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 10 ساعات باليوم':"Working 10 hours/day"} value={10} />
      <Picker.Item label={this.props.appStore.arabic?'تعمل 11 ساعة باليوم':"Working 11 hours/day"} value={11} />

      </Picker>
        </Item>
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ يتطلب الجرأة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.hatemsg} onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="ماذا تريد من صديقك ان يفعل اذا اختار باب الجرأة.." />
            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingVertical: 20}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-start',marginRight: 20}]}>{this.props.appStore.arabic?'معلومات التواصل':'Contact info'}</Text>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رقم الهاتف':'Phone number'}
  </Label>
  <Input value={this.state.phone} onChangeText={(phone)=>this.setState({phone})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"+13235334433"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'واتس اب':'WhatsApp'}
  </Label>
  <Input value={this.state.whats} onChangeText={(whats)=>this.setState({whats})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"+13235334433"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط الموقع الالكتروني':'Web url'}
  </Label>
  <Input value={this.state.web} onChangeText={(web)=>this.setState({web})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"www.opentiq.com"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'بريد الكتروني':'Mail Address'}
  </Label>
  <Input value={this.state.mail} onChangeText={(mail)=>this.setState({mail})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"e.g: info@opentiq.com"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط الفيسبوك':'Facebook url'}
  </Label>
  <Input value={this.state.facebook} onChangeText={(facebook)=>this.setState({facebook})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://fb.com/opentiq"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'حساب instagram':'Instagram account'}
  </Label>
  <Input value={this.state.instagram} onChangeText={(instagram)=>this.setState({instagram})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"Opentiq"}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط تويتر':'Twitter url'}
  </Label>
  <Input value={this.state.twitter} onChangeText={(twitter)=>this.setState({twitter})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط Linkedin':'linkedin url'}
  </Label>
  <Input value={this.state.linkedin} onChangeText={(linkedin)=>this.setState({linkedin})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'رابط قناة اليوتيوب':'Youtube link url'}
  </Label>
  <Input value={this.state.youtube} onChangeText={(youtube)=>this.setState({youtube})} inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width: '100%'}} containerStyle={{borderRadius: 12}}
    placeholder={"https://.."}
  />
     </Form>


              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]} value={this.state.hatemsg}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
            </Form>
              </View>
)
}
liegame = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>باب الكذب</Text>
  <Text style={[gStyle.p,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>طريقة اللعب: يجب كتابة 3 كذبات اثنان منهم حقيقة وواحدة كذب يجب على صديقة معرفة الكذبة</Text>

  <Form style={{width:width-10 }}>
              <Textarea onChangeText={(firstlie)=>this.setState({firstlie})} value={this.state.firstlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الاولى" />
              <Textarea  onChangeText={(secondlie)=>this.setState({secondlie})} value={this.state.secondlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثانية"/>

              <Textarea  onChangeText={(thirdlie)=>this.setState({thirdlie})} value={this.state.thirdlie} rowSpan={2} style={gStyle.text[theme]} bordered placeholder="الثالثة" />
              <Item picker >
              <Picker

              style={{ height: 50, width: width,color:'white' }}
              selectedValue={this.state.lie}
              onValueChange={this.onValueChange2.bind(this)}

              >
              <Picker.Item label="اختر الكذبة" value="" />

              <Picker.Item label="الاولى" value="first" />
              <Picker.Item label="الثانية" value="second" />
              <Picker.Item label="الثالثة" value="third" />

              </Picker>
              </Item>
            </Form>
              </View>
)
}
}
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
