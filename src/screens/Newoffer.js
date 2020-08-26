import React from "react";
import { Alert ,Dimensions,ScrollView,View,StyleSheet,TouchableOpacity,TouchableHighlight,Image,ActivityIndicator} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Footer, FooterTab} from 'native-base';
import RNPicker from "rn-modal-picker";
import { TextInputMask } from 'react-native-masked-text'

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
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';


import { Button,Header,Item,Icon,Label,Title } from 'native-base';
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
import RadioGroup from 'react-native-radio-buttons-group';

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
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
        Searched:'',
        text:'',
page:1,
game:'',
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
          label: props.appStore.arabic?'عرض':'Offer',
          value: "Offer",
          selected:false
      },
],
 isDateTimePickerVisible: false,
        lovemsg:'',
        typeofservice:'local',
        hatemsg:'',
         serverData: [],
        lie:'',
        Address:'',
          advanced:0,
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
       name: "Physiotharaphy Services"
     },
     {
       id: 37,
       name: "Psychologists"
     },
     {
       id: 38,
       name: "Road Assistance"
     },
     {
       id: 39,
       name: "Security Guard"
     },
     {
       id: 40,
       name: "Snow Plows"
     },
     {
       id: 41,
       name: "Sofa Repair"
     },
     {
       id: 42,
       name: "Spa"
     },
     {
       id: 43,
       name: "Tour Guide"
     },
     {
       id: 44,
       name: "Tow Truck"
     },
     {
       id: 45,
       name: "Translator"
     },
     {
       id: 46,
       name: "Travel Agent"
     },
     {
       id: 47,
       name: "Private language tutor / teacher"
     },
     {
       id: 48,
       name: "TV Repairer"
     },
     {
       id: 49,
       name: "Vet"
     },
     {
       id: 50,
       name: "Workers"
     },
     {
       id: 51,
       name: "Yoga Trainer"
     },
     {
       id: 52,
       name: "Developer"
     }
     ,
     {
       id: 53,
       name: "Design"
     },
     {
       id:54,
       name: "Design"
     },

     {
       id: 55,
       name: "other"
     }


   ],
   placeHolderText: "Select Service you offer",
   selectedText: "",
        title:'',
postStatus:null,
office:'no',
Available:0,
postas: props.navigation.getParam('postuid',''),

dateor:'',
end:'',
serdo:'',
serdes:'',
profiles:[],
priceav:true,
sertitle:'',
image:'',
asas:'',
        color1:'steelblue',
        color:'red',
        commentsRef:'',
        time:'',
        dataSources: [],
data:  props.navigation.getParam('data',[]),
username:  props.navigation.getParam('username',''),
myuid:  props.navigation.getParam('myuid',''),
secret:  props.navigation.getParam('secret',false),
offer:  props.navigation.getParam('offer',false),
postuid:  props.navigation.getParam('postuid',''),

firstlie:'',
secondlie:'',
thirdlie:'',
        commentsRefs:'',
    };
    this.arrayholder=[]



  }
  componentDidMount() {

    var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)

}
onCollectionUpdate = (querySnapshot) => {
  const boards = [];
  querySnapshot.forEach((doc) => {
    boards.push(doc.data());
  });
  this.setState({profiles:boards})

}

  _selectedValue(index, item) {
  this.setState({ selectedText: item.name });
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
  onPress = datasf => this.setState({ datasf });
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

  create = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'نشر..':'Posting..',
      shows:true,pcolor:'warning'
    })
    let selectedButton = this.state.datasf.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.datasf[0].label;

    const refs = firebaseApp.firestore().collection('Offers').doc()
    const newPostKey = refs.id
    let d =this.state.Available
    let ob = this.state.profiles.find(e => e.postuid == this.state.postas);
    var userimg = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.photoURL:ob.proimg

    var userdis = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.displayName:ob.Businessname
    let end =Moment(this.state.dateor).add(d, 'hours').format('hh:mm A')
          const username = firebaseApp.auth().currentUser.displayName
    const {office,Address,About,daily}=this.state
  if (this.state.sertitle.length >0) {
    if (this.state.advanced>0||(!this.state.priceav)) {

if (this.state.serdes.length >0) {

          const postData = {
            writerId:this.state.postas,
            servicetitle:this.state.sertitle,
            user:userdis,
            price:this.state.advanced,
            About:this.state.serdes,
            priceper:selectedButton,
            verfied:false,
            priceav:this.state.priceav,
            curr:this.props.appStore.currency,
            nofollowers:0,
            ratingno:0,
            proimg:userimg,
            backimg:this.state.image,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}

          refs.set(postData)
          .then(() => {
this.props.navigation.goBack()
            this.setState({
                            postStatus:this.props.appStore.arabic?'شكرا لك': 'Thank you',
                            title:'',
                            lovemsg:'',
                            hatemsg:'',

                          })
  this.setState({shows:true})
          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })


      } else {

          this.setState({ploading:false,  postStatus: this.props.appStore.arabic?'الرجاء كتابة الشرح والتفاصيل':'Please enter details & Description',shows:true ,pcolor:'red'})
          setTimeout(() => {
          this.setState({shows:false})
        }, 3000)
      }
    } else {

        this.setState({ploading:false,  postStatus:  this.props.appStore.arabic?'الرجاء اضافة سعر':'Please Add Price',shows:true ,pcolor:'red'})
        setTimeout(() => {
        this.setState({shows:false})
      }, 3000)
    }
  } else {

    this.setState({ploading:false,  postStatus:  this.props.appStore.arabic?'الرجاء اضافة عنوان العرض':"Please enter your Offer name",shows:true ,pcolor:'red'})
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
    this.setState({time:Moment(date).format('hh:mm A'),dateor:date})
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
        <Text style={{fontFamily: 'ralewaysemi'}} numberOfLines={1}>{this.props.appStore.arabic?'عرض جديد':'New offer'}</Text>

        </TouchableOpacity>
                   </Body>

        </Header>

      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center'}]}
        style={gStyle.containersssss[theme]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={this.props.appStore.arabic?'جاري التحميل..':'Loading...'}
             textStyle={{color:'#fff'}}
           />
           {this.state.page==1?this.addcover(theme):null}

           {this.state.page==1?this.AddChallenge(theme):null}




           <Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize:15,color: 'red'}]}>{this.state.postStatus}</Text>

