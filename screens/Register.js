import React, { useState, useEffect, useContext} from 'react'
import { View, Text, FlatList, TouchableHighlight, ActivityIndicator, StyleSheet, BackHandler, Dimensions} from 'react-native'
import PhotoName from './create-account/PhotoName';
import Gender from './create-account/Gender';
import Sports from './create-account/Sports';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight} from './../utils/Dimetions'
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [{id: '0',title: 0,},{id: '1',title: 1,},{id: '2',title: 2,}];

export default function Register({navigation}) {
    const{user,setUserDetail} = useContext(AuthContext);
    const[list, setRef] = useState(null);
    const[loading,setLoading] = useState(false);
    const[name, setName] = useState('');
    const[image ,setImage] = useState(null);
    const[gender, setGender] = useState('');
    const[sports, setSports] = useState([]);
    const[error, setError] = useState('');
    
    const[index, setIndex] = useState(0);

    const renderItem = ({ item }) => (
        <View>
         {item.title==0? 
         <PhotoName name={(text)=>setName(text)} image={(e)=>setImage(e)} error={error}/>
         : 
         item.title==1 ? 
         <Gender gender={(e)=>setGender(e)} error={error}/>
         : 
         <Sports sports={(e)=>setSports(e)} error={error}/>
          }
        </View>
      );
    
    const ScrollList = () =>{
      if(!loading){
        setError('');
        
        if(index==0){
          if(name=='') return setError('Please Enter your name !!');
          if(image==null) return setError('Please upload profile image!');
          list.scrollToIndex({animated: true,index: index+1});
          return setIndex(index+1); 
        }
        if(index==1){
          if(gender=='') return setError('please select your gender!');
          list.scrollToIndex({animated: true,index: index+1});
          return setIndex(index+1); 
        }
        if(index==2){
          if(sports.length<3) return setError('Please select atleast 3 sports!') 
          handleRegister();
        }
      }
    }

    async function handleRegister(){
      setLoading(true);
      const reference = storage().ref(`profile_images/${image.path.substring(image.path.lastIndexOf('/')+1)}`);
      const task = reference.putFile(image.path);
      task.then(() => {
          UpdateProfile();
      });
    }

    async function UpdateProfile(){
      const url = await storage().ref(`profile_images/${image.path.substring(image.path.lastIndexOf('/')+1)}`).getDownloadURL();
       try{
          let result =await firestore().collection('users').doc(user.uid).set({
              profile_image: url,
              name: name,
              gender: gender,
              sports: sports,
          })
       }
       catch(e){
           setLoading(false);
           return setError(e.messages);
       }
      const userDetail = {
        name: name,
        profile_image: url,
        gender: gender,
        sports: sports,
      }
      await AsyncStorage.setItem('user_detail',JSON.stringify(userDetail));
      setUserDetail(userDetail);
    }

    const backScroll = () =>{
      setError('');
      if(index){
        list.scrollToIndex({animated:true, index: index-1});
        setIndex(index-1);
      }
    }

    return (
        <View style={styles.container}>
          {index?
            <FontAwesome onPress={()=>backScroll()} style={{marginLeft:20,display:index==0?'none':'flex',color:'white',position:'absolute',marginTop:30,zIndex:1}} name='arrow-left' color='white' size={30}/>
          : null}
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                scrollEnabled={false}
                ref={(ref)=>{setRef(ref)}}
                showsHorizontalScrollIndicator={false}
            />
            <TouchableHighlight activeOpacity={0.5} underlayColor={'#1b51cf'} onPress={loading? null:()=> ScrollList()} style={styles.buttonContainer}>
              <View>
              {loading?
                <ActivityIndicator color='white'/>
                : <Text style={styles.buttonText}>{index==2? 'Done':`Save & Next   `}{index==2? null : <FontAwesome name='arrow-right' color='white' size={20}/>}</Text> 
              }
              </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item:{
      width: Dimensions.get("screen").width,
      backgroundColor:'green',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:30,
    },
    buttonContainer:{
      marginTop:10,
      width: '100%',
      height: windowHeight/15,
      backgroundColor: '#2e64e5',
      padding: 10,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      position: 'absolute',
      bottom: 5,
    },
    buttonText:{
        fontSize:18,
        color: '#ffffff',
    }
  });