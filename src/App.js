import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
