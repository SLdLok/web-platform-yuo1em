console.log("Quiz area");
var db = firebase.firestore();
AnswerSelected = "A";
let se1 = new Audio("../SE_success.ogg");
let se2 = new Audio("../SE_fail.ogg");
// ucs-2 string to base64 encoded ascii
function utoa(str) {
  return window.btoa(
    unescape(encodeURIComponent(str))
  );
}
// base64 encoded ascii to ucs-2 string
function atou(str) {
  return decodeURIComponent(
    escape(window.atob(str))
  );
}
function getViewport() {
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (width <= 576) return "xs";
  if (width <= 768) return "sm";
  if (width <= 992) return "md";
  if (width <= 1200) return "lg";
  return "xl";
}
direct();
// Direct
function direct() {
  const weblink = window.location.search;
  const urlParams = new URLSearchParams(weblink);
  var group = urlParams.get("group");
  var form = urlParams.get("form");
  var post = urlParams.get("post");
  var f = "F" + form;
  var t = "";
  if (group == "1") {
    t = "LowerForm";
  } else if (group == "2") {
    t = "HigherForm";
  }
  console.log(f, t, post);
  if (
    urlParams.has("group") == true &&
    urlParams.has("form") == true &&
    urlParams.has("post") == true
  ) {
    if (
      getViewport() == "xl" ||
      getViewport() == "lg"
    ) {
      listMSG(t, f);
      readMSG(t, f, post);
    } else {
      m_listMSG(t, f);
      m_readMSG(t, f, post);
    }
  }
}
// Basic Function
function readMSG(Group, Form, Post) {
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
            "PostAreaforquiz"
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
            "PostAreaforquiz"
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
function listMSG(Group, Form) {
  document.getElementById(
    "PostListforquiz"
  ).innerHTML =
    `<div class="row-1 border"><button class="btn btn-success" onclick="newPost('` +
    Group +
    `','` +
    Form +
    `')">New Post</button></div>`;
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
          document.getElementById(
            "PostListforquiz"
          ).innerHTML +=
            `<div class="row-1 border"><button class="btn" onclick="readMSG('` +
            Group +
            `','` +
            Form +
            `','` +
            array[i].id +
            `')">` +
            atou(array[i].title) +
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
//new post( display only)
function newPost(Group, Form) {
  document.getElementById(
    "PostAreaforquiz"
  ).innerHTML =
    `<h5>Post Title</h5><input id="PostTitleInput"class="form-control"></input><h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor" style="width: 100%; height: 72.5vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='A' " >A</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='B' " >B</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='C' " >C</button>` +
    `<button class="btn btn-success" onclick="  AnswerSelected='D' " >D</button>` +
    `<button class="btn btn-success" onclick="sendPost('` +
    Group +
    `','` +
    Form +
    `')">Post</button>`;
  document.getElementById(
    "CommentAreaforquiz"
  ).innerHTML = "";
}
//send post ( real send to db)
function sendPost(Group, Form) {
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
      readMSG(Group, Form, docRef.id);
      listMSG(Group, Form);
    })
    .catch((error) => {
      console.error(
        "Error adding document: ",
        error
      );
    });
}
//del post
function delPost(Group, Form, Post, Title) {
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
function editPostPage(
  Group,
  Form,
  Post,
  Title,
  text
) {
  document.getElementById(
    "PostAreaforquiz"
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
    });
  document.getElementById(
    "PostTitleInput-"
  ).value = atou(Title);
}

function editPost(Group, Form, Post, oldTitle) {
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
      listMSG(Group, Form);
      readMSG(Group, Form, Post);
    });
}

function submitAnswer(CorrectAns) {
  if (readQuizLimit() > 0) {
    if (CorrectAns === AnswerSelected) {
      delQuizLimit();
      addPoint(5);
      alertBox(
        "Correct. You get 5pt as an award.",
        "success",
        5000
      );
    } else {
      alertBox(
        "Wrong. Correct Answer is " +
          CorrectAns +
          ". ",
        "danger",
        5000
      );
    }
  } else {
    alert(
      "You reached the quiz limit of today. Please refresh it by getting daily award.",
      "danger",
      5000
    );
  }
}
// Alert

function alertBox(msg, type, time) {
  if (type == "danger") {
    se2.play();
  } else if (type == "success") {
    se1.play();
  }
  var id = Math.random * 1000;
  document.getElementById("alertBox").innerHTML +=
    `<div id="alert-` +
    id +
    `" class="alert animated-alert alert-dismissible alert-` +
    type +
    `" role="alert">` +
    msg +
    `<a href="#" class="close btn-close" data-dismiss="alert" aria-label="close">&times;</a>` +
    `</div>`;

  setTimeout(() => {
    document
      .getElementById("alert-" + id)
      .classList.add("animated-alert-del");
  }, time - 150);
  setTimeout(() => {
    document
      .getElementById("alert-" + id)
      .remove();
  }, time);
}
