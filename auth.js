console.log('Started');
// Required for side-effects

var db = firebase.firestore();

function SignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      user = result.user;
      console.log('LogIn already');
      sessionStorage.setItem('loginUser', JSON.stringify(user));
      window.location.href = './student/panel.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('ERROR: ' + error);
    });
}

function SignOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logout already');
      sessionStorage.removeItem('loginUser');
      window.location.href = '../index.html';
    })
    .catch((error) => {
      console.log('ERROR: ' + error);
    });
}
