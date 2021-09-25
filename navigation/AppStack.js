import React,{useEffect, useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import RNBootSplash from "react-native-bootsplash";

import Tabs from '../screens/tabs/Tabs';
import Messages from '../screens/Messages';
import OnBoardingScreen from '../screens/OnBoarding'
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup';
import Register from '../screens/Register';
import PhoneNo from '../screens/create-account/PhoneNo';
import Otp from '../screens/create-account/Otp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './AuthProvider';

const AppStack = createStackNavigator();

export default function AppStacks() {
  const {user,userDetail,initializing}  = useContext(AuthContext);
  const [route, setRoute] = useState(null);

  useEffect(()=>{
    if(!initializing){
      ConfigureScreen();
    }
  },[initializing])

  const ConfigureScreen = async() =>{
    if(userDetail!==null){
      setRoute('Home')
      await RNBootSplash.hide({ fade: true })
    }
    else{
      if(user!==null){
        setRoute('Register')
        RNBootSplash.hide({ fade: true })
      }
      else{
        AsyncStorage.getItem('alreadyLaunched').then(value=>{
          if(value == null){
            AsyncStorage.setItem('alreadyLaunched','true');
            setRoute('Onboarding')
          }
          else{
            setRoute('Login')
          }
        })
        RNBootSplash.hide({ fade: true });
      }
    }
  }

  if(route==null) return null;
  
    return(
      <AppStack.Navigator
        initialRouteName={route}
        >
          <AppStack.Screen name='Onboarding' component={OnBoardingScreen} options={{header: ()=>null}}/>
          <AppStack.Screen name='Login' component={LoginScreen} options={{header: ()=>null}}/>
          <AppStack.Screen name="Signup" component={SignupScreen} 
              options={({navigation})=>({
                title: 'Sign Up',
                headerStyle:{
                  backgroundColor:'#60264C',
                  shadowColor:'#f9fafd',
                  elevation:5,
                },
              headerTitleStyle:{
                color: 'white',
              },
              headerTintColor:'white',
              })}
              />
          <AppStack.Screen name='Register' component={Register} options={{header: ()=>null}}/>
          <AppStack.Screen name='PhoneNo' component={PhoneNo} 
              options={{headerTitle:'Login with OTP',
              cardShadowEnabled:true,
              headerStyle:{backgroundColor:'#63254C'},
              headerTitleStyle:{color:'white'},
              headerTintColor: '#fff'
            }}/>
          <AppStack.Screen name='Otp' component={Otp} 
              options={{headerTitle:'OTP Verification',
                      cardShadowEnabled:true,
                      headerStyle:{backgroundColor:'#63254C'},
                      headerTitleStyle:{color:'white',},
                      headerTintColor: '#fff'
                    }}/>
          <AppStack.Screen name='Home' component={Tabs} options={{header: ()=>null}}/>
          <AppStack.Screen name='Messages' component={Messages} options={({route})=>({title: route.params.name})}/>
      </AppStack.Navigator>
    )
}