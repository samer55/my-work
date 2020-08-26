import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea} from 'native-base';
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
import { TextInputMask } from 'react-native-masked-text'

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
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

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
Address:'',
 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'local',
        hatemsg:'',
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
       name: "Programming & Teach"
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
       name: "firebaseApp Fighters"
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
       id: 12,
       name: "Lock Smith"
     },
     {
       id: 12,
       name: "Maids"
     },
     {
       id: 12,
       name: "Massage"
     },
     {
       id: 12,
       name: "Mechanic"
     },
     {
       id: 12,
       name: "Mobile Technician"
     },
     {
       id: 12,
       name: "Office Cleaning"
     },
     {
       id: 12,
       name: "Party Cleaning"
     },
     {
       id: 12,
       name: "Pest Control"
     },
     {
       id: 12,
       name: "Physiotharaphy Services"
     },
     {
       id: 12,
       name: "Tutor / Teacher"
     },
     {
       id: 12,
       name: "Physiotharaphy Services"
     },
     {
       id: 12,
       name: "Psychologists"
     },
     {
       id: 12,
       name: "Road Assistance"
     },
     {
       id: 12,
       name: "Security Guard"
     },
     {
       id: 12,
       name: "Snow Plows"
     },
     {
       id: 12,
       name: "Sofa Repair"
     },
     {
       id: 12,
       name: "Spa"
     },
     {
       id: 12,
       name: "Tour Guide"
     },
     {
       id: 12,
       name: "Tow Truck"
     },
     {
       id: 12,
       name: "Translator"
     },
     {
       id: 12,
       name: "Travel Agent"
     },
     {
       id: 12,
       name: "Private language tutor / teacher"
     },
     {
       id: 12,
       name: "TV Repairer"
     },
     {
       id: 12,
       name: "Vet"
     },
     {
       id: 12,
       name: "Workers"
     },
     {
       id: 12,
       name: "Yoga Trainer"
     },
     {
       id: 12,
       name: "Developer"
     }
     ,
     {
       id: 12,
       name: "Design"
     },
     {
       id: 12,
       name: "Design"
     },
     ,
     {
       id: 12,
       name: "other"
     }



   ],
catsarr:[],
   datasf: [

      {
          label: props.appStore.arabic?'ساعة':'Hour',
          value: "Hour",
          selected:false
      },
      {
          label:  props.appStore.arabic?'اليوم':'Day',
          value: "Day",
          selected:false
      }, {
           label: props.appStore.arabic?'اسبوع':'Week',
           value: "Week",
           selected:false
       }, {
            label: props.appStore.arabic?'شهر':'Month',
            value: "Month",
            selected:false
        },
        {
             label: props.appStore.arabic?'خدمة':'Service',
             value: "Service",
             selected:false
         },
   ],
   placeHolderText: "Select Service you offer",
   selectedText: "",
        title:'',
postStatus:null,
        color1:'steelblue',
        color:'red',
        commentsRef:'',
        catsarray:[],
          advanced:0,
        time:'',
        Available:0,
        office:'no',

        dateor:'',
        end:'',
        Categories:'',
        serdo:'',
        serdes:'',
        sertitle:'',
priceav:true,
image:'',
uploading:false,
editable:  props.navigation.getParam('editable',false),

