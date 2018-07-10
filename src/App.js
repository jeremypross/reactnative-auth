import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  // lifecycle method
  componentWillMount() {
    // firebase config ()
    firebase.initializeApp({
    apiKey: "AIzaSyAoHUGomVTekrRlpz09wCTxb3230As4Pos",
    authDomain: "auth-15066.firebaseapp.com",
    databaseURL: "https://auth-15066.firebaseio.com",
    projectId: "auth-15066",
    storageBucket: "auth-15066.appspot.com",
    messagingSenderId: "457722714622"
    });
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;
