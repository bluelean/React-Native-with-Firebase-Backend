import React,{useState} from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {windowHeight,windowWidth} from '../../utils/Dimetions'
import auth from '@react-native-firebase/auth';

export default function PhoneNo({navigation}) {
    const[phone, setPhone] = useState('');
    const[loading, setLoading] = useState(false);

    async function sendOtp(){
        if(phone.length==10){
            setLoading(true);
            navigation.navigate('Otp',{phone:phone})
        }
        else{
            console.log('Please Enter 10 digit mobile number')
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/img_number_verification.png')}/>
                <Text style={{alignSelf:'center',width:windowWidth-40,textAlign:'center'}}>Please enter your mobile number to receive a verification code</Text>
                <View style={{marginTop:30,display:'flex',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:20,paddingVertical:10,paddingHorizontal:10}}>+91</Text>
                    <TextInput
                    value={phone}
                    onChangeText={(text)=>setPhone(text)}
                    placeholder='Phone Number'
                    placeholderTextColor='#525252'
                    style={styles.input}
                    autoFocus={true}
                    keyboardType='numeric'
                    keyboardAppearance='dark'
                    maxLength={10}
                    />
                </View>
               <TouchableOpacity activeOpacity={0.9} onPress={()=>sendOtp()} style={styles.button}>
                   <Text style={{fontSize:18,color:'white',textAlign:'center'}}>Send OTP</Text>
               </TouchableOpacity>
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
        fontSize:20,
        color: 'black',
        width: windowWidth/2,
        paddingLeft:15
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