pimage:'',
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
firstlie:'',
secondlie:'',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }

  componentDidMount() {
    if (this.state.editable) {
      const radioButtons = this.state.datasf;
      const selectIndex = radioButtons.findIndex(e => e.value == this.state.data.priceper);

      radioButtons[selectIndex].selected = true;
      this.setState({ datasf:radioButtons });
      this.setState({
        sertitle:this.state.data.servicetitle,
        typeofservice:this.state.data.type,
        office:this.state.data.haveplace,
        Categories:this.state.data.Categories,
        Address:this.state.data.Address,
        advanced:this.state.data.price,
        serdes:this.state.data.About,
        priceav:this.state.data.priceav,
        time:this.state.data.time,
        serdo:this.state.data.Do,
    daily:this.state.data.daily,
    Available:this.state.data.Available,
    dateor:this.state.data.dateor,
    image:this.state.data.backimg
      })
    }
    var ref = firebaseApp.firestore().collection('Services').where('special','==',true).onSnapshot(this.cats)

  }
  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
}
cats = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    const newData = boards.filter(item => {
      const itemData = item.name;

       const textData = doc.data().Categories;
       if (itemData.indexOf(textData) === -1) {
       return  true
       }else {
       return  false
       }

    });
    if (newData) {
      boards.push({
  id:doc.data().postuid,
        name:doc.data().Categories});
    }
  });

  this.setState({catsarr: Object.values(boards)},function(){
    this.arrayholder = Object.values(boards)
  })

}
searchFilterFunction = text => {
  this.setState({ Categories: text });

  const newData = this.arrayholder.filter(item => {
    const itemData = item.name.toUpperCase();;

     const textData = text.toUpperCase();

     return itemData.indexOf(textData) > -1;
  });

  this.setState({ catsarr: newData });
};
onPress = datasf => this.setState({ datasf });

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
  Edits = () => {
    this.setState({
      ploading:true,
      postStatus: 'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    const refs = firebaseApp.firestore().collection('Services').doc(this.state.data.postuid)
    const newPostKey = this.state.data.postuid
    let d =this.state.Available
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].label;

    let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {office,Address,About,daily}=this.state
  if (this.state.sertitle.length >0) {
    if (this.state.Categories.length>0) {

if (this.state.serdes.length >0) {

          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            servicetitle:this.state.sertitle,
            type:this.state.typeofservice,
            user:username,
            haveplace:this.state.office,
            Categories:this.state.Categories,
            Address,
            price:this.state.advanced,
  priceper:selectedButton,
  priceav:this.state.priceav,
  curr:this.props.appStore.currency,

            About:this.state.serdes,
            verfied:this.state.data.verfied,
            Available:this.state.Available,
            ratingno:this.state.data.ratingno,
            dateor:this.state.dateor,
            nofollowers:this.state.data.nofollowers,
            proimg:'https://i.ibb.co/F8JsnxF/company.png',
            backimg:this.state.image,
            daily,
            time:this.state.time,
            end:end,
            special:true,
            Do:this.state.serdo,
            createdAt: this.state.data.createdAt,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

    refs.update(postData)
          .then(() => {

            this.setState({
                            postStatus: 'Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false,  spinner:false})
  this.props.navigation.navigate('Mappickers',{type:'Services',id:newPostKey})


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red',  spinner:false })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus: 'Please enter details & Description',shows:true ,pcolor:'red',  spinner:false})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus: 'Please  select category',shows:true ,pcolor:'red',  spinner:false})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: "Please enter your service name",shows:true ,pcolor:'red',  spinner:false})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'جاري النشر..':'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    const refs = firebaseApp.firestore().collection('Services').doc()
    const newPostKey = refs.id
    let d =this.state.Available
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].label;

    let end =Moment(this.state.dateor).add(d, 'hours').locale('en').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {office,Address,About,daily}=this.state
  if (this.state.sertitle.length >0) {
    if (this.state.Categories.length>0) {

if (this.state.serdes.length >0) {

          const postData = {
            writerId:firebaseApp.auth().currentUser.uid,
            servicetitle:this.state.sertitle,
            type:this.state.typeofservice,
            user:username,
            haveplace:this.state.office,
            Categories:this.state.Categories,
            Address,
curr:this.props.appStore.currency,
            price:this.state.advanced,
  priceper:selectedButton,
  priceav:this.state.priceav,
            About:this.state.serdes,
            verfied:false,
            Available:this.state.Available,
            ratingno:0,
            dateor:this.state.dateor,
            nofollowers:0,
            proimg:'https://i.ibb.co/F8JsnxF/company.png',
            backimg:this.state.image,
            daily,
            time:this.state.time,
            end:end,
            special:true,
            Do:this.state.serdo,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }

            //  updates["data/"+newPostKey+'/name'] =state.tag
    //       firebaseApp.database().ref('tags').set(this.state.tags.tagsArray)

    refs.set(postData)
          .then(() => {

            this.setState({
              postStatus: this.props.appStore.arabic?'شكرا لك':'Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:false,  spinner:false})
  this.props.navigation.navigate('Mappickers',{type:'Services',id:newPostKey})


          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red',  spinner:false })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

        this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء ادخال التفاصيل وماذا تقدم من مهارات':'Please enter details & Description',shows:true ,pcolor:'red',spinner:false,page:2})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

      this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء كتابة صنف الخدمة..':'Please enter type of service..',shows:true ,pcolor:'red',spinner:false,page:1})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء اضافة عنوان لخدمتك':"Please enter your service name",shows:true ,pcolor:'red',spinner:false,page:2})
      setTimeout(() => {
      this.setState({shows:false})
    }, 3000)
  }


  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
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
   pimgpick = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      this._handleImagePicked1(pickerResult);
    };
   _handleImagePicked1 = async pickerResult => {
      try {
        this.setState({uploading:true})

      this.setState({postStatus:'Uploading image..',refreshing:true})
        if (!pickerResult.cancelled) {
            this.setState({pimage:await uploadImageAsync(pickerResult.uri)})
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
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].label;

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
      <TouchableOpacity onPress={()=>this.setState({mapvis:true})} style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>

      <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.arabic?'اعرض مهارة خاصة':'Offer Speical Skills'}</Text>

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

           {this.state.page==1?this.AddTitle(theme):null}
           {this.state.page==2?this.addcover(theme):null}

           {this.state.page==2?this.AddChallenge(theme):null}
           {this.state.page==3?this.Addtruthques(theme):null}
           {this.state.page==3&&this.state.title=='both'?this.Adddare(theme):null}
           {this.state.page==2&&this.state.title=='love'?this.lovedoor(theme):null}
           {this.state.page==3&&this.state.title=='love'?this.hatedoor(theme):null}
           {this.state.page==2&&this.state.title=='lie'?this.liegame(theme):null}





<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>

      </ScrollView>
      <View
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

          style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,borderRadius: 9}}
        >
          <Text style={[gStyle.button,{color:'#eb144c'}]}>{this.props.appStore.arabic?'الرجوع':'Before'}</Text>
        </Button>
        <Button
          block

      onPress={this.state.page==3?this.state.editable?this.Edits:this.create:()=>{this.setState({page:++this.state.page})}}
          style={{justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,backgroundColor: "#eb144c",borderRadius: 9}}
        >
          <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==3?this.state.editable?this.props.appStore.arabic?'تعديل':'Edit':this.props.appStore.arabic?'نشر':'Post':this.props.appStore.arabic?'التالي':'Next'}</Text>
        </Button>
      </View>

      </View>
    )}

  </ThemeContext.Consumer>

    );
  }


AddTitle = (theme) => {
return (
  <View style={{flex:1,marginVertical: 10}}>

  <Item picker style={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d)=>this.setState({typeofservice:d})}

  >
  <Picker.Item label={this.props.appStore.arabic?'خدمة محلية':"Local Service"} value="local" />

  <Picker.Item label={this.props.appStore.arabic?'خدمة اونلاين':"Online Service"} value="online" />
  <Picker.Item label={this.props.appStore.arabic?'موهبة فريدة':"Special Talent"} value="talent" />

  </Picker>
  </Item>
  <Form style={{width:width}}>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder={this.state.typeofservice=='local'||this.state.typeofservice=='online'?this.props.appStore.arabic?'اضف صنف للخدمة مثل تسويق سوشيال..':'Type of service.. e.g: Social marketing':this.props.appStore.arabic?'صنف المهارة مثل رسم تمثيل..':'Type of skills e.g: acting,dancing..'}
  value={this.state.Categories} onChangeText={categories=>this.searchFilterFunction(categories)}
  />
  </Form>
  <View style={{alignItems: 'center',marginVertical: 10}}>
  <ScrollView horizontal={true}>
  {this.state.catsarr.map((item)=>{
    return(
    <TouchableOpacity onPress={()=>this.setState({Categories:item.name})} style={{marginHorizontal: 20,height: 50,padding: 20,borderRadius: 12,backgroundColor:item.selected?'#eb144c':'#fff',borderColor:'#eb144c',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
    <Text style={{color:item.selected?'#fff':'#eb144c'}}>{item.name}</Text>
    </TouchableOpacity>)
  })}
  </ScrollView>
  </View>
          </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>


  <Item picker style={{marginVertical:10}} >
  <Picker

 style={{ height: 50, width: width,marginVertical: 10}}
 selectedValue={this.state.office}
 onValueChange={(office)=>this.setState({office})}

>

<Picker.Item label="I Don't Have any Place yet" value="no" />
<Picker.Item label="I have local Place" value="yes" />

</Picker>
  </Item>
{this.state.office=="yes"?
<Form style={{width:width }}>

 <Input
    placeholder='Enter your Service address'
    value={this.state.Address} onChangeText={(Address)=>this.setState({Address})}
  />
</Form>
  :null}

              </View>
)
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
onUpdateItem = (i,d) => {
  this.setState({
    daily: this.state.daily.map(el => (el.day === i ? {...el, selected:!d} : el))
  });
 };

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',padding:10}}>

  <Form style={{width:width-10 }}>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',width:width-10,alignSelf: 'center'}} containerStyle={{borderRadius: 12}}
    placeholder={this.state.typeofservice=='local'||this.state.typeofservice=='online'?this.props.appStore.arabic?'استطيع ان اجلب 5 الاف متابع على الانستاقرام':'I can get 5k followers in social..':this.props.appStore.arabic?'انا جيد في الرسم, تمثيل كوميديا..':'I am good at drawing,comedy acting..'}
    onChangeText={(d)=>this.setState({sertitle:d})} value={this.state.sertitle}

  />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  {this.props.appStore.arabic?'حول الخدمة':'About your Service'}
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff',width:width-20}]} value={this.state.serdes} onChangeText={(serdes)=>this.setState({serdes})} bordered placeholder={this.props.appStore.arabic?"اضف تفاصيل..":'Please enter details..'} />
<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'ماذا تقدم من مهارات ومواهب':'What you do in your Service'}
</Label>
<Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]}   value={this.state.serdo} onChangeText={(serdo)=>this.setState({serdo})} bordered placeholder={this.props.appStore.arabic?'اكتب هنا المهارات والمواهب التي تقدمها والخدمات الخاصة..':`Write things you Special in and what you do in your service..
`} />
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
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10,marginTop: 30}}>
      {this.props.appStore.arabic?'السعر':'Pricing'}
      </Label>
  <Item picker style={{marginVertical:10}} >
  <Picker

 style={{ height: 50, width: width,color: '#eb144c'}}
 selectedValue={this.state.priceav}
 onValueChange={(priceav)=>this.setState({priceav})}

>
<Picker.Item label={this.props.appStore.arabic?'مبلغ ثابت':"Fixed Price"} value={true} />

<Picker.Item label={this.props.appStore.arabic?'لايوجد مبلغ':"No Fee"} value={false} />


</Picker>
  </Item>

  {this.state.priceav ? <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',flex:1}}>
       <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd',flex:1}} containerStyle={{borderRadius: 12,width: width-50}}
      placeholder="500" keyboardType={'numeric'}
    onChangeText={(d)=>this.setState({advanced:d})} value={this.state.advanced}
    />
    <View style={{justifyContent: 'center',alignItems: 'center'}}>
  <Text style={{fontFamily: 'ralewaysemi',fontSize: 17,marginHorizontal: 5}}>{this.props.appStore.currency}</Text>
    </View>
  </View>:null}
{this.state.priceav ? <Form style={{width:width-10 }}>

<Label style={{fontFamily: 'raleway',marginVertical: 10}}>
  {this.props.appStore.arabic?'السعر حسب':'price per'}
    </Label>
    <View style={{flex:1,justifyContent: 'flex-start'}}>
<RadioGroup radioButtons={this.state.datasf} onPress={this.onPress} />
</View>
</Form>:null}

<Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
{this.props.appStore.arabic?'الايام المتاحة':'Days Opening'}
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
{this.props.appStore.arabic?'الوقت المتاح':'Time Opening'}
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
