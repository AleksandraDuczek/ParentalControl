import React from 'react';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation-stack';
import {
    createAppContainer, createSwitchNavigator
} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import ChooseRole from './screens/ChooseRole';

var firebaseConfig = {
  apiKey: "AIzaSyATw0xOUTJ2dr8BS0CW7rUQp1HfawicuUA",
  authDomain: "project-cd059.firebaseapp.com",
  databaseURL: "https://project-cd059.firebaseio.com",
  projectId: "project-cd059",
  storageBucket: "project-cd059.appspot.com",
  messagingSenderId: "143406299360",
  appId: "1:143406299360:web:8a4f485cf1bc077ee43885",
  measurementId: "G-4CTH9NFC8L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Map: Map,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
    createSwitchNavigator( {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading",
    }),
)