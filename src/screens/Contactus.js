import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Linking,
  Text,
  TouchableOpacity
} from 'react-native'
import { gStyle } from '../constants';



export default class Contactus extends Component {

  render() {
    return (
      <View style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
      <ScrollView>
      <Text

        style={[{
          fontFamily: 'cairobold',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}

      >
Opentiq Development Company
      </Text>
        <Text
        style={[{
          fontFamily: 'ralewaysemi',
          marginBottom:10,
          fontSize: 22,
          margin:10
        },gStyle.text['light']]}
      >
      {`
Design & Developed by Opentiq technologies
We Develop high quality mobile Apps & web desgin and we offer E-commerce Solutions
 `}
        </Text>
        <Text
        style={[{
          fontFamily: 'cairobold',
          marginBottom:10,
          margin:10,
            fontSize: 20
        },gStyle.text['light']]}
      > Contact us:</Text>
      <Text
      style={[{
        fontFamily: 'ralewaysemi',
        marginBottom:10,
        margin:10,
          fontSize: 17
      },gStyle.text['light']]}
    > Mail address:</Text>
        <TouchableOpacity onPress={ ()=> Linking.openURL('mailto:info@opentiq.com') }>
        <Text
        style={[{
          fontFamily: 'ralewaymedium',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}
      >info@opentiq.com</Text>
        </TouchableOpacity>
        <Text
        style={[{
          fontFamily: 'ralewaysemi',
          marginBottom:10,
          fontSize: 17,
          margin:10
        },gStyle.text['light']]}
      >
      Facebook</Text>
        <TouchableOpacity onPress={ ()=> Linking.openURL('https://web.facebook.com/Opentiq/?ref=bookmarks') }>
        <Text
        style={[{
          fontFamily: 'ralewaymedium',
          marginBottom:10,
          margin:10
        },gStyle.text['light']]}
      >Opentiq.FB</Text>
        </TouchableOpacity>


        </ScrollView>
      </View>
    )
  }
}
