// For Getting userData in sessionStorage
var userDataString = sessionStorage.getItem('loginUser');
var userData = JSON.parse(userDataString);

// For Showing the displayName
var username = userData.displayName;
document.getElementById('DisplayName').innerText =
  'Welcome Back, ' + username + '. ';
