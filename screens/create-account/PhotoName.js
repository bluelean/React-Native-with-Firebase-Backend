import React, { Component, useContext, useRef, useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableHighlight, TextInput, Modal,ActivityIndicator } from 'react-native'
import { Divider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {windowWidth} from '../../utils/Dimetions'
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

export default function PhotoName(props){
    const[show, setShow] = useState(false);
    const[image ,setImage] = useState(null);

    const popup = () =>{
        setShow(!show);
    }

    const fromCamera = () =>{
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
          }).then(image => {
            console.log(image);
            setImage(image);
            props.image(image);
            popup();
          });
    }
    const fromLibrary = () =>{
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true
          }).then(image => {
            console.log(image);
            setImage(image);
            props.image(image);
            popup();
          });
    }
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image? {uri:image.path} : require('../../assets/user.png')}/>
                    <TouchableHighlight onPress={()=>setShow(true)} activeOpacity={0.9} underlayColor={'#ff3b3b'} style={styles.button}>
                        <View onPress={()=>popup} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.buttonText}>Add Photo </Text>
                            <FontAwesome name='plus' size={18} color='white'/>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={{fontSize:22, color:'white'}}> Profile Picture</Text>
                <TextInput
                  style={styles.input}
                  placeholder= "Enter your name"
                  autoCompleteType='name'
                  placeholderTextColor='#ababab'
                  onChangeText={text=>props.name(text)}
                />
                <Text style={{color:"red"}}>{props.error}</Text>
                <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={popup}   
                >
                    <View style={styles.modalView}>
                    <Text style={{textAlign:'center',fontSize:22}}>Upload Photo</Text>
                    <Divider orientation="horizontal" width={2}/>
                    <View style={styles.pictureButton}>
                    <Button
                        title="  Take Photo"
                        icon={
                            <FontAwesome name='camera' color='white' size={18}/>
                        }
                        containerStyle={{marginTop:10}}
                        onPress={()=>fromCamera()}
                        />
                        <Button
                        title="  Choose Image"
                        icon={
                            <FontAwesome name='image' color='white' size={18}/>
                        }
                        containerStyle={{marginTop:10}}
                        onPress={()=>fromLibrary()}
                        />
                        <Button
                        title="Cancel"
                        containerStyle={{marginTop:10}}
                        onPress={()=>popup()}
                        />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    
}

const styles = StyleSheet.create({
   container:{
       flex: 1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#5D2448',
       width: windowWidth,
   },
   imageContainer:{
      borderWidth:10,
      borderRadius:200,
      borderColor:'#a8a8a8',
   },
   image:{
       width: 200,
       height: 200,
       borderRadius:100,
   },
   button:{
       position : 'absolute',
       top: 150,
       right: -10,
       backgroundColor:'red',
       padding: 10,
       borderRadius:20,
       elevation:10
   },
   buttonText:{
       color: 'white',
       fontSize: 18
   },
   input:{
       color: 'white',
       width: windowWidth/1.5,
       fontSize: 25,
       borderBottomWidth:1,
       borderBottomColor:'black',
       marginTop:25,
   },
   done:{
       elevation:10,
       backgroundColor:'white',
       borderRadius:100,
       padding: 5,
       backgroundColor:'red',
       marginTop:90,
       zIndex:10
   },
   modalView:{
       width: windowWidth,
       backgroundColor:'white',
       position: 'absolute',
       bottom: 0,
       display: 'flex',
       flexDirection:'column',
       justifyContent:'center',
       borderTopRightRadius:20,
       borderTopLeftRadius:20,
       elevation:10,
       paddingBottom:20,
       paddingTop:10,  
   },
   pictureButton:{
       marginHorizontal:30,
       marginTop:10
   }
})