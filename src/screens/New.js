import React from "react";
import { Alert ,Dimensions,ScrollView,View,PixelRatio,StyleSheet,TouchableOpacity,TouchableHighlight,TextInput,Image} from "react-native";
// Argon themed components
import {   List, ListItem, Left, Body, Right, Thumbnail,Text,Form,Textarea,Content,Switch} from 'native-base';

const { width,height } = Dimensions.get("screen");
import { useTheme } from 'react-navigation';
import { gStyle, images } from '../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Trainer from '../components/Trainer';
import * as firebase from 'firebase';
import {  Picker } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';

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

import { Button,Header,Item,Icon,Input,Label } from 'native-base';


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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SwipeablePanel from 'rn-swipeable-panel';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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
      init: true,
      errMsg: null,
      saveUpSuccess: false,
      post:'',
      username:  props.navigation.getParam('username',''),
 swipeablePanelActive: false,
      name:  props.navigation.getParam('name',''),
      email:  props.navigation.getParam('email',''),
      password: '',
      isReady: false,
  status: null,
  postas:props.navigation.getParam('postas',firebaseApp.auth().currentUser.uid),
  profiles:[],
  dataedit: props.navigation.getParam('data',[]),

edit: props.navigation.getParam('edit',false),
id:  props.navigation.getParam('id',''),
image:props.navigation.getParam('img',''),
  quality: null,
  error: null,
  isPlaying: true,
  isLooping: true,
  duration: 0,
  currentTime: 0,
  fullscreen: false,
  playerWidth: Dimensions.get('window').width,
    };
    this.arrayholder=[]



  }
  componentDidMount ()  {
    var ref = firebaseApp.firestore().collection('Business').where('writerId', '==', firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)
if (this.state.edit) {
  this.setState({post:this.state.dataedit.post,postas:this.state.dataedit.writerId,image:this.state.dataedit.image})
}
  };
  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      boards.push(doc.data());
    });
    this.setState({profiles:boards})

  }
  openPanel = () => {
      this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
      this.setState({ swipeablePanelActive: false });
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
  edit = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'جاري النشر..':'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    const refs = firebaseApp.firestore().collection('Posts').doc(this.state.id)
    const newPostKey = this.state.id
    let ob = this.state.profiles.find(e => e.postuid == this.state.postas);
    var userimg = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.photoURL:ob.proimg

    var userdis = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.displayName:ob.Businessname
    var business = this.state.postas ===firebaseApp.auth().currentUser.uid?false:true

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName

  if (this.state.post.length>0 ) {



          const postData = {
            writerId:this.state.postas,
            post:this.state.post,
            user:userdis,
            image:this.state.image,
            nooflike:this.state.dataedit.nooflike,
            proimg:userimg,
            noofcomment:this.state.dataedit.noofcomment,
          accept:this.state.dataedit.accept,
          business,
            createdAt: this.state.dataedit.createdAt,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}
          refs.update(postData)

          .then(() => {

            this.setState({
              postStatus: this.props.appStore.arabic?'تم شكرا لك.':'Done, Thank you',
                            post:'',
spinner:false,
                          })
  this.setState({shows:false})
  alert(this.props.appStore.arabic?'تم النشر بنجاح':'Posted successfully')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })



    }
else {
  this.setState({ postStatus: this.props.appStore.arabic?'الرجاء كتابة منشورك':'Please write your post',pcolor:'red',spinner:false })

}

  }
  create = () => {
    this.setState({
      ploading:true,
      postStatus: this.props.appStore.arabic?'جاري النشر..':'Posting..',
      spinner:true,
      shows:true,pcolor:'warning'
    })
    const refs = firebaseApp.firestore().collection('Posts').doc()
    const newPostKey = refs.id
    let ob = this.state.profiles.find(e => e.postuid == this.state.postas);
    var userimg = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.photoURL:ob.proimg

    var userdis = this.state.postas ===firebaseApp.auth().currentUser.uid?firebaseApp.auth().currentUser.displayName:ob.Businessname
    var business = this.state.postas ===firebaseApp.auth().currentUser.uid?false:true

          const uid = firebaseApp.auth().currentUser.uid
          const username = firebaseApp.auth().currentUser.displayName

  if (this.state.post.length>0 ) {



          const postData = {
            writerId:this.state.postas,
            post:this.state.post,
            user:userdis,
            nooflike:[],
            proimg:userimg,
            noofcomment:[],
            image:this.state.image,
          accept:false,
          business,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            postuid:newPostKey,

          }
          let updates = {}
          let updatess = {}
          refs.set(postData)

          .then(() => {

            this.setState({
                            postStatus: this.props.appStore.arabic?'تم شكرا لك.':'Done, Thank you',
                            post:'',
spinner:false,
                          })
  this.setState({shows:false})
  alert(this.props.appStore.arabic?'تم النشر بنجاح':'Posted successfully')
this.props.navigation.goBack()

          })
          .catch(() => {
            this.setState({ postStatus: 'Something went wrong!!!',pcolor:'red' })
          })

        .catch(error => {
          console.log(error)
        })



    }
else {
  this.setState({ postStatus: this.props.appStore.arabic?'الرجاء كتابة منشورك':'Please write your post',pcolor:'red',spinner:false })

}

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

     this.setState({postStatus:this.props.appStore.arabic?'جاري التحميل..':'Image Loading..',refreshing:true})
       if (!pickerResult.cancelled) {
           this.setState({image:await uploadImageAsync(pickerResult.uri)})
       }
     } catch (e) {
       console.log(e);
       this.setState({postStatus:'Something went wrong',refreshing:false})

     } finally {
       this.setState({uploading:false,refreshing:false})
       this.setState({postStatus:''})


     }
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

          <Header style={{width: Dimensions.get('window').width,backgroundColor: '#fff'}}>
      <Left>
      <Button transparent onPress={()=>navigation.goBack()}>
      <MaterialCommunityIcons  name='close' size={30} color='black' />

      </Button>
      </Left>
    {/*  <Body style={{justifyContent: 'center',alignItems: 'center'}}>
      <Picker

     style={{ height: 50, width: '100%',textAlign: 'right',alignSelf: 'center',alignItems: 'center',justifyContent: 'flex-end'}}


    >

    <Picker.Item label="Others" value="Others" />
    <Picker.Item label="Past Paper" value="Past Paper" />
    <Picker.Item label="Subject" value="Subject" />
    <Picker.Item label="Freelancer" value="Freelancer" />
    <Picker.Item label="Exam Schedule" value="Exam Schedule" />
    <Picker.Item label="Event" value="Event" />
    <Picker.Item label="Subject Videos" value="Subject Videos" />
    <Picker.Item label="Exam Reviews" value="Exam Reviews" />

    </Picker>
          </Body>*/}
      <Right>
      <TouchableOpacity onPress={this.state.edit?this.edit:this.create}>
      <MaterialCommunityIcons  name='send' size={30} color='black' />
