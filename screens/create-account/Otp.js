import React, { useEffect,useState,useContext} from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../../navigation/AuthProvider'
import {windowHeight,windowWidth} from '../../utils/Dimetions'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

export default function Otp({route,navigation}) {
    const {setUserDetail} = useContext(AuthContext);
    const {phone} = route.params;
    const [otp, setOtp] = useState('');
    const [confirm, setConfirm] = useState(null);
    const[loading, setLoading] = useState(false);

    useEffect(()=>{
        SendOtp();
    },[])

    async function SendOtp(){
        const confirmation = await auth().signInWithPhoneNumber(`+91 ${phone}`);
        setConfirm(confirmation);
        console.log(confirmation);
    }
    async function confirmCode() {
        setLoading(true);

        try {
          await confirm.confirm(otp).then(user=>{
              console.log(user);
              handleLoginResult(user.user.uid);
          });
        } catch (error) {
          console.log('Invalid code.');
        }       
    }

    async function handleLoginResult(id){
        const docRef =  await firestore().collection('users').doc(id).get();
        console.log(docRef.exists);
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
          navigation.replace('Home');
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {console.log(phone)}
            <Image style={styles.image} source={require('../../assets/img_code_verification.png')}/>
                <Text style={{alignSelf:'center',width:windowWidth-40,textAlign:'center'}}>An OTP send on {phone}</Text>
                    <TextInput
                    value={otp}
                    onChangeText={(text)=>setOtp(text)}
                    placeholder='OTP'
                    placeholderTextColor='#525252'
                    style={styles.input}
                    inputStyle={{ letterSpacing: 20 }}
                    autoFocus={true}
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    maxLength={6}
                    />
               <TouchableHighlight onPress={()=>confirmCode()} style={styles.button}>
                {loading?
                 <ActivityIndicator color='white'/>
                :<Text style={{fontSize:18,color:'white',textAlign:'center'}}>Verify</Text>
                }  
               </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        flexDirection:'column',
    },
    image:{
        width: 220,
        height: 220,
        marginTop:10,
        resizeMode:'contain',
        alignSelf:'center'
    },
    input:{
        borderWidth:0.4,
        borderColor:'rgba(0,0,0,0.2)',
        backgroundColor:'white',
        borderRadius:5,
        fontSize:25,
        color: 'black',
        width: windowWidth/2,
        alignSelf:'center',
        marginTop:30,
        textAlign:'center',
    },
    button:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:'#63254C',
        paddingVertical:13
    }
})