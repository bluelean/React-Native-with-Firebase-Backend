import React,{useEffect,useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoardingScreen from '../screens/OnBoarding'
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup';
import Register from '../screens/Register';
import PhoneNo from '../screens/create-account/PhoneNo';
import Otp from '../screens/create-account/Otp';
import {AuthContext} from './AuthProvider'
import RNBootSplash from "react-native-bootsplash";

const AuthStack = createStackNavigator();

export default function AuthStacks() {
    const [firstTime, setFirstTime] = useState(null);
    const {user}  = useContext(AuthContext);

    useEffect(()=>{
        CheckFirstTime();
    },[])

    const CheckFirstTime = async() =>{
      AsyncStorage.getItem('alreadyLaunched').then(value=>{
        if(value == null){
          AsyncStorage.setItem('alreadyLaunched','true');
          setFirstTime(true);
        }
        else{
          setFirstTime(false);
        }
      })
      await RNBootSplash.hide({ fade: true });
    }



    if(firstTime==null) return null;

    return(
          <AuthStack.Navigator
            initialRouteName={firstTime? 'Onboarding': user==null ?'Login':'Register'}
            >
            <AuthStack.Screen name='Onboarding' component={OnBoardingScreen} options={{header: ()=>null}}/>
            <AuthStack.Screen name='Login' component={LoginScreen} options={{header: ()=>null}}/>
            <AuthStack.Screen name="Signup" component={SignupScreen} 
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
              <AuthStack.Screen name='Register' component={Register} options={{header: ()=>null}}/>
              <AuthStack.Screen name='PhoneNo' component={PhoneNo} 
                 options={{headerTitle:'Login with OTP',
                 cardShadowEnabled:true,
                 headerStyle:{backgroundColor:'#63254C'},
                 headerTitleStyle:{color:'white'},
                 headerTintColor: '#fff'
                }}/>
              <AuthStack.Screen name='Otp' component={Otp} 
                 options={{headerTitle:'OTP Verification',
                          cardShadowEnabled:true,
                          headerStyle:{backgroundColor:'#63254C'},
                          headerTitleStyle:{color:'white',},
                          headerTintColor: '#fff'
                        }}/>
          </AuthStack.Navigator>
      );
}