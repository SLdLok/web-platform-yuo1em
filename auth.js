console.log('Started');
// Required for side-effects

var db = firebase.firestore();

// SignIn Method
function SignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log('LogIn already');
      // store the user's account data in sessionStorage
      sessionStorage.setItem('loginUser', JSON.stringify(user));
      // Direct to panel
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

// SignOut Method
function SignOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logout already');
      sessionStorage.removeItem('loginUser');
      window.location.replace('../index.html');
    })
    .catch((error) => {
      console.log('ERROR: ' + error);
    });
}

// For Checking Is it in correct access (Method)
function CheckAccountAccess() {
  var user = JSON.parse(sessionStorage.getItem('loginUser'));
  var personalUserData = db.collection('UserData').doc(user.uid);
  personalUserData
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        sessionStorage.setItem('loginUserRole', doc.data().Role);
        console.log('His Role is ' + sessionStorage.getItem('loginUserRole'));
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  return sessionStorage.loginUserRole;
}

// For Checking Is it logined (& correct access page)
if (window.hasOwnProperty('IsAuthPage') == false) {
  console.log('Not In Auth');
  if (sessionStorage.hasOwnProperty('loginUser') == false) {
    console.log('not Have Login');

    window.location.replace('../index.html');
  }
}
