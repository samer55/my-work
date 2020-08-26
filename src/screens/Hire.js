import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Footer,FooterTab} from 'native-base';
import RNPicker from "rn-modal-picker";
import RadioGroup from 'react-native-radio-buttons-group';

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

import { Button,Header,Item,Icon,Label } from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

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
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer


export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
page:1,
game:'',
profiles:[],

 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'local',
        hatemsg:'',
         serverData: [],
        lie:'',
        Address:'',
        daily:[

          {day:'Saturday',selected:false},
          {day:'Sunday',selected:false},
          {day:'Monday',selected:false},
          {day:'Tuesday',selected:true},
          {day:'Wednesday',selected:false},
          {day:'Thursday',selected:false},
          {day:'Friday',selected:false},


        ],
        datasf: [

           {
               label: props.appStore.arabic?'بالساعة':'Hourly',
               value: "Hourly",
           },
           {
               label:  props.appStore.arabic?'باليوم':'Daily',
               value: "Daily",
           }, {
                label:  props.appStore.arabic?'بالاسبوع':'Weekly',
                value: "Weekly",
            }, {
                 label: props.appStore.arabic?'بالشهر': 'Monthly',
                 value: "Monthly",
             },
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
   placeHolderText: props.appStore.arabic?'اختر الصنف الذي تحتاجه':"Select Service Looking for",
   selectedText: "",
        title:'',
postStatus:null,
        color1:'steelblue',
        color:'red',
        Htitle:'',
        Hcategories:'',
        Hskills:'',
        postas:props.navigation.getParam('postas',firebaseApp.auth().currentUser.uid),
        asas:'',
cate:'',
catar:'',
        Hdescription:'',
        yofx:'<1',
        commentsRef:'',
        time:'',
        image:'',
        uploading:false,

        dataSources: [],
        editable:  props.navigation.getParam('editable',false),

data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
  multiSliderValue: [0, 0],
secondlie:'',
typeofjob:'Full time job',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  oneditupdate = (querySnapshot) => {
    const boards = [];
    const radioButtons = this.state.datasf;
    const selectIndex = radioButtons.findIndex(e => e.value == this.state.data.pperiod);

    radioButtons[selectIndex].selected = true;
    this.setState({ datasf:radioButtons });

    this.setState({
      image:querySnapshot.data().backimg,

      Htitle:querySnapshot.data().Htitle,
      typeofservice:querySnapshot.data().type,
      user:querySnapshot.data().user,
      Address:querySnapshot.data().Address,
      Hcategories:querySnapshot.data().Categories,
      cate:querySnapshot.data().Categories,
      catar:querySnapshot.data().catar?querySnapshot.data().catar:'',

      nooflike:querySnapshot.data().nooflike,
      Hdescription:querySnapshot.data().About,
      Hskills:querySnapshot.data().skills,
      multiSliderValue: [querySnapshot.data().mprice, querySnapshot.data().hprice],
      typeofjob:querySnapshot.data().Availablility,
      yofx:querySnapshot.data().yearsofx,
      createdAt:querySnapshot.data().createdAt,
postas:querySnapshot.data().writerId,

    })


  }
  componentDidMount() {

    var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)
if (this.state.editable) {
  firebaseApp.firestore().collection('Jobs').doc(this.state.data.postuid).onSnapshot(this.oneditupdate)

}

}
onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  this.setState({profiles:boards})

}

  _selectedValue(index, item) {
  this.setState({ Hcategories: this.props.appStore.arabic?item.ar:item.name,catar:item.ar,cate:item.name });
}

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

   this.setState({postStatus:this.props.appStore.arabic?'تحميل الصورة..':'Image Loading..',refreshing:true})
     if (!pickerResult.cancelled) {
         this.setState({image:await uploadImageAsync(pickerResult.uri)})
     }
       console.log("state ===="+image);
   } catch (e) {
     console.log(e);
     this.setState({postStatus:'Something went wrong',refreshing:false})

   } finally {
     this.setState({uploading:false,refreshing:false})
     this.setState({postStatus:''})


   }
 };

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

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  create = () => {

    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'نشر..':'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].value;
    let ob = this.state.profiles.find(e => e.postuid == this.state.postas);
    var userimg = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.photoURL:ob.proimg

    var userdis = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.displayName:ob.Businessname

    const refs = firebaseApp.firestore().collection('Jobs').doc()
    const newPostKey = refs.id
    let d =this.state.Available
    var backimging = this.state.image.length>0?this.state.image:'https://i.ibb.co/dWk3Gj1/Untitled-design-16.png'

    let end =Moment(this.state.dateor).add(d, 'hours').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {office,Address,About,daily}=this.state
  if (this.state.Htitle.length >0) {
    if (this.state.Hcategories.length>0) {

if (this.state.Hdescription.length >0) {

          const postData = {
            writerId:this.state.postas,
            Htitle:this.state.Htitle,
            type:this.state.typeofservice,
            user:userdis,
            Address,
            curr:this.props.appStore.currency,

            Categories:this.state.cate,
            catar:this.state.catar,
            mprice:this.state.multiSliderValue[0],
            hprice:this.state.multiSliderValue[1],
            About:this.state.Hdescription,
            skills:this.state.Hskills,
            yearsofx:this.state.yofx,
            pperiod:selectedButton,
            Availablility:this.state.typeofjob,
            verfied:false,
            ratingno:0,
            nofollowers:0,
            proimg:'https://i.ibb.co/1q2XTpb/Untitled-design-15.png',
            backimg:backimging,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          refs.set(postData)
          .then(() => {

            this.setState({
                            postStatus: this.props.appStore.arabic?'شكرا لك':'Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false,spinner:false})
  this.props.navigation.navigate('Mappickers',{type:'Jobs',id:newPostKey})


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red',spinner:false })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus:this.props.appStore.arabic?'الرجاء ادخال الشرح': 'Please enter Description',shows:true ,pcolor:'red',spinner:false,page:2})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء اختيار الصنف':'Please  select category',shows:true ,pcolor:'red',spinner:false,page:1})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء ادخال عنوان الوظيفة':"Please enter your Job Title",shows:true ,pcolor:'red',spinner:false,page:1})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }


  edits = () => {

    this.setState({
      ploading:true,
      postStatus: 'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].value;
    let ob = this.state.profiles.find(e => e.postuid == this.state.postas);
    var userimg = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.photoURL:ob.proimg

    var userdis = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.displayName:ob.Businessname

    const refs = firebaseApp.firestore().collection('Jobs').doc(this.state.data.postuid)
    const newPostKey = this.state.data.postuid
    let d =this.state.Available
    var backimging = this.state.image.length>0?this.state.image:'https://i.ibb.co/dWk3Gj1/Untitled-design-16.png'

    let end =Moment(this.state.dateor).add(d, 'hours').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {office,Address,About,daily}=this.state
  if (this.state.Htitle.length >0) {
    if (this.state.Hcategories.length>0) {

if (this.state.Hdescription.length >0) {

          const postData = {
            writerId:this.state.postas,
            Htitle:this.state.Htitle,
            type:this.state.typeofservice,
            user:userdis,
            Address,
            curr:this.props.appStore.currency,
            Categories:this.state.Hcategories,
            catar:this.state.catar,

            mprice:this.state.multiSliderValue[0],
            hprice:this.state.multiSliderValue[1],
            About:this.state.Hdescription,
            skills:this.state.Hskills,
            yearsofx:this.state.yofx,
            pperiod:selectedButton,
            Availablility:this.state.typeofjob,
            verfied:this.state.data.verfied,
            ratingno:this.state.data.ratingno,
            nofollowers:this.state.data.nofollowers,
            proimg:'https://i.ibb.co/1q2XTpb/Untitled-design-15.png',
            backimg:backimging,
            createdAt: this.state.data.createdAt,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          refs.update(postData)
          .then(() => {

            this.setState({
                            postStatus: 'Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false,spinner:false})
  this.props.navigation.navigate('Mappickers',{type:'Jobs',id:newPostKey})


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red',spinner:false })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus: 'Please enter Description',shows:true ,pcolor:'red',spinner:false})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus: 'Please  select category',shows:true ,pcolor:'red',spinner:false})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: "Please enter your Job Title",shows:true ,pcolor:'red',spinner:false})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }


  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({time:Moment(date).format('LT') })
    this.hideDateTimePicker();
  };
   inc=()=>{



          firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/balance`).transaction(function(currentClicks) {
    // If node/clicks has never been set, currentRank will be `null`.
    return (currentClicks || 0) - 2;
  })


  }
  onPress = datasf => this.setState({ datasf });

     onSelectColor(color) {
       this.setState({ color });
     }
     onSelectColor1(color1) {
       this.setState({ color1 });
     }
  render() {
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].value;

    const {navigation}=this.props
    return (
      <ThemeContext.Consumer>
        {theme => (
          <View style={{flex:1}}>

          <Header  style={{width: width,backgroundColor: gStyle.container[theme].backgroundColor}}>
          <Left>
                     <Button transparent onPress={()=>navigation.goBack()}>
                     <Icon name={'arrowleft'} type="AntDesign" size={25} style={{color: '#000000'}} />

                     </Button>
                   </Left>
                   <Body>
      <TouchableOpacity  style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

      <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.arabic?'توظيف':'Hiring'}</Text>

      </TouchableOpacity>
                   </Body>

      </Header>
{this.state.postStatus?      <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 15,color: 'red'}]}>{this.state.postStatus}</Text>
:null}

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={this.props.appStore.arabic?'تحميل..':'Loading...'}
             textStyle={{color:'#fff'}}
           />
           {this.state.page==1?this.addcover(theme):null}

           {this.state.page==1?this.AddTitle(theme):null}
           {this.state.page==2?this.AddChallenge(theme):null}
           {this.state.page==3?this.Adddare(theme):null}
           {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
           {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
           {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
           {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}






<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>

      </ScrollView>
      {!this.state.secret?<View
        style={{
          alignSelf: 'flex-end',
    padding: 10,marginBottom: 5,
    borderTopWidth: 0.3,borderColor: '#eb144c',

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

          style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderRadius: 7}}
        >
          <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'الرجوع':'Before'}</Text>
        </Button>
        <Button
          block

      onPress={this.state.page==3?this.state.editable?this.edits:this.create:()=>{this.setState({page:++this.state.page})}}
          style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c",borderRadius: 7}}
        >
          <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==3?this.state.editable?this.props.appStore.arabic?'تعديل':'Edit':this.props.appStore.arabic?'نشر':'Post':this.props.appStore.arabic?'التالي':'Next'}</Text>
        </Button>
      </View>:null}
      <Footer style={{backgroundColor: 'white',borderWidth: 0.2,borderTopWidth: 0.5,borderColor: '#eb144c'}} backgroundColor="white">
         <FooterTab style={{backgroundColor: 'white',flexDirection: 'row',alignItems: 'center'}} >
         <Text> {this.props.appStore.arabic?'نشر باسم':'Post as'}  </Text>
         <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
         <Picker

         style={{ height: 50, width: width-100,alignSelf: 'center',marginVertical: 10,color: '#eb144c'}}
         selectedValue={this.state.postas}
         onValueChange={(d,i)=>this.setState({postas:d,asas:i})}

         >
         <Picker.Item label={firebaseApp.auth().currentUser.displayName} value={firebaseApp.auth().currentUser.uid} />

{this.state.profiles.map((d,i)=>{
  return(
    <Picker.Item label={d.Businessname} value={d.postuid} />

  )
})}

         </Picker>
         </Item>
         </FooterTab>
       </Footer>
      </View>
    )}

  </ThemeContext.Consumer>

    );
  }
  addcover = (theme) => {
  return (
    <TouchableOpacity onPress={this._pickImage} style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>
  {this.state.uploading?<ActivityIndicator />:
    <Image style={{width:width-10,height: 150,resizeMode: 'cover',borderRadius: 9}} source={{uri:this.state.image.length==0?'https://i.ibb.co/yB5mJkr/1.png':this.state.image}}/>

  }

    </TouchableOpacity>

  )
  }
AddTitle = (theme) => {
return (
  <View style={{flex:1,marginVertical: 10}}>
  <Form style={{width:width-10 }}>

  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder={this.props.appStore.arabic?'اضف عنوان الوظيفة..':'Enter Job Title..'}
    value={this.state.Htitle} onChangeText={(Htitle)=>this.setState({Htitle})}

  />
  </Form>
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10,marginHorizontal: 10}}>
{this.props.appStore.arabic?'النوع':'Type :'}
  </Label>
  <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10,color: '#000000',fontWeight: '100',fontFamily: 'raleway'}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d)=>this.setState({typeofservice:d})}

  >

  <Picker.Item label={this.props.appStore.arabic?'عمل محلي':"Local Job"} value="local" />
  <Picker.Item label={this.props.appStore.arabic?'عمل اونلاين':"Online Job"} value="online" />
  <Picker.Item label={this.props.appStore.arabic?'عمل خاص':"Special Job"} value="Special" />

  </Picker>
  </Item>

  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10,marginHorizontal: 10,marginTop: 30}}>
  {this.props.appStore.arabic?'القسم':'Categories :'}
  </Label>
  <View style={{borderWidth: 1,borderColor: '#dddddd',marginBottom: 10}}/>
{this.state.typeofservice=='local'?  <RNPicker
           dataSource={this.state.dataSource}
           dummyDataSource={this.state.dataSource}
           defaultValue={false}
           pickerTitle={this.props.appStore.arabic?'اختيار الخدمات':"Services Picker"}
           showSearchBar={true}
           arabic={this.props.appStore.arabic}
arabichold="اختر قسم"
           disablePicker={false}
           changeAnimation={"none"}
           searchBarPlaceHolder={this.props.appStore.arabic?'ابحث..':"Search....."}
           showPickerTitle={true}
           pickerStyle={Styles.pickerStyle}
           itemSeparatorStyle={Styles.itemSeparatorStyle}
           pickerItemTextStyle={Styles.listTextViewStyle}
           selectedLabel={this.state.Hcategories}
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
                  pickerTitle={this.props.appStore.arabic?'اختيار الخدمات':"Services Picker"}
                  showSearchBar={true}
                  disablePicker={false}
                  arabic={this.props.appStore.arabic}
                  arabichold="اختر قسم"

                  changeAnimation={"none"}
                  searchBarPlaceHolder={this.props.appStore.arabic?'البحث..':"Search....."}
                  showPickerTitle={true}
                  pickerStyle={Styles.pickerStyle}
                  itemSeparatorStyle={Styles.itemSeparatorStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.Hcategories}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />:<Form style={{width:width}}>
                <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
                  placeholder={this.props.appStore.arabic?'اكتب التصنيف الذي تريده':"Enter Special Categories you need"} value={this.state.Hcategories} onChangeText={(Hcategories)=>this.setState({Hcategories})}
                />
                </Form>}
          </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 20}}>


  <Item picker style={{marginVertical:10}} >
  <Picker

 style={{ height: 50, width: width,marginVertical: 10}}
 selectedValue={this.state.office}
 onValueChange={(office)=>this.setState({office})}

>

<Picker.Item label="I Don't Have any office or store yet" value="no" />
<Picker.Item label="I have local store/office" value="yes" />

</Picker>
  </Item>
{this.state.office=="yes"?
<Form style={{width:width }}>

 <Input
    placeholder='Enter your business address'
    value={this.state.Address} onChangeText={(Address)=>this.setState({Address})}
  />
</Form>
  :null}

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
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>

  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
  {this.props.appStore.arabic?'الشرح':'Description'}
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.Hdescription} onChangeText={(Hdescription)=>this.setState({Hdescription})} bordered placeholder={this.props.appStore.arabic?'اضف شرح..':"Enter Description.."} />
              <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
              {this.props.appStore.arabic?'المهارات المطلوبة':'Skills needed'}
              </Label>

                          <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.Hskills} onChangeText={(Hskills)=>this.setState({Hskills})} bordered placeholder={this.props.appStore.arabic?'اضف لائحة بالمهارات التي تحتاجها في العمل..':"Enter List of skills you need in the job.."} />

<Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
{this.props.appStore.arabic?'الاتاحة':'Availablility'}
</Label>


        <Item picker styke={{marginVertical:10}} >
        <Picker

       style={{ height: 50, width: width,marginVertical: 10}}
       selectedValue={this.state.typeofjob}
       onValueChange={(d)=>this.setState({typeofjob:d})}

      >
      <Picker.Item label={this.props.appStore.arabic?'عمل حر':"Freelancer"} value="Freelancer" />

      <Picker.Item label={this.props.appStore.arabic?'عمل من المنزل':"Working from home"} value="Working from home" />

      <Picker.Item label={this.props.appStore.arabic?'عمل بدوام جزئي':"Part time job"} value="Part time job" />
      <Picker.Item label={this.props.appStore.arabic?'عمل بدوام كامل':"Full time job"} value="Full time job" />

      <Picker.Item label={this.props.appStore.arabic?'عمل لمرة واحدة':"one time job"} value="one time job" />

      </Picker>
        </Item>
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
  {this.props.appStore.arabic?'سنوات الخبرة':'Years of experience'}
  </Label>


          <Item picker styke={{marginVertical:10}} >
          <Picker

         style={{ height: 50, width: width,marginVertical: 10}}
         selectedValue={this.state.yofx}
         onValueChange={(yofx)=>this.setState({yofx})}

        >
        <Picker.Item label={this.props.appStore.arabic?'اكثر من سنة':"<1 years of exp"} value="<1" />

        <Picker.Item label={this.props.appStore.arabic?'1-2 سنة خبرة':"1-2 years of exp"} value="1-2" />

        <Picker.Item label={this.props.appStore.arabic?'2-4 سنوات خبرة':"2-4 years of exp"} value="2-4" />
        <Picker.Item label={this.props.appStore.arabic?'4-6 سنوات خبرة':"4-6 years of exp"} value="4-6" />

        <Picker.Item label={this.props.appStore.arabic?'6< سنوات خبرة':"6< years of exp"} value="6<" />

        </Picker>
          </Item>

                  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
                      {this.props.appStore.arabic?'ميزانية / راتب':'Budget / salary'}
                      </Label>
                      </Form>

                      {this.renderPrice()}
                      <Form style={{width:width-10 }}>

                      <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
                          {this.props.appStore.arabic?'فترة الدفع':'Payment period'}
                          </Label>
                          <View style={{flex:1,justifyContent: 'flex-start'}}>
                      <RadioGroup radioButtons={this.state.datasf} onPress={this.onPress} />
</View>
    </Form>
              </View>
)
}
renderPrice = (item) => {
  var { width } = Dimensions.get('window');

  return (<View>

    <TouchableOpacity
      style={Styles.PopupViewContainer}>
      <Text style={Styles.popupViewText}>{"From "+ this.state.multiSliderValue[0] +" - " +   this.state.multiSliderValue[1]+this.props.appStore.currency}</Text>
    </TouchableOpacity>




    <MultiSlider
      isMarkersSeparated={true}
      markerOffsetY={5}
      selectedStyle={{
        backgroundColor: 'red',
      }}

      unselectedStyle={{
        backgroundColor: 'gray',
      }}

      containerStyle={{
        height: 40,
        alignSelf: 'center',

        marginHorizontal: 30
      }}

      trackStyle={{
        height: 14,
        backgroundColor: 'red',
        borderRadius: 5,
      }}
      touchDimensions={{
        height: 40,
        width: 40,
        borderRadius: 20,
        slipDisplacement: 40,
      }}
      customMarkerLeft={(e) => {
        var currentValue = e.currentValue;
        return (
          <View style={[Styles.circle, { borderColor: 'red' }]}>
            <Image source={require('../assets/minus_red.png')} style={[Styles.sliderImage, { tintColor: 'red' }]} />
          </View>
        );
      }}

      customMarkerRight={(e) => {
        var currentValue = e.currentValue;
        return (
          <View style={[Styles.circle, { borderColor: 'red' }]}>
            <Image source={require('../assets/plus_red.png')} style={[Styles.sliderImage, { tintColor: 'red' }]} />
          </View>
        );
      }}
      sliderLength={width -20}
      min={Number(0)}
      max={Number(1000)}
      step={5}
      values={[0,1000]}
      onValuesChange={this.multiSliderValuesChange}
    />


  </View>);
}
multiSliderValuesChange = (values) => {
  this.setState({
    multiSliderValue: values,
  });
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
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
  circle: {
    width: 19,
    height: 19,
    borderRadius: 100/2,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',

  },
  sliderImage:{
    tintColor:'#999999',
    resizeMode:'center',
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
  },
  popupViewText:{

    fontSize:14,
    color:'#999999',
  },
  PopupViewContainer:{
    height:50,
    width:width-10,
    backgroundColor:'#f0f0f0',
    paddingStart:15,
    paddingEnd:15,
    marginTop:5,
    marginBottom:5,
    paddingBottom:0,
    paddingTop:0,
    alignSelf: 'center',
     justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:5,

  }

});
