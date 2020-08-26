import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableOpacity,
  Text as NativeText,
  View,
  Share as Shared,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { Button ,Thumbnail} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebaseApp } from '../../firebase'
import moment from 'moment';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
// components
import * as Permissions from 'expo-permissions';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { ViewPropTypes, BackgroundImage, withTheme } from './config';
import { AntDesign } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';

import Hyperlink from 'react-native-hyperlink';

import Text from './text/Text';

const CaCard = props => {
  const {
    title,
    icon,
    price,
    caption,
    show,
    refresh,
    imageSrc,
    onfirst,
    name,
    job,
    body,
    onsecond,
    type,
    onthird,
    theme,
    incs,
    onPresss,
    laugh,
    sad,
    by,
    firstno,
    secondno,
    image,
    navPress,
    thirdno,dash,
    dis,
    onPress,challenge,
    datas,
    details,
    containerStyle,
    imageContainerStyle,
    overlayContainerStyle,
    cat,
    love,
    iconContainerStyle,
    user,
    data,
    navigation,
    titleStyle,
    nolikes,
    onLike,
    laughed,
    onUnlike,
    nodis,
    businessarr,
    inArray,
    nolaugh,
    pimg,
    nosad,
    captionStyle,
    lie,
    ImageComponent,
    ...attributes
  } = props;

  const {
    width = Dimensions.get('window').width,
    height = width * 0.7
  } = props;
  const trLocale = require('moment/locale/ar');
function dele(){
  firebaseApp.database().ref('Posts/' + data.postuid).on('value', function(snapshot) {
snapshot.ref.remove();
})
if (show) {
  navigation.goBack()
}
}
  const timeString = moment().locale('ar',trLocale).fromNow();
  const [clicked, setclick] = useState(false)


      useEffect(() => {
         // Update the document title using the browser API
       });
  const sharesocial= async () => {
    setclick(false)

     try {
       const result = await Shared.share({
         message: `
        ${data.type}  ${data.user}
      لمشاهدة الرد حمل التطبيق على الاندرويد
         https://play.google.com/store/apps/details?id=com.opentiq.secretdoor
`,
       });

       if (result.action === Shared.sharedAction) {
         if (result.activityType) {
           // shared with activity type of result.activityType
         } else {
           // shared
         }
       } else if (result.action === Shared.dismissedAction) {
         // dismissed
       }
     } catch (error) {
       alert(error.message);
     }
   }
   const imgsafe= async () => {
     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {

alert('الرجاء السماح للوصول للصور لحفظ المنشور')          }else {
  try {

    let result = await captureRef(this.seconddoors, {
      format: 'png',
    });

    let saveResult = await MediaLibrary.saveToLibraryAsync(result, 'photo');
    console.log(saveResult);
    Alert.alert(
    'تم حفظ المنشور في معرض الصور',
    'يمكنك ارسال الصورة لاصدقائك او مشاركة عبر التواصل الاجتماعي',
    [
      {text: 'الرجوع', onPress: () => console.log('Ask me later pressed')},
      {text: 'مشاركة عبر التواصل', onPress: sharesocial},
    ],
    { cancelable: false }
  )
    setclick(false)

  }
  catch(snapshotError) {
    console.error(snapshotError);
  }
}
     setclick(false)

    }
    const styles = StyleSheet.create({
    head:{
      flex:2,
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',

      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        height: 1,
        width: 0
      },
    position: 'absolute',
      //android
      elevation: 2,
bottom: 0,
      backgroundColor: 'white',
      borderRadius: 10
    },
    profile:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    edit:{
      flex:2,

      justifyContent: 'center',
      alignItems: 'center'
    },
    edits:{
      flex:2,

      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    pimg:{
      flex:2,


    },
    footericon:{
      flex:8,

      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    iconname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',

      alignItems: 'center'
    },
    likesname:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-start',

      alignItems: 'center'
    },
    names:{
      flex:8,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
padding: 10,
      flexDirection: 'column'
    },
    body:{
      paddingVertical: 20,
      flex:1,

    },
    likes:{
      color:'red',
      marginHorizontal: 10
    },
    comment:{
      color:'black',
        marginHorizontal: 10
    },
    name:{
      fontFamily: 'ralewaysemi',
      marginVertical: 2
    },
    time:{
      fontFamily: 'ralewaymedium',
      fontSize: 12,
      color:by?'black':'green',
      marginHorizontal: 2
    },
    times:{
      fontFamily: 'ralewaymedium',
      fontSize: 12,
      color:'black',
      marginHorizontal: 2
    },
    type:{
      fontFamily: 'raleway',
      fontSize: 12,
      color:'#eb144c'
    },
    cat:{
      fontFamily: 'ralewaymedium',
      fontSize: 12,
      marginLeft: 5,
      color:'#000000'
    },
    image:{
      width: '100%',
        height: '100%',
      resizeMode: 'cover',
      flex:1,
      borderRadius: 15,

    }
    });



  return (
    <TouchableOpacity
      style={{
      width:width/2,
height: width/2,
marginRight: 20,
marginLeft: 3,
justifyContent: 'flex-start',
paddingVertical: 10
,marginBottom: 10
      }}
onPress={onPress}    >
    {image&&image.length>0?<Image style={styles.image} PlaceholderContent={<ActivityIndicator />}  source={{uri:image}}/>:<Image style={styles.image} PlaceholderContent={<ActivityIndicator />}  source={{uri:'https://i.ibb.co/ryWnBgT/download.png'}}/>}
      <View style={styles.head}>
<View style={styles.profile}>

<View style={styles.names}>
<Text style={styles.name} numberOfLines={2}>{name}</Text>
</View>
</View>

      </View>



    </TouchableOpacity>
  );
function  _renderTruncatedFooter(handlePress) {
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'cairobold'}} onPress={handlePress}>
        اقرا اكثر..
      </Text>
    );
  };
function  _renderRevealedFooter (handlePress){
    return (
      <Text style={{ color: 'white', marginTop: 5,fontFamily: 'cairobold' }} onPress={handlePress}>
      اقرأ اقل..
      </Text>
    );
  };
};

CaCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  caption: PropTypes.node,
  imageSrc: Image.propTypes.source,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconContainerStyle: ViewPropTypes.style,
  imageContainerStyle: ViewPropTypes.style,
  overlayContainerStyle: ViewPropTypes.style,
  titleStyle: NativeText.propTypes.style,
  captionStyle: NativeText.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number,
  ImageComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

CaCard.defaultProps = {
  ImageComponent: BackgroundImage
};

export default CaCard;
