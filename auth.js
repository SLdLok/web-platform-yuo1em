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
      CheckAccountAccess();
      // Direct to panel
      setTimeout(
        () =>
          window.location.replace(
            './' + sessionStorage.getItem('loginUserRole') + '/panel.html'
          ),
        500
      );
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
      sessionStorage.removeItem('loginUserRole');
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
        obj = {
          // -------------- USERDATA SET PLS --------------- //
        };
        // add new userData in Database
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

  // Direct to correct Access page
  if (CheckAccountAccess() != pageNeedAccess) {
    window.alert(
      'ERROR: Access Denied \n Your Access: ' +
        CheckAccountAccess() +
        '\n Access Allowed: ' +
        pageNeedAccess +
        '\n\n Website will sign out immediately \n Please Contact Admin to slove the problem.'
    );
    SignOut();
  }

  if (sessionStorage.hasOwnProperty('loginUser') == false) {
    console.log('not Have Login');

    window.location.replace('../index.html');
  }
}
