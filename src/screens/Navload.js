import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image,AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
import firebase from 'firebase'
@inject("appStore") @observer

export default class Navload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        swipeablePanelActive: false,
        first:'ss',
refreshing:false,
        text:'',
        dataArray: [],
        friends:[],
        name:'dfsdf',
        mydata:[],
        load:false,
        spinner:false,
        commentsRef:'',
        search:'',
        dataSources: [],
        searched:[],
        users:[],
        arabic:  props.navigation.getParam('arabic',false),
        signup:  props.navigation.getParam('signup',false),

        login:  props.navigation.getParam('login',false),
        commentsRefs:'',
    };
    this.arrayholder=[]
    this.datas=[]

this.users=[ {
  title: 'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
first:'red',
second:'steelblue',
  username:'sameranas',
firstdoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوسب',
seconddoor:'باب الحب والهناء لاجبيةبةسبةويسبةسيبوddfdfdfdfب',
firstLock:true,
secondlock:true,
},


]
this.currentUserId=''
this.currentusername=''
this.arrayholder=[]

  }
componentDidMount(){
  let add = this.state.arabic
  AsyncStorage.setItem('lang', JSON.stringify(add));
this.props.appStore.arabic=this.state.arabic
this.state.signup?this.props.navigation.navigate('Complete'):this.props.navigation.navigate('loading')

}
  render() {
    return (
      <View style={styles.container}>
<ActivityIndicator color="#eb144c" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
