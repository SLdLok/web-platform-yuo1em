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
        // POST MESSAGE
        document.getElementById(
          "PostArea"
        ).innerHTML =
          `<div class="row-4 border"><h1>` +
          doc.data().PostTitle +
          `</h1></div>` +
          `<small class="text-muted">Last Edit Date: ` +
          doc.data().EditTime.toDate() +
          `</small>` +
          `<div class="row-4 border">` +
          `<img src="` +
          doc.data().PostImage +
          `" class="img-fluid img-thumbnail">` +
          doc.data().PostText +
          `</div>`;

        document.getElementById(
          "CommentArea"
        ).innerHTML =
          // Post Comment Area
          `<div class="row-4 border-top-0"><h3>Comment The Post</h3>` +
          `<textarea id='SelfCommentText' class="form-control" style="font-size: 0.5rem;"></textarea>` +
          `<button class="btn btn-success" onclick="sendComment('` +
          Group +
          `','` +
          Form +
          `','` +
          Post +
          `')">Send Comment</button></div><br/>`;

        // POST COMMENT
        var array = doc.data().Comment;
        console.log(array);
        for (
          let i = array.length - 1;
          i >= 0;
          i--
        ) {
          console.log(i);

          // Read Comment Area
          document.getElementById(
            "CommentArea"
          ).innerHTML +=
            `<div class="row-4 border">` +
            `<small class="">&num;` +
            i.toString() +
            `&nbsp;&nbsp;&nbsp;&nbsp;</small>` +
            `<small class="text-muted">` +
            array[i].EditTime.toDate() +
            `</small>` +
            `<br/>` +
            `<img src="` +
            array[i].CommentImage +
            `" class="img-fluid img-thumbnail">` +
            `<br/><label>` +
            array[i].CommentText +
            `</label></div>`;
        }
        MathJax.typeset();
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
  ).innerHTML = `<div class="row-1 border"><button class="btn btn-success" onclick="newPost()">New Post</button></div>`;
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
        for (
          let i = array.length - 1;
          i >= 0;
          i--
        ) {
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
        MathJax.typeset();
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

function sendComment(Group, Form, Post) {
  var docRef = db
    .collection("Forum")
    .doc(Group)
    .collection(Form)
    .doc(Post);

  // Set the "capital" field of the city 'DC'
  return docRef
    .update({
      Comment: firebase.firestore.FieldValue.arrayUnion(
        {
          CommentText: document.getElementById(
            "SelfCommentText"
          ).value,
          CommentImage: "",
          EditTime: firebase.firestore.Timestamp.now(),
          CommenterUID: JSON.parse(
            sessionStorage.loginUser
          ).uid
        }
      )
    })
    .then(() => {
      readMSG(Group, Form, Post);
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error(
        "Error updating document: ",
        error
      );
    });
}

function newPost() {
  document.getElementById(
    "PostArea"
  ).innerHTML = `<iframe class="embed-responsive" style="width: 100%; height: 90vh;" src="../textEditor.html"></iframe>`;
  document.getElementById(
    "CommentArea"
  ).innerHTML = "";
}
