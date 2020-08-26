import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity ,Linking,Image,ImageBackground} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Segment,Form, Item, Label,Button ,Body,Thumbnail,Tab, Tabs, ScrollableTab,Icon} from 'native-base';
import { firebaseApp } from '../../firebase'
var voucher_codes = require('voucher-code-generator');
import {  ListItem, CheckBox } from 'native-base';
import AutoTypingText from 'react-native-auto-typing-text';
import OneSignal from 'react-native-onesignal'
import { Input } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
// components
import Touch from '../components/Touch';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Login from '../screens/Login';
import SwipeablePanel from 'rn-swipeable-panel';
import Spinner from 'react-native-loading-spinner-overlay';


const Signup = ({ navigation }) => {
  const [errMsg, seterror] = useState('')
  const [name, setname] = useState('')
  const [password, setpass] = useState('')
  const [email, setmail] = useState('')
  const [username, setuser] = useState('')
  const [code, setcode] = useState('')
  const [check, setcheck] = useState(false)
  const [modal, setmodal] = useState(false)
  const [active, setactive] = useState(false)
  const [id, setid] = useState('')
  const [clicked, setclick] = useState(false)
  const [checkedcode, setchecks] = useState('')
  const [increa, setinc] = useState(false)
  const [ref, setspinner] = useState(false)
  const [arabic, setarabic] = useState(false)

  const openPanel = () => {
    setmodal(true)

  };

 const closePanel = () => {
      setmodal(false)
  };
  const [secret, setsecret] = useState('')
  const facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('897285013968583', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

function  validate(text){
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
setmail(text)
seterror("البريد غير صحيح")
      return false;
    }
    else {
      setmail(text)
      seterror("")

      console.log("Email is Correct");
    }
  }
  function codes(value: string) {
    var d =voucher_codes.generate({
      length: 4,
      count: 1,


        charset:username

    });  var d =voucher_codes.generate({
        length: 4,
        count: 1,


          charset:username

      });

    setcode(d.toString());
  }

const  checks =()=>{
  console.log("code check");
  firebaseApp.firestore().collection('Promo').doc(code.toLowerCase()).get()
.then((docSnapshot) => {
if (docSnapshot.exists) {
  setchecks(code)
  console.log("exist "+docSnapshot.data().id);
  setid(docSnapshot.data().id)
  setclick(true)
closePanel()
setactive(true)
} else {
  setactive(false)
  setclick(true)

}
});

}
const inc=async()=>{

console.log("dssdssdsdsdsdsdsdss");


let cityRef = firebaseApp.firestore().collection("users").doc(id)
              try {
      await firebaseApp.firestore().runTransaction(async (t) => {
        const doc = await t.get(cityRef);

        // Add one person to the city population.
        // Note: this could be done without a transaction
        //       by updating the population using FieldValue.increment()
        const newPopulation = doc.data().balance + 500;
        t.update(cityRef, {balance: newPopulation});
      });
setinc(true)
      console.log('Transaction success!');
    } catch (e) {
      console.log('Transaction failure:', e);
    }


}
  const theme = useTheme();
function  _handleSignUp  ()  {
var balance =50
let checked =false
    seterror(arabic?'جاري التسجيل..':'Signup..');
setspinner(true)
console.log("checkedd "+checked);
      if (name.length < 0) {
          seterror(arabic?'الرجاء ادخال اسمك':'Please enter your name')
          setspinner(false)

      }
    else  if (username.length < 5) {
          seterror(arabic?'الرجاء ادخال اسم مستخدم لايقل عن 5 احرف':'Please enter username more than 5 character')
          setspinner(false)

      }
      else if (email.length == 0) {

          seterror(arabic?'الرجاء ادخال البريد الالكتروني':'Please enter email address')
          setspinner(false)

      }
      else if (password.length == 0) {
        seterror(arabic?'الرجاء ادخال كلمة المرور':"Please enter password")
        setspinner(false)

      }
      else {
firebaseApp.firestore().collection('usernameList').doc(username.toLowerCase()).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            seterror(arabic?'اسم المستخدم غير متاح':"username does not exist" )
            setspinner(false)

          }
          else {
            firebaseApp.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((user) => {
              const userId = firebaseApp.auth().currentUser.uid;
              const userem = firebaseApp.auth().currentUser.email;



              firebaseApp.firestore().collection('usernameList').doc(username.toLowerCase()).set({userId})

              firebaseApp.auth().currentUser.updateProfile({displayName:name,photoURL:'https://i.ibb.co/PNBcBVg/users.png'})
              .then(() => {
                const userId = firebaseApp.auth().currentUser.uid;
                const names= name
                console.log(balance+"..ba check");

                const usernames= username
                const email = firebaseApp.auth().currentUser.email;
              firebaseApp.firestore().collection('users').doc(userId)
                .set({
                  userId,
                  name:names,
                  proimg:'https://i.ibb.co/PNBcBVg/users.png',
                  balance,
                  promo:'',
                  username:usernames,
                  email,
                })
                OneSignal.sendTag("username", usernames)
                OneSignal.sendTag("uid", userId)
                if (active) {
                  balance =550
                  if (!increa) {
                    inc()

                  }
                }
                setspinner(false)

                navigation.navigate('navload',{arabic})
              }, function(error) {
                console.log(error);
                  setspinner(false)
              });
            })
            .catch((error) => {
              seterror(error.message)
                setspinner(false)

            })
          }
        })
      }
    }

  return (
    <View style={{flex:1}}>
    <Spinner
           visible={ref}
           textContent={arabic?'جاري التحميل..':'Loading...'}
           textStyle={{color:'#fff'}}
         />
    <ImageBackground style={{width: Dimensions.get('window').width,flex:0.5,resizeMode: 'cover',alignItems: 'center',justifyContent: 'center'}} source={{uri:'https://i.ibb.co/BCKd702/photo-of-man-holding-a-book-927022.jpg'}} >
    <LinearGradient
             colors={['rgba(85,85,85,22)','rgba(0,0,0,0.001)']}
             style={{  alignItems: 'center',   width: Dimensions.get('window').width,height: '100%',justifyContent: 'flex-start',padding: 20}}>
<Thumbnail  style={{width: 50,resizeMode: 'contain',height: 50, alignSelf: 'center'}}  source={require('../assets/iconapp.png')} />
             <Text
               style={{
                 backgroundColor: 'transparent',
                 fontSize: 21,
                 color: '#fff',


                 alignSelf: 'center',textAlign: 'center',
                 fontFamily: 'ralewaysemi'
               }}>
              {arabic?'فكرة':'Fekra'}
             </Text>
             <Text
               style={{
                 backgroundColor: 'transparent',
                 fontSize: 17,
                 color: '#fff',

                 fontWeight: '700',

                 alignSelf: 'center',textAlign: 'center',
                 fontFamily: 'ralewaysemi'
               }}>
              {arabic?'خدمات, أعمال, وظائف, عروض':'On Demand Services, Business, Jobs, Offers'}.
             </Text>
    </LinearGradient>
   </ImageBackground>
   <Tabs   style={{marginBottom: 10,backgroundColor: '#fff'}} backgroundColor="#fff" tabBarUnderlineStyle={{backgroundColor:'#eb144c'}}>
   <Tab heading={arabic?'تسجيل':"Signup"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
   <ScrollView
     contentContainerStyle={[gStyle.Centercont,{width: Dimensions.get('window').width}]}
     style={gStyle.container[theme]}
   >
   <Segment style={{backgroundColor: 'white',borderColor: 'black',padding: 10}}>
                <Button first dark={!arabic} bordered onPress={()=>setarabic(false)} style={{padding: 10}}><Text style={{fontFamily: 'raleway'}}>English</Text></Button>
                <Button dark={arabic} last active bordered onPress={()=>setarabic(true)}  light={!arabic} style={{padding: 10}}><Text style={{fontFamily: 'raleway'}}>عربي</Text></Button>
              </Segment>
     <Text   style={[gStyle.text[theme],{color: "red"}]}>{errMsg} </Text>

             <Form style={{width:Dimensions.get('window').width-50,paddingRight: 10}}>
             <Item style={{marginVertical: 5}}>
                        <Icon active type="Feather" name='user' />
                        <Input placeholder={arabic?'اسم المستخدم':'Username'} onChangeText={v=>{setuser(v)}} value={username.replace(" ", "_")}/>
                      </Item>
                      <Item style={{marginVertical: 5}}>
                                 <Icon active type="Feather" name='user-check' />
                                 <Input placeholder={arabic?'اسمك كامل':'Your Full Name'} onChangeText={v=>{setname(v)}} value={name}/>
                               </Item>
                               <Item style={{marginVertical: 5}}>
                                          <Icon active name='mail' />
                                          <Input placeholder={arabic?'البريد الالكتروني':'Email Address'} onChangeText={(text) => setmail(text)} value={email.replace(" ", "")}/>
                                        </Item>
                                        <Item onPress={openPanel} style={{marginVertical: 5}}>
                                                   <Icon active type="Feather" name='gift' />
                                                   <Input editable={false}  value={active?checkedcode:""} placeholder={arabic?'(اختياري)برومو كود':'Promo Code (Optional)'}
/>
                                                 </Item>
                                                 <Item style={{marginVertical: 5}}>
                                                            <Icon active type="Feather" name='lock' />
                                                            <Input secureTextEntry={true} placeholder={arabic?'كلمة المرور':'Your password'} onChangeText={v=>{setpass(v)}} value={password}/>
                                                          </Item>
                                                          <Text   style={[gStyle.text[theme],{color: "red"}]}>{errMsg} </Text>

               <View
                 style={{
                   flex: 1,
                   padding: 20,
                   justifyContent: 'center',
                   alignItems: 'center',

                 }}
               >
                 <Button
                   block


                   onPress={_handleSignUp}
                   style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: '#eb144c',borderRadius: 9}}
                 >
                   <Text style={[gStyle.button,{color:'white'}]}>{arabic?'تسجيل':'Signup'}</Text>
                 </Button>
               </View>
        <TouchableOpacity style={{marginVertical: 10}} onPress={ ()=>{ Linking.openURL('https://opentiq.net/fekra-terms-conditions/')}}  >

               <Text style={[gStyle.text[theme],{fontFamily: 'cairoreg'}]}>{arabic?'عند تسجيلك فانك توافق على ':'By clicking (Signup) you agree on'}<Text style={{color:'red'}}>{arabic?'الشروط والاحكام':'Terms & Conditions'}</Text>,</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://opentiq.net/fekra-privacy-policy/')}}  >

                      <Text style={[gStyle.text[theme],{fontFamily: 'cairoreg'}]}><Text style={{color:'red'}}>{arabic?'سياسة الخصوصية':'Privacy Policy'}</Text></Text>
                      </TouchableOpacity>
            { /*  <View
                 style={{
                   flex: 1,
                   padding: 20,
                   justifyContent: 'center',
                   alignItems: 'center',

                 }}
               >
                 <Button
                   block
                   light
iconLeft
                   onPress={signInWithGoogleAsync}
                   style={{ justifyContent: 'center', alignItems: 'center' }}
                 >
                 <Image style={{height: 30,width: 30,marginHorizontal: 10}} source={require('../assets/google-logo.png')}/>
                   <Text style={[gStyle.button,{color:'black'}]}>Continue with Google</Text>
                 </Button>
               </View>*/}
             </Form>




   </ScrollView>
   </Tab>

   <Tab heading={arabic?'تسجيل دخول':"Login"} textStyle={{color:'black',fontFamily: 'ralewaysemi'}} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: 'white'}} activeTextStyle={{color:'#eb144c'}}>
