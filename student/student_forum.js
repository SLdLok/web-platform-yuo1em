console.log("Loading Forum");
var db = firebase.firestore();

// Basic Function
function readMSG(Group, Form, Post) {
  var docRef = db
    .collection("Forum")
    .doc(Group)
    .collection(Form)
    .doc(Post);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById(
          "PostArea"
        ).innerHTML =
          `<div class="row-4 border"><h1>` +
          doc.data().PostTitle +
          `</h1></div>` +
          `<div class="row-4 border">` +
          doc.data().PostText +
          `</div>`;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return doc.data(); //
    })
    .catch((error) => {
      console.log(
        "Error getting document:",
        error
      );
    });
}

// Normal
function listMSG(Group, Form) {
  document.getElementById(
    "PostList"
  ).innerHTML = `<div class="row-1 border"><button class="btn btn-success">New Post</button></div>`;
  var docRef = db.collection("Forum").doc(Group);
  var array = [];
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        if (Form === "F1") {
          array = doc.data().F1DocArray;
        } else if (Form === "F2") {
          array = doc.data().F2DocArray;
        } else if (Form === "F3") {
          array = doc.data().F3DocArray;
        } else if (Form === "F4") {
          array = doc.data().F4DocArray;
        } else if (Form === "F5") {
          array = doc.data().F5DocArray;
        } else if (Form === "F6") {
          array = doc.data().F6DocArray;
        }
        for (let i = 0; i < array.length; i++) {
          console.log(array[i]);
          document.getElementById(
            "PostList"
          ).innerHTML +=
            `<div class="row-1 border"><button class="btn" onclick="readMSG('` +
            Group +
            `','` +
            Form +
            `','` +
            array[i].id +
            `')">` +
            array[i].title +
            `</button></div>`;
        }
      } else {
        // doc.data() will be undefined in this case
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
