import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View ,Image,Dimensions,TouchableOpacity} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail,B,  Left, Body, Icon,Button ,Title,Right,Content} from 'native-base';
import Selectmywork from '../components/Selectmywork';

import AutoTypingText from 'react-native-auto-typing-text';
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

const categorydata = [
{
  proimg:'https://i.ibb.co/ZHsQFFG/truck.png',
Businessname:'Pickup & Delivery',
backimg:'https://i.ibb.co/xgj6jzH/crop-man-sealing-carton-box-with-tape-4498136.jpg',
text:'Order Delivery, Pickup services..etc',
art:'توصيل الطلبات, خدمات النقل والتحميل..',
ar:'توصيل وتحميل',
cats:['Pickup & Delivery']
},


{
  proimg:'https://i.ibb.co/6BQrtJ8/training.png',
Businessname:'Education & Teaching',
ar:'تعليم وتدريس',
art:'دروس خصوصي, دروس ثانوية عامة, تعليم مهارات وحرف..',
backimg:'https://i.ibb.co/Fs0QLHd/adult-blur-business-close-up-239548.jpg',
text:'Find teacher, Education Center..etc',
cats:['Helpers',"Tutor / Teacher","Private language tutor / teacher","Book & Ebook Publishing"]},
{
  proimg:'https://i.ibb.co/84xwPMc/perfume.png',
Businessname:'Beauty Services',
ar:'خدمات تجميلية',

backimg:'https://i.ibb.co/VL5cMXH/assorted-blur-close-up-container-1115128.jpg',
text:'On Demand salon & spa, Makeup Services..etc',
art:'صالونات تجميل وخدمات المكياج والحلاقة..',
cats:['Barber',"Beachbody On Demand","Beauty Services","Spa"]},
{
  proimg:'https://i.ibb.co/Sy80kDK/car.png',
Businessname:'Car Wash',
ar:'غسيل سيارات',
art:'خدمات غسيل السيارات ..',
backimg:'https://i.ibb.co/M5f2LHM/action-auto-automobile-automotive-372810.jpg',
text:'Find Workers for Car washing, Local car wash..etc',
cats:['Car Wash']},
{
  proimg:'https://i.ibb.co/mNmRMzs/grocery.png',
Businessname:'Grocery Delivery',
ar:'توصيل بقالة',
art:'خدمات توصيل بقالة..',
backimg:'https://i.ibb.co/xgbQ5xB/booth-branding-business-buy-264636.jpg',
text:'Find Grocery Stores, Grocery Delivery workers..etc',
cats:['Grocery Delivery']},
{
  proimg:'https://i.ibb.co/SB6BMqG/nutrition.png',
Businessname:'Healthcare & Fitness',
ar:'صحة ولياقة',
art:'خدمات اللياقة, مدرب خاص, يوجا',
backimg:'https://i.ibb.co/mGGMN2Y/scrabble-pieces-on-a-plate-2377045.jpg',
text:'Nearby Gyms, Yoga centers ..etc',
cats:['Fitness Coach',"Yoga Trainer"]},
{
  proimg:'https://i.ibb.co/Dp1GzzJ/cleaner.png',
Businessname:'Cleaning Services',
ar:'خدمات تنظيف',
art:'خدمات التنظيف بانواعها..',
backimg:'https://i.ibb.co/rwvjWzb/faceless-person-cleaning-mirror-with-sponge-4239146.jpg',
text:'House cleaner, Dry clean..etc',
cats:['Car Wash',"Home Cleaning","Office Cleaning","Party Cleaning"]},
{
  proimg:'https://i.ibb.co/fkWLXT7/franchise.png',
Businessname:'E-commerce & Retail',
ar:'تجارة وتجزئة',
art:'خدمات البيع والشراء بالتجزئة ',
backimg:'https://i.ibb.co/x5yrpMY/Discount-red-sign-board-in-the-store-Bali-island.jpg',
text:'Local Stores & Business, Retail business..etc',
cats:['E-commerce',"Book & Ebook Publishing","Grocery Delivery"]},
{
  proimg:'https://i.ibb.co/PmczbTZ/motorcycle.png',
Businessname:'Food Delivery',
ar:'توصيل طلبات الطعام',
art:'خدمات توصيل طعام..',
backimg:'https://i.ibb.co/W66cy9F/person-paying-for-food-delivery-with-a-credit-card-4393532.jpg',
text:'Find Food resturant, Food Delivery Services..etc',
cats:['Grocery Delivery',"Pickup & Delivery"]},
{
  proimg:'https://i.ibb.co/Rvq80MS/electrical-service.png',
Businessname:'Repair & Fixing',
ar:'تصليح وصيانة',
art:'صيانة اجهزة, مواسرجي, رجل عامل, حداد..',
backimg:'https://i.ibb.co/N2xWDJg/person-holding-screwdriver-3806275.jpg',
text:'plumbing, Carpentry, Blacksmith..etc Handyman',
cats:['TV Repairer',"Sofa Repair","Electricians","Computer Repairer","Carpet Repairer","Car repair","Plumber"]},
];


const cards = [
  {
    text: 'Card One2',
    name: `اولا: لديك عدة ابواب يرسلها لك اصدقائك اختر الباب وافتحه لتكتشف`,
    image: require('../assets/guide/1.jpeg'),
  },
  {
    text: 'Card One2',
    name: `ثانيا : مجموعة تحديات وبوابات يرسلها لك اصدقائك لكي تتفاعل وتشاركها`,
    image: require('../assets/guide/2.jpeg'),
  },
  {
    text: 'Card One24',
    name: `ثالثا : ارسل باب سري لصديقك ويمكن ايضا ان ترسله بسريه لكي لا يعلم هويتك :)`,
    image: require('../assets/guide/3.jpeg'),
  },
  {
    text: 'Card One43',
    name: `رابعا : يمكنك ارسال تحدي للجميع لكي تبدأ تحدياتك الخاصة`,
    image: require('../assets/guide/4.jpeg'),
  },
  {
    text: 'Card Oner',
    name: `خامسا : يمكنك البحث عن اصدقائك وارسال طلب صداقة من خلال شاشة اكتب لاصدقائك`,
    image: require('../assets/guide/5.jpeg'),
  },
  {
    text: 'Carrd One',
    name: `سادسا : قم بالرد على صارحات وتحديات اصدقائك واقبل التحديات`,
    image: require('../assets/guide/6.jpeg'),
  },
];
// components
import Touch from '../components/Touch';

const Categories = ({ navigation }) => {
  const theme = useTheme();
  const [arabic, setarabic] = useState( navigation.getParam('arabic',false))

  return (
    <Container style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
    <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
    <Left>
    <TouchableOpacity onPress={()=>navigation.goBack()}>

      <Icon name="arrow-back" />
      </TouchableOpacity>

    </Left>
             <Body>
               <Title style={gStyle.text[theme]}>{arabic?'الاقسام':'Top Categories'}</Title>
             </Body>
             <Right>

             </Right>
 </Header>
      <Content>
      {categorydata.map((d)=>{
        return(
          <Selectmywork op={()=>navigation.navigate('Listings',{dataname:'Services',arrrofcat:d.cats})} color={['rgba(85,85,85,22)','rgba(0,0,0,0.001)']}imageSrc={d.backimg} titlea={arabic?d.ar:d.Businessname} det={arabic?d.art:d.text}/>

        )
      })}

      </Content>

     </Container>
  );
};

Categories.navigationOptions = {
header:null
};

Categories.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Categories;