{!this.state.secret?<View
  style={{
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
width
  }}
>

  <Button
    block

onPress={this.state.page==1?this.create:()=>{this.setState({page:++this.state.page})}}
    style={{ justifyContent: 'center', alignItems: 'center',padding: 15,flex:1,marginHorizontal: 5,backgroundColor: "#eb144c"}}
  >
    <Text style={[gStyle.button,gStyle.text['dark']]}>{this.state.page==1?this.props.appStore.arabic?'نشر':'Post':'Next'}</Text>
  </Button>
</View>:null}
<Text style={[gStyle.text[theme],  gStyle.p,{alignSelf: 'center',marginHorizontal: 20,fontSize: 21}]}>{this.state.postStatus}</Text>

      </ScrollView>
      <Footer style={{backgroundColor: 'white'}} backgroundColor="white">
         <FooterTab style={{backgroundColor: 'white',flexDirection: 'row',alignItems: 'center'}} >
         <Text> {this.props.appStore.arabic?'نشر باسم':'Post as :'}</Text>
         <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
         <Picker

         style={{ height: 50, width: width-100,alignSelf: 'center',marginVertical: 10,color: '#eb144c'}}
         selectedValue={this.state.postas}
         onValueChange={(d,i)=>this.setState({postas:d,asas:i})}

         >

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
  <View style={{flex:1,marginVertical: 10}}>
  <Item picker styke={{marginVertical:10,alignSelf:'center',alignItems:'center'}} >
  <Picker

  style={{ height: 50, width: width-20,alignSelf: 'center',marginVertical: 10}}
  selectedValue={this.state.typeofservice}
  onValueChange={(d)=>this.setState({typeofservice:d})}

  >

  <Picker.Item label="Local Service" value="local" />
  <Picker.Item label="Online Service" value="online" />

  </Picker>
  </Item>
  <View style={{borderWidth: 1,borderColor: '#dddddd',marginBottom: 10}}/>
{this.state.typeofservice=='local'?  <RNPicker
           dataSource={this.state.dataSource}
           dummyDataSource={this.state.dataSource}

           defaultValue={false}
           pickerTitle={"Services Picker"}
           showSearchBar={true}
           disablePicker={false}
           changeAnimation={"none"}
           searchBarPlaceHolder={"Search....."}
           showPickerTitle={true}
           pickerStyle={Styles.pickerStyle}
           itemSeparatorStyle={Styles.itemSeparatorStyle}
           pickerItemTextStyle={Styles.listTextViewStyle}
           selectedLabel={this.state.selectedText}
           placeHolderLabel={this.state.placeHolderText}
           selectLabelTextStyle={Styles.selectLabelTextStyle}
           placeHolderTextStyle={Styles.placeHolderTextStyle}
           dropDownImageStyle={Styles.dropDownImageStyle}
           selectedValue={(index, item) => this._selectedValue(index, item)}
         />:
         <RNPicker
                  dataSource={this.state.Online}
                  defaultValue={false}
                  pickerTitle={"Services Picker"}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Search....."}
                  showPickerTitle={true}
                  pickerStyle={Styles.pickerStyle}
                  itemSeparatorStyle={Styles.itemSeparatorStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.selectedText}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />}
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
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-start',marginRight: 20}]}>{this.props.appStore.arabic?'معلومات العرض':'Offer Information'}</Text>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
  {this.props.appStore.arabic?'العنوان':'Title'}
  </Label>
  <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder={this.props.appStore.arabic?'لدينا خصم 50% على خدماتنا..':"We have 50% discount on our services.."}
