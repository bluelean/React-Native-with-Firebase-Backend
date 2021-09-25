// import React, { Component, useContext, useRef, useState } from 'react'
// import { Text, View, Image, StyleSheet, TouchableHighlight, TextInput,ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import {windowWidth} from '../../utils/Dimetions'
// import firestore from '@react-native-firebase/firestore'
// import { AuthContext } from '../../navigation/AuthProvider';
// import Carousel from 'react-native-snap-carousel'


//   const Item = ({ title }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );

// export default function Age({navigation}){
//     const{user} = useContext(AuthContext);
//     const[loading,setLoading] = useState(false);
//     const[c,setc] = useState(null);

//     const DATA = () =>{
//         let a = [];
//        for(let i=10; i<=55; i++){
//           a.push({id:i,age:i});
//        }
//        return a;
//     }   
//     const renderItem = ({item, index}) => {
//         return (
//             <View style={styles.item}>
//             <Text style={styles.title}>{item.age}</Text>
//             </View>
//         );
//     }

//     async function UpdateAge(){
//         setLoading(true);
//         try{
//             let result = await firestore().collection('users').doc(user.uid).update({
//                 age: c._activeItem+10,
//             })
//         }catch(e){
//             return setLoading(false);
//         }
//         setLoading(false);
//         navigation.navigate('sports');
//         }
    

//         return (
//             <View style={styles.container}>
//             <View>
//                 <Image style={styles.image} source={require('./../../assets/onboarding/onlinetraining.png')}/>
//             </View>
//             <Text style={{fontSize:22, color:'white'}}>Age ?</Text>
//             <View style={{height:100,marginTop:30}}>
//             <Carousel
//               ref={(c) => {setc(c)}}
//               data={DATA()}
//               renderItem={renderItem}
//               sliderWidth={windowWidth}
//               itemWidth={200}
//             />
//             </View>
//             <FontAwesome onPress={()=>{UpdateAge()}} name='check'  size={50} color={'white'} style={styles.done}/>
//             <ActivityIndicator animating={loading} size={80} style={{marginTop:-70}} color="#00ff00" />
//             </View>           
//         )
// }

// const styles = StyleSheet.create({
//    container:{
//        flex: 1,
//        justifyContent:'center',
//        alignItems:'center',
//        backgroundColor:'#5D2448',
//    },
//    done:{
//        elevation:10,
//        backgroundColor:'white',
//        borderRadius:100,
//        padding: 5,
//        backgroundColor:'red',
//        marginTop:90,
//        zIndex:10,
//    },
//    title:{
//         color: 'white',
//         fontSize:22,
//         alignSelf:'center',
//     },
//     image:{
//         width: 200,
//         height: 200,
//     },
//     item: {
//         height: 100,
//         width: 200,
//         display: 'flex',
//         justifyContent:'center',
//         alignItems:'center',
//         marginHorizontal: 16,
//         borderWidth:3,
//         borderRadius:8,
//         borderColor:'#b2cf42',
//         shadowColor: "#b2cf42",
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 1.44,
//         elevation: 0.1,
//       },
// })

