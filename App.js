import React from 'react';
import * as firebase from 'firebase';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './components/form/LoginScreen';
import LoadingScreen from './components/initialization/LoadingScreen';
import RegisterScreen from './components/form/RegisterScreen';
import Direction from './components/form/Direction';
import Map from './components/common/Map';
import ChooseRole from './components/form/ChooseRole';
import Child from './components/modes/child/Main';
import Parent from './components/modes/Common';

const firebaseConfig = {
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
    Direction: Direction,
    Parent: Parent,
    Child: Child,
    Map: Map,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  ChooseRole: ChooseRole,
  Register: RegisterScreen,
});

export default createAppContainer(
    createSwitchNavigator( {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }),
)