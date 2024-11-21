
import {useFonts} from 'expo-font';
import { useCallback } from 'react';
import { useEffect } from "react";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./navigation/navigation";
import {PermissionsAndroid} from 'react-native';


//firebase.initializeApp(firebaseConfig)


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Main': require('./assets/font/mainFont.ttf'),
   'Regular': require('./assets/font/ubuntuRegular.ttf'),
     'Medium': require('./assets/font/ubuntuMedium.ttf'),
     'Bold': require('./assets/font/ubuntuBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
       <AppNavigation/>
    </GestureHandlerRootView>
   
  );
}