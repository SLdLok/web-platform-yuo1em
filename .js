function a(x, y, z) {
  var docRef = db.collection(x).doc(y);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("a").innerHTML =
          `<button onclick="B(` +
          doc.data().Answer +
          `)></button>`;
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

document
  .getElementById("textEditor")
  .contentWindow.document.getElementById(
    "editorTextInput"
  ).value;

AnswerSelected = "";