</TouchableOpacity>
      </Right>
      </Header>
      <ScrollView
        contentContainerStyle={[gStyle.contentContainerss,{alignItems: 'center',paddingVertical: 0,backgroundColor: 'white'}]}
        style={[gStyle.containersssss[theme],{paddingTop: 0,paddingVertical: 0}]}
      >
      <Spinner
             visible={this.state.spinner}
             textContent={this.props.appStore.arabic?'جاري التحميل':'Loading...'}
             textStyle={{color:'#fff'}}
           />




             <Label style={[gStyle.text[theme],{color:'#eb144c'}]}>{this.state.postStatus}</Label>

             <TextInput
                placeholder={this.props.appStore.arabic?"اضف منشور جديد, خبر, وظيفة, ايا شئ تريده..":"Add New post, News, Job, Something you need.."}
                keyboardType="default"
                multiline={true}
                autoFocus={false}
                style={{ flex: 1,
               fontSize: 16,
               width,
               backgroundColor: 'white',
               padding: 20,

               textAlignVertical: 'top'}}
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                 value={this.state.post} onChangeText={(d)=>this.setState({post:d})}
              />
<Image style={{width:width-10,height: 150,resizeMode: 'contain',borderRadius: 9}} source={{uri:this.state.image}}/>

      </ScrollView>
      <SwipeablePanel
               fullWidth
               isActive={this.state.swipeablePanelActive}
               onClose={this.closePanel}
               showCloseButton


               onPressCloseButton={this.closePanel}
           >

            <ListItem icon button onPress={this._pickImage} style={{marginTop: 20}}>
               <Left>
                 <Button onPress={this._pickImage} style={{ backgroundColor: "#eb144c" }}>
                   <FontAwesome  name='image' size={15} color='white'  />
                 </Button>
               </Left>
               <Body>
                 <Text>{this.props.appStore.arabic?'اضف صورة':'Add Image'}</Text>
               </Body>

             </ListItem>
             <View style={{backgroundColor: 'white',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}} >
             <Text> {this.props.appStore.arabic?'نشر كحساب':'Post as :'} </Text>
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
</View>
   </SwipeablePanel>
  {!this.state.swipeablePanelActive? <Button block style={{backgroundColor: 'white'}} onPress={()=>this.setState({swipeablePanelActive:true})}>
   <Text style={{color:'#eb144c'}}>
{this.props.appStore.arabic?'خيارات اكثر':'More option'}
   </Text>
   <Ionicons  name='md-options' size={15} color='#eb144c'  />
   </Button>:null}
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
  _handleSave = () => {


      if (this.state.name.length < 5) {
        this.setState({ errMsg: "يجب ان يتكون اسمك من 5 احرف على الاقل" })
      }
      else {
        this.setState({ errMsg: "جاري حفظ الاسم" })
        firebaseApp.auth().onAuthStateChanged(user => {

        user.updateProfile({ displayName: this.state.name })
        })


      }


      if (this.state.email.length == 0) {
        this.setState({ errMsg: "الرجاء ادخال بريدك الالكتروني" })
      }
      else {
        this.setState({ errMsg: "جاري حفظ بريدك االكتروني" })
        firebaseApp.auth().onAuthStateChanged(user => {

          user.updateEmail(this.state.email)
          .then(() => {
            this.setState({ errMsg: "تم تغيير البريد الالكتروني" })
          })
          .catch((error) => {
            this.setState({ errMsg: error.message })
          })        })

      }


  }
