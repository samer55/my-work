import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
import firebase from 'firebase'
@inject("appStore") @observer

export default class Loading extends React.Component {


  render() {
    return (
      <View style={styles.container}>
      <Image source={{uri:'https://pro2-bar-s3-cdn-cf6.myportfolio.com/ec4657434c011e1a856a01752ef5f2f5/0c428e8239727076ce2e1716b1ee529eff79ad34466fea57e80c3ebc4336a019821c607b17d5ada3_car_202x158.gif?h=f5388f39b837cfa003110ecd644d88be&url=aHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RzL29yaWdpbmFsLzlhMGJiMzQ4MDk2NzMzLlkzSnZjQ3czTmpnc05qQXhMREUzTERBLmdpZg=='}} style={{height:250,width:250}} />
      <Text style={{fontFamily: 'ralewaysemi',fontSize: 21}}>{this.props.appStore.arabic?'بدأ مشروعك..':'Starting business..'}</Text>

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
