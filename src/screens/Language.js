import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image,AsyncStorage } from 'react-native'
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import { Container, Header, Content, ListItem, CheckBox, Body } from 'native-base';

import { observer,inject } from 'mobx-react'
@inject("appStore") @observer

export default class Language extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
      <ListItem>
           <CheckBox checked={this.props.appStore.arabic} onPress={()=>{
             let add = !this.props.appStore.arabic
             AsyncStorage.setItem('lang',add);
this.props.appStore.arabic=!this.props.appStore.arabic
           }}/>
           <Body>
             <Text style={{fontFamily: 'cairoreg',fontSize: 17}}>تغيير اللغة للعربية</Text>
           </Body>
         </ListItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:'white',
    justifyContent: 'center',
  width: '100%'
  }
})
