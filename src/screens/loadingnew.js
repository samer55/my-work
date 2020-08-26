import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image,AsyncStorage } from 'react-native'
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class Loadingnew extends React.Component {
  componentDidMount() {

    firebaseApp.auth().onAuthStateChanged(user => {




this.props.navigation.navigate(user ? this.props.appStore.Myregion==null||this.props.appStore.Myregion==undefined?'map':'Home': 'Signup')

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri:'https://loading.io/icon/fcmayv'}} style={{height:500,width:500}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
