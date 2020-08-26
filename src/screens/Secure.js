import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Input, Label,Button } from 'native-base';
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

// components
import Touch from '../components/Touch';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

class Secure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      status:'',
      username:'',
      isDatePickerVisible: false,
      code:'',
      user:{},
      setDatePickerVisibility: false,
      Duration: '-------------',
      Additional: '-------------',
      spinner:false,
      init: true,
      errMsg: null,
      saveUpSuccess: false,
      email: '',
      password: ''
    };
  }
    onCollectionUpdate = (querySnapshot) => {

      this.setState({username:querySnapshot.data().username})


    }
  componentDidMount() {
    this.setState({spinner:true})

    firebaseApp.auth().onAuthStateChanged(user => {
if (user) {
  firebaseApp.firestore().collection('users').doc(firebaseApp.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate)
      this.setState({user:user})

      this.setState({spinner:false})




}
    })
  }

  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };


render(){
  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >
    <Spinner
           visible={this.state.spinner}
           textContent={'Loading...'}
           textStyle={{color:'#fff'}}
         />
         <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center'}]}>{this.props.appStore.arabic?'تغيير كلمة المرور':'Change your password'}</Text>
         <Text   style={[gStyle.text[theme],{color: 'red',marginHorizontal: 10}]}>{this.state.errMsg}</Text>

                 <Form style={{width:Dimensions.get('window').width-35}}>


                   <Item floatingLabel last>
                     <Label>{this.props.appStore.arabic?'كلمة المرور':'Password'}</Label>
                     <Input secureTextEntry={true} style={[gStyle.text[theme]]}  onChangeText={v=>{this.setState({password:v})}}/>
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
                       onPress={this._handleSave}
                       style={{ justifyContent: 'center', alignItems: 'center' }}
                     >
                       <Text style={[gStyle.button]}>{this.props.appStore.arabic?'تغيير':'Change Password'}</Text>
                     </Button>
                   </View>
                 </Form>

    </ScrollView>
  )}
</ThemeContext.Consumer>
  )
}
_handleSave = () => {
  console.log("USER EDIT SAVING...")

  if (this.state.password) {
    if (this.state.password.length < 6) {
      this.setState({ errMsg: this.props.appStore.arabic?'كلمة المرور يجب ان تكون 6 احرف على الاقل':"Password should be at least 6 character" })
    }
    else {
      this.setState({ errMsg: this.props.appStore.arabic?'جاري حفظ كلمة المرور..':"Saving new password..." })
      firebaseApp.auth().currentUser.updatePassword(this.state.password)
      .then(() => {
        this.setState({ errMsg: this.props.appStore.arabic?'تم تغيير كلمة المرور بنجاح':"Password changed successfully" })
      })
      .catch((error) => {
        this.setState({ errMsg: error.message })
      })
    }
  }
}

};

export default Secure;
