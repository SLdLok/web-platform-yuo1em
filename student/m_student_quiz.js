console.log("Quiz area");
var db = firebase.firestore();
// Input
selectionFormInput();
function selectionFormInput() {
  var e = "";
  if (
    document.getElementById("m_input_formSelect")
      .value == `F1` ||
    document.getElementById("m_input_formSelect")
      .value == `F2` ||
    document.getElementById("m_input_formSelect")
      .value == `F3`
  ) {
    e = `LowerForm`;
  }
  if (
    document.getElementById("m_input_formSelect")
      .value == `F4` ||
    document.getElementById("m_input_formSelect")
      .value == `F5` ||
    document.getElementById("m_input_formSelect")
      .value == `F6`
  ) {
    e = `HigherForm`;
  }
  m_listMSG(
    e,
    document.getElementById("m_input_formSelect")
      .value
  );
}
function SerachnRead_M() {
  var e = "";
  if (
    document.getElementById("m_input_formSelect")
      .value == `F1` ||
    document.getElementById("m_input_formSelect")
      .value == `F2` ||
    document.getElementById("m_input_formSelect")
      .value == `F3`
  ) {
    e = `LowerForm`;
  }
  if (
    document.getElementById("m_input_formSelect")
      .value == `F4` ||
    document.getElementById("m_input_formSelect")
      .value == `F5` ||
    document.getElementById("m_input_formSelect")
      .value == `F6`
  ) {
    e = `HigherForm`;
  }
  if (
    document.getElementById("m_PostListforquiz")
      .value == "newPost"
  ) {
    m_newPost(
      e,
      document.getElementById(
        "m_input_formSelect"
      ).value
    );
  } else {
    m_readMSG(
      e,
      document.getElementById(
        "m_input_formSelect"
      ).value,
      document.getElementById("m_PostListforquiz")
        .value
    );
  }
}
// Basic Function
function m_readMSG(Group, Form, Post) {
  var docRef = db
    .collection("Quiz")
    .doc(Group)
    .collection(Form)
    .doc(Post);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        // POST MESSAGE
        if (
          sessionStorage.loginUserRole ===
            "teacher" ||
          sessionStorage.loginUserRole ===
            "admin" ||
          doc.data().PosterUID ===
            JSON.parse(sessionStorage.loginUser)
              .uid
        ) {
          document.getElementById(
            "m_PostAreaforquiz"
          ).innerHTML =
            `` +
            `<div class="d-md-flex justify-content-md-end">` +
            `<button class="btn btn-warning btn-sm" onclick="editPostPage('` +
            Group +
            `','` +
            Form +
            `','` +
            Post +
            `','` +
            doc.data().PostTitle +
            `','` +
            doc.data().QAText +
            `')">Edit</button>&nbsp;` +
            `<button class="btn btn-danger btn-sm" onclick="delPost('` +
            Group +
            `','` +
            Form +
            `','` +
            Post +
            `','` +
            doc.data().PostTitle +
            `')">Delete</button></div>` +
            `<div class="row-4 border"><h1>` +
            atou(doc.data().PostTitle) +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<br/><small class="text-muted">Post by [` +
            doc.data().PosterUID +
            `]</small>` +
            `<div class="border">` +
            atou(doc.data().QAText) +
            `</div><div id="AnswerArea">Your Answer: ` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='A' " >A</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='B' " >B</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='C' " >C</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='D' " >D</button>` +
            `<div class="d-md-flex justify-content-md-end">` +
            `<button class="btn btn-success" onclick="submitAnswer('` +
            doc.data().Answer +
            `')" >Submit Quiz</button></div></div></div>` +
            `</div>`;
        } else {
          document.getElementById(
            "m_PostAreaforquiz"
          ).innerHTML =
            `<div class="row-4 border"><h1>` +
            atou(doc.data().PostTitle) +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<div class="row-4 border">` +
            atou(doc.data().QAText) +
            `<div id="AnswerArea">Your Answer: ` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='A' " >A</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='B' " >B</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='C' " >C</button>` +
            `<button class="btn btn-secondary" onclick="  AnswerSelected='D' " >D</button>` +
            `<div class="d-md-flex justify-content-md-end"><button class="btn btn-success" onclick="submitAnswer('` +
            doc.data().Answer +
            `')" >Submit Quiz</button></div></div>` +
            `</div>`;
        }

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
function m_listMSG(Group, Form) {
  if (sessionStorage.loginUserRole == "teacher") {
    document.getElementById(
      "m_PostListforquiz"
    ).innerHTML = `<option value="newPost">[NEW POST]</option>`;
  } else {
    document.getElementById(
      "m_PostListforquiz"
    ).innerHTML = ``;
  }
  var docRef = db.collection("Quiz").doc(Group);
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
          var ptitle = atou(array[i].title);
          document.getElementById(
            "m_PostListforquiz"
          ).innerHTML +=
            `<option value="` +
            array[i].id +
            `">` +
            ptitle +
            `</option>`;
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
//new post( display only)
function m_newPost(Group, Form) {
  document.getElementById(
    "m_PostAreaforquiz"
  ).innerHTML =
    `<h5>Post Title</h5><input id="PostTitleInput"class="form-control"></input><h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor" style="width: 100%; height: 72.5vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='A' " >A</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='B' " >B</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='C' " >C</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='D' " >D</button>` +
    `<button class="btn btn-success" onclick="m_sendPost('` +
    Group +
    `','` +
    Form +
    `')">Post</button>`;
  document.getElementById(
    "m_CommentAreaforquiz"
  ).innerHTML = "";
}
//send post ( real send to db)
function m_sendPost(Group, Form) {
  var titleInput = document.getElementById(
    "PostTitleInput"
  );
  var input = document
    .getElementById("textEditor")
    .contentWindow.document.getElementById(
      "editorTextInput"
    );
  if ((titleInput.value == "") | " " | "   ") {
    titleInput.value =
      "Untitled Post on" + Date(Date.now());
  }
  db.collection("Quiz")
    .doc(Group)
    .collection(Form)
    .add({
      PostTitle: utoa(titleInput.value),
      EditTime: firebase.firestore.Timestamp.now(),
      QAText: utoa(input.value),
      PosterUID: JSON.parse(
        sessionStorage.loginUser
      ).uid,
      Answer: AnswerSelected
    })
    .then((docRef) => {
      console.log(
        "Document written with ID: ",
        docRef.id
      );
      if (Form === "F1") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F2") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F3") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F4") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F5") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F6") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: docRef.id,
                title: utoa(titleInput.value)
              }
            )
          });
      }
      m_readMSG(Group, Form, docRef.id);
      m_listMSG(Group, Form);
    })
    .catch((error) => {
      console.error(
        "Error adding document: ",
        error
      );
    });
}
//del post
function m_delPost(Group, Form, Post, Title) {
  var docRef = db
    .collection("Quiz")
    .doc(Group)
    .collection(Form)
    .doc(Post);
  docRef
    .delete()
    .then(() => {
      console.log(
        "Document successfully deleted!"
      );
      // Array Del
      if (Form == "F1") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      } else if (Form == "F2") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      } else if (Form == "F3") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      } else if (Form == "F4") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      } else if (Form == "F5") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      } else if (Form == "F6") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: Title,
                id: Post
              }
            )
          });
      }
      window.location.reload();
    })
    .catch((error) => {
      console.error(
        "Error removing document: ",
        error
      );
    });
}
//edit
function m_editPostPage(
  Group,
  Form,
  Post,
  Title,
  text
) {
  document.getElementById(
    "m_PostAreaforquiz"
  ).innerHTML =
    `<h5>Post title</h5>` +
    `<input id="PostTitleInput-"class="form-control">` +
    `<h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor-` +
    `" style="width: 100%; height: 50vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-warning" onclick="editPost('` +
    Group +
    `','` +
    Form +
    `','` +
    Post +
    `','` +
    Title +
    `')">Edit</button>`;
  document
    .getElementById("textEditor-")
    .addEventListener("load", function () {
      document
        .getElementById("textEditor-")
        .contentWindow.document.getElementById(
          "editorTextInput"
        ).value = atou(text);
      document
        .getElementById("textEditor-")
        .contentWindow.document.getElementById(
          "m_editorTextInput"
        ).value = atou(text);
    });
  document.getElementById(
    "PostTitleInput-"
  ).value = atou(Title);
}