<Login arabic={arabic} navigation={navigation}/>
</Tab>
</Tabs>
<SwipeablePanel
         fullWidth
         isActive={modal}
         onClose={closePanel}
         showCloseButton
onlyLarge

         onPressCloseButton={closePanel}
     >
<View style={{flex:1,padding: 20}}>
<Text   style={[gStyle.text[theme],{color: "red"}]}>{!active&&clicked&&code.length>0?arabic?'الكود خطأ':"Incorrect Promo code":null} </Text>

<Item style={{marginVertical: 5}}>
        <Icon active type="Feather" name='gift' />
        <Input onChangeText={(text) => setcode(text)} value={code} placeholder={arabic?'برومو كود':'Promo Code'}
/>
      </Item>

                     <View
                       style={{
                         flex: 1,
                         padding: 20,
                         justifyContent: 'center',
                         alignItems: 'center',

                       }}
                     >
                       <Button
                         block


                         onPress={checks}
                         style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: '#eb144c',borderRadius: 9}}
                       >
                         <Text style={[gStyle.button,{color:'white'}]}>{arabic?'تفعيل الكود':'Active Code'}</Text>
                       </Button>
                     </View>
</View>
</SwipeablePanel>

    </View>
  );


  async function signInWithGoogleAsync() {
    console.log("clockcdscfsd");
    try {
      const result = await Google.logInAsync({
        androidClientId: '507275671666-7ekovmic70r7m85104g2o8rsv1ank4v7.apps.googleusercontent.com',
      //  iosClientId: YOUR_CLIENT_ID_HERE,
        behavior:'web',
        scopes: ['profile', 'email'],
        androidStandaloneAppClientId:'507275671666-7ekovmic70r7m85104g2o8rsv1ank4v7.apps.googleusercontent.com'
      });

      if (result.type === 'success') {
        onSignIn(result);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  async function fblogIn() {
  try {
    await Facebook.initializeAsync('550797605837270');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
function  isUserEqual(googleUser, firebaseAppUser) {
     if (firebaseAppUser) {
       var providerData = firebaseAppUser.providerData;
       for (var i = 0; i < providerData.length; i++) {
         if (
           providerData[i].providerId ===
             firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID &&
           providerData[i].uid === googleUser.getBasicProfile().getId()
         ) {
           // We don't need to reauth the firebaseAppbase connection.
           return true;
         }
       }
     }
     return false;
   };
function   onSignIn(googleUser) {
  seterror('جاري التسجيل');

     console.log('Google Auth Response', googleUser);
     // We need to register an Observer on firebaseAppbase Auth to make sure auth is initialized.
     var unsubscribe = firebaseApp.auth().onAuthStateChanged(
       function(firebaseAppUser) {
         unsubscribe();
         console.log('firs=======--------------- ----- ');
         // Check if we are already signed-in firebaseAppbase with the correct user.
         if (!isUserEqual(googleUser, firebaseAppUser)) {
           // Build firebaseAppbase credential with the Google ID token.
           console.log('fsecs=======--------------- ----- ');

           var credential = firebaseApp.auth.GoogleAuthProvider.credential(
             googleUser.idToken,
             googleUser.accessToken
           );
           console.log('third=======--------------- ----- ');

           // Sign in with credential from the Google user.
           firebaseApp
             .auth()
             .signInAndRetrieveDataWithCredential(credential)
             .then(function(result) {
               console.log('user signed in ');
               if (result.additionalUserInfo.isNewUser) {
                 console.log('fede======--------------- ----- ');
seterror('جاري التسجيل');
                 firebaseApp
                   .database()
                   .ref('/users/' + result.user.uid)
                   .set({
                     userId:result.user.uid,
                     name:result.additionalUserInfo.profile.given_name,
                     balance:50,
                     username:`${result.additionalUserInfo.profile.given_name}_${result.additionalUserInfo.profile.family_name}`,
                     email:result.user.email,

                   })
                   .then(function(snapshot) {
                     OneSignal.sendTag("username", `${result.additionalUserInfo.profile.given_name}_${result.additionalUserInfo.profile.family_name}`)
                     OneSignal.sendTag("uid", result.user.uid)

                     navigation.navigate('Guide')

                     console.log('Snapshot', snapshot);
                   });
               } else {
                 console.log('fsdf=======--------------- ----- ');
seterror('جاري تسجيل الدخول');
                 firebaseApp
                   .database()
                   .ref('/users/' + result.user.uid)
                   .update({
                     last_logged_in: Date.now()
                   }).then(function(snapshot) {

                     navigation.navigate('Home')

                     // console.log('Snapshot', snapshot);
                   });;
               }
             })
             .catch(function(error) {
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               // The email of the user's account used.
               var email = error.email;
               // The firebaseApp.auth.AuthCredential type that was used.
               var credential = error.credential;
               // ...
             });
         } else {
           console.log('User already signed-in firebaseAppbase.');
         }
       }.bind(this)
     );
   };
};

Signup.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Signup'
};

Signup.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Signup;
