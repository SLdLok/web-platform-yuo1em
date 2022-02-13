var userDataString = sessionStorage.getItem('loginUser');
var userData = JSON.parse(userDataString);
var username = userData.displayName;
document.getElementById('DisplayName').innerText =
  'Welcome Back, ' + username + '. ';
