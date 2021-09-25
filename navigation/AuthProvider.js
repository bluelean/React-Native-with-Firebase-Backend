import React,{createContext,useState,useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const [initializing, setInitializing] = useState(true);

  async function onAuthStateChanged(user) {
      setUser(user);
      await AsyncStorage.getItem('user_detail').then(value=>{
        if(value!==null){
          setUserDetail(JSON.parse(value));
        } 
        if (initializing) setInitializing(false);
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []); 
    

    GoogleSignin.configure({
      webClientId: '323464062652-00mbae2isen7bla4ifljsk8semdhb2mk.apps.googleusercontent.com',
    });

    const login = async (email, password) =>{
        try{
          return await auth().signInWithEmailAndPassword(email,password)
        } catch(e){
          return e.message
        }
    }

    const facebookLogin = async () =>{
      const result = await LoginManager.logInWithPermissions(["public_profile"]).catch(error=>console.log(error));
      if(result.isCancelled){
        console.log('login cancelled');
      }
      else{
        return true;
      }
      return false;
    }

    const googleLogin = async () =>{
        try{
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        const result = auth().signInWithCredential(googleCredential);
        return result;
        }catch(e){
          console.log(e);
        }
    }
    
    const register = async (email,password) =>{
        try{
          return await auth().createUserWithEmailAndPassword(email,password);
        } catch(e){
          return e.message;
        }
    }
    
    const logout = async () =>{
      try{
        await GoogleSignin.signOut();
        await auth().signOut();
      } catch(e){
        console.log(e.message);
      }
      AsyncStorage.removeItem('user_detail');
      setUserDetail(null);
    }
    
    return(
        <AuthContext.Provider
          value={{
            user,
            initializing,
            setUser,
            userDetail,
            setUserDetail,
            login,
            facebookLogin,
            googleLogin,
            register,
            logout,
          }}
        >
            {children}
        </AuthContext.Provider>
    );
}