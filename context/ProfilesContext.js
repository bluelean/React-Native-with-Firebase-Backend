import React,{useContext,useEffect,useState, createContext, useRef} from 'react'
import {PermissionsAndroid} from 'react-native'
// import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore'
import Geolocation from 'react-native-geolocation-service'
import { AuthContext } from '../navigation/AuthProvider'
import {geohashForLocation, geohashQueryBounds,distanceBetween} from 'geofire-common'

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const[loading, setLoading] = useState(true);
    const [location,setLocation] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [km , setkm]  = useState(50);

    useEffect(()=>{
        requestLocationPermission();
    },[])

    useEffect(()=>{
        if(user!==null && location!==null){
            firestore().collection('users').doc(user.uid).update({
                geoHash: geohashForLocation([location.latitude, location.longitude]),
                location: location
            })
        }
    },[user,location])

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                  setLocation(position.coords);
                  fetchProfiles(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };

    async function fetchProfiles(latitude, longitude){
       console.log('jatt');
       const center = [latitude, longitude];
       const radiusInM = km * 1000;
       console.log(center);
       console.log(radiusInM);
       const collection = firestore().collection('users')
       const data = await collection.get();
       const promise = [];
       data.docs.map(data=>{
        const target = data.data().location;
        if(target){
          const distance = distanceBetween(center,[target.latitude,target.longitude]);
          if(distance<radiusInM){
            promise.push({id:data.id,data:data.data(),distance:distance});
          }
        }
       })
       console.log(promise);
       setProfiles(promise);
       setLoading(false);
    }

    return(
        <ProfileContext.Provider value={{loading,profiles}}>
            {children}
        </ProfileContext.Provider>
    )
}

