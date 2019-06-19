import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    // where we implement firebase framework to log users in
    const { email, password } = this.state;

    // clear any error message
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        // create account
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          // component re-renders and shows error message - if user fails to sign in AND fails to create account
          .catch(this.onLoginFail.bind(this));
      });
  };

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  };

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    // else
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle : {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
