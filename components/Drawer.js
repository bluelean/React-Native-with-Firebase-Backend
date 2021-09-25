// import React,{useContext, useEffect, useRef} from 'react'
// import { AuthContext } from '../navigation/AuthProvider'
// import { View, Text, Animated, StyleSheet, Modal, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
// import { windowHeight, windowWidth } from '../utils/Dimetions'
// import { Avatar,Divider } from 'react-native-paper'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// export default function Drawer(props) {
//     const{userDetail} = useContext(AuthContext);
//     const value = useRef(new Animated.ValueXY({x:-300,y:0})).current

//     useEffect(()=>{
//         if(props.visible){
//             slideRight();
//         }
//     },[props.visible])

//     function slideRight(){
//         Animated.timing(value,{
//             toValue:{x:0,y:0},
//             duration:500,
//             useNativeDriver:false
//         }).start()
//     }

//     function slideLeft(){
//         Animated.timing(value,{
//             toValue:{x:-200,y:0},
//             duration:500,
//             useNativeDriver:false
//         }).start();
//         props.setVisible(false)
//     }

//     return (
//         <View>
//         <Modal
//          animationType="fade"
//          visible={props.visible}
//          transparent={true}
//          onRequestClose={() => {
//             props.setVisible(false)
//           }}
//         >
//         <View style={{width:windowWidth,height:windowHeight,display:'flex',flexDirection:'row'}}>
//             <Animated.View style={value.getLayout()}>
//             <View style={styles.container}>
//                     <View style={styles.head}>
//                     <Avatar.Image size={60} source={{uri:userDetail.profile_image}} />
//                     <Text style={{marginTop:10,fontSize:18}}>{userDetail.name}</Text>
//                     </View>
//                     <Divider/>
//                     <TouchableHighlight onPress={()=>slideRight()}>
//                     <View style={styles.listItem}>
//                         <MaterialCommunityIcons name='paw' size={25}/>
//                         <Text style={{marginLeft:10,fontSize:15}}>Find A Pet</Text>
//                     </View>
//                     </TouchableHighlight>
//             </View>
//             </Animated.View>
//             <TouchableWithoutFeedback onPress={()=>slideLeft()}>
//                 <View style={{width:'50%'}}/>
//             </TouchableWithoutFeedback>
//         </View>
//         </Modal>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         height: windowHeight,
//         backgroundColor:'white',
//         elevation:4,
//         width: 200,
//     },
//     head:{
//         display: 'flex',
//         flexDirection:'column',
//         alignItems:'center',
//         paddingTop:50,
//         paddingBottom:10,
//         borderBottomWidth:0.5,
//     },
//     listItem:{
//         display: 'flex',
//         flexDirection:'row',
//         alignItems:'center',
//         padding: 8,
//         borderBottomWidth:0.2
//     }
// })
