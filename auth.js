console.log('Started');
// Required for side-effects

var db = firebase.firestore();

function SignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    console.log("LogIn already")
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log("ERROR: " + error)
  });
}

function SignOut() {
  firebase.auth().signOut().then(() => {
    console.log("Logout already")
  }).catch((error) => {
    console.log("ERROR: " + error)
  });
}