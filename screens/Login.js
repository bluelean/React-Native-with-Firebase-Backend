import React, { useState, useContext, useEffect} from 'react'
import { View, Image, Text, TouchableOpacity, Button, StyleSheet, ActivityIndicator} from 'react-native'
import {AuthContext} from './../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { windowHeight, windowWidth } from '../utils/Dimetions'
import { Profile } from "react-native-fbsdk-next";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Login({ navigation }) {
  const {googleLogin, setUserDetail, location, setLocation, facebookLogin} = useContext(AuthContext);
  const [loading, setLoading] = useState('');


  async function handleGoogleLogin(){
    setLoading('google');
    const result = await googleLogin();
    if(result==undefined) return setLoading('');
    if(result.user!==undefined){
      handleLoginResult(result.user.uid);
    }
    else{
      setLoading('');
    }
  }

  async function handleFacebookLogin(){
    setLoading('facebook');
    const result = await facebookLogin();
    if(result){
      const currentProfile = Profile.getCurrentProfile().then(
        function(currentProfile) {
          if (currentProfile) {
            console.log("The current logged user is: " +
              currentProfile.name
              + ". His profile id is: " +
              currentProfile.userID
            );
          }
        }
      );
    }
    else{
      setLoading('');
    }
  }

  async function handleLoginResult(id){
      const docRef =  await firestore().collection('users').doc(id).get();
      if(docRef.exists){
        const userDetail = {
          name: docRef.data().name,
          email: docRef.data().email,
          gender: docRef.data().gender,
          sports: docRef.data().sports,
          dob: docRef.data().dob,
          profile_image: docRef.data().profile_image,
        }
        setUserDetail(userDetail);
        const jsonValue = JSON.stringify(userDetail);
        await AsyncStorage.setItem('user_detail', jsonValue);
        navigation.replace('Home')
      }
      else{
        navigation.replace('Register');
      }
  }
  
  return (
    <View style={styles.container}>
      {console.log(location)}
      <Image
        style={styles.background}
        source={require('./../assets/bg_image.jpg')}
      />
      <Image
        style={styles.logo}
        source={require('./../assets/frolic-name.png')}
      />
      <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('PhoneNo')}} activeOpacity={0.95}>
        <View style={styles.socialButton}>
        {loading=='phone' ?
          <ActivityIndicator color='#4d4d4d'/>
          :<MaterialCommunityIcons name='cellphone' size={24} color='black'/>
        }
          <Text style={styles.socialText}>Log In With OTP</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>{handleGoogleLogin()}} activeOpacity={0.95}>
        <View style={styles.socialButton}>
        {loading=='google' ?
          <ActivityIndicator color='#4d4d4d'/>
          :<Image style={{width:20,height:20}}  source={require('./../assets/google.png')}/>
        }
          <Text style={styles.socialText}>Log In With Google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{facebookLogin()}} activeOpacity={0.95}>
        <View style={styles.socialButton}>
        {loading=='facebook' ?
          <ActivityIndicator color='#4d4d4d'/>
          :<MaterialCommunityIcons name='facebook' size={24} color='#4267b2'/>
        }
          <Text style={styles.socialText}>Log In With Facebook</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent:'space-around',
    height: windowHeight,
    width: windowWidth,
  
  },
  background: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    resizeMode:'stretch',
    top: 0,
  },
  logo: {
    height: 150,
    width: 180,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
  socialButton:{
    display: 'flex',
    flexDirection:'row',
    width: 250,
    backgroundColor:'white',
    paddingLeft:20,
    alignItems:'center',
    borderRadius:30,
    paddingVertical:10,
    marginVertical:8
  },
  socialText:{
    fontSize:14,
    fontWeight:'bold',
    color:'#4d4d4d',
    textAlign:'center',
    width: 170,
  }
})