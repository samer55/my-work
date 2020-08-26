import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Input, Label,Button,Icon } from 'native-base';
import { firebaseApp } from '../../firebase'
import OneSignal from 'react-native-onesignal'

// components
import Touch from '../components/Touch';

const Login = ({ navigation ,arabic}) => {
  const [errMsg, seterror] = useState('')
  const [name, setname] = useState('')
  const [password, setpass] = useState('')
  const [email, setmail] = useState('')
  const [username, setuser] = useState('')

  const theme = useTheme();
  function hande () {
    navigation.navigate('Forget',{arabic})

  }
  function _handleSignIn () {
    seterror(arabic?'تسجيل الدخول..':'Sign in ...')
  if (email.length == 0) {
  seterror(arabic?'الرجاء ادخال بريدك الالكتروني':"Please enter your email address")

  }
  else if (password.length == 0) {
  seterror(arabic?'الرجاء ادخال كلمة المرور':"Please enter your password")
  }
  else {
    console.log("user displayName: " + email + " - " + password)

  firebaseApp.auth().signInWithEmailAndPassword(email.trim(), password)
  .then((user) => {
    const dis = firebaseApp.auth().currentUser.displayName;

    const userId = firebaseApp.auth().currentUser.uid;
    console.log("user uid: " + " - " + userId)

   OneSignal.sendTag("username", dis)
   OneSignal.sendTag("uid", userId)

   console.log("user displayName: " + user.displayName + " - " + user.uid)
   navigation.navigate('navload',{arabic})
  })
  .catch((error) => {
   seterror(error.message)

  })
  }

  }
  return (
    <ScrollView
      contentContainerStyle={[gStyle.Centercont,{width: Dimensions.get('window').width}]}
      style={gStyle.container[theme]}
    >
      <Text   style={[gStyle.text[theme]]}>{errMsg}</Text>

              <Form style={{width:Dimensions.get('window').width-35}}>
              <Item style={{marginVertical: 5}}>
                         <Icon active name='mail' />
                         <Input placeholder={arabic?'البريد الالكتروني':'Email Address'}  onChangeText={v=>{setmail(v)}} value={email.replace(" ", "")}/>
                       </Item>
<Item style={{marginVertical: 5}}>
                                           <Icon active type="Feather" name='lock' />
                                           <Input secureTextEntry={true} placeholder={arabic?'كلمة المرور':'Your password'} onChangeText={v=>{setpass(v)}} value={password}/>
                                         </Item>
                                         <TouchableOpacity onPress={hande}>
                                                       <Text   style={[gStyle.text[theme],{fontFamily: 'ralewaymedium',marginLeft: 10,color: '#eb144c'}]}>{arabic?'نسيت كلمة المرور؟':'Forgot password?'}</Text>
                                         </TouchableOpacity>
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
                    onPress={_handleSignIn}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text style={[gStyle.button]}>{arabic?'تسجيل الدخول':'Login'}</Text>
                  </Button>
                </View>
              </Form>


    </ScrollView>
  );
};

Login.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Signup'
};

Login.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Login;
