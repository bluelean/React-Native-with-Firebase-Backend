import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight, TextInput,ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import {windowWidth, windowHeight} from '../../utils/Dimetions'
import { Chip } from 'react-native-paper'


const sportsList = [
    {
      item: 'Badminton',
      id: 'BD',
    },
    {
      item: 'Basketball',
      id: 'BS',
    },
    {
      item: 'Chess',
      id: 'CH',
    },
    {
      item: 'Cricket',
      id: 'CR',
    },
    {
      item: 'Football',
      id: 'FB',
    },
    {
      item: 'Golf',
      id: "GF"
    },
    {
      item: 'Handball',
      id: 'HB',
    },
    {
      item: 'Parkour',
      id: 'PK',
    },
    {
      item: 'Polo',
      id: 'PL',
    },
    {
      item: 'Rock ClimbRC',
      id: 'RC',
    },
    {
      item: 'Skateboarding',
      id: 'SB',
    },
    {
      item: 'Swimming',
      id: 'SW',
    },
    {
      item: 'Table Tennis',
      id: 'TT',
    },
  
    {
      item: 'Tennis',
      id: 'TN',
    },
  ]

const Item = (props) =>{
  const[select,setSelect] = useState(false);
  const tap = () =>{
    if(select) props.removeItem(props.data)
    else props.addItem(props.data)
    setSelect(!select);
  }
  return(
     <Chip selected={select} onPress={()=>tap()} style={{margin:5,}}>{props.data}</Chip>
  )
}

export default function Sports(props){
    const [selectedSports, setSelectedSports] = useState([]);

    const addItem = (id) =>{
      console.log(id);
      const items = selectedSports;
      console.log(items);
      items.push(id)
      console.log(items);
      props.sports(items)
      setSelectedSports(items);
    }
    const removeItem = (id) =>{
      let items = selectedSports
      items = items.filter(data=>data!==id)
      props.sports(items)
      setSelectedSports(items);
    }

    const renderItem = ({ item }) => (
        <Item addItem={(e)=>addItem(e)} removeItem={(e)=>removeItem(e)} data={item.item}/>
    );

        return (
            <View style={styles.container}>
              {console.log(selectedSports)}
              <View>
                  <Image style={styles.image} source={require('./../../assets/onboarding/onlinetraining.png')}/>
              </View>
              <Text style={{fontSize:22, color:'white'}}>Select Sports you Like ?</Text>
              <View style={{height:250,marginTop:15}}>
              <FlatList
                data={sportsList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
                />  
              </View>
              
            </View>           
        )
}

const styles = StyleSheet.create({
   container:{
       flex: 1,
       display: 'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#5D2448',
       width: windowWidth,
       height: windowHeight,
   },
   title:{
        color: 'white',
        fontSize:22,
        alignSelf:'center',
    },
    image:{
        width: 150,
        height: 150,
    },
})

