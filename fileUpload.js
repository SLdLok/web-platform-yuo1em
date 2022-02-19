var storage = firebase.storage();
var storageRef = storage.ref();

// Point to Folder Path
var forumStorage = storageRef.child("Forum");

// Create the file metadata
var metadata = {
  contentType: "image/jpeg"
};

// Upload Function (putFolder eg. "forum")
function uploadFile(file, putFolder, metadata) {
  // Upload file with metadata
  var uploadTask = storageRef
    .child(putFolder + "/" + generatePushID())
    .put(file, metadata);

  // listen the state change
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress =
        (snapshot.bytesTransferred /
          snapshot.totalBytes) *
        100;
      console.log(
        "Upload is " + progress + "% done"
      );
      msgProgress("uploading", progress);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => {
          console.log(
            "File available at",
            downloadURL
          );
          msgProgress("ended", downloadURL);
        });
    }
  );
}
//  uploadButton Test(Remove)
function btnUpload() {
  uploadFile(
    document.getElementById("fileButton")
      .files[0],
    "test",
    metadata
  );
}

generatePushID = (function () {
  var PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  var lastPushTime = 0;
  var lastRandChars = [];

  return function () {
    var now = new Date().getTime();
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(
        now % 64
      );
      now = Math.floor(now / 64);
    }
    if (now !== 0)
      throw new Error(
        "We should have converted the entire timestamp."
      );

    var id = timeStampChars.join("");

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(
          Math.random() * 64
        );
      }
    } else {
      for (
        i = 11;
        i >= 0 && lastRandChars[i] === 63;
        i--
      ) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length != 20)
      throw new Error("Length should be 20.");

    return id;
  };
})();
