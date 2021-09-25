import React, { useState, useContext } from 'react'
import { View, Image, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import {AuthContext} from '../navigation/AuthProvider'
import FormInput from './../components/FormInput'
import FormButton from './../components/FormButton'
import SocialButton from './../components/SocialButton'

export default function Signup({ navigation }) {

  const {register, googleLogin} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function Signup(){
    setError('');
    setLoading(true);  
    if(email=='' || !email.includes('@')){
      setLoading(false);
      return setError('please enter valid email')
    }
    if(password.length <8 ){
      setLoading(false);
      return setError('please enter valid password, password must contain atleast 8 character!')
    }
    if(!(password == confirmPassword)){
      setLoading(false);
      return setError('password don not match!')
    }
    console.log('handling runing')
    let result = await register(email,password);
    if(result.user== undefined){
      let a = result.indexOf(']')
      console.log(result)
      setError(result.substring(a+2));
      return setLoading(false);
    }
    navigation.replace('Register');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <FormInput
        lableValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        autoCapatialize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <FormInput
        lableValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="password"
        iconType="lock"
        autoCapatialize="none"
        secureTextEntry={true}
      />
      <FormInput
        lableValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="confirm password"
        iconType="lock"
        autoCapatialize="none"
        secureTextEntry={true}
      />
       <Text style={{color:"red"}}>{error}</Text>
      <FormButton
        title='Sign Up'
        onPress={()=>{Signup()}}
        loading={loading}
      />
      <View style={[styles.textPrivate, { flexWrap: 'wrap', display: 'flex', flexDirection: 'row' }]}>
        <Text style={styles.color_textPrivate}>By resigtering, you confirm that you accept our</Text>
        <TouchableOpacity><Text style={[styles.color_textPrivate, { color: '#051d5f' }]}> Terms of Services</Text></TouchableOpacity>
        <Text style={styles.color_textPrivate}>and</Text>
        <Text style={[styles.color_textPrivate, { color: "#051d5f" }]}> Privacy Policy</Text>
      </View>
      <SocialButton
        title='Sign Up with Google'
        btnType="google"
        color='white'
        backgroundColor='red'
        onPress={() => {googleLogin()}}
      />
      <SocialButton
        title='Sign Up with Facebook'
        btnType="facebook"
        color='white'
        backgroundColor='#57a3eb'
        onPress={() => { }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1E8BD',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    color: '#60264C',
  },
  logo: {
    height: 150,
    width: 150,
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
  textPrivate: {
    margin: 5,
  },
  color_textPrivate: {
    fontSize: 12,
  }
})