function m_editPost(Group, Form, Post, oldTitle) {
  var titleInput = document.getElementById(
    "PostTitleInput-"
  );
  var input = document
    .getElementById("textEditor-")
    .contentWindow.document.getElementById(
      "editorTextInput"
    );
  if ((titleInput.value == "") | " " | "   ") {
    titleInput.value =
      "Untitled Post on" + Date(Date.now());
  }
  db.collection("Quiz")
    .doc(Group)
    .collection(Form)
    .doc(Post)
    .update({
      PostTitle: utoa(titleInput.value),
      EditTime: firebase.firestore.Timestamp.now(),
      QAText: utoa(input.value),
      PosterUID: JSON.parse(
        sessionStorage.loginUser
      ).uid,
      Answer: AnswerSelected
    })
    .then(() => {
      // Array Remove
      if (Form == "F1") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      } else if (Form == "F2") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      } else if (Form == "F3") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      } else if (Form == "F4") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      } else if (Form == "F5") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      } else if (Form == "F6") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayRemove(
              {
                title: oldTitle,
                id: Post
              }
            )
          });
      }
      // Array Update
      if (Form === "F1") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F2") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F3") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F4") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F5") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      } else if (Form === "F6") {
        db.collection("Quiz")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayUnion(
              {
                id: Post,
                title: utoa(titleInput.value)
              }
            )
          });
      }
      m_listMSG(Group, Form);
      m_readMSG(Group, Form, Post);
    });
}
