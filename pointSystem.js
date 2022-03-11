var db = firebase.firestore();
sessionStorage.PointOwned = undefined;
PS_readPoint();
readPoint();

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

function PS_readPoint() {
  pt = undefined;
  var docRef = db
    .collection("UserData")
    .doc(
      JSON.parse(sessionStorage.loginUser).uid
    );

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log(doc.data().PointOwned);
        sessionStorage.PointOwned = doc.data().PointOwned;
      } else {
        // do(c.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log(
        "Error getting document:",
        error
      );
    });
}
function readPoint() {
  PS_readPoint();
  return sessionStorage.PointOwned;
}

function addPoint(num) {
  var docRef = db
    .collection("UserData")
    .doc(
      JSON.parse(sessionStorage.loginUser).uid
    );
  return docRef
    .update({
      PointOwned: firebase.firestore.FieldValue.increment(
        num
      )
    })
    .then(() => {
      PS_readPoint();
    });
}

function delPoint(num) {
  var docRef = db
    .collection("UserData")
    .doc(
      JSON.parse(sessionStorage.loginUser).uid
    );
  return docRef
    .update({
      PointOwned: firebase.firestore.FieldValue.increment(
        -num
      )
    })
    .then(() => {
      PS_readPoint();
    });
}

function dailyAward() {
  var docRef = db
    .collection("UserData")
    .doc(
      JSON.parse(sessionStorage.loginUser).uid
    );

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (
          doc
            .data()
            .LastGetDailyAwardTime.toMillis() <
          firebase.firestore.Timestamp.now().toMillis()
        ) {
          addPoint(50);
          var today = new Date();
          var date = today.addDays(1);
          return docRef
            .update({
              LastGetDailyAwardTime: firebase.firestore.Timestamp.fromDate(
                date
              )
            })
            .then(() => {
              window.location.reload();
            });
        }
      } else {
        // do(c.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log(
        "Error getting document:",
        error
      );
    });
}
