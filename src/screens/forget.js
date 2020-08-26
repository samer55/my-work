import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Input, Label,Button } from 'native-base';
import { firebaseApp } from '../../firebase'
import OneSignal from 'react-native-onesignal'

// components
import Touch from '../components/Touch';

const Forget = ({ navigation }) => {
  const [errMsg, seterror] = useState('')
  const [name, setname] = useState('')
  const [password, setpass] = useState('')
  const [email, setmail] = useState('')
  const [username, setuser] = useState('')
  const [arabic, setarabic] = useState( navigation.getParam('arabic',false))

  const theme = useTheme();
  function _handleSignIn () {
    seterror('جاري تسجيل الدخول')
  if (email.length == 0) {
  seterror("الرجاء ادخال بريدك الالكتروني.")

  }
  else if (password.length == 0) {
  seterror("الرجاء ادخال كلمة المرور.")
  }
  else {
    console.log("user displayName: " + email + " - " + password)

  firebaseApp.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    const userId = firebaseApp.auth().currentUser.uid;
    console.log("user uid: " + " - " + userId)

   firebaseApp.database().ref('users').child(userId).once('value')
   OneSignal.sendTag("username", user.displayName)
   OneSignal.sendTag("uid", user.uid)

   console.log("user displayName: " + user.displayName + " - " + user.uid)
   navigation.navigate('Home')
  })
  .catch((error) => {
   seterror(error.message)

  })
  }

  }
function  _handleForgotPass(){
    seterror("Please wait ..")
    if (email.length == 0) {

        seterror( "Please enter your email")
    }
    else {
      firebaseApp.auth().sendPasswordResetEmail(email.trim())
      .then(()=> {
        seterror( "we sent you email to your email address")

        setTimeout(()=> {
          navigation.navigate('Signup')
        }, 3000)
      }).catch((error) => {
        seterror(error.message)

      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={[gStyle.Centercont,{width: Dimensions.get('window').width}]}
      style={gStyle.container[theme]}
    >
      <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center'}]}>{arabic?'استعادة كلمة المرور':'Reset password'}</Text>
      <Text   style={[gStyle.text[theme]]}>{errMsg}</Text>

              <Form style={{width:Dimensions.get('window').width-35}}>
                <Item >
                  <Label style={[gStyle.text[theme]]}>{arabic?'البريد الالكتروني':'email'}</Label>
                  <Input style={[gStyle.text[theme]]}  onChangeText={v=>{setmail(v)}}/>
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
                    light
                    onPress={_handleForgotPass}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={[gStyle.button]}>{arabic?'استعادة':'Reset'}</Text>
                  </Button>
                </View>
              </Form>
<TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
              <Text onPress={()=>navigation.navigate('Signup')} style={[gStyle.text[theme]]}>{arabic?'الرجوع لشاشة تسجيل الدخول':'Back to login screen'}</Text>
</TouchableOpacity>
    </ScrollView>
  );
};

Forget.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Signup'
};

Forget.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Forget;