onChangeText={(d)=>this.setState({sertitle:d})} value={this.state.sertitle}
  />
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10,marginTop: 30}}>
      {this.props.appStore.arabic?'السعر':'Pricing'}
      </Label>
  <Item picker style={{marginVertical:10}} >
  <Picker

 style={{ height: 50, width: width,color: '#eb144c'}}
 selectedValue={this.state.priceav}
 onValueChange={(priceav)=>this.setState({priceav})}

>
<Picker.Item label={this.props.appStore.arabic?'سعر ثابت':"Fixed Price"} value={true} />

<Picker.Item label={this.props.appStore.arabic?'لايوجد سعر معين':"No Fee"} value={false} />


</Picker>
  </Item>
{this.state.priceav ? <Label style={{fontFamily: 'raleway',marginVertical: 10}}>
  {this.props.appStore.arabic?`السعر ب ${this.props.appStore.currency}`:`Price (in ${this.props.appStore.currency})`}
  </Label>:null}
  {this.state.priceav ? <Input inputStyle={{backgroundColor: '#ffffff',padding: 10,borderWidth: 0.4,borderColor: '#dddddd'}} containerStyle={{borderRadius: 12}}
    placeholder={this.props.appStore.arabic?'مثال : 400':"e.g: 500"} keyboardType={'numeric'}
  onChangeText={(d)=>this.setState({advanced:d})} value={this.state.advanced}
  />:null}
{this.state.priceav ? <Form style={{width:width-10 }}>

<Label style={{fontFamily: 'raleway',marginVertical: 10}}>
    {this.props.appStore.arabic?'السعر حسب':'Price per'}
    </Label>
    <View style={{flex:1,justifyContent: 'flex-start'}}>
<RadioGroup radioButtons={this.state.datasf} onPress={this.onPress} />
</View>
</Form>:null}
  <Label style={{fontFamily: 'ralewaysemi',marginVertical: 10}}>
  {this.props.appStore.arabic?'حول الخدمة':'About your Offer'}
  </Label>

              <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]} value={this.state.serdes} onChangeText={(serdes)=>this.setState({serdes})} bordered placeholder={this.props.appStore.arabic?'اكتب الشرح..':"Enter Description.."} />
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
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-start',marginLeft: 20}]}>Offers & Time Opening</Text>

  <Form style={{width:width-10 }}>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  What you do in your Service
  </Label>
  <Textarea rowSpan={5} style={[gStyle.text[theme],{backgroundColor: '#ffffff'}]}  value={this.state.serdo} onChangeText={(serdo)=>this.setState({serdo})} bordered placeholder={`Enter list of services/offers you do in your business..
  `} />
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  Days Opening
  </Label>

  <View style={{alignItems: 'center',marginVertical: 10}}>
  <ScrollView horizontal={true}>
  {this.state.daily.map((item)=>{
    return(
    <TouchableOpacity onPress={()=>this.onUpdateItem(item.day,item.selected)} style={{marginHorizontal: 20,flex:1,padding: 20,borderRadius: 12,backgroundColor:item.selected?'#eb144c':'#fff',borderColor:'#eb144c',borderWidth: 0.5,alignItems: 'center',justifyContent: 'center'}}>
    <Text style={{color:item.selected?'#fff':'#eb144c'}}>{item.day}</Text>
    </TouchableOpacity>)
  })}
  </ScrollView>
  </View>
  <Label style={{fontFamily: 'ralewaymedium',marginVertical: 10}}>
  Time Opening
  </Label>
  <View style={{padding: 20}}>
  <Button



  block
    onPress={this.showDateTimePicker}

    style={{ justifyContent: 'center', alignItems: 'center',flex:1,marginHorizontal: 5,width: '100%',backgroundColor:'#eb144c'}}
  >
    <Text style={[gStyle.button,{color:'#fff'}]}>{this.state.time.length>0?this.state.time:'Pick time Available'}</Text>
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
        <Picker.Item label="24 hours available" value={0} />

        <Picker.Item label="Working 2 hours/day" value={2} />

        <Picker.Item label="Working 3 hours/day" value={3} />
        <Picker.Item label="Working 4 hours/day" value={4} />

        <Picker.Item label="Working 5 hours/day" value={5} />
        <Picker.Item label="Working 6 hours/day" value={6} />
        <Picker.Item label="Working 7 hours/day" value={7} />
        <Picker.Item label="Working 8 hours/day" value={8} />
        <Picker.Item label="Working 9 hours/day" value={9} />
        <Picker.Item label="Working 10 hours/day" value={10} />
        <Picker.Item label="Working 11 hours/day" value={11} />

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
addcover = (theme) => {
return (
  <TouchableOpacity onPress={this._pickImage} style={{flex:1,justifyContent: 'center',alignItems: 'center',marginVertical: 10}}>
{this.state.uploading?<ActivityIndicator />:
  <Image style={{width:width-10,height: 150,resizeMode: 'cover',borderRadius: 9}} source={{uri:this.state.image.length==0?'https://i.ibb.co/yB5mJkr/1.png':this.state.image}}/>

}

  </TouchableOpacity>
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
