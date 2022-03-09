console.log("Learning area");
var db = firebase.firestore();

// Basic Function
function readMSG(Group, Form, Post) {
  var docRef = db.collection("Learn").doc(Group).collection(Form).doc(Post);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        // POST MESSAGE
        if (
          sessionStorage.loginUserRole == "admin" ||
          doc.data().PosterUID == sessionStorage.loginUser.uid
        ) {
          document.getElementById("PostAreaforlearn").innerHTML =
            `<div class="row-4 border"><h1>` +
            doc.data().PostTitle +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<br/><small class="text-muted">Post by [` +
            doc.data().PosterUID +
            `]</small>` +
            `<button``<div class="row-4 border">` +
            doc.data().PostText +
            `</div>`;
        } else {
          document.getElementById("PostAreaforlearn").innerHTML =
            `<div class="row-4 border"><h1>` +
            doc.data().PostTitle +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<div class="row-4 border">` +
            doc.data().PostText +
            `</div>`;
        }

        document.getElementById("CommentAreaforlearn").innerHTML =
          // Post Comment Area
          `<div class="row-4 border-top-0"><h3>Comment The Post</h3>` +
          `<iframe id="textEditor" class="embed-responsive" style="width: 100%; min-height: 20rem;" src="../textEditor.html"></iframe>` +
          `<button class="btn btn-success" onclick="sendComment('` +
          Group +
          `','` +
          Form +
          `','` +
          Post +
          `')">Send Comment</button></div><br/>`;

        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return doc.data(); //
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// Normal
function listLn(Group, Form) {
  document.getElementById("PostListforlearn").innerHTML =
    `<div class="row-1 border"><button class="btn btn-success" onclick="newPost('` +
    Group +
    `','` +
    Form +
    `')">New Post</button></div>`;
  var docRef = db.collection("Learn").doc(Group);
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
        for (let i = array.length - 1; i >= 0; i--) {
          console.log(array[i]);
          document.getElementById("PostListforlearn").innerHTML +=
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
        MathJax.typeset();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

//--comment area

function sendComment(Group, Form, Post) {
  var docRef = db.collection("Learn").doc(Group).collection(Form).doc(Post);

  //--Set the "capital" field of the city 'DC'
  return docRef
    .update({
      Comment: firebase.firestore.FieldValue.arrayUnion({
        CommentText: document
          .getElementById("textEditor")
          .contentWindow.document.getElementById("editorTextInput").value,
        EditTime: firebase.firestore.Timestamp.now(),
        CommenterUID: JSON.parse(sessionStorage.loginUser).uid
      })
    })
    .then(() => {
      readMSG(Group, Form, Post);
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

function newPost(Group, Form) {
  document.getElementById("PostAreaforlearn").innerHTML =
    `<h5>Post Title</h5><input id="PostTitleInput"class="form-control"></input><h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor" style="width: 100%; height: 72.5vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-success" onclick="sendPost('` +
    Group +
    `','` +
    Form +
    `')">Post</button>`;
  document.getElementById("CommentAreaforlearn").innerHTML = "";
}

function sendPost(Group, Form) {
  var titleInput = document.getElementById("PostTitleInput");
  var input = document
    .getElementById("textEditor")
    .contentWindow.document.getElementById("editorTextInput");
  if ((titleInput.value == "") | " " | "   ") {
    titleInput.value = "Untitled Post on" + Date(Date.now());
  }
  db.collection("Learn")
    .doc(Group)
    .collection(Form)
    .add({
      PostTitle: titleInput.value,
      EditTime: firebase.firestore.Timestamp.now(),
      PostText: input.value,
      Comment: [],
      PosterUID: JSON.parse(sessionStorage.loginUser).uid
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      if (Form === "F1") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      } else if (Form === "F2") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      } else if (Form === "F3") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      } else if (Form === "F4") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      } else if (Form === "F5") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      } else if (Form === "F6") {
        db.collection("Learn")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: titleInput.value
            })
          });
      }
      readMSG(Group, Form, docRef.id);
      listLn(Group, Form);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}