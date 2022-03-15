console.log("Started");
// Required for side-effects

var db = firebase.firestore();

// SignIn Method
function SignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(
      (result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log("LogIn already");
        // store the user's account data in sessionStorage
        sessionStorage.setItem(
          "loginUser",
          JSON.stringify(user)
        );

        CheckAccountAccess();
        if (
          window.confirm(
            "DO YOU NEED ENTER DEBUG MODE (Get/Change Your Access) ?"
          ) == true
        ) {
          var prompt = window.prompt(
            "Your UID is " +
              JSON.parse(sessionStorage.loginUser)
                .uid +
              ".\n And your Account Access is " +
              sessionStorage.loginUserRole +
              ". \n\n Please type which Access you want.",
            sessionStorage.loginUserRole
          );
          if (prompt != null) {
            var prompt2 = window.prompt(
              "Your Account's Form is F" +
                sessionStorage.loginUserForm +
                ". \nPlease type which Form you want. \n( Please type the number only. If Form isn N/A, Please type '0' )",
              sessionStorage.loginUserForm
            );
            if (prompt2 != null) {
              var Ref = db
                .collection("UserData")
                .doc(
                  JSON.parse(
                    sessionStorage.loginUser
                  ).uid
                );
              return Ref.update({
                Form: parseInt(prompt2),
                Role: prompt
              })
                .then(() => {
                  console.log(
                    "Document successfully updated!"
                  );
                  window.alert(
                    "Changed. Return to Panel."
                  );
                  document.writeln(`<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    /><div style="position: absolute; width: 97.5%; height:97.5%; top: 50%; left: 47.5%"><div class="spinner-border" role="status">
    </div><br/><span class="sr-only sr-only-focusable">Loading...</span></div>`);
                  setTimeout(
                    () =>
                      window.location.replace(
                        "./" +
                          sessionStorage.getItem(
                            "loginUserRole"
                          ) +
                          "/panel.html"
                      ),
                    4300 * Math.random()
                  );
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  window.alert(
                    "Error updating document: ",
                    error
                  );
                });
            } else {
              setTimeout(
                () =>
                  window.location.replace(
                    "./" +
                      sessionStorage.getItem(
                        "loginUserRole"
                      ) +
                      "/panel.html"
                  ),
                4300 * Math.random()
              );
            }
          } else {
            setTimeout(
              () =>
                window.location.replace(
                  "./" +
                    sessionStorage.getItem(
                      "loginUserRole"
                    ) +
                    "/panel.html"
                ),
              4300 * Math.random()
            );
          }
        } else {
          setTimeout(
            () =>
              window.location.replace(
                "./" +
                  sessionStorage.getItem(
                    "loginUserRole"
                  ) +
                  "/panel.html"
              ),
            4300 * Math.random()
          );
        }
        document.writeln(`<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    /><div style="position: absolute; width: 97.5%; height:97.5%; top: 50%; left: 47.5%"><div class="spinner-border" role="status">
    </div><br/><span class="sr-only sr-only-focusable">Loading...</span></div>`);

        // For debug
      }
      // Direct to panel
    )
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("ERROR: " + error);
    });
}

// SignOut Method
function SignOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Logout already");
      sessionStorage.removeItem("loginUser");
      sessionStorage.removeItem("loginUserRole");
      window.location.replace("../index.html");
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });
}

// For Checking Is it in correct access (Method)
function CheckAccountAccess() {
  var user = JSON.parse(
    sessionStorage.getItem("loginUser")
  );
  console.log(user);
  if (user != undefined || user != null) {
    var personalUserData = db
      .collection("UserData")
      .doc(user.uid);
    personalUserData
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(
            "Document data:",
            doc.data()
          );
          sessionStorage.setItem(
            "loginUserRole",
            doc.data().Role
          );
          // Form
          sessionStorage.setItem(
            "loginUserForm",
            doc.data().Form
          );
          // ex: PointSystem Daily Award Time Check
          sessionStorage.LastGetDailyAwardTime = doc
            .data()
            .LastGetDailyAwardTime.toMillis();
          console.log(
            "His Role is " +
              sessionStorage.getItem(
                "loginUserRole"
              )
          );
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          // add new userData in Database
          db.collection("UserData")
            .doc(user.uid)
            .set({
              // -- USERDATA PLS -- //
              DisplayID: user.displayName,
              UID: user.uid,
              Form: NaN,
              Role: "unsigned",
              LastGetDailyAwardTime: firebase.firestore.Timestamp.now(),
              PointOwned: 100,
              DailyQuestionLimit: 10,
              DailyQuizLimit: 15
            })
            .then(() => {
              console.log(
                "Document successfully written!"
              );
              CheckAccountAccess();
            })
            .catch((error) => {
              console.error(
                "Error writing document: ",
                error
              );
            });
        }
      })
      .catch((error) => {
        console.log(
          "Error getting document:",
          error
        );
      });
    return sessionStorage.loginUserRole;
  }
}

// For Checking Is it logined (& correct access page)
if (
  window.hasOwnProperty("IsAuthPage") == false
) {
  console.log("Not In Auth");

  // Direct to correct Access page
  if (CheckAccountAccess() != pageNeedAccess) {
    window.alert(
      "ERROR: Access Denied \n Your Access: " +
        CheckAccountAccess() +
        "\n Access Allowed: " +
        pageNeedAccess +
        "\n\n Website will sign out immediately \n Please Contact Admin to slove the problem."
    );
    SignOut();
  }

  if (
    sessionStorage.hasOwnProperty("loginUser") ==
    false
  ) {
    console.log("not Have Login");

    window.location.replace("../index.html");
  }
}