AddTitle = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اختر باب</Text>

  <Item picker >
  <Picker

 style={{ height: 50, width: width,color:'white' }}
 selectedValue={this.state.title}
 onValueChange={this.onValueChange1.bind(this)}

>
<Picker.Item label="اختر الباب" value="null" />

<Picker.Item label="باب الصراحة" value="truth" />
<Picker.Item label="باب التحدي" value="challenge" />
<Picker.Item label="باب الجرأة والصراحة" value="both" />
<Picker.Item label="باب الحب والكراهية" value="love" />
<Picker.Item label="باب الكذب" value="lie" />

</Picker>
  </Item>
  </View>
)
}
AddTruth = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ لصديقك تصارحه فيه..</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5}  style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="مالذي تريد مصارحة صديقك فيه.." />
            </Form>
              </View>
)
}

AddChallenge = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>..اكتب تحدي لصديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} value={this.state.lovemsg} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ما التحدي الذي تريده.." />
            </Form>
              </View>
)
}
Adddare = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب شئ يتطلب الجرأة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="ماذا تريد من صديقك ان يفعل اذا اختار باب الجرأة.." />
            </Form>
              </View>
)
}
Addtruthques = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب سؤال تريد من صديقك الاجابة عليه بصراحة</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا تريد من صديقك ان يصارحك به اذا اختار باب الصراحة" />
            </Form>
              </View>
)
}
lovedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>اكتب اكثر شئ تحبه في صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea rowSpan={5} style={gStyle.text[theme]} onChangeText={(lovemsg)=>this.setState({lovemsg})} bordered placeholder="ماذا يعجبك اكثر في شخصية صديقك.." />
            </Form>
              </View>
)
}
hatedoor = (theme) => {
return (
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
  <Text style={[gStyle.Title,gStyle.text[theme],{alignSelf: 'flex-end',marginRight: 20}]}>ماذا تكره في شخصية صديقك</Text>

  <Form style={{width:width-10 }}>
              <Textarea  rowSpan={5} style={gStyle.text[theme]}  onChangeText={(hatemsg)=>this.setState({hatemsg})} bordered placeholder="مالذي تكرهه في شخصية صديقك.." />
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
