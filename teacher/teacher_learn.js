console.log("Learning area");
var db = firebase.firestore();

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
      document.getElementById(
        "m_input_formSelect"
      ).value = form;
      document.getElementById(
        "m_PostListforlearn"
      ).value = post;
      m_listMSG(t, f);
      m_readMSG(t, f, post);
    }
  }
}
// Basic Function
function readMSG(Group, Form, Post) {
  var docRef = db
    .collection("Learn")
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
            "admin" ||
          sessionStorage.loginUserRole ===
            "teacher" ||
          doc.data().PosFterUID ===
            JSON.parse(sessionStorage.loginUser)
              .uid
        ) {
          document.getElementById(
            "PostAreaforlearn"
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
            doc.data().PostText +
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
            atou(doc.data().PostText) +
            `</div></div>`;
        } else {
          document.getElementById(
            "PostAreaforlearn"
          ).innerHTML =
            `<div class="row-4 border"><h1>` +
            atou(doc.data().PostTitle) +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<div class="row-4 border">` +
            atou(doc.data().PostText) +
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
    "PostListforlearn"
  ).innerHTML =
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
        for (
          let i = array.length - 1;
          i >= 0;
          i--
        ) {
          console.log(array[i]);
          document.getElementById(
            "PostListforlearn"
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

function sendComment(Group, Form, Post) {
  var docRef = db
    .collection("Learn")
    .doc(Group)
    .collection(Form)
    .doc(Post);

  // Set the "capital" field of the city 'DC'
  return docRef
    .update({
      Comment: firebase.firestore.FieldValue.arrayUnion(
        {
          CommentText: utoa(
            document
              .getElementById("textEditor")
              .contentWindow.document.getElementById(
                "editorTextInput"
              ).value
          ),
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

function newPost(Group, Form) {
  document.getElementById(
    "PostAreaforlearn"
  ).innerHTML =
    `<h5>Post Title</h5><input id="PostTitleInput"class="form-control"></input><h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor" style="width: 100%; height: 72.5vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-success" onclick="sendPost('` +
    Group +
    `','` +
    Form +
    `')">Post</button>`;
  document.getElementById(
    "CommentAreaforlearn"
  ).innerHTML = "";
}

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
  db.collection("Learn")
    .doc(Group)
    .collection(Form)
    .add({
      PostTitle: utoa(titleInput.value),
      EditTime: firebase.firestore.Timestamp.now(),
      PostText: utoa(input.value),
      Comment: [],
      PosterUID: JSON.parse(
        sessionStorage.loginUser
      ).uid
    })
    .then((docRef) => {
      console.log(
        "Document written with ID: ",
        docRef.id
      );
      if (Form === "F1") {
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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

function delPost(Group, Form, Post, Title) {
  var docRef = db
    .collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
function delComment(
  Group,
  Form,
  Post,
  CommentT,
  CommentU,
  CommentE
) {
  var docRef = db
    .collection("Learn")
    .doc(Group)
    .collection(Form)
    .doc(Post);
  console.log({
    CommentText: CommentT,
    CommenterUID: CommentU,
    EditTime: CommentE
  });
  docRef
    .update({
      Comment: firebase.firestore.FieldValue.arrayRemove(
        {
          CommentText: CommentT,
          CommenterUID: CommentU,
          EditTime: firebase.firestore.Timestamp.fromMillis(
            CommentE
          )
        }
      )
    })
    .then(readMSG(Group, Form, Post));
}

function editCommentPage(
  Group,
  Form,
  Post,
  CommentT,
  CommentU,
  CommentE,
  id
) {
  document.getElementById("c-" + id).innerHTML =
    `<iframe class="embed-responsive" id="textEditor-` +
    id +
    `" style="width: 100%; height: 50vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-warning" onclick="editComment('` +
    Group +
    `','` +
    Form +
    `','` +
    Post +
    `','` +
    CommentT +
    `','` +
    CommentU +
    `',` +
    CommentE +
    `,` +
    id +
    `)">Edit Comment</button>`;
  document
    .getElementById("textEditor-" + id)
    .addEventListener("load", function () {
      document
        .getElementById("textEditor-" + id)
        .contentWindow.document.getElementById(
          "editorTextInput"
        ).value = atou(CommentT);
    });
}

function editComment(
  Group,
  Form,
  Post,
  CommentT,
  CommentU,
  CommentE,
  id
) {
  delComment(
    Group,
    Form,
    Post,
    CommentT,
    CommentU,
    CommentE
  );

  var docRef = db
    .collection("Learn")
    .doc(Group)
    .collection(Form)
    .doc(Post);

  // Set the "capital" field of the city 'DC'
  return docRef
    .update({
      Comment: firebase.firestore.FieldValue.arrayUnion(
        {
          CommentText: utoa(
            document
              .getElementById("textEditor-" + id)
              .contentWindow.document.getElementById(
                "editorTextInput"
              ).value
          ),
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

function editPostPage(
  Group,
  Form,
  Post,
  Title,
  text
) {
  document.getElementById(
    "PostAreaforlearn"
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
  db.collection("Learn")
    .doc(Group)
    .collection(Form)
    .doc(Post)
    .update({
      PostTitle: utoa(titleInput.value),
      EditTime: firebase.firestore.Timestamp.now(),
      PostText: utoa(input.value),
      PosterUID: JSON.parse(
        sessionStorage.loginUser
      ).uid
    })
    .then(() => {
      // Array Remove
      if (Form == "F1") {
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
        db.collection("Learn")
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
