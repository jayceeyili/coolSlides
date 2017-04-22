import React from 'react';
import firebase from 'firebase';

var config = {
      apiKey: 'AIzaSyBbMAiPs4GxjlWQbkAV-0OkvpB1GM-y_BQ',
      authDomain: "iblink-86850.firebaseapp.com",
      databaseURL: "https://iblink-86850.firebaseio.com",
      projectId: "iblink-86850",
      storageBucket: "iblink-86850.appspot.com",
      messagingSenderId: "477575412539"
    };

firebase.initializeApp(config);

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      signup: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.signOut = this.signOut.bind(this)
    this.signUp = this.signUp.bind(this)
    this.loginProvider = this.loginProvider.bind(this)

  }

  handleChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {

    e.preventDefault()
    var email = this.state.email
    var password = this.state.password

    if (this.state.signup === false) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(results => {
        console.log('Success! Welcome', results.uid);
        this.props.loggedIn(results.uid)
      })
      .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    }

  }

  loginProvider(provider) {
    firebase.auth().signInWithPopup(provider).then(result => {
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      var user = result.user;
      console.log('Success! Welcome', user.uid);
      this.props.loggedIn(user.uid)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('this is the twitter login error', errorCode, errorMessage)
    });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('you\'ve signed out')
    }).catch(function(error) {
      // An error happened.
      console.log('There has been an error with signing out', error);
    });
  }

  signUp() {
    this.setState({signup: !this.state.signup })
  }


  render() {
    return (
        this.state.signup === false ?
          <div>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.email} onChange={this.handleChange} />
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="enter your password" />
              <input type="submit" value="Enter" />
              <button onClick={this.signOut}>Log Out</button>
            </form>
            <button onClick={this.signUp}>Or Sign Up</button>
            <button
              onClick={() => {this.loginProvider(new firebase.auth.TwitterAuthProvider())}}
            >
              Twitter Login
            </button>
          </div>
        :
          <div>
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.email} onChange={this.handleChange} />
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="enter your password" />
              <input type="submit" value="Enter" />
            </form>
            <button onClick={this.signUp}>Or Login</button>
            <button
              onClick={() => {this.loginProvider(new firebase.auth.TwitterAuthProvider())}}
            >
              Twitter Login
            </button>
          </div>
    )
  }
}

export default LoginView;



//
// ComponentDidMount() {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // User is signed in.
//       console.log(user);
//     } else {
//       // No user is signed in.
//       console.log('none');
//     }
//   });
//
// }