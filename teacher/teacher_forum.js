console.log("Loading Forum");
var db = firebase.firestore();
GetBalance();
// Screen Size Check
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
        "m_PostList"
      ).value = post;
      m_listMSG(t, f);
      m_readMSG(t, f, post);
    }
  }
}

// Sorting
function DBSorting(text) {
  var ast = atou(text).toLowerCase();
  console.log(ast);
  var KT = db
    .collection("Sorting")
    .doc("RelativeTopic");
  KT.get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var arrayKT = doc.data().KT;
        document.getElementById(
          "relativeArea"
        ).innerHTML = "Relative to: ";
        for (let i = 0; i < arrayKT.length; i++) {
          if (
            ast.indexOf(arrayKT[i].keyword) >= 0
          ) {
            document.getElementById(
              "relativeArea"
            ).innerHTML +=
              `<span class="badge rounded-pill bg-primary" onclick="window.location.href=('` +
              arrayKT[i].link +
              `'` +
              `)">` +
              arrayKT[i].keyword +
              `</span>`;
          } else {
          }
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
// Balance Value Ex
var BPTExValue = {
  PostPTEx: {
    base: 10,
    diff: 0.8,
    power: 1.1
  },
  CommentPTEx: {
    base: 5,
    diff: 1.2,
    power: 1.1
  }
};
function BalanceCalPostPTEx(varx) {
  var axb = BPTExValue.PostPTEx.diff + varx;
  var result = Math.pow(
    axb * BPTExValue.PostPTEx.base,
    BPTExValue.PostPTEx.power
  );
  return Math.round(result);
}
function BalanceCalCommentPTEx(varx) {
  var axb = BPTExValue.CommentPTEx.diff - varx;
  var result = Math.pow(
    axb * BPTExValue.CommentPTEx.base,
    BPTExValue.CommentPTEx.power
  );
  return Math.round(result);
}
// data
BalanceValue = 1;
postPointUsed = 10;
commentPointAward = 5;
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
// round to 4 digit
function roundTo2(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
// Balance
function DelBalance(Form) {
  if (Form == "F1") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F1": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F2") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F2": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F3") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F3": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F4") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F4": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F5") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F5": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F6") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F6": firebase.firestore.FieldValue.increment(
          -1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          -1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  }
}
function UpdateBalance(Form) {
  if (Form == "F1") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F1": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F2") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F2": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F3") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F3": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F4") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F4": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F5") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F5": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  } else if (Form == "F6") {
    db.collection("Forum")
      .doc("Balance")
      .update({
        "PostNum.F6": firebase.firestore.FieldValue.increment(
          1
        ),
        "PostNum.All": firebase.firestore.FieldValue.increment(
          1
        )
      })
      .then(() => {
        console.log(
          "Document successfully updated!"
        );
        m_GetBalance(Form);
        GetBalance(Form);
      });
  }
}
function GetBalance(Form) {
  var docRef = db
    .collection("Forum")
    .doc("Balance");

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(
          "Document data:",
          doc.data(),
          doc.data().PostNum[Form],
          doc.data().PostNum.All
        );
        var a = doc.data().PostNum[Form];
        var b = doc.data().PostNum.All;
        BalanceValue = a / b;
        // PT
        postPointUsed = BalanceCalPostPTEx(
          BalanceValue
        );
        // CT
        commentPointAward = BalanceCalCommentPTEx(
          BalanceValue
        );

        // Display
        // For F1
        var sbal1 =
          doc.data().PostNum["F1"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm1"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 1 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal1 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal1) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal1) +
          `pt]</span>`;
        // For F2
        var sbal2 =
          doc.data().PostNum["F2"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm2"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 2 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal2 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal2) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal2) +
          `pt]</span>`;
        // For F3
        var sbal3 =
          doc.data().PostNum["F3"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm3"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 3 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal3 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal3) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal3) +
          `pt]</span>`;
        // For F4
        var sbal4 =
          doc.data().PostNum["F4"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm4"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 4 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal4 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal4) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal4) +
          `pt]</span>`;
        // For F5
        var sbal5 =
          doc.data().PostNum["F5"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm5"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 5 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal5 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal5) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal5) +
          `pt]</span>`;
        // For F6
        var sbal6 =
          doc.data().PostNum["F6"] /
          doc.data().PostNum.All;
        document.getElementById(
          "BTNLISTForm6"
        ).innerHTML =
          `<span style='font-size: 1.5rem'>Form 6 </span><span class="text-secondary" style='font-size: 0.8rem'>[Dense: ` +
          roundTo2(sbal6 * 100) +
          `%, Post-Need: ` +
          BalanceCalPostPTEx(sbal6) +
          `pt, Comment-Get: ` +
          BalanceCalCommentPTEx(sbal6) +
          `pt]</span>`;
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
        if (
          sessionStorage.loginUserRole ===
            "admin" ||
          doc.data().PosterUID ===
            JSON.parse(sessionStorage.loginUser)
              .uid
        ) {
          document.getElementById(
            "PostArea"
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
            `<button class="btn btn-danger btn-sm" data-bs-toggle='modal' data-bs-target='#DelPostPagePopUp' onclick="delPostPage('` +
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
            `<div class="row-1 border overflow-auto w-100" id="relativeArea"></div>` +
            `<div class="border">` +
            atou(doc.data().PostText) +
            `</div></div>`;
        } else {
          document.getElementById(
            "PostArea"
          ).innerHTML =
            `<div class="row-3 border"><h1>` +
            atou(doc.data().PostTitle) +
            `</h1></div>` +
            `<small class="text-muted">Last Edit Date: ` +
            doc.data().EditTime.toDate() +
            `</small>` +
            `<div class="row-1 border overflow-auto w-100" id="relativeArea"></div>` +
            `<div class="row-4 border">` +
            atou(doc.data().PostText) +
            `</div>`;
        }

        document.getElementById(
          "CommentArea"
        ).innerHTML =
          // Post Comment Area
          `<div class="row-4 border-top-0"><h3>Comment The Post</h3>` +
          `<iframe id="textEditor" class="embed-responsive" style="width: 100%; min-height: 20rem;" src="../textEditor.html"></iframe>` +
          `<button class="btn btn-success" data-bs-toggle='modal' data-bs-target='#SendCommentPagePopUp' onclick="sendCommentPage('` +
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
          if (
            sessionStorage.loginUserRole ===
              "admin" ||
            doc.data().Comment[i].CommenterUID ===
              JSON.parse(sessionStorage.loginUser)
                .uid
          ) {
            document.getElementById(
              "CommentArea"
            ).innerHTML +=
              `<div id="c-` +
              i +
              `">` +
              `<div class="d-md-flex justify-content-md-end">` +
              `<button class="btn btn-warning btn-sm" onclick="editCommentPage('` +
              Group +
              `','` +
              Form +
              `','` +
              Post +
              `','` +
              array[i].CommentText +
              `','` +
              array[i].CommenterUID +
              `',` +
              doc
                .data()
                .Comment[i].EditTime.toMillis() +
              `,` +
              i +
              `)">edit</button><span>&nbsp;</span>` +
              `<button class="btn btn-danger btn-sm" onclick="delCommentPage('` +
              Group +
              `','` +
              Form +
              `','` +
              Post +
              `','` +
              array[i].CommentText +
              `','` +
              array[i].CommenterUID +
              `',` +
              doc
                .data()
                .Comment[i].EditTime.toMillis() +
              `)">delete</button></div>` +
              `<div class="row-4 border">` +
              `<small class="">&num;` +
              i.toString() +
              `&nbsp;&nbsp;&nbsp;&nbsp;</small>` +
              `<small class="text-muted">` +
              array[i].EditTime.toDate() +
              `</small>` +
              `<br/>` +
              `<label>` +
              atou(array[i].CommentText) +
              `</label></div></div>`;
          } else {
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
              `<label>` +
              atou(array[i].CommentText) +
              `</label></div>`;
          }
        }
        MathJax.typeset();
        DBSorting(
          utoa(
            atou(doc.data().PostTitle) +
              " " +
              atou(doc.data().PostText)
          )
        );
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
  m_GetBalance(Form);
  GetBalance(Form);
  if (
    "F" + sessionStorage.loginUserForm ==
    Form
  ) {
    document.getElementById(
      "PostList"
    ).innerHTML =
      `<div class="row-1 border"><button class="btn btn-success" onclick="newPost('` +
      Group +
      `','` +
      Form +
      `')">New Post</button></div>`;
  } else {
    document.getElementById(
      "PostList"
    ).innerHTML = `<div class="row-1 border"><button class="btn btn-success disabled">New Post</button></div>`;
  }
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
  if (
    document
      .getElementById("textEditor")
      .contentWindow.document.getElementById(
        "editorTextInput"
      ).value.length > 20
  ) {
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
        se1.play();
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(
                "Document data:",
                doc.data()
              );
              if (
                doc.data().PosterUID ==
                JSON.parse(
                  sessionStorage.loginUser
                ).uid
              ) {
                alertBox(
                  "This is your post. You cannot get any pt from comment yourself.",
                  "warning",
                  5000
                );
              }
              readMSG(Group, Form, Post);
            } else {
              // doc.data() will be undefined in this case
              addPoint(commentPointAward);
              alertBox(
                "Comment is uploaded. You get " +
                  commentPointAward +
                  "pt. Now, you have " +
                  (parseInt(
                    sessionStorage.PointOwned
                  ) +
                    commentPointAward) +
                  "pt now.",
                "success",
                5000
              );
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log(
              "Error getting document:",
              error
            );
          });
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error(
          "Error updating document: ",
          error
        );
      });
  } else {
    alertBox(
      "Your Post isn't long enough. Please type more Info.",
      "warning",
      5000
    );
  }
}

function newPost(Group, Form) {
  document.getElementById("PostArea").innerHTML =
    `<h5>Post Title</h5><input id="PostTitleInput"class="form-control"></input><h5>Content</h5>` +
    `<iframe class="embed-responsive" id="textEditor" style="width: 100%; height: 72.5vh;" src="../textEditor.html"></iframe>` +
    `<button class="btn btn-success" data-bs-toggle='modal' data-bs-target='#PostPagePopUp' onclick="sendPostPage('` +
    Group +
    `','` +
    Form +
    `')">Post</button>`;
  document.getElementById(
    "CommentArea"
  ).innerHTML = "";
}

function sendPost(Group, Form) {
  if (
    document
      .getElementById("textEditor")
      .contentWindow.document.getElementById(
        "editorTextInput"
      ).value.length > 20
  ) {
    if (readQuestionLimit() > 0) {
      if (readPoint() > 0 + postPointUsed) {
        var titleInput = document.getElementById(
          "PostTitleInput"
        );
        var input = document
          .getElementById("textEditor")
          .contentWindow.document.getElementById(
            "editorTextInput"
          );
        if (
          (titleInput.value == "") |
          " " |
          "   "
        ) {
          titleInput.value =
            "Untitled Post on" + Date(Date.now());
        }
        db.collection("Forum")
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
              db.collection("Forum")
                .doc(Group)
                .update({
                  F1DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            } else if (Form === "F2") {
              db.collection("Forum")
                .doc(Group)
                .update({
                  F2DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            } else if (Form === "F3") {
              db.collection("Forum")
                .doc(Group)
                .update({
                  F3DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            } else if (Form === "F4") {
              db.collection("Forum")
                .doc(Group)
                .update({
                  F4DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            } else if (Form === "F5") {
              db.collection("Forum")
                .doc(Group)
                .update({
                  F5DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            } else if (Form === "F6") {
              db.collection("Forum")
                .doc(Group)
                .update({
                  F6DocArray: firebase.firestore.FieldValue.arrayUnion(
                    {
                      id: docRef.id,
                      title: utoa(
                        titleInput.value
                      )
                    }
                  )
                });
            }
            delPoint(postPointUsed);
            delQuestionLimit();
            UpdateBalance(Form);
            alertBox(
              "Posted. " +
                postPointUsed +
                "pt is used to post. <br/>You still have " +
                (readPoint() - postPointUsed) +
                "pt and " +
                (readQuestionLimit() - 1) +
                " times to Post Qustion now. ",
              "success",
              5000
            );
            readMSG(Group, Form, docRef.id);
            listMSG(Group, Form);
          })
          .catch((error) => {
            console.error(
              "Error adding document: ",
              error
            );
          });
      } else {
        alertBox(
          "You're only have " +
            readPoint() +
            "pt. You don't have enough Point to Post the Question",
          "danger",
          5000
        );
      }
    } else {
      alertBox(
        "You reached Today Question Limit. Question Limit can be refreshed by Daily Award.",
        "danger",
        5000
      );
    }
  } else {
    alertBox(
      "Your Post isn't long enough. Please type more Info.",
      "warning",
      5000
    );
  }
}

function delPost(Group, Form, Post, Title) {
  var docRef = db
    .collection("Forum")
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
        db.collection("Forum")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
      } else if (Form == "F2") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
      } else if (Form == "F3") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
      } else if (Form == "F4") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
      } else if (Form == "F5") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
      } else if (Form == "F6") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: Title, id: Post }
            )
          });
        DelBalance(Form);
        alertBox(
          "Deleted The Post.",
          "info",
          4500
        );
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
    .collection("Forum")
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
    .collection("Forum")
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
  document.getElementById("PostArea").innerHTML =
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
  db.collection("Forum")
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
        db.collection("Forum")
          .doc(Group)
          .update({
            F1DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      } else if (Form == "F2") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F2DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      } else if (Form == "F3") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F3DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      } else if (Form == "F4") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F4DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      } else if (Form == "F5") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F5DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      } else if (Form == "F6") {
        db.collection("Forum")
          .doc(Group)
          .update({
            F6DocArray: firebase.firestore.FieldValue.arrayRemove(
              { title: oldTitle, id: Post }
            )
          });
      }
      // Array Update
      if (Form === "F1") {
        db.collection("Forum")
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
        db.collection("Forum")
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
        db.collection("Forum")
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
        db.collection("Forum")
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
        db.collection("Forum")
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
        db.collection("Forum")
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

// Page Post
function sendPostPage(Group, Form) {
  document.getElementById(
    "PostPopUpMSG"
  ).innerHTML =
    `This post will use ` +
    postPointUsed +
    `pt to post it.<br />
            Are you sure to post with agreeing the terms and conditions?`;
  document.getElementById(
    "PostPopUpBtn"
  ).innerHTML =
    ` <button
  type="button"
  class="btn btn-primary" onclick="sendPost('` +
    Group +
    `','` +
    Form +
    `');$('#PostPagePopUp').modal('hide');">Post</button>`;
}
// Page Del Post
function delPostPage(Group, Form, Post, Title) {
  document.getElementById(
    "DelPostPopUpMSG"
  ).innerHTML =
    `Delete this post will not return pt.<br/>` +
    `You cannot undo any action after delete this post.` +
    `<br />Are you sure to post?`;
  document.getElementById(
    "DelPostPopUpBtn"
  ).innerHTML =
    ` <button
  type="button"
  class="btn btn-primary" onclick="delPost('` +
    Group +
    `','` +
    Form +
    `','` +
    Post +
    `','` +
    Title +
    `');$('#DelPostPagePopUp').modal('hide');">Delete</button>`;
}

// Comment Post
function sendCommentPage(Group, Form, Post) {
  document.getElementById(
    "SendCommentPopUpMSG"
  ).innerHTML =
    `Comment this post can get ` +
    commentPointAward +
    `pt to post it.<br />` +
    `Are you sure to submit with agreeing the terms and conditions?`;
  document.getElementById(
    "SendCommentPopUpBtn"
  ).innerHTML =
    ` <button
  type="button"
  class="btn btn-primary" onclick="sendComment('` +
    Group +
    `','` +
    Form +
    `','` +
    Post +
    `');$('#SendCommentPagePopUp').modal('hide');">Submit Comment</button>`;
}
// Del Comment
function delCommentPage(
  Group,
  Form,
  Post,
  CommentT,
  CommentU,
  CommentE
) {
  document.getElementById(
    "DelCommentPopUpMSG"
  ).innerHTML =
    `You cannot undo any action after delete this comment.` +
    `<br /> +
            Are you sure to delete?`;
  document.getElementById(
    "DelCommentPopUpBtn"
  ).innerHTML =
    ` <button
  type="button"
  class="btn btn-primary" onclick="delComment('` +
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
    `);$('#DelCommentPagePopUp').modal('hide');">Submit Comment</button>`;
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
