// For Getting userData in sessionStorage
var userDataString = sessionStorage.getItem(
  "loginUser"
);
var userData = JSON.parse(userDataString);

function roundToTwo(num) {
  return +(Math.round(num + "e+1") + "e-1");
}

// For Showing the displayName
var username = userData.displayName;
if (sessionStorage.PointOwned > 950) {
  var pt_d =
    roundToTwo(sessionStorage.PointOwned / 1000) +
    "k";
} else {
  var pt_d = sessionStorage.PointOwned;
}
document.getElementById("DisplayName").innerHTML =
  username +
  "&nbsp;&nbsp;" +
  "<span style='font-size: 1rem;'>🪙</span>" +
  pt_d;

setInterval(() => {
  document.getElementById(
    "DisplayName"
  ).innerHTML =
    username +
    "&nbsp;&nbsp;" +
    "<span style='font-size: 1rem;'>🪙</span>" +
    pt_d +
    "&nbsp;&nbsp;";
}, 250);
