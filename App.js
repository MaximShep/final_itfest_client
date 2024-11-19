
import { useEffect } from "react";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./navigation/navigation";
import {PermissionsAndroid} from 'react-native';


//firebase.initializeApp(firebaseConfig)


export default function App() {



  
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
       <AppNavigation/>
    </GestureHandlerRootView>
   
  );
}