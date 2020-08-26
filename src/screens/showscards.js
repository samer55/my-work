import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View ,Text,TouchableOpacity,Dimensions} from 'react-native';
import { Button ,Thumbnail} from 'native-base';
import Product from '../components/Product'
import BCard from '../components/BusinessCard'
import LCard from '../components/latestcard'
import CaCard from '../components/catecard'

import Card from '../components/slidescard'
const ShowScroller = ({ar, dataset,arabic, type ,cats,navPress,navigation,types,busref,serref,jobref,renderFooter,retrieveMore,refreshing,dash}) => {
  const dataArray = Object.values(dataset);

  return (
    <FlatList
      contentContainerStyle={{ paddingHorizontal: 4 }}
      data={dataArray}
      keyExtractor={(item, index) => index.toString()}

      horizontal={type=="latest"?false:true}
      renderItem={({ item }) => {
        let renderItem =  <Card type={item.type} name={item.Htitle} image={item.backimg} cat={item.Categories} by={item.user} data={item} navigation={navigation}/>;


          if (type=="company") {
          renderItem = (
          <TouchableOpacity onPress={dash?()=>navigation.navigate('Dashboard',{id:item.postuid,data:item,type:'Business'}):()=>navigation.navigate('BusinessProfile',{data:item})} style={{flex:1,justifyContent: 'space-around',alignItems: 'center',marginHorizontal: 10,width:150}}>
          {item.proimg&&item.proimg.length>0?  <Thumbnail large   source={{uri:item.proimg}} />
:  <Thumbnail large navigation={navigation}  source={{uri:'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-4.png'}} />
}
<Text>{item.Businessname}</Text>
<Text numberOfLines={1} >{item.Categories}</Text>

          </TouchableOpacity>
          );
        }
      else  if (type=="cate") {
            renderItem = (

            <CaCard   arabic={arabic}    onPress={()=>navigation.navigate('Listings',{dataname:'Services',arrrofcat:item.cats})}
 name={ar?item.ar:item.Businessname} image={item.proimg&&item.proimg.length>0?item.proimg:'https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-4.png'}  navigation={navigation}/>

            );
          }
      else  if  (cats=="Product") {
            renderItem = (
          <Product data={item}  arabic={arabic}  navigation={navigation} name={item.name} imageSrc={item.image} price={item.type} store={item.store}/>
        )
        }
      else  if  (type=="local") {
            renderItem = (
          <BCard  navigation={navigation}  arabic={arabic}  image={item.backimg}
            pimg={item.proimg}
data={item}
            show={false}
    name={item.Businessname}
    type={item.Categories}/>
        )
        }
      else  if  (type=="latest") {
            renderItem = (
          <LCard navigation={navigation}  arabic={arabic}
            pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
 image={item.Businessname?item.proimg:item.servicetitle?item.backimg:item.proimg}
 data={item}
 nav={item.Businessname?"BusinessProfile":item.servicetitle?"OfferPage":"Job"}
            show={false}
            datast={item}
    name={item.Businessname?item.Businessname:item.servicetitle?item.servicetitle:item.Htitle}
    type={item.Categories}/>
        )
        }
        else  if  (type=="dash") {
              renderItem = (
            <LCard navigation={navigation}  arabic={arabic}
              pimg={{uri:'https://image.freepik.com/free-vector/pharmacy-logo-vector_23987-171.jpg'}}
   image={item.image}
   data={item}
   dash
   datast={item}

              show={false}
      name={item.name}
      type={item.type}/>
          )
          }
          else  if  (type==="local service") {

                renderItem = item.type=='local'?(
          <Card     data={item}        datast={item}  arabic={arabic}
 type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
        ):null

  }
  else  if  (type==="service") {

        renderItem = (
  <Card     data={item}  dash={dash}      datast={item}  arabic={arabic}
type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
)

}
  else  if  (type==="special") {

        renderItem = item.special?(
  <Card        data={item}     datast={item}  arabic={arabic}
 type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
):null

}
else  if  (type==="Jobs") {

      renderItem = (
<Card        data={item} job={true}  dash={dash}  arabic={arabic}    datast={item}
jobs={true} mprice
type={item.price} name={item.Htitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
)

}
  else  if  (type==="online service") {

        renderItem = item.type=='online'?(
  <Card       data={item}      datast={item}  arabic={arabic} 
 type={item.price} name={item.servicetitle} image={item.backimg} cat={item.Categories} by={item.user} navigation={navigation}/>
  ):null

  }

return renderItem;

      }}
// Refreshing (Set To True When End Reached)

      showsHorizontalScrollIndicator={false}
    />
  );
};

ShowScroller.defaultProps = {
  dataset: 'dumbData',
  type: 'rectangle'
};

ShowScroller.propTypes = {
  // optional
  dataset: PropTypes.string,
  type: PropTypes.string
};

const styles = StyleSheet.create({
  rectangle: {
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    resizeMode: 'contain',
    width: 91
  },
  round: {
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
    resizeMode: 'contain',
    width: 96
  }
});

export default ShowScroller